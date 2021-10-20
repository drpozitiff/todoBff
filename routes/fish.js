const express = require('express');
const axios = require('axios');
const router = express.Router();
const redisClient = require("../redis");

router.post('/setBases', function(req, res) {
    try {
        const bases = [
            {
                baseName: 'Нил',
                baseId: 'nile',
                locations: [
                    {
                        id: '1',
                        name: 'Золотой берег'
                    },
                    {
                        id: '2',
                        name: 'Под пальмами'
                    },
                    {
                        id: '3',
                        name: 'Плантации'
                    },
                    {
                        id: '4',
                        name: 'Городской канал'
                    },
                    {
                        id: '5',
                        name: 'Соленая заводь'
                    },
                    {
                        id: '6',
                        name: 'Черная яма'
                    },
                    {
                        id: '7',
                        name: 'Лазурный берег'
                    },
                    {
                        id: '8',
                        name: 'Долина фараона'
                    }
                ]
            },
            {
                baseName: 'Кенигзе',
                baseId: 'konigssee',
                locations: [
                    {
                        id: '1',
                        name: 'У островка'
                    },
                    {
                        id: '2',
                        name: 'Фарватер'
                    },
                    {
                        id: '3',
                        name: 'Пирс'
                    },
                    {
                        id: '4',
                        name: 'Церковь Св. Варфоломея'
                    }
                ]
            },
            {
                baseName: 'Женевское озеро',
                baseId: 'geneva',
                locations: [
                    {
                        id: '1',
                        name: 'Безмятежный берег'
                    },
                    {
                        id: '2',
                        name: 'Набережная Монтрё'
                    },
                    {
                        id: '3',
                        name: 'У столового прибора'
                    },
                    {
                        id: '4',
                        name: 'Тихая бухта'
                    }
                ]
            },
            {
                baseName: 'Балаганнах',
                baseId: 'balagan',
                locations: [
                    {
                        id: '1',
                        name: 'Северный залив'
                    },
                    {
                        id: '2',
                        name: 'Приток'
                    },
                    {
                        id: '3',
                        name: 'Сухой камыш'
                    },
                    {
                        id: '4',
                        name: 'Туча над сопкой'
                    },
                    {
                        id: '5',
                        name: 'Лазурное небо'
                    },
                    {
                        id: '6',
                        name: 'Три сопки'
                    }
                ]
            },
            {
                baseName: 'Колпаково',
                baseId: 'kolpakovo',
                locations: [
                    {
                        id: '1',
                        name: 'Глубокая протока'
                    },
                    {
                        id: '2',
                        name: 'У водоворота'
                    },
                    {
                        id: '3',
                        name: 'Бурный перекат'
                    },
                    {
                        id: '4',
                        name: 'Широкий плес'
                    },
                    {
                        id: '5',
                        name: 'Безмятежное русло'
                    },
                    {
                        id: '6',
                        name: 'Коварный берег'
                    },
                    {
                        id: '7',
                        name: 'Глыба'
                    },
                    {
                        id: '8',
                        name: 'Тихий ручей'
                    }
                ]
            },
            {
                baseName: 'Амазония',
                baseId: 'amazonia',
                locations: [
                    {
                        id: '1',
                        name: 'Плавающие домики'
                    },
                    {
                        id: '2',
                        name: 'Красный берег'
                    },
                    {
                        id: '3',
                        name: 'Подтопленная рощица'
                    },
                    {
                        id: '4',
                        name: 'Подводное укрытие'
                    },
                    {
                        id: '5',
                        name: 'Окуневая точка'
                    },
                    {
                        id: '6',
                        name: 'Белые пески'
                    },
                    {
                        id: '7',
                        name: 'Пожухлые деревья'
                    },
                    {
                        id: '8',
                        name: 'Подмытый берег'
                    },
                    {
                        id: '9',
                        name: 'Жуткая протока'
                    },
                    {
                        id: '10',
                        name: 'Крокодилье логово'
                    },
                    {
                        id: '11',
                        name: 'Коряжник'
                    },
                    {
                        id: '12',
                        name: 'Отмель'
                    },
                    {
                        id: '13',
                        name: 'Закуток'
                    },
                    {
                        id: '14',
                        name: 'Мангровые заросли'
                    },
                    {
                        id: '15',
                        name: 'Солнечная лагуна'
                    },
                    {
                        id: '16',
                        name: 'В тихих протоках'
                    },
                    {
                        id: '17',
                        name: 'Неспокойное место'
                    },
                    {
                        id: '18',
                        name: 'Опасный омут'
                    },
                    {
                        id: '19',
                        name: 'Янтарный ручей'
                    },
                    {
                        id: '20',
                        name: 'Радужный берег'
                    },
                    {
                        id: '21',
                        name: 'Частокол'
                    },
                    {
                        id: '22',
                        name: 'Деревня рыбаков'
                    },
                    {
                        id: '23',
                        name: 'Пляж'
                    },
                    {
                        id: '24',
                        name: 'Подтопленное дерево'
                    },
                    {
                        id: '25',
                        name: 'Рио-Негро'
                    },
                    {
                        id: '26',
                        name: 'Зеленый мыс'
                    },
                    {
                        id: '27',
                        name: 'Сочные заросли'
                    },
                    {
                        id: '28',
                        name: 'У старого ствола'
                    },
                    {
                        id: '29',
                        name: 'Заливные луга'
                    },
                    {
                        id: '30',
                        name: 'Мелководье'
                    },
                    {
                        id: '31',
                        name: 'Русло'
                    },
                    {
                        id: '32',
                        name: 'У истоков'
                    },
                    {
                        id: '33',
                        name: 'Одинокий кустик'
                    }
                ]
            }
        ]


        bases.sort((a, b) => {
            let fa = a['baseName'].toLowerCase(),
                fb = b['baseName'].toLowerCase();

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        });

        const temp = JSON.stringify(bases);
        redisClient.set("webApp.bases", temp);
        res.send("success");
    } catch (e) {
        console.log(e);
        res.status(400).json({message: "Set bases error", e});
    }
});

router.get('/getBases', function(req, res) {
    try {
        redisClient.get("webApp.bases", function(err, redisRes) {
            err && console.log('redisGet errors: ', err);
            const bases = JSON.parse(redisRes);
            if(bases) {
                res.send(bases);
            } else {
                res.status(400).json({message: "Cant find bases"});
            }

        });
    } catch (e) {
        console.log(e);
        res.status(400).json({message: "Get bases error", e});
    }
});

router.post('/setFishBases', function(req, res) {
    try {
        const fishBases = {
            base_amazonia: [
                {
                    fishId: '1001',
                    fishName: 'Белоглазка',
                    locations: '5,6',
                    bait: 'червь, хлеб, мотыль',
                    position: 'нахлыст',
                    weight: [100, 800],
                    time: "ночь"
                },
                {
                    fishId: '1002',
                    fishName: 'Осетр',
                    locations: '1,5',
                    bait: 'молюск, ракшея, куски рыбы',
                    position: 'дно',
                    weight: [1000, 80000],
                    time: "ночь, утро, вечер"
                },
                {
                    fishId: '1003',
                    fishName: 'Белый амур',
                    locations: '2,7',
                    bait: 'кукуруза',
                    position: 'дно',
                    weight: [300, 30000],
                    time: "ночь, утро, вечер"
                },
                {
                    fishId: '1004',
                    fishName: 'Берш',
                    locations: '2,8',
                    bait: 'circl 5106м, vib 6001м, муха',
                    position: 'нахлыст',
                    weight: [50, 1500],
                    time: "утро, вечер"
                },
            ],
            base_kolpakovo: [
                {
                    fishId: '3002',
                    fishName: 'Плотва',
                    locations: '1,6',
                    bait: 'червь, хлеб, мотыль',
                    position: 'нахлыст',
                    weight: [100, 800],
                    time: "ночь"
                },
                {
                    fishId: '3001',
                    fishName: 'Карп',
                    locations: '8',
                    bait: 'молюск, ракшея, куски рыбы',
                    position: 'дно',
                    weight: [1000, 40000],
                    time: "ночь, утро, вечер"
                },
                {
                    fishId: '3003',
                    fishName: 'Карась',
                    locations: '9',
                    bait: 'кукуруза',
                    position: 'дно',
                    weight: [300, 3000],
                    time: "ночь, утро, вечер"
                }
            ],
            base_nile: [
                {
                    fishId: '4002',
                    fishName: 'Кижуч',
                    locations: '4,6',
                    bait: 'червь, мотыль',
                    position: 'нахлыст',
                    weight: [100, 8000],
                    time: "ночь"
                },
                {
                    fishId: '4001',
                    fishName: 'Форель',
                    locations: '4',
                    bait: 'молюск, куски рыбы',
                    position: 'дно',
                    weight: [1000, 20000],
                    time: "ночь, утро, вечер"
                }
            ],
            base_konigssee: [
                {
                    fishId: '5002',
                    fishName: 'Голец усатый',
                    locations: '4,6',
                    bait: 'червь, мотыль',
                    position: 'нахлыст',
                    weight: [100, 8000],
                    time: "ночь"
                },
                {
                    fishId: '5001',
                    fishName: 'Асаги',
                    locations: '1',
                    bait: 'молюск, куски рыбы',
                    position: 'дно',
                    weight: [1000, 20000],
                    time: "ночь, утро, вечер"
                }
            ]
        };


        // bases.sort((a, b) => {
        //     let fa = a['baseName'].toLowerCase(),
        //         fb = b['baseName'].toLowerCase();
        //
        //     if (fa < fb) {
        //         return -1;
        //     }
        //     if (fa > fb) {
        //         return 1;
        //     }
        //     return 0;
        // });

        const temp = JSON.stringify(fishBases);
        redisClient.set("webApp.fishBases", temp);
        res.send("success");
    } catch (e) {
        console.log(e);
        res.status(400).json({message: "Set bases error", e});
    }
});

router.get('/getFishBase', function(req, res) {
    try {
        redisClient.get("webApp.fishBases", function(err, redisRes) {
            err && console.log('redisGet errors: ', err);
            const fishBases = JSON.parse(redisRes);
            if(fishBases) {
                const baseId = req.param('baseId');
                res.send(fishBases[`base_${baseId}`]);
            } else {
                res.status(400).json({message: "Cant find bases"});
            }

        });
    } catch (e) {
        console.log(e);
        res.status(400).json({message: "Get bases error", e});
    }
});

router.use(express.json());
router.use(express.urlencoded({extended: false}));

module.exports = router;