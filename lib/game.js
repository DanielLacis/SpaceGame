(function() {
  if (typeof SpaceGame === 'undefined') {
    SpaceGame = {};
  }
  var Game = SpaceGame.Game = function(options) {
    this.gameView = options.gameView;
    SpaceGame.Game.dims = options.dims;
    var positions = SpaceGame.Util.sinusoidPositionsDown({ amp: 100, startPos: [400, 100], step: 0.005 });
    this.projectile = new SpaceGame.Projectile({ positions: positions });
  };

  SpaceGame.Game.prototype.run = function() {
    var nextPos = this.projectile.nextPosition();
    if (nextPos) {
      this.gameView.draw({ position: nextPos, radius: 20 });
      nextPos = this.projectile.nextPosition();
    }
  };
})();
