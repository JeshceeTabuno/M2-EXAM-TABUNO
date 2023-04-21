var win;
class VictoryScene extends Phaser.Scene{
    constructor(){
        super('VictoryScene');
    }
    preload(){
        this.load.image("again", "Assets/Images/Buttons/RestartButton.png");
        this.load.image("return", "Assets/Images/Buttons/BackButton.png");
        
        this.load.image("BGV", "Assets/Images/Back Ground/Backgroun_1.png");

        this.load.audio('win', 'Assets/Sounds/Amazing Results.mp3');

    }

    create(){
        this.add.image(0, 0, 'BGV').setOrigin(0).setScrollFactor(1);

        win = this.sound.add('win');
        win.play();
        win.setVolume(0.3);

        let VictoryText = this.add.text(430,200, 'VICTORY!',{font: '100px Arial', fill: "Red"});
        VictoryText.setInteractive({userHandCursor: true});

        let restartButton = this.add.image(650,450, 'again').setScale(2);
        restartButton.setInteractive();
        restartButton.on('pointerdown',() => {this.scene.start('GameScene')});

        

        let backButton = this.add.image(150,600, 'return').setScale(1);
        backButton.setInteractive();
        backButton.on('pointerdown',() => {this.scene.start('MenuScene')});
    }
}