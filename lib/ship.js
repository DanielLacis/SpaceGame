(function() {
  if (typeof SpaceGame === 'undefined') {
    SpaceGame = {};
  }
  var Ship = SpaceGame.Ship = function(options) {
    this.velocity = [0, 0];
    SpaceGame.MovingObject.call(this, options);
  };

  SpaceGame.Util.inherits(SpaceGame.MovingObject, Ship);

  Ship.prototype.nextPosition = function() {
    return SpaceGame.Util.addVecs(this.position, this.velocity);
  };
})();
