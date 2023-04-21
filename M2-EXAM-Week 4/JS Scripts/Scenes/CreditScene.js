class CreditScene extends Phaser.Scene{
    constructor(){
        super('CreditScene');
    }

    preload(){
        this.load.image("BGC", "Assets/Images/Back Ground/Backgroun_1.png");
        this.load.image("BGC2", "Assets/Images/Back Ground/Backgroun_2.png");
    
    this.load.image("Back", "Assets/Images/Buttons/BackButton.png");

    this.load.image("Me", "Assets/Images/Others/Tabuno.png");
    }
    create(){
        this.add.image(0, 0, 'BGC').setOrigin(0).setScrollFactor(1);
        this.add.image(0, 0, 'BGC2').setOrigin(0).setScrollFactor(1);

        let restartButton = this.add.image(600,250, 'Me').setScale(1);
            restartButton.setInteractive();
    
        let creditText = this.add.text(300,500, 'JESHCEE JAY R. TABUNO',{font: '50px Arial', fill: "White"});
        creditText.setInteractive({userHandCursor: true});
       
      
        let sectionText = this.add.text(450,600, 'EMC - A223',{font: '50px Arial', fill: "White"});
        sectionText.setInteractive({userHandCursor: true});
    
    
    
        let backButton = this.add.image(100,650, 'Back').setScale(1);
        backButton.setInteractive();
        backButton.on('pointerdown',() => {this.scene.start('MenuScene')});
    }
   
}