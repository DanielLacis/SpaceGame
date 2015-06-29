(function() {
  if (typeof SpaceGame === 'undefined') {
    SpaceGame = {};
  }
  var Game = SpaceGame.Game = function(options) {
    this.gameView = options.gameView;
    SpaceGame.Game.dims = options.dims;
    var positions = SpaceGame.Util.sinusoidPositionsDown({ amp: 100, startPos: [400, 100], step: 0.005 });
    this.projectile = new SpaceGame.Projectile({ positions: positions });
    this.playerShip = new SpaceGame.Ship({ position: [500, 500] })
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
    // var nextPos = this.projectile.nextPosition();
    // if (nextPos) {
    //   this.gameView.draw({ position: nextPos, radius: 20 });
    //   nextPos = this.projectile.nextPosition();
    // }
    this.playerShip.updatePosition();
    this.gameView.draw({ position: this.playerShip.position, radius: this.playerShip.radius });
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
  };
})();
