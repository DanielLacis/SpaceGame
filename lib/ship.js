(function() {
  if (typeof SpaceGame === 'undefined') {
    SpaceGame = {};
  }
  var Ship = SpaceGame.Ship = function(options) {
    this.velocity = [0, 0];
    this.velocityIncrement = 1;
    this.velocityMax = 5;
    this.radius = 10;
    this.shooting = false;
    this.color = 'blue';
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

  Ship.prototype.isShooting = function() {
    this.shooting = true;
  };

  Ship.prototype.shoot = function() {
    var projectileArray = [];
    if (this.shooting) {
      this.shooting = false;
      var utilOptions = {};
      utilOptions.startPos = SpaceGame.Util.addVecs(this.position, [0, -20]);
      utilOptions.velocity = 30;
      var projectileOptions = {};
      projectileOptions.positions = SpaceGame.Util.straightUp(utilOptions);
      projectileOptions.damage = 10;
      var newProjectile = new SpaceGame.Projectile(projectileOptions);
      projectileArray.push(newProjectile);
    }

    return projectileArray;
  };

  Ship.prototype.drawOptions = function() {
    var drawOptions = {};
    drawOptions.color = this.color;
    drawOptions.radius = this.radius;
    drawOptions.position = this.position;
    return drawOptions;
  };
})();
