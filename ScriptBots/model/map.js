function Map(width, height) {
  this.width = width;
  this.height = height;
  this.robots = [];
  this.walls = [];
  this.bullets = [];
  
};

Map.anglePerUnit = 100.0;
Map.distancePerUnit = 100.0;

Map.prototype.addRobot = function(robot) {
  this.robots.push(robot);
};

Map.addHeading = function(start, increment) {
  var result = (start + increment) % 360.0;
  if (result < 0)
  {
    result += 360.0;
  }
  
  return result;
};

Map.prototype.findNearestCollision = function(robot, moveVector) {
  var nearestCollision;
  
  for(index = 0; index < this.robots.length; index++) {
    if (robot.id != this.robots[index].id)
    {
      var collision = Util.robotCollision(robot, moveVector, this.robots[index]);
      if (collision) {
        if (nearestCollision) {
          if (collision.d1 < nearestCollision.d1) {
            nearestCollision = collision;
          }
        } else {
          nearestCollision = collision;
        }
      }
    }
  }
  
  return nearestCollision;
}

Map.prototype.moveRobot = function(robot, moveVector)
{
  var nearestCollision = this.findNearestCollision(robot, moveVector);
  
  if (nearestCollision) {
    robot.loc = nearestCollision.p1;
  } else {
    var radians = robot.heading * (Math.PI / 180.0);
    robot.loc = robot.loc.add(moveVector);
  }
  
  return nearestCollision;
}

Map.prototype.nextCycle = function() {
  var index;
  for(index = 0; index < this.robots.length; index++)
  {
    var robot = this.robots[index];

    robot.heading = 
      Map.addHeading(robot.heading, robot.turnSpeed / Map.anglePerUnit);
    robot.turretHeading = 
      Map.addHeading(robot.turretHeading, robot.turretSpeed / Map.anglePerUnit);
    
    var distance = robot.speed / Map.distancePerUnit;
    
    var moveVector = Vector.createFromAngleDistance(robot.heading, distance);
    
    var collision = this.moveRobot(robot, moveVector);
    if (collision)
    {
      this.moveRobot(robot, collision.v2);
    }
  }
};
