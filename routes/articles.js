const express = require('express');
const axios = require('axios');
const router = express.Router();
const redisClient = require("../redis");

router.get('/getArticles', async function(req, res) {
    await redisClient.get("webApp.articles", function(err, redisRes) {
        const result = JSON.parse(redisRes);
        err ? console.log('redisGet errors: ', err) : false;
        if (redisRes && Object.keys(result).length !== 0) {
            const articles = Object.values(result); //преобразование в массив
            res.send(articles);
        } else res.send([]);
    });
});

router.post('/deleteArticle', async function(req, res) {
    let articleId = req.body.id;
    await redisClient.get("webApp.articles", function(err, redisRes) {
        err ? console.log('redisGet errors: ', err) : false;
        const articles = JSON.parse(redisRes);
        delete articles[`article_${articleId}`];
        redisClient.set("webApp.articles", JSON.stringify(articles));
        res.send({id:articleId });
    });
});



router.post('/changeStatus', async function(req, res) {
    let articleId = req.body.id;
    await redisClient.get("webApp.articles", function(err, redisRes) {
        err ? console.log('redisGet errors: ', err) : false;
        const articles = JSON.parse(redisRes);
        articles[`article_${articleId}`].status = "Accomplished";
        redisClient.set("webApp.articles", JSON.stringify(articles));
        res.send({id: articleId});
    });
});

router.post('/editArticle', async function(req, res) {
    let article = req.body.formObject;
    let articleId = req.body.formObject.id;
    if (Object.keys(req.body.formObject).length >= 6){
        // articles = articles.filter(function (element) {
        //     return element.id !== article.id;
        // });
        // articles = [...articles, req.body.formObject];
        await redisClient.get("webApp.articles", function(err, redisRes) {
            err ? console.log('redisGet errors: ', err) : false;
            const articles = JSON.parse(redisRes);

            for (let prop in article){
                (article[prop]!== articles[`article_${articleId}`][prop]) && (articles[`article_${articleId}`][prop] = article[prop]);
            }

            redisClient.set("webApp.articles", JSON.stringify(articles));
            res.send({id:article.id});
        });
    } else {
        res.send("EDITING_ERROR")
    }
});

router.post('/createArticle', async function(req, res) {
    if (req.body.formObject.length !== 0){
        await redisClient.get("webApp.articles", function(err, articles) {
            err ? console.log('redisGet errors: ', err) : false;
            const dynoKey = `article_${req.body.formObject.id}`,
                newOneArticle = {
                    [dynoKey]: {...req.body.formObject}
                };
            // console.log("newOneArticle",newOneArticle);
            // console.log("articles",JSON.parse(articles));
            const newArticles = Object.assign(JSON.parse(articles)===null ? {} : JSON.parse(articles), newOneArticle);
            // console.log("newArticles",newArticles);
            // console.log("JSON_newArticles",JSON.stringify(newArticles));
            redisClient.set("webApp.articles", JSON.stringify(newArticles));
            res.send({
                message: "Article added successfully!",
                // article
            });
        });
    } else {
        res.send("CREATION_ERROR")
    }
});

router.post('/addToChangelog', async function(req, res) {
    if (req.body.newChangelogObject.length !== 0){
        console.log("req.body.changelogObject",req.body.newChangelogObject);
        await redisClient.get("webApp.changelog", function(err, changelog) {
            err && console.log('redisGet errors: ', err);
            const dynoKey = `changelog_${req.body.newChangelogObject.id}`,
                newOneChangelog = {
                    [dynoKey]: {...req.body.newChangelogObject}
                };
            const newChangelog = Object.assign(JSON.parse(changelog)===null ? {} : JSON.parse(changelog), newOneChangelog);
            redisClient.set("webApp.changelog", JSON.stringify(newChangelog));
            res.send({
                message: "ADD_TO_CHANGELOG__SUCCESS!"
            });
        });
    } else {
        res.send({
            message: "ADD_TO_CHANGELOG__ERROR!"
        });
    }
});

router.get('/getChangelog', async function(req, res) {
    await redisClient.get("webApp.changelog", function(err, redisRes) {
        const result = JSON.parse(redisRes);
        err && console.log('redisGet errors: ', err);
        if (redisRes && Object.keys(result).length !== 0) {
            const changelog = Object.values(result); //преобразование в массив
            res.send(changelog);
        } else res.send([]);
    });
});

router.use(express.json());
router.use(express.urlencoded({extended: false}));

module.exports = router;