var player;
var stars;
var spirits;
var enemy;
var enemy2;
var enemy3;

var spikes;

var platforms;
var cursors;

//Sounds Var
var BGM;
var bling;


var score = 0;
var scoreText;
var collectText;
var collectStars = 0;

class GameNextLevel extends Phaser.Scene{
    constructor(){
        super('GameNextLevel');
    }

    preload(){
        this.load.image("bg_1", "Assets/Images/Back Ground/Backgroun_1.png");
        this.load.image("bg_2", "Assets/Images/Back Ground/Backgroun_2.png");

        this.load.image('ground',"Assets/Images/Others/Dirt Platform.png");


        this.load.spritesheet('dude', "Assets/Images/Others/Character sheet.png",{
            frameWidth: 32,
            frameHeight: 48,
    });

        this.load.image('spikes',"Assets/Images/Others/Spikes.png");

        this.load.image('Spirit', "Assets/Images/Others/FireSpirit.png");
        this.load.image('Star', 'Assets/Images/Others/star.png');

        this.load.audio('Music2', 'Assets/Sounds/Pizza Tower OST - Golf.mp3');
        this.load.audio('bling', 'Assets/Sounds/CollectStar.wav');
        
    }

    create(){
        this.add.image(0, 0, 'bg_1').setOrigin(0).setScrollFactor(1);
        this.add.image(0, 0, 'bg_2').setOrigin(0).setScrollFactor(1);

    BGM = this.sound.add('Music2');
    BGM.loop=true;
    BGM.play();
    BGM.setVolume(0.3);

    bling = this.sound.add('bling');


        //  The platforms 
        platforms = this.physics.add.staticGroup();

        //Lower Platforms
        platforms.create(200, 700, "ground").setScale(2).refreshBody();
        platforms.create(650, 700, "ground").setScale(2).refreshBody();
        platforms.create(1000, 700, "ground").setScale(2).refreshBody();

//Upper Platforms
platforms.create(5, 240, "ground");
platforms.create(1280, 240, "ground");

  //Mid Platforms
    platforms.create(680, 240, "ground");
    platforms.create(150, 500, "ground");
    platforms.create(1210, 500, "ground");

//spikes
        spikes= this.physics.add.staticGroup();
        spikes.create(500,650, 'spikes').setScale(1.3);
        spikes.create(800,650, 'spikes').setScale(1.3);

//Player
    player = this.physics.add.sprite(200, 600, "dude");
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.gravity.y = 350;
//Player aniamtion
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

//Enemies
enemy = this.physics.add.sprite(100, 200, "Spirit");
        enemy.setBounce(0.2);
        enemy.setCollideWorldBounds(true);
        enemy.body.gravity.y = 350;

        enemy2 = this.physics.add.sprite(700, 100, "Spirit");
        enemy2.setBounce(0.2);
        enemy2.setCollideWorldBounds(true);
        enemy2.body.gravity.y = 350;

        enemy3 = this.physics.add.sprite(1200, 200, "Spirit");
        enemy3.setBounce(0.2);
        enemy3.setCollideWorldBounds(true);
        enemy3.body.gravity.y = 350;

        this.tweens.add({
          targets:enemy,
          x: 100,
          y: 500,
          duration: 3000,
          ease: 'Linear',
          repeat: -1,
          yoyo: true
      });

      this.tweens.add({
        targets:enemy2,
        x:600,
        y:600,
        duration: 3000,
        ease: 'Linear',
        repeat: -1,
        yoyo: true
    });

    this.tweens.add({
        targets:enemy3,
        x: 1200,
        y: 500,
        duration: 3000,
        ease: 'Linear',
        repeat: -1,
        yoyo: true
    });

//  Input Events
  cursors = this.input.keyboard.createCursorKeys();

  stars= this.physics.add.group({
    key:'Star',
    repeat:18,
    setXY:{x:12,y:0, stepX: 70},
  })

  stars.children.iterate(function(child){
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });

spirits=this.physics.add.group();

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
  this.physics.add.collider(stars, platforms);
  this.physics.add.collider(spirits, platforms);

  this.physics.add.overlap(player, stars, collectStar, null, this);

  this.physics.add.collider(player, spirits, HitSpike, null, this);
  this.physics.add.collider(player, spikes, HitSpike, null, this);
  this.physics.add.collider(player, enemy, HitSpike, null, this);
  this.physics.add.collider(player, enemy2, HitSpike, null, this);
  this.physics.add.collider(player, enemy3, HitSpike, null, this);


    }

    update() {
 
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
          player.setVelocityY(-600);
        }
      }


}