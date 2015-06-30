(function() {
  if (typeof SpaceGame === 'undefined') {
    SpaceGame = {};
  }
  var Game = SpaceGame.Game = function(options) {
    this.gameView = options.gameView;
    SpaceGame.Game.dims = options.dims;
    var positions = SpaceGame.Util.sinusoidPositionsDown({ amp: 100, startPos: [400, 100], step: 0.005 });
    this.projectile = new SpaceGame.Projectile({ positions: positions });
    this.playerShip = new SpaceGame.Ship({ position: [500, 500] });
    this.playerProjectiles = [];
    this.enemyProjectiles = [];
  };

  Game.KEYS = {
    37: 'left',
    39: 'right',
    40: 'down',
    38: 'up',
    32: 'spacebar',
    27: 'escape',
    13: 'enter'
  };

  SpaceGame.Game.prototype.run = function() {
    // spawn new enemies
    // spawn new enemy bullets
    this.addPlayerProjectiles(this.playerShip.shoot());
    // process collisions
    // update everything
    this.updateProjectiles();
    this.gameView.clearView();
    this.gameView.drawPlayerBullets(this.playerProjectileOptions());
    // draw enemy bullets
    // draw enemy ships
    this.gameView.drawPlayerShip(this.playerShip.drawOptions());
    this.playerShip.updatePosition();
  };

  SpaceGame.Game.prototype.handleKeys = function(keyboardEvent) {
    var key = Game.KEYS[keyboardEvent.keyCode];
    if (key) {
      keyboardEvent.preventDefault();
    }
    switch(key) {
      case 'left':
      case 'right':
      case 'up':
      case 'down':
        this.playerShip.changeVelocity(key);
        break;
    }
    if (key === 'spacebar') {
      this.playerShip.isShooting();
    }
  };

  SpaceGame.Game.prototype.playerProjectileOptions = function() {
    var optionsArray = [];
    var currOptions = {};
    var currProjectile;
    for(var i = 0; i < this.playerProjectiles.length; i++) {
      currProjectile = this.playerProjectiles[i];
      currOptions = currProjectile.drawOptions();
      optionsArray.push(currOptions);
    }

    return optionsArray;
  };

  SpaceGame.Game.prototype.addPlayerProjectiles = function(projectiles) {
    while(projectiles && projectiles.length > 0) {
      this.playerProjectiles.push(projectiles.pop());
    }
  };

  SpaceGame.Game.prototype.updateProjectiles = function() {
    var result;
    var newProjectileArray = [];
    for(var i = 0; i < this.playerProjectiles.length; i++) {
      result = this.playerProjectiles[i].updatePosition();
      if (result) {
        newProjectileArray.push(this.playerProjectiles[i]);
      }
    }
    this.playerProjectiles = newProjectileArray;
  };
})();
