(function(){
  if (typeof SpaceGame === 'undefined') {
    SpaceGame = {};
  }
  var MovingObject = SpaceGame.MovingObject = function(options) {
    this.position = options.position;
    this.color = options.color;
    this.radius = options.radius;
    this.remove = false;
  };

  MovingObject.prototype.move = function (position) {
    this.position = position;
  };

  MovingObject.prototype.drawOptions = function() {
    var drawOptions = {};
    drawOptions.color = this.color;
    drawOptions.radius = this.radius;
    drawOptions.position = this.position;
    return drawOptions;
  };

  MovingObject.prototype.collisionParams = function() {
    return { position: this.position, radius: this.radius };
  };
})();
