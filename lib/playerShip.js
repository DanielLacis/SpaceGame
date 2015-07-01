(function() {
  if (typeof SpaceGame === 'undefined') {
    SpaceGame = {};
  }
  var PlayerShip = SpaceGame.PlayerShip = function(options) {
    this.velocity = [0, 0];
    this.velocityIncrement = 1;
    this.velocityMax = 5;
    this.radius = 20;
    this.shooting = false;
    options.color = 'blue';
    SpaceGame.MovingObject.call(this, options);
  };

  SpaceGame.Util.inherits(SpaceGame.MovingObject, PlayerShip);

  SpaceGame.PlayerShip.KEYMAP = {
    'left': [0, -1],
    'right': [0, 1],
    'up': [1, -1],
    'down': [1, 1]
  };

  PlayerShip.prototype.changeVelocity = function(key) {
    var mappedKey = SpaceGame.PlayerShip.KEYMAP[key];
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

  PlayerShip.prototype.updatePosition = function() {
    var dims = SpaceGame.Game.dims;
    var nextPos = SpaceGame.Util.addVecs(this.position, this.velocity);
    this.position = SpaceGame.Util.keepInBounds(nextPos, dims, this.radius);
  };

  PlayerShip.prototype.isShooting = function() {
    this.shooting = true;
  };

  PlayerShip.prototype.shoot = function() {
    var projectileArray = [];
    var yCoords = [-20, 0, 20];
    var yCoord;
    if (this.shooting) {
      this.shooting = false;
      for(var i = 0; i < yCoords.length; i++) {
        var utilOptions = {};
        yCoord = yCoords[i];
        utilOptions.startPos = SpaceGame.Util.addVecs(this.position, [20, yCoord]);
        utilOptions.velocity = 30;
        var projectileOptions = {};
        projectileOptions.positions = SpaceGame.Util.horizontal(utilOptions);
        projectileOptions.damage = 10;
        projectileOptions.direction = 'right';
        projectileOptions.color = 'green';
        var newProjectile = new SpaceGame.Projectile(projectileOptions);
        projectileArray.push(newProjectile);
      }
    }

    return projectileArray;
  };

  PlayerShip.prototype.drawOptions = function() {
    var drawOptions = {};
    drawOptions.color = this.color;
    drawOptions.radius = this.radius;
    drawOptions.position = this.position;
    return drawOptions;
  };
})();
