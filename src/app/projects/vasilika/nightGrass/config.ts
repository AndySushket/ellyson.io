const config = {
  fireflies: {
    count: 100,
    size: 1,
    color: 0x00ff00,
    velocity: {
      x: 0,
      z: 0,
    },
    distance: {
      xMin: -30, xMax: 30, // границы по оси X
      zMin: -30, zMax: 30, // границы по оси Y
    },
    speed: 0.02,
  },
  meadow: {
    width: 100,
    grass: {
      instances: 75000,
      bladeWidth: 0.12,
      bladeHeight: 1,
      joints: 5,
    },
  },
}

config.fireflies.velocity = {
  x: (Math.random() - 0.5) * config.fireflies.speed,
  z: (Math.random() - 0.5) * config.fireflies.speed,
}

export default config;
