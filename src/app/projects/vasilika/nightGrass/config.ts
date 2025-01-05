const config = {
  light: {
    directional: {
      color: 0xffffff,
      intensity: 0.2,
      position: { x: 5, y: 5, z: 5 },
    }, ambient: {
      color: 0xffffff,
      intensity: 0.05,
    }
  },
  fireflies: {
    count: 100, // не работает если больше 10 и стоит каст шедоу
    size: 1,
    spotLight: {
      use: false,
      color: 0xffff00,
      intensity: 10,
      distance: 1,
      shadow: {
        mapSize: { width: 256, height: 256 },
        camera: { far: 10 },
        castShadow: false,
      }
    },
    color: 0x00ff00,
    velocity: {
      x: 0,
      z: 0,
    },
    distance: {
      xMin: -33, xMax: 40, // границы по оси X
      zMin: -50, zMax: 35, // границы по оси Y
    },
    rotateParticles: Math.PI / 1.5,
    speed: 0.01,
  },
  meadow: {
    width: 100,
    grass: {
      instances: 100000,
      bladeWidth: 0.12,
      bladeHeight: 1,
      joints: 5,
    },
  },
  robot: {
    color: 0x0000ff,
    position: { x: 23, y: -2, z: 25 },
    rotationY: Math.PI / 8,
    scale: 10,
  },
  camera: {
    position: { x: 30.5398, y: 0.9661, z: 40.1273 },
    rotation: { x: -0.0240, y: 0.6504, z: 0.0145 },
  }
}

config.fireflies.velocity = {
  x: (Math.random() - 0.5) * config.fireflies.speed,
  z: (Math.random() - 0.5) * config.fireflies.speed,
}

export default config;
