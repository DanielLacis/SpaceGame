(function() {
  if (typeof SpaceGame === 'undefined') {
    SpaceGame = {};
  }

  var Projectile = SpaceGame.Projectile = function(options) {
    this.positions = options.positions;
    options.position = this.positions.pop();
    this.damage = options.damage;
    SpaceGame.MovingObject.call(this, options);
  };

  SpaceGame.Util.inherits(SpaceGame.MovingObject, Projectile);

  Projectile.prototype.nextPosition = function() {
    if (this.positions.length === 0) {
      return false;
    }
    return this.positions.pop();
  };
})();
