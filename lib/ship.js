(function() {
  if (typeof SpaceGame === 'undefined') {
    SpaceGame = {};
  }
  var Ship = SpaceGame.Ship = function(options) {
    this.velocity = [0, 0];
    this.velocityIncrement = 1;
    this.velocityMax = 5;
    this.radius = 10;
    SpaceGame.MovingObject.call(this, options);
  };

  SpaceGame.Util.inherits(SpaceGame.MovingObject, Ship);

  SpaceGame.Ship.KEYMAP = {
    'left': [0, -1],
    'right': [0, 1],
    'up': [1, -1],
    'down': [1, 1]
  };

  Ship.prototype.changeVelocity = function(key) {
    var mappedKey = SpaceGame.Ship.KEYMAP[key];
    var canAccelerate;
    if (mappedKey[1] === -1) {
      canAccelerate = (this.velocity[mappedKey[0]] > -1 * this.velocityMax);
    } else {
      canAccelerate = (this.velocity[mappedKey[0]] < this.velocityMax);
    }
    if (canAccelerate) {
      this.velocity[mappedKey[0]] += this.velocityIncrement * mappedKey[1];
    }

  };

  Ship.prototype.updatePosition = function() {
    var dims = SpaceGame.Game.dims;
    var nextPos = SpaceGame.Util.addVecs(this.position, this.velocity);
    this.position = SpaceGame.Util.keepInBounds(nextPos, dims, this.radius);
  };
})();
