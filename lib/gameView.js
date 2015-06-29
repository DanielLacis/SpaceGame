(function() {
  if (typeof SpaceGame === 'undefined') {
    SpaceGame = {};
  }

  var GameView = SpaceGame.GameView = function(options) {
    this.ctx = options.ctx;
  };

  SpaceGame.GameView.prototype.draw = function(options) {
    //game gives this whatever it needs to draw
    this.ctx.clearRect(0, 0, SpaceGame.Game.dims[0], SpaceGame.Game.dims[1]);
    this.ctx.fillStyle = 'red';
    var position = options.position;
    var radius = options.radius;
    var circle = new Path2D();
    circle.arc(position[0], position[1], radius, 0, Math.PI * 2, true);
    this.ctx.fill(circle);
  };

})();
