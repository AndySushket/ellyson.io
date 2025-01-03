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
      xMin: -40, xMax: 10, // границы по оси X
      zMin: -10, zMax: 30, // границы по оси Y
    },
    speed: 0.005,
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
}

config.fireflies.velocity = {
  x: (Math.random() - 0.5) * config.fireflies.speed,
  z: (Math.random() - 0.5) * config.fireflies.speed,
}

export default config;
