(function() {
  if (typeof SpaceGame === 'undefined') {
    SpaceGame = {};
  }

  var GameView = SpaceGame.GameView = function(options) {
    this.ctx = options.ctx;
  };

  SpaceGame.GameView.prototype.draw = function(options) {
    //game gives this whatever it needs to draw
    var dims = SpaceGame.Game.dims;
    this.ctx.clearRect(0, 0, dims[0], dims[1]);
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, dims[0], dims[1]);
    this.ctx.fillStyle = 'red';
    var position = options.position;
    var radius = options.radius;
    var circle = new Path2D();
    circle.arc(position[0], position[1], radius, 0, Math.PI * 2, true);
    this.ctx.fill(circle);
  };

})();
