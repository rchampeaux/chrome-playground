var map = new Map(600,600);

var canvas = document.querySelector("#map");


function drawRobot(ctx, robot) {
  var radius = robot.radius;
  var innerRadius = radius-2;
  
  ctx.fillStyle = "#a00000";
  ctx.beginPath();
  ctx.arc(robot.loc.x, robot.loc.y, radius, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = "#d00000";
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 2;
  ctx.lineJoin = "round";
  ctx.beginPath();
  var radians1 = robot.heading * (Math.PI/180.0);
  var radians2 = (robot.heading + 120) * (Math.PI/180.0);
  var radians3 = (robot.heading + 240) * (Math.PI/180.0);

  var x1 = robot.loc.x + Math.cos(radians1)*innerRadius;
  var y1 = robot.loc.y + Math.sin(radians1)*innerRadius;
  ctx.moveTo(x1, y1);
  ctx.arc(robot.loc.x, robot.loc.y, innerRadius, radians2, radians3);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(robot.loc.x, robot.loc.y);
  var turretRadians = (robot.heading + robot.turretHeading) * (Math.PI / 180.0);
  ctx.lineTo(robot.loc.x + Math.cos(turretRadians)*radius,
             robot.loc.y + Math.sin(turretRadians)*radius);
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

var cycleCount = 5000;
function nextCycle() {
  map.nextCycle();
  render();
  cycleCount--;
  if (cycleCount > 0) {
    window.setTimeout(nextCycle, 0);
  }
}

function RobotCollision(r1, distance, r2) {

  var result = Util.robotCollision(r1, distance, r2);
  

  var ctx = canvas.getContext('2d');
  
  ctx.strokeStyle = "#ff0000";
  ctx.beginPath();
  ctx.moveTo(r1.loc.x, r1.loc.y);
  ctx.lineTo(result.p1.x, result.p1.y);
  ctx.lineTo(result.p2.x, result.p2.y);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(r1.loc.x, r1.loc.y, 3, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(r2.loc.x, r2.loc.y, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(result.p1.x, result.p1.y, 3, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.strokeStyle = "#ff0000";
  ctx.beginPath();
  ctx.arc(r1.loc.x, r1.loc.y, r1.radius, 0, Math.PI * 2);
  ctx.stroke();
  
  ctx.strokeStyle = "#0000ff";
  ctx.beginPath();
  ctx.arc(r2.loc.x, r2.loc.y, r2.radius, 0, Math.PI * 2);
  ctx.stroke();
  
  ctx.strokeStyle = "#000000";
  ctx.beginPath();
  ctx.arc(result.p1.x, result.p1.y, r1.radius, 0, Math.PI * 2);
  ctx.stroke();
  
}


function OldRobotCollision(p1, angle, distance, p2)
{
  var radius = 20.0;

  var radians = angle * (Math.PI / 180.0);
  var s = Math.sin(radians) / Math.cos(radians);
  
  var v = Vector.createFromAngleDistance(angle, distance);
  
  var p3 = Vector.add(p1, v);
  
  var intcp = Vector.pointLinePerpendicularIntercept(p2, p1, p3);
  
  var ctx = canvas.getContext('2d');
  
  ctx.strokeStyle = "#ff0000";
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p3.x, p3.y);
  ctx.stroke();
  
  ctx.strokeStyle = "#0000ff";
  ctx.beginPath();
  ctx.moveTo(p2.x, p2.y);
  ctx.lineTo(intcp.x, intcp.y);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.arc(p1.x, p1.y, 3, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(p2.x, p2.y, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(intcp.x, intcp.y, 3, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.strokeStyle = "#ff0000";
  ctx.beginPath();
  ctx.arc(p1.x, p1.y, radius, 0, Math.PI * 2);
  ctx.stroke();
  
  ctx.strokeStyle = "#0000ff";
  ctx.beginPath();
  ctx.arc(p2.x, p2.y, radius, 0, Math.PI * 2);
  ctx.stroke();

  var dToIntercept = p1.distanceToPoint(intcp);
  if (dToIntercept < distance) {
    var dToLine = p2.distanceToPoint(intcp);
  
    var doubleRadius = radius * 2;
    var dI = Math.sqrt(Math.pow(doubleRadius,2) - Math.pow(dToLine,2));
    
    
    var maxDistance = dToIntercept - dI;
    
    var pMax = Vector.add(p1, Vector.createFromAngleDistance(angle, maxDistance));

    var dRight = distance - maxDistance;
    
    var vNormal = p2.subtract(pMax).normalize();
    var vRight = vNormal.rightNormal();
    vRight = vRight.multiply(dRight);
    
    var pEnd = pMax.add(vRight);
    
    ctx.beginPath();
    ctx.moveTo(pMax.x, pMax.y);
    ctx.lineTo(pEnd.x, pEnd.y);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(pMax.x, pMax.y, 3, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = "#000000";
    ctx.beginPath();
    ctx.arc(pMax.x, pMax.y, radius, 0, Math.PI * 2);
    ctx.stroke(); 
  }
  
}

var r1 = new Robot(1, 100.0, 100.0, 15.0);
r1.speed = 25.0;
var r2 = new Robot(2, 220.0, 100.0, 0.0);
var r3 = new Robot(3, 300.0, 200.0, 0.0);

//RobotCollision(r1, 150, r2);

map.addRobot(r1);
map.addRobot(r2);
map.addRobot(r3);

nextCycle();


