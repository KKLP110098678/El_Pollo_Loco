const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ],
    [
        new Cloud(),
        new Cloud(),
        new Cloud()
    ],
    [
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0, 0, 720, 480),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0, 0, 720, 480),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0, 0, 720, 480),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720, 0, 720, 480),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720, 0, 720, 480),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720, 0, 720, 480),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 1440, 0, 720, 480),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 1440, 0, 720, 480),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 1440, 0, 720, 480),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 2160, 0, 720, 480),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 2160, 0, 720, 480),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 2160, 0, 720, 480)
    ],
    [
        new Ground('ground1', 304, 200, 200, 20),
        new Ground('ground2', 335, 720, 200, 20),
        new Ground('ground3', 335, 1440, 200, 20),
        new Ground('ground4', 335, 2160, 200, 20)
    ],
    [
        new Coin(100, 200),
        new Coin(200, 200),
        new Coin(300, 200)
    ],
    2310
);