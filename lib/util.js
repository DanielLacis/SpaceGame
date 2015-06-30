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
    var startPos = options.startPos;
    var amp = options.amp;
    var step = options.step;
    var lastPos = startPos;
    var posArr = [lastPos];
    var dims = SpaceGame.Game.dims;
    var phase = step;
    while (SpaceGame.Util.validPosition(lastPos, dims) && posArr.length < 10000) {
      var velX = Math.cos(Math.PI * phase) * amp;
      var velY = Math.abs(Math.sin(Math.PI * phase) * amp);
      phase += step;
      lastPos = SpaceGame.Util.addVecs(startPos, [velX, velY]);
      posArr.push(lastPos);
    }
    return posArr.reverse();
  };

  var straightUp = Util.straightUp = function (options) {
    var nextPos;
    var startPos = options.startPos;
    var lastPos = startPos;
    var posArr = [lastPos];
    var dims = SpaceGame.Game.dims;
    var velocity = options.velocity;
    if (velocity > 0) {
      velocity *= -1;
    }
    while (SpaceGame.Util.validPosition(lastPos, dims) && posArr.length < 10000) {
      nextPos = SpaceGame.Util.addVecs(lastPos, [0, velocity]);
      posArr.push(nextPos);
      lastPos = nextPos;
    }
    return posArr.reverse();
  };

  var straightRight = Util.straightRight = function (options) {
    var nextPos;
    var startPos = options.startPos;
    var lastPos = startPos;
    var posArr = [lastPos];
    var dims = SpaceGame.Game.dims;
    var velocity = options.velocity;
    if (velocity < 0) {
      velocity *= -1;
    }
    while (SpaceGame.Util.validPosition(lastPos, dims) && posArr.length < 10000) {
      nextPos = SpaceGame.Util.addVecs(lastPos, [velocity, 0]);
      posArr.push(nextPos);
      lastPos = nextPos;
    }
    return posArr.reverse();
  };

  var validPosition = Util.validPosition = function (pos, maxes) {
    return ((pos[1] >= 0 && pos[1] <= maxes[1]) && (pos[0] >= 0 && pos[0] <= maxes[0]));
  };

  var keepInBounds = Util.keepInBounds = function (pos, dims, offset) {
    for(var i = 0; i < 2; i++) {
      if (pos[i] < 0 + offset) {
        pos[i] = 0 + offset;
      } else if (pos[i] > dims[i] - offset) {
        pos[i] = dims[i] - offset;
      }
    }
    return pos;
  };
})();
