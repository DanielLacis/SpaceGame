(function(){
  if (typeof SpaceGame === 'undefined') {
    SpaceGame = {};
  }
  var MovingObject = SpaceGame.MovingObject = function(options) {
    this.position = options.position;
    this.color = options.color;
    this.remove = false;
  };

  MovingObject.prototype.move = function (position) {
    this.position = position;
  };
})();
