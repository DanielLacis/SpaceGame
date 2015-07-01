(function() {
  if (typeof SpaceGame === 'undefined') {
    SpaceGame = {};
  }

  var Projectile = SpaceGame.Projectile = function(options) {
    this.positions = options.positions;
    options.position = this.positions.pop();
    this.damage = options.damage;
    options.radius = 5;
    SpaceGame.MovingObject.call(this, options);
  };

  SpaceGame.Util.inherits(SpaceGame.MovingObject, Projectile);

  Projectile.prototype.updatePosition = function() {
    if (this.positions.length === 0) {
      this.remove = true;
    }
    this.position = this.positions.pop();
  };
})();
