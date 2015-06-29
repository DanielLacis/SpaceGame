(function() {
  if (typeof SpaceGame === 'undefined') {
    SpaceGame = {};
  }
  var Util = SpaceGame.Util = {};



  var inherits = Util.inherits = function (BaseClass, ChildClass) {
    function Surrogate () { this.constructor = ChildClass; }
    Surrogate.prototype = BaseClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  var addVecs = Util.addVecs = function(position, velocity) {
    var x = position[0] + velocity[0];
    var y = position[1] + velocity[1];
    return [x, y];
  };

  var sinusoidPositionsDown = Util.sinusoidPositionsDown = function (options) {
    var lastPos = options.startPos;
    var scalar = options.scalar;
    var step = options.step;
    var posArr = [lastPos];
    var dims = SpaceGame.Game.dims;
    var phase = step;
    while (SpaceGame.Util.validPosition(lastPos, dims)) {
      var velX = Math.cos(Math.PI * phase) * scalar;
      var velY = Math.abs(Math.sin(Math.PI * phase) * scalar);
      phase += step;
      lastPos = SpaceGame.Util.addVecs(lastPos, [velX, velY]);
      posArr.push(lastPos);
    }
    return posArr.reverse();
  };

  var validPosition = Util.validPosition = function (pos, maxes) {
    return ((pos[0] >= 0 && pos[0] <= maxes[0]) &&
            (pos[1] >= 0 && pos[1] <= maxes[1]));
  };
})();
