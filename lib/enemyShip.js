(function() {
  if (typeof SpaceGame === 'undefined') {
    SpaceGame = {};
  }

  var EnemyShip = SpaceGame.EnemyShip = function(options) {
    this.health = options.health;
    var dims = SpaceGame.Game.dims;
    var startX = dims[0];
    var startY = Math.round(Math.random() * dims[1]);
    this.positions = SpaceGame.Util.horizontal({ direction: 'left',
                                                 velocity: options.velocity,
                                                 startPos: [startX, startY]});
    options.position = this.positions.pop();
    SpaceGame.MovingObject.call(this, options);
  };

  SpaceGame.Util.inherits(SpaceGame.MovingObject, EnemyShip);

  EnemyShip.prototype.updatePosition = function() {
    if (this.positions.length === 0) {
      this.remove = true;
    }
    this.position = this.positions.pop();
  };

  EnemyShip.prototype.hit = function(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      this.remove = true;
    }
  };
})();
