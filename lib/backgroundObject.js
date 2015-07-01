(function() {
  if (typeof SpaceGame === 'undefined') {
    SpaceGame = {};
  }

  var BackgroundObject = SpaceGame.BackgroundObject = function(options) {
    this.velocity = options.velocity;
    this.radius = options.radius;
    var dims = SpaceGame.Game.dims;
    var startX = dims[0];
    var startY = Math.round(Math.random() * dims[1]);
    this.positions = SpaceGame.Util.horizontal({ direction: 'left',
                                                 velocity: this.velocity,
                                                 startPos: [startX, startY]});
    SpaceGame.MovingObject.call(this, options);
  };

  SpaceGame.Util.inherits(SpaceGame.MovingObject, BackgroundObject);

  BackgroundObject.prototype.updatePosition = function() {
    if (this.positions.length === 0) {
      return false;
    }
    this.position = this.positions.pop();
    return true;
  };

  BackgroundObject.prototype.drawOptions = function() {
    var drawOptions = {};
    drawOptions.color = this.color;
    drawOptions.radius = this.radius;
    drawOptions.position = this.position;
    return drawOptions;
  };
})();
