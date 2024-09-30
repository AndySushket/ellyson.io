export default class Ball {
  constructor(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;

    this.originalX = x || 0;
    this.originalY = y || 0;
    this.originalZ = z || 0;
    this.vx = 0;
    this.vy = 0;
    this.vz = 0;
    this.friction = 0.6;
    this.springFactor = 0.1;
  }

  think(mouse) {
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;

    const dist = Math.sqrt(dx * dx + dy * dy);
    // interaction
    if (dist < 60) {
      const tz = (20 * dist) / 60;
      this.vz += tz - this.z;
    }

    // spring back
    const dx1 = -(this.x - this.originalX);
    const dy1 = -(this.y - this.originalY);
    const dz1 = -(this.z - this.originalZ);

    this.vx += dx1 * this.springFactor;
    this.vy += dy1 * this.springFactor;
    this.vz += dz1 * this.springFactor;

    // friction
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.vz *= this.friction;

    // actual move
    this.x += this.vx;
    this.y += this.vy;
    this.z += this.vz;
  }
}
