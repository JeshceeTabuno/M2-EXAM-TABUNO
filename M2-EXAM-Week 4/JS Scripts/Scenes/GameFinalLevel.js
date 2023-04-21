var player;
var coins;

var portal;

var enemy;
var enemy2;
var enemy3;

var goomba;
var goomba2;

//mouse
var cursors;
//sounds
var BGM;
var ding;

//world
var platforms;
var spikes;


//Text
var collectStars = 0;


class GameFinalLevel extends Phaser.Scene{
    constructor(){
        super('GameFinalLevel');
    }

    preload(){
        this.load.image("bg_1", "Assets/Images/Back Ground/Backgroun_1.png");
        this.load.image("bg_2", "Assets/Images/Back Ground/Backgroun_2.png");

        this.load.image('ground',"Assets/Images/Others/Dirt Platform.png");


        this.load.spritesheet('dude', "Assets/Images/Others/Character sheet.png",{
            frameWidth: 32,
            frameHeight: 48,
    });

        this.load.image('coins', 'Assets/Images/Others/Coin.png');

        this.load.image('portal', 'Assets/Images/Others/Portal.png');
       
        this.load.image('Goomba', "Assets/Images/Others/Goomba.png");

        this.load.image('spikes',"Assets/Images/Others/Spikes.png");

        this.load.image('Spirit', "Assets/Images/Others/FireSpirit.png");

        this.load.audio('lastmusic', 'Assets/Sounds/Pizza Tower OST - Its Pizza Time!.mp3');
        this.load.audio('Ding', 'Assets/Sounds/Killsound.wav');
        

    }
    create(){
        //BackGrounds
        this.add.image(0, 0, 'bg_1').setOrigin(0).setScrollFactor(1);
        this.add.image(0, 0, 'bg_2').setOrigin(0).setScrollFactor(1);

        //Audio
        BGM = this.sound.add('lastmusic');
    BGM.loop=true;
    BGM.play();
    BGM.setVolume(0.3);

    ding = this.sound.add('Ding');


        //  The platforms 
        platforms = this.physics.add.staticGroup();

        //Lower Platforms
        platforms.create(-100, 700, "ground")
        platforms.create(650, 700, "ground")
      
        platforms.create(1400, 700, "ground")

        //mid plat forms

        platforms.create(650, 500, "ground")
        platforms.create(100, 500, "ground")
        platforms.create(1200, 500, "ground")

        //Upper level
        platforms.create(200, 200, "ground")
        platforms.create(650, 200, "ground")
        platforms.create(1200, 200, "ground")

    //spikes
    spikes= this.physics.add.staticGroup();

    //Lower Spikes
    spikes.create(180,700, 'spikes').setScale(1.3);
    spikes.create(280,700, 'spikes').setScale(1.3);
    spikes.create(380,700, 'spikes').setScale(1.3);
    spikes.create(900,700, 'spikes').setScale(1.3);
    spikes.create(1000,700, 'spikes').setScale(1.3);
    spikes.create(1100,700, 'spikes').setScale(1.3);
    //Upper spikes
    spikes.create(800,670, 'spikes').setScale(1.3);
    spikes.create(270,170, 'spikes').setScale(1.3);
    spikes.create(700,470, 'spikes').setScale(1.3);

    //Coins
    coins= this.physics.add.staticGroup();
    coins.create(200, 400,'coins').setScale(1.5);
    coins.create(600, 600,'coins').setScale(1.5);
    coins.create(600, 400,'coins').setScale(1.5);
    coins.create(1200, 400,'coins').setScale(1.5);
    coins.create(1200, 100,'coins').setScale(1.5);

    coins.create(800, 100,'coins').setScale(1.5);
    coins.create(400, 100,'coins').setScale(1.5);




    //Portal
    portal= this.physics.add.staticGroup();
    portal.create(100, 120,'portal').setScale(1.5);


    //Player
    player = this.physics.add.sprite(720, 600, "dude");
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

    //enemies
    goomba = this.physics.add.sprite(150, 400, "Goomba");
    goomba2 = this.physics.add.sprite(700, 100, "Goomba");

    enemy = this.physics.add.sprite(200, 100, "Spirit");
    enemy.setBounce(0.2);
    enemy.setCollideWorldBounds(true);
    enemy.body.gravity.y = 350;

    enemy2 = this.physics.add.sprite(400, 500, "Spirit");
    enemy2.setBounce(0.2);
    enemy2.setCollideWorldBounds(true);
    enemy2.body.gravity.y = 350;

    enemy3 = this.physics.add.sprite(1100, 200, "Spirit");
    enemy3.setBounce(0.2);
    enemy3.setCollideWorldBounds(true);
    enemy3.body.gravity.y = 350;

    this.tweens.add({
        targets:enemy,
        x: 200,
        y: 400,
        duration: 3000,
        ease: 'Linear',
        repeat: -1,
        yoyo: true
    });

    this.tweens.add({
      targets:enemy2,
      x:700,
      y:100,
      duration: 3000,
      ease: 'Linear',
      repeat: -1,
      yoyo: true
  });

  this.tweens.add({
    targets:enemy3,
    x:1100,
    y:500,
    duration: 3000,
    ease: 'Linear',
    repeat: -1,
    yoyo: true
});


      //  Input Events
  cursors = this.input.keyboard.createCursorKeys();

  //Camera
    
 camera= this.cameras.main;
 this.cameras.main.setBounds(0, 0, 1600, 750);
 
 // make the camera follow the player
 camera.startFollow(player);
 this.cameras.main.setZoom(1.5);

   //  Collide the player and the coins  with the platforms
   this.physics.add.collider(player, platforms);
   this.physics.add.collider(goomba, platforms);
   this.physics.add.collider(goomba2, platforms);

   //Player collision with other objects.
   this.physics.add.collider(player, coins, collectTax, null, this);

   this.physics.add.collider(player, spikes, HitSpike, null, this);
   this.physics.add.collider(player, goomba, HitSpike, null, this);
   this.physics.add.collider(player, goomba2, HitSpike, null, this);
   this.physics.add.collider(player, enemy, HitSpike, null, this);
   this.physics.add.collider(player, enemy2, HitSpike, null, this);
   this.physics.add.collider(player, enemy3, HitSpike, null, this);

   this.physics.add.collider(player, portal, victoryPortal, null, this);


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
              player.setVelocityY(-600);
            }
          

    }
}