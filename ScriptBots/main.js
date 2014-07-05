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
  ctx.lineTo(robot.x + Math.cos(radians1)*radius,
             robot.y + Math.sin(radians1)*radius);
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

var map = new Map(400,400);

map.addRobot(new Robot(1, 100, 100, 0));
map.addRobot(new Robot(2, 300, 300, 0));

render();

