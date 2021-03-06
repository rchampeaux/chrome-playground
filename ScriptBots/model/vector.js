function Vector(x, y) {
  this.x = x;
  this.y = y;
}

Vector.createFromAngleDistance = function(a, d) {
  var radians = a * (Math.PI/180.0);
  var x = Math.cos(radians)*d;
  var y = Math.sin(radians)*d;

  return new Vector(x,y);
}

Vector.prototype.distanceToPoint = function(p) {
  return Math.sqrt(Math.pow(p.x-this.x,2) + Math.pow(p.y-this.y,2));
}

Vector.prototype.isBetween = function(p1, p2) {
  var crossproduct = (this.y - p1.y)*(p2.x-p1.x) - (this.x - a.x)*(p2.y-p1.y);
  if (abs(crossProduct) > Number.EPSILON) {
    return false;
  }
  
  var dotproduct = (this.x - p1.x)*(p2.x-p1.x) + (this.y-p1.y)*(p2.y-p1.y);
  if (dotproduct < 0) {
    return false;
  }
  
  return dotproduct <= Math.pow(p2.x-p1.x) + Math.pow(p2.y-p1.y);
}

Vector.add = function(v1, v2) {
  return new Vector(v1.x + v2.x, v1.y + v2.y);
}

Vector.prototype.add = function(v) {
  return new Vector(this.x + v.x, this.y + v.y);
}

Vector.prototype.length = function() {
  return Math.sqrt(this.x*this.x + this.y*this.y);
}

Vector.prototype.subtract = function(v) {
  return new Vector(this.x - v.x, this.y - v.y);
}

Vector.prototype.normalize = function() {
  var d = Math.sqrt(this.x*this.x + this.y*this.y);
  return new Vector(this.x / d, this.y / d);
}

Vector.prototype.multiply = function(d) {
  return new Vector(this.x * d, this.y * d);
}

Vector.prototype.quadrant = function() {
  if ((this.x >= 0) && (this.y >= 0)) {
    return 0;
  } else if ((this.x >= 0) && (this.y <= 0)) {
    return 3;
  } else if ((this.x <= 0) && (this.y >= 0)) {
    return 1;
  } else {
    return 2;
  }
}

Vector.prototype.rightNormal = function() {
  var nx = this.y;
  var ny = this.x;
  
  switch(this.quadrant()) {
    case 0:
    case 2:
      ny = ny * -1;
      break;
    case 1:
    case 3:
      nx = nx * -1;
      break;
  }
  
  var d = Math.sqrt(nx*nx + ny*ny);
  return new Vector(nx / d, ny / d);
}

Vector.prototype.slope = function(v) {
  if (this.y == 0) {
    return 0;
  } if (this.x == 0) {
    return Infinity;
  }

  return this.y/this.x;
}

Vector.prototype.inverseSlope = function(v) {
  if (this.x == 0) {
    return 0;
  } if (this.y == 0) {
    return Infinity;
  } 

  return this.x/this.y;
}

Vector.lineSlope = function(l1, l2) {
  var dx = l2.x - l1.x;
  var dy = l2.y - l1.y;
  
  if (dy == 0) {
    return 0;
  } if (dx == 0) {
    return Infinity;
  }

  return dy/dx;
}

Vector.inverseLineSlope = function(l1, l2) {
  var dx = l2.x - l1.x;
  var dy = l2.y - l1.y;
  
  if (dx == 0) {
    return 0;
  } if (dy == 0) {
    return Infinity;
  } 

  return dx/dy;
}

Vector.pointLinePerpendicularIntercept = function(p, l1, l2) {
  var intcp = undefined;
  
  var dlx = l2.x - l1.x;
  var dly = l2.y - l1.y;
  
  if ((dlx != 0) && (dly != 0)) {
    var s = (l2.y-l1.y) / (l2.x - l1.x);
    
    var xI = (p.y + (p.x/s) - l1.y + s*l1.x) / (s + (1/s));
    var yI = -(1/s)*xI + (p.y + (p.x/s));
    intcp = new Vector(xI, yI);
  } else if (dlx ==0) {
    intcp = new Vector(l1.x, p.y);
  } else {
    intcp = new Vector(p.x, l1.y);
  }
  
  return intcp;
}

Vector.pointVectorLineIntercept = function(p, v, l1, l2) {
  
}



