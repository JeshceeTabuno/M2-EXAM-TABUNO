
var player;
var coins;
var enemy;
var enemy2;

var flag;

//World
var spikes;
var platforms;


//Controls
var cursors;

//Sounds Var
var BGM;
var ding;


//UI
var camera;


var score=0;
var scoreText;
var collectCoinsText;
var collectCoins =0;


class GameScene extends Phaser.Scene{
    constructor(){
        super('GameScene');
    }

    preload(){
        this.load.image("bg_1", "Assets/Images/Back Ground/Backgroun_1.png");
        this.load.image("bg_2", "Assets/Images/Back Ground/Backgroun_2.png");

        this.load.spritesheet('dude', "Assets/Images/Others/Character sheet.png",{
            frameWidth: 32,
            frameHeight: 48,
    });
        this.load.image('Goomba', "Assets/Images/Others/Goomba.png");
        this.load.image('coins', 'Assets/Images/Others/Coin.png');

        this.load.image('ground',"Assets/Images/Others/Dirt Platform.png");
        this.load.image('spikes',"Assets/Images/Others/Spikes.png");

        this.load.audio('bgmusic', 'Assets/Sounds/Pizza Tower OST - PIZZA TIME NEVER ENDS (Boss 4).mp3');
        this.load.audio('ding', 'Assets/Sounds/Killsound.wav');
        
    }

    create(){
        //background
        this.add.image(0, 0, 'bg_1').setOrigin(0).setScrollFactor(1);
        this.add.image(0, 0, 'bg_2').setOrigin(0).setScrollFactor(1);

        //Sounds
  BGM = this.sound.add('bgmusic');
  BGM.loop=true;
  BGM.play();
  BGM.setVolume(0.3);

  ding = this.sound.add('ding');



      

        //Platforms
        platforms = this.physics.add.staticGroup();
        //Lower
        platforms.create(150, 700, "ground").setScale(1);
        platforms.create(640, 700, "ground").setScale(1);
        platforms.create(1150, 700, "ground").setScale(1);

        //Mid
        platforms.create(650,500,'ground').setScale(1,1);

        //Upper
        platforms.create(175,300,'ground').setScale(1);
        platforms.create(1120,300,'ground').setScale(1);
        platforms.create(650,150,'ground').setScale(1,1);

        //Player Properties
          player = this.physics.add.sprite(200, 600, "dude");
          player.setBounce(0.2);
          player.setCollideWorldBounds(true);
          player.body.gravity.y = 350;

        //Spikes
        spikes= this.physics.add.staticGroup();
        spikes.create(390,700, 'spikes').setScale(1.3);
        spikes.create(900,700, 'spikes').setScale(1.3);
        spikes.create(650,468, 'spikes').setScale(1.4);

        //Coins
        coins= this.physics.add.staticGroup();
        //Lower Coins
        coins.create(100, 500,'coins').setScale(1.5);
        coins.create(200, 500,'coins').setScale(1.5);
        coins.create(400, 550,'coins').setScale(1.5);
        coins.create(900, 550,'coins').setScale(1.5);
        coins.create(1100, 500,'coins').setScale(1.5);
        coins.create(1200, 500,'coins').setScale(1.5);

        //Upper Coins
        coins.create(100, 200,'coins').setScale(1.5);
        coins.create(200, 200,'coins').setScale(1.5);
        coins.create(1100, 200,'coins').setScale(1.5);
        coins.create(1200, 200,'coins').setScale(1.5);

        //Mid Coins
        coins.create(500, 360,'coins').setScale(1.5);
        coins.create(740, 360,'coins').setScale(1.5);
        coins.create(500, 100,'coins').setScale(1.5);
        coins.create(800, 100,'coins').setScale(1.5);

        //Goomba Enemies
        enemy = this.physics.add.sprite(100, 200, "Goomba");
        enemy.setBounce(0.2);
        enemy.setCollideWorldBounds(true);
        enemy.body.gravity.y = 0;

        enemy2 = this.physics.add.sprite(1200, 200, "Goomba");
        enemy2.setBounce(0.2);
        enemy2.setCollideWorldBounds(true);
        enemy2.body.gravity.y = 0;

        this.tweens.add({
          targets:enemy,
          x: 100,
          y: 0,
          duration: 3000,
          ease: 'Linear',
          repeat: -1,
          yoyo: true
      });

      this.tweens.add({
        targets:enemy2,
        x: 1200,
        y: 0,
        duration: 3000,
        ease: 'Linear',
        repeat: -1,
        yoyo: true
    });





         //  The player animations, turning, walking left and walking right.
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "dude", frame: 4 }],
    frameRate: 20,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

   //  Input Events
   cursors = this.input.keyboard.createCursorKeys();

    //Adding texts
 scoreText = this.add.text(16, 16, "Score: 0", {
  fontSize: "32px",
  fill: "#FFFFFF",
});

collectCoinsText = this.add.text(850, 16, "Collected Coins: 0", {
  fontSize: "32px",
  fill: "#FFFFFF",
});


      //Camera
    
      camera= this.cameras.main;
      this.cameras.main.setBounds(0, 0, 1600, 750);
      scoreText.setScrollFactor(0);
      collectCoinsText.setScrollFactor(0);
      // make the camera follow the player
      camera.startFollow(player);
      this.cameras.main.setZoom(1.5);
      

 

   //  Collide the player and the coins  with the platforms
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(enemy, platforms);
  this.physics.add.collider(enemy2, platforms);
  
  //Win and Loose Conditions
  this.physics.add.collider(player, spikes, HitSpike, null, this);
  this.physics.add.collider(player, coins, collectCoin, null, this);
  this.physics.add.collider(player, enemy2, HitSpike, null, this);
  this.physics.add.collider(player, enemy, HitSpike, null, this);
  



    }
    update(){
        if (cursors.left.isDown) {
            player.setVelocityX(-160);
        
            player.anims.play("left", true);
          } else if (cursors.right.isDown) {
            player.setVelocityX(160);
        
            player.anims.play("right", true);
          } else {
            player.setVelocityX(0);
        
            player.anims.play("turn");
          }
        
          if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-500);
          }
        }

    //enemy movement
    

}