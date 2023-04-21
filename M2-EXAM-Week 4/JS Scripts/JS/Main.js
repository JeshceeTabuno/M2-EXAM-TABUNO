var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 200},
        debug: false,
      },
    },
    scene:[MenuScene, GameScene,GameNextLevel, GameFinalLevel, CreditScene, EndScene,VictoryScene]
  };

  var game = new Phaser.Game(config);

function collectCoin(player, coins){
  coins.disableBody(true, true);
  ding.play();
  ding.setVolume(0.1);

  score += 10;
  scoreText.setText("Score: " + score);

  collectCoins += 1;
  collectCoinsText.setText("Collected Coins: "+ collectCoins);

  if (collectCoins >= 14){
    BGM.stop();
    this.scene.start('GameNextLevel');
  }

}

function collectStar(player,star){
  star.disableBody(true, true);
  bling.play();
  bling.setVolume(0.4)

  collectStars += 1;
  

  if (stars.countActive(true) === 0) {
    //  A new batch of coins to collect
    stars.children.iterate(function (child) {
      child.enableBody(true, child.x, 0, true, true);
    });
  }

  if(stars.countActive(true) === 5){
    var x =
    player.x < 400
      ? Phaser.Math.Between(400, 800)
      : Phaser.Math.Between(0, 400);

  var spirit = spirits.create(x, 16, "Spirit");
  spirit.setBounce(1);
  spirit.setCollideWorldBounds(true);
  spirit.setVelocity(Phaser.Math.Between(-200, 200), 20);
  spirit.allowGravity = false;
  }

  if(collectStars >=30){
    BGM.stop();
    this.scene.start('GameFinalLevel');
  }
}

function collectTax(player, coins){
  coins.disableBody(true, true);
  ding.play();
  ding.setVolume(0.1);
  collectCoins += 1;
}


function victoryPortal(player,portal){
  portal.disableBody(true, true);
  this.physics.pause();
  BGM.stop();
  this.scene.start('VictoryScene');
}
 function HitSpike(player, spikes){
    this.physics.pause();
    BGM.stop();
   

    player.setTint(0xff0000);

    player.anims.play('turn');

    this.scene.start('EndScene');
    
  }

