var map = new Map(600,600);

var canvas = document.querySelector("#map");


function drawRobot(ctx, robot) {
  var radius = 20.0;
  var innerRadius = radius-2;
  
  ctx.fillStyle = "#a00000";
  ctx.beginPath();
  ctx.arc(robot.x, robot.y, radius, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = "#d00000";
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 2;
  ctx.lineJoin = "round";
  ctx.beginPath();
  var radians1 = robot.heading * (Math.PI/180.0);
  var radians2 = (robot.heading + 120) * (Math.PI/180.0);
  var radians3 = (robot.heading + 240) * (Math.PI/180.0);

  var x1 = robot.x + Math.cos(radians1)*innerRadius;
  var y1 = robot.y + Math.sin(radians1)*innerRadius;
  ctx.moveTo(x1, y1);
  ctx.arc(robot.x, robot.y, innerRadius, radians2, radians3);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(robot.x, robot.y);
  var turretRadians = robot.turretHeading * (Math.PI / 180.0);
  ctx.lineTo(robot.x + Math.cos(turretRadians)*radius,
             robot.y + Math.sin(turretRadians)*radius);
  ctx.stroke();
}

function render() {
  var ctx = canvas.getContext('2d');
  
  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  var index;
  var count = map.robots.length;
  for(index=0; index<count; index++) {
    var robot = map.robots[index];
    drawRobot(ctx, robot);
  }
  
}

function nextCycle() {
  map.nextCycle();
  render();
  window.setTimeout(nextCycle, 0);
}

var robot = new Robot(1, 300, 300, 0);
robot.turnSpeed = 30.0;
robot.turretSpeed = 20.0;
robot.speed = 30.0;

map.addRobot(robot);

//nextCycle();

function foo()
{
  var radius = 20.0;
  var angle = 45.0;
  var x1 = 400.0;
  var y1 = 400.0;
  var x2 = 500.0;
  var y2 = 460.0;
  
  var ctx = canvas.getContext('2d');
  
  var radians = angle * (Math.PI / 180.0);
  var s = Math.sin(radians) / Math.cos(radians);
  
  var xV = x1 + Math.cos(radians)*300;
  var yV = y1 + Math.sin(radians)*300;
  
  var xI = (y2 + (x2/s) - y1 + s*x1) / (s + (1/s));
  var yI = -(1/s)*xI + (y2 + (x2/s));
  
  ctx.strokeStyle = "#ff0000";
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(xV, yV);
  ctx.stroke();
  
  ctx.strokeStyle = "#0000ff";
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(xI, yI);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.arc(x1, y1, 3, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(x2, y2, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(xI, yI, 3, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.strokeStyle = "#ff0000";
  ctx.beginPath();
  ctx.arc(x1, y1, radius, 0, Math.PI * 2);
  ctx.stroke();
  
  ctx.strokeStyle = "#0000ff";
  ctx.beginPath();
  ctx.arc(x2, y2, radius, 0, Math.PI * 2);
  ctx.stroke();
  
  var dx2 = x2 - xI;
  var dy2 = y2 - yI;
  
  var dToLineSquared = Math.pow(dx2,2) + Math.pow(dy2,2)
  
  var doubleRadius = radius * 2;
  var dI = Math.sqrt(Math.pow(doubleRadius,2) - dToLineSquared);
  
  var dToIntercept = Math.sqrt(Math.pow(xI-x1,2) + Math.pow(yI-y1,2));
  
  var maxDistance = dToIntercept - dI;
  
  var xMax = x1 + Math.cos(radians)*maxDistance;
  var yMax = y1 + Math.sin(radians)*maxDistance;
  
  ctx.beginPath();
  ctx.arc(xMax, yMax, 3, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.strokeStyle = "#000000";
  ctx.beginPath();
  ctx.arc(xMax, yMax, radius, 0, Math.PI * 2);
  ctx.stroke();
}

//foo();


function Test() {
  var ctx = canvas.getContext('2d');

  var 
  
}