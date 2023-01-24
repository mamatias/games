var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
// Keys
var cursorsKeys;
var actionsKeys;

// game objects
var platforms;
var player;
var stars;
var bombs;
var score = 0;
var scoreText;
var startTime = Date.now();
var currentTime = startTime + 0;
var refreshTime = startTime + 0;
var timeText;


function createScenario(obj){
    obj.add.image(400, 300, 'sky');
    scoreText = obj.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    timeText = obj.add.text(16, 56, 'time: 0', { fontSize: '28px', fill: '#000' });

    platforms = obj.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
}


function createMainCharacter(obj) {
    player = obj.physics.add.sprite(100, 450, 'dude');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    obj.anims.create({
        key: 'left',
        frames: obj.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    obj.anims.create({
        key: 'left-fast',
        frames: obj.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 20,
        repeat: -1
    });

    obj.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    });

    obj.anims.create({
        key: 'right',
        frames: obj.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    obj.anims.create({
        key: 'right-fast',
        frames: obj.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 20,
        repeat: -1
    });
}


function createFood(obj) {
    stars = obj.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });
}


function createBombs(obj) {
    // bombs = obj.physics.add.staticGroup();
    bombs = obj.physics.add.group();
    for (let i = 0; i < 10; i++) {
        let x = Phaser.Math.Between(0, config.width);
        let y = Phaser.Math.Between(90, config.height-90);
        let bomb = bombs.create(x, y, 'bomb');//.setScale(1.5).refreshBody();
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        // bombs.physics.add.sprite(x, y, 'bomb');
    }
}


function reRenderBomb(bomb){
    // Designed to destroy bombs that collide with platform
    bomb.disableBody(true, true);
    let x = Phaser.Math.Between(0, config.width);
    let y = Phaser.Math.Between(90, config.height-90);
    bombs.create(x, y, 'bomb');
}


function eatFood(food) {
    food.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);
}

function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude',
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

function create() {
    createScenario(this);
    createMainCharacter(this);
    createFood(this);
    createBombs(this);


    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.overlap(player, stars, function (player, star) { eatFood(star) }, null, this);
    this.physics.add.overlap(platforms, bombs, function (platform, bomb) { reRenderBomb(bomb) }, null, this);
    // this.physics.add.overlap(bombs, bombs, function (bomb1, bomb2) { reRenderBomb(bomb2) }, null, this);

    cursorsKeys = this.input.keyboard.createCursorKeys();
    actionsKeys = this.input.keyboard.addKeys({
        'leftf': Phaser.Input.Keyboard.KeyCodes.A,
        'rightf': Phaser.Input.Keyboard.KeyCodes.D,
        'fast': Phaser.Input.Keyboard.KeyCodes.W
    });
}

function update() {
    if (cursorsKeys.left.isDown && actionsKeys.fast.isDown) {
        player.setVelocityX(-200);

        player.anims.play('left-fast', true);
    }
    else if (cursorsKeys.left.isDown) {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursorsKeys.right.isDown && actionsKeys.fast.isDown) {
        player.setVelocityX(200);

        player.anims.play('right-fast', true);
    }
    else if (cursorsKeys.right.isDown) {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursorsKeys.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }

    currentTime = Date.now();
    if (currentTime - refreshTime > 500) {
        timeText.setText('time: ' + Math.round((currentTime - startTime) / 1000));
        refreshTime = currentTime + 0;
    }
}