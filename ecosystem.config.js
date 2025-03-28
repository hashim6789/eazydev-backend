module.exports = {
  apps: [
    {
      name: "eazy-dev-express",
      script: "dist/index.js", // Run compiled JS file
      instances: "max",
      exec_mode: "cluster",
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
        PORT: 3333,
      },
    },
  ],
};
