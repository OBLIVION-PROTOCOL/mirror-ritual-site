module.exports = {
  apps: [
    {
      name: 'mirror-ritual-dev',
      script: 'python3',
      args: 'dev_server.py',
      cwd: '/home/user/webapp',
      interpreter: 'none',
      env: {
        NODE_ENV: 'development',
        PORT: 8000
      },
      watch: ['*.py', '*.html', '*.js', '*.css'],
      ignore_watch: ['node_modules', '.git', '__pycache__'],
      max_memory_restart: '1G',
      restart_delay: 1000,
      instances: 1,
      exec_mode: 'fork'
    }
  ]
};