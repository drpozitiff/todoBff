const express = require('express');
const axios = require('axios');
const router = express.Router();
const {check, validationResult} = require("express-validator");
const redisClient = require("../redis");

const findUser = async (candidate) => {
    return new Promise(async (resv, rej) => {
        await redisClient.get("webApp.users", function(err, users) {
            err ? console.log('redisGet errors: ', err) : false;
            const {username, email} = candidate;
            const usersFromDB = JSON.parse(users);

            for (const userId in usersFromDB) {
                let user = usersFromDB[userId];
                for (const key in user) {
                    if (username === user['username'] || email === user['email'] || username === user['email']) {
                        resv(user);
                        return;
                    }
                }
            }
            resv({
                error: "USER_NOT_FOUND"
            });
        });
    })

};

router.get('/clearDB', function(req, res) {
    redisClient.flushall();
    res.send("redis clear success!");
});


router.use('/', function timeLog(req, res, next) {
    console.log('Time a: ', Date.now());
    next();
});

router.get('/getUsers', function(req, res) {
    redisClient.get("webApp.users", function(err, redisRes) {
        err ? console.log('redisGet errors: ', err) : false;
        res.send(JSON.parse(redisRes));
    });
});

router.get('/getUserById', function(req, res) {
    try {
        redisClient.get("webApp.users", function(err, redisRes) {
            err ? console.log('redisGet errors: ', err) : false;
            const users = JSON.parse(redisRes);
            const candidate = redisRes && users[`user_${req.param('userId')}`];
            if(candidate) {
                candidate && delete candidate.password;
                res.send(candidate);
            } else {
                res.status(400).json({message: "Cant find user"});
            }

        });
    } catch (e) {
        console.log(e);
        res.status(400).json({message: "User error", e});
    }
});


router.post('/registration', [
    check('username', "The username field cannot be empty").notEmpty(),
    check('email', "Incorrect email").normalizeEmail().isEmail(),
    check('password', "Password must be between 4 and 10 characters").isLength({min: 4, max: 10})
], async function(req, res) {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({message: "Registration error", errors: errors.errors});
        }
        console.log("req.body", req.body);
        const candidate = await findUser(req.body);

        if(candidate.error === "USER_NOT_FOUND") {
            await redisClient.get("webApp.users", function(err, users) {
                err ? console.log('redisGet errors: ', err) : false;
                const date = Date.now();
                const dynoKey = `user_${date}`,
                    newOneUser = {
                        [dynoKey]: {...req.body, userId: date}
                    };
                const newUsers = Object.assign(!JSON.parse(users) ? {} : JSON.parse(users), newOneUser);
                redisClient.set("webApp.users", JSON.stringify(newUsers));
                delete candidate.password;
                res.send({
                    message: "User registered successfully!",
                    candidate
                });
            });
        } else {
            const errorsArr = [];
            if (req.body.username === candidate['username']){
                errorsArr.push({
                    msg: "A user with this nickname already exists!",
                    param: "username"
                });
            }
            if (req.body.email === candidate['email']) {
                errorsArr.push({
                    msg: "A user with this email already exists!",
                    param: "email"
                });
            }
            return res.status(400).json({message: "Registration error.", errors: errorsArr});
        }
    } catch(e) {
        console.log(e);
        res.status(400).json({message: "Registration error", e});
    }
});

router.post('/login', async function(req, res) {
    const candidate = await findUser(req.body);
    if (candidate.error === "USER_NOT_FOUND") {
        res.status(400).json({
            message: "No such user was found.",
            errors: candidate.error
        });
    } else if (req.body.password === candidate.password){
        res.cookie('isAuth', true);
        res.cookie('userId', candidate.userId);
        delete candidate.password;
        res.status(200).json({
            message: "Successful authorization!",
            status: 'SUCCESS',
            candidate
        });
    } else {
        res.status(400).json({
            message: "Password is incorrect",
            status: 'PASSWORD_IS_INCORRECT',
            errors: "PASSWORD_IS_INCORRECT"
        });
    }
});

router.post('/logout', async function(req, res) {
    res.clearCookie('isAuth');
    res.clearCookie('userId');
    res.status(200).json({
        message: "Success logout"
    });
});

router.use(express.json());
router.use(express.urlencoded({extended: false}));

module.exports = router;