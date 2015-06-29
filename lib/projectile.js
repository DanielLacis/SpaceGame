(function() {
  if (typeof SpaceGame === 'undefined') {
    SpaceGame = {};
  }

  var Projectile = SpaceGame.Projectile = function(options) {
    this.positions = options.positions;
    options.position = this.positions.pop();
    SpaceGame.MovingObject.call(this, options);
  };

  SpaceGame.Util.inherits(SpaceGame.MovingObject, Projectile);

  Projectile.prototype.nextPosition = function() {
    return this.positions.pop();
  };
})();
