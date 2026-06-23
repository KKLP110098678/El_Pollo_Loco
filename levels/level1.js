const level1 = new Level(
    [
        new Chicken(400, 370),
        new Chicken(700, 370),
        new Chicken(1100, 370)
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
        new Ground('ground3', 335, 1440, 200, 20)
    ],
    [
        new Collectable('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 160, 370),
        new Collectable('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 260, 260),
        new Collectable('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 360, 370),
        new Collectable('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 460, 260),
        new Collectable('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 560, 370),
        new Collectable('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 660, 260),
        new Collectable('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 760, 370),
        new Collectable('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 860, 260),
        new Collectable('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 960, 370),
        new Collectable('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 1060, 260)
    ],
    [
        new Coin('img/8_coin/coin_2.png', 250, 270),
        new Coin('img/8_coin/coin_2.png', 200, 200),
        new Coin('img/8_coin/coin_2.png', 300, 200),
        new Coin('img/8_coin/coin_2.png', 400, 200),
        new Coin('img/8_coin/coin_2.png', 500, 200),
        new Coin('img/8_coin/coin_2.png', 600, 200)
    ],
    [

        new BossChicken(1650, 200, true),
    ],
    2310
);