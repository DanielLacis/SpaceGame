(function() {
  if (typeof SpaceGame === 'undefined') {
    SpaceGame = {};
  }

  var Projectile = SpaceGame.Projectile = function(options) {
    this.positions = options.positions;
    options.position = this.positions.pop();
    this.damage = 1;
    this.radius = 5;
    SpaceGame.MovingObject.call(this, options);
  };

  SpaceGame.Util.inherits(SpaceGame.MovingObject, Projectile);

  Projectile.prototype.updatePosition = function() {
    if (this.positions.length === 0) {
      return false;
    }
    this.position = this.positions.pop();
    return true;
  };

  Projectile.prototype.drawOptions = function() {
    var drawOptions = {};
    drawOptions.color = this.color;
    drawOptions.radius = this.radius;
    drawOptions.position = this.position;
    return drawOptions;
  };
})();
