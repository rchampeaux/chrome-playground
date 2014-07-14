function Robot(id, x, y, heading) {
  this.id = id;
  this.loc = new Vector(x,y);
  this.radius = 20.0;
  this.heading = heading;
  this.turretHeading = 0.0;
  this.speed = 0.0;
  this.turnSpeed = 0.0;
  this.turretSpeed = 0.0;
};

