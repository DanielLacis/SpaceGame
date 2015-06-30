(function() {
  if (typeof SpaceGame === 'undefined') {
    SpaceGame = {};
  }
  var Game = SpaceGame.Game = function(options) {
    this.gameView = options.gameView;
    SpaceGame.Game.dims = options.dims;
    var positions = SpaceGame.Util.sinusoidPositionsDown({ amp: 100, startPos: [400, 100], step: 0.005 });
    this.projectile = new SpaceGame.Projectile({ positions: positions });
    this.playerShip = new SpaceGame.PlayerShip({ position: [500, 500] });
    this.playerProjectiles = [];
    this.enemyProjectiles = [];
    this.currentKeys = {};
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

  Game.KEYARRAY = ['left', 'right', 'up', 'down', 'spacebar'];

  SpaceGame.Game.prototype.run = function() {
    this.executeKeys();
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

  SpaceGame.Game.prototype.handleKeys = function(type, keyboardEvent) {
    var key = Game.KEYS[keyboardEvent.keyCode];
    var flag;
    if (key) {
      keyboardEvent.preventDefault();
    } else {
      return;
    }
    if (type === 'keydown') {
      flag = true;
    } else if (type === 'keyup') {
      flag = false;
    }
    this.currentKeys[key] = flag;
  };

  SpaceGame.Game.prototype.executeKeys = function () {
    var key;
    for(var i = 0; i < SpaceGame.Game.KEYARRAY.length; i++) {
      key = SpaceGame.Game.KEYARRAY[i];
      if (this.currentKeys[key]) {
        switch(key) {
          case 'left':
          case 'right':
          case 'up':
          case 'down':
            this.playerShip.changeVelocity(key);
            break;
          case 'spacebar':
            this.playerShip.isShooting();
        }
      }
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
    console.log('Player Projectiles: ' + this.playerProjectiles.length);
  };
})();
