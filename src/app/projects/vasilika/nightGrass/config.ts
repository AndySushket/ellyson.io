const config = {
  light: {
    directional: {
      color: 0xffffff,
      intensity: 0.4,
      position: { x: 5, y: 5, z: 5 },
    }, ambient: {
      color: 0xffffff,
      intensity: 0.05,
    }
  },
  fireflies: {
    count: 100, // не работает если больше 10 и стоит каст шедоу
    size: 1,
    color: 0x00ff00,
    velocity: {
      x: 0,
      z: 0,
    },
    distance: {
      xMin: -50, xMax: 70, // границы по оси X
      zMin: -30, zMax: 75, // границы по оси Y
    },
    rotateParticles: Math.PI / 1.5,
    speed: 0.01,
  },
  meadow: {
    width: 200,
    grass: {
      windSpeed: {x: 50, y: 50},
      windStrength: 0.15,
      instances: 200000,
      bladeWidth: .15  ,
      bladeHeight: 1.2,
      joints: 5,
    },
  },
  robot: {
    color: 0x0000ff,
    position: { x: 28, y: -2, z: 20 },
    mobilePosition: { x: 23, y: -2, z: 25 },
    rotationY: - Math.PI / 10,
    mobileRotationY: Math.PI / 8,
    scale: 10,
  },
  camera: {
    activeControls: false,
    main: {
      position: { x: 30.5398, y: 0.9661, z: 40.1273 },
      rotation: { x: -0.0240, y: 0.6504, z: 0.0145 },
    },
    project: {
      rotation: { x: -0.0240, y: 1.3008, z: 0.0145 },
    },
  }
}

config.fireflies.velocity = {
  x: (Math.random() - 0.5) * config.fireflies.speed,
  z: (Math.random() - 0.5) * config.fireflies.speed,
}

export default config;
