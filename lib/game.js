(function() {
  if (typeof SpaceGame === 'undefined') {
    SpaceGame = {};
  }
  var Game = SpaceGame.Game = function(options) {
    this.gameView = options.gameView;
    SpaceGame.Game.dims = options.dims;
    this.playerShip = new SpaceGame.PlayerShip({ position: [500, 500] });
    this.playerProjectiles = [];
    this.enemyProjectiles = [];
    this.enemyShips = [];
    this.backgroundObjects = [];
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

  Game.prototype.run = function() {
    this.executeKeys();
    this.createBackgroundObjects();
    // spawn new enemies
    // spawn new enemy bullets
    this.addPlayerProjectiles(this.playerShip.shoot());
    // process collisions
    // update everything
    this.updateProjectiles();
    this.playerShip.updatePosition();
    this.updateBackgroundObjects();
    this.removeProjectiles();
    this.gameView.clearView();
    this.gameView.drawBackground(this.backgroundDrawOptions());
    this.gameView.drawPlayerBullets(this.playerProjectileOptions());
    // draw enemy bullets
    // draw enemy ships
    this.gameView.drawPlayerShip(this.playerShip.drawOptions());
  };

  Game.prototype.handleKeys = function(type, keyboardEvent) {
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

  Game.prototype.executeKeys = function () {
    var key;
    var value;
    var keys = Object.keys(this.currentKeys);
    for(var i = 0; i < keys.length; i++) {
      key = keys[i];
      value = this.currentKeys[key];
      if (value) {
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

  Game.prototype.playerProjectileOptions = function() {
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

  Game.prototype.backgroundDrawOptions = function() {
    var optionsArray = [];
    var currOptions = {};
    var currBackgroundObject;
    for(var i = 0; i < this.backgroundObjects.length; i++) {
      currBackgroundObject = this.backgroundObjects[i];
      currOptions = currBackgroundObject.drawOptions();
      optionsArray.push(currOptions);
    }

    return optionsArray;
  };

  Game.prototype.addPlayerProjectiles = function(projectiles) {
    while(projectiles && projectiles.length > 0) {
      this.playerProjectiles.push(projectiles.pop());
    }
  };

  Game.prototype.updateProjectiles = function() {
    var result;
    for(var i = 0; i < this.playerProjectiles.length; i++) {
      result = this.playerProjectiles[i].updatePosition();
      if (!result) {
        this.playerProjectiles[i].remove = true;
      }
    }
  };

  Game.prototype.removeProjectiles = function() {
    var result;
    var newProjectileArray = [];
    for(var i = 0; i < this.playerProjectiles.length; i++) {
      if (!this.playerProjectiles[i].remove) {
        newProjectileArray.push(this.playerProjectiles[i]);
      }
    }
    this.playerProjectiles = newProjectileArray;
  };

  Game.prototype.updateBackgroundObjects = function() {
    var result;
    var newBackgroundObjectArray = [];
    for(var i = 0; i < this.backgroundObjects.length; i++) {
      result = this.backgroundObjects[i].updatePosition();
      if (result) {
        newBackgroundObjectArray.push(this.backgroundObjects[i]);
      }
    }
    this.backgroundObjects = newBackgroundObjectArray;
  };


  Game.prototype.createBackgroundObjects = function() {
    if (Math.round(Math.random() * 100) > 90) {
      var bgOptions = {};
      bgOptions.color = 'yellow';
      bgOptions.radius = 15;
      bgOptions.velocity = 10;
      this.backgroundObjects.push(new SpaceGame.BackgroundObject(bgOptions));
    }
  };
})();
