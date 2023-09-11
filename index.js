const fs = require('fs');
const { spawnSync } = require('child_process');
const os = require('os');
const readline = require('readline');
const { getCurrentUnixTime, clearLine, getComand,logFileName, windowsCommand, unixLikeOSCommand, timeToRefresh } = require('./helpers');

if (!fs.existsSync(logFileName)) {
  fs.writeFileSync(logFileName, '');
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

function monitorProcesses() {
  const currentPlatform = os.platform();
  const command = getComand(currentPlatform);

  setInterval(() => {
    const currentTime = getCurrentUnixTime();
    const result = spawnSync(command, { shell: true, encoding: 'utf-8' });

    if (result.error) {
      console.error('Error:', result.error.message);
      return;
    }

    const output = result.stdout.trim();
    const logLine = `Time ${currentTime} : ${output}`;

    clearLine();
    process.stdout.write(logLine);

    if (currentTime % 60 === 0) {
      fs.appendFileSync(logFileName, logLine);
    }
  }, timeToRefresh);
}

monitorProcesses();

module.exports = monitorProcesses;
