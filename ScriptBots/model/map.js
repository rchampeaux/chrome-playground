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

Map.prototype.nextCycle = function() {
  var index;
  for(index = 0; index < this.robots.length; index++)
  {
    var robot = this.robots[index];
    
    robot.heading = 
      Map.addHeading(robot.heading, robot.turnSpeed / Map.anglePerUnit);
    robot.turretHeading = 
      Map.addHeading(robot.turretHeading, robot.turretSpeed / Map.anglePerUnit);
    
    var speed = robot.speed / Map.distancePerUnit;
    
    var radians = robot.heading * (Math.PI / 180.0);
    var x = robot.x + speed * Math.cos(radians);
    var y = robot.y + speed * Math.sin(radians);
    
    robot.x = x;
    robot.y = y;
  }
};
