function Util() {}

Util.robotCollision = function(r1, moveVector, r2) {
  var result = {};
  
  var distance = moveVector.length();
  var normalizedMoveVector = moveVector.normalize();
  
  var slope = moveVector.slope(moveVector);
  
  var pMoveEnd = r1.loc.add(moveVector);
  
  var intcp = Vector.pointLinePerpendicularIntercept(r2.loc, r1.loc, pMoveEnd);

  var doubleRadius = r1.radius + r2.radius;
  var distToIntcp = r1.loc.distanceToPoint(intcp);
  var dToLine = r2.loc.distanceToPoint(intcp);
  if (dToLine < doubleRadius) {
    var dI = Math.sqrt(Math.pow(doubleRadius,2) - Math.pow(dToLine,2));
    
    var maxDistance = distToIntcp - dI;
    
    if (maxDistance < distance) {
      result.d1 = maxDistance;
      
      var vMax = normalizedMoveVector.multiply(maxDistance);
      var pMax = r1.loc.add(vMax);
      result.p1 = pMax;
      result.v1 = vMax;
      
      dRight = distance - maxDistance;
      
      var vNormal = r2.loc.subtract(pMax).normalize();
      var vRight = vNormal.rightNormal();
      vRight = vRight.multiply(dRight);
      var pEnd = pMax.add(vRight);
      
      result.v2 = vRight;
      result.p2 = pEnd;
      
      return result;
    }
  }
  
  return undefined;
}

