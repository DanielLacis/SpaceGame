(function() {
  if (typeof SpaceGame === 'undefined') {
    SpaceGame = {};
  }

  var GameView = SpaceGame.GameView = function(options) {
    this.ctx = options.ctx;
  };

  SpaceGame.GameView.prototype.draw = function(options) {
    //game gives this whatever it needs to draw
  };

})();
