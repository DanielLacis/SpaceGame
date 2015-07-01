(function() {
  if (typeof SpaceGame === 'undefined') {
    SpaceGame = {};
  }

  var GameView = SpaceGame.GameView = function(options) {
    this.ctx = options.ctx;
  };

  GameView.prototype.clearView = function () {
    var dims = SpaceGame.Game.dims;
    this.ctx.clearRect(0, 0, dims[0], dims[1]);
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, dims[0], dims[1]);
  };

  GameView.prototype.drawCircle = function(options) {
    this.ctx.fillStyle = options.color;
    var position = options.position;
    var radius = options.radius;
    var circle = new Path2D();
    circle.arc(position[0], position[1], radius, 0, Math.PI * 2, true);
    this.ctx.fill(circle);
  };

  GameView.prototype.drawMovingObjects = function(drawOptionsArray) {
    var drawOptions;
    for(var i = 0; i < drawOptionsArray.length; i++) {
      drawOptions = drawOptionsArray[i];
      this.drawCircle(drawOptions);
    }
  };

  GameView.prototype.drawPlayerShip = function(drawOptions) {
    this.drawCircle(drawOptions);
  };

  GameView.prototype.drawBackground = function(drawOptionsArray) {
    this.drawMovingObjects(drawOptionsArray);
  };

})();
