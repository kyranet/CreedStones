const { fork, exec } = require('child_process');
fork('./scripts/server.js');
const watch = exec('yarn watch', (error) => console.error(error));
watch.stdout.on('data', console.log);
watch.stderr.on('data', console.error);
