module.exports = {
  apps: [{
    name: "front",
    script: "ng serve --host=0.0.0.0 --disableHostCheck=true",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
