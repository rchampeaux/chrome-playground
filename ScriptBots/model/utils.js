function Util() {}

Util.robotCollision = function(r1, moveVector, r2) {
  var result = {};
  
  var distance = moveVector.length();
  var normalizedMoveVector = moveVector.normalize();
  
  var slope = moveVector.slope(moveVector);
  
  var pMoveEnd = r1.loc.add(moveVector);
  
  var intcp = Vector.pointLinePerpendicularIntercept(r2.loc, r1.loc, pMoveEnd);
  
  var vIntcp = intcp.subtract(r1.loc);

  var doubleRadius = r1.radius + r2.radius;
  var distToIntcp = r1.loc.distanceToPoint(intcp);
  var dToLine = r2.loc.distanceToPoint(intcp);
  if (r1.loc.isForward(vIntcp) && (dToLine < doubleRadius)) {
    if (r1.id > 1) {
      console.log("hello");
    }
    var dI = Math.sqrt(Math.pow(doubleRadius,2) - Math.pow(dToLine,2));
    
    var maxDistance = distToIntcp - dI;
    
    if (maxDistance > 0 && (maxDistance < distance)) {
      result.d1 = maxDistance;
      
      var vMax = normalizedMoveVector.multiply(maxDistance);
      var pMax = r1.loc.add(vMax);
      result.p1 = pMax;
      result.v1 = vMax;
      
      dTurn = distance - maxDistance;
      
      var vNormal = r2.loc.subtract(pMax).normalize();
      var vTurn = vNormal.rightNormal();
      if (!r1.loc.isForward(vTurn)) {
        vTurn = vTurn.reverse();
      }
      
      vTurn = vTurn.multiply(dTurn);
      var pEnd = pMax.add(vTurn);
      
      result.v2 = vTurn;
      result.p2 = pEnd;
      
      return result;
    }
  }
  
  return undefined;
}

