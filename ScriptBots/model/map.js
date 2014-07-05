function Map(width, height) {
  this.width = width;
  this.height = height;
  this.robots = [];
  this.walls = [];
  this.bullets = [];
  
};

Map.prototype.addRobot = function(robot) {
  this.robots.push(robot);
};

Map.addHeading = function(start, increment) {
  var result = (start + increment) % 360.0;
  if (result < 0)
  {
    result += 360.0;
  }
};

Map.prototype.nextCycle = function() {
  var index;
  for(index = 0; index < this.robots; index++)
  {
    var robot = this.robots[index];
    
    
    robot.heading = 
      Map.addHeading(robot.heading, robot.turnSpeed / 1000.0);
    robot.turretHeading = 
      Map.addHeading(robot.turretHeading, robot.turretSpeed / 1000.0);
    
    var speed = robot.speed / 1000.0;
    
    var radians = robot.heading * (Math.PI / 180.0);
    var x = robot.x + robot.speed * Math.cos(radians);
    var y = robot.y + robot.speed * Math.sin(radians);
    
    robot.x = x;
    robot.y = y;
  }
};
