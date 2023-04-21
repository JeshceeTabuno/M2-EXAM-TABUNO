//Audio Variables
var lose;

class EndScene extends Phaser.Scene{
    constructor(){
        super('EndScene');
    }

    preload(){
        this.load.image("Restart", "Assets/Images/Buttons/RestartButton.png");
        this.load.image("back", "Assets/Images/Buttons/BackButton.png");
        this.load.image("BGE", "Assets/Images/Back Ground/Backgroun_1.png");

        this.load.audio('lose', 'Assets/Sounds/Delightful Results.mp3');
    }
    create(){
        this.add.image(0, 0, 'BGE').setOrigin(0).setScrollFactor(1);

        lose = this.sound.add('lose');
        lose.play();
        lose.setVolume(0.3);

        let gameOverText = this.add.text(350,200, 'GAME OVER!',{font: '100px Arial', fill: "Red"});
    gameOverText.setInteractive({userHandCursor: true});

        let restartButton = this.add.image(650,450, 'Restart').setScale(2);
        restartButton.setInteractive();
        restartButton.on('pointerdown',() => {this.scene.start('GameScene')});

        

        let backButton = this.add.image(150,600, 'back').setScale(1);
        backButton.setInteractive();
        backButton.on('pointerdown',() => {this.scene.start('MenuScene')});
    }
   
}