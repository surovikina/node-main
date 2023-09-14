const fs = require('fs');
const { exec } = require('child_process');
const os = require('os');
const readline = require('readline');
const { getCurrentUnixTime, writeOnOneLine, getComand,logFileName, windowsCommand, unixLikeOSCommand, timeToRefresh } = require('./helpers');

function monitorProcesses() {
  const currentPlatform = os.platform();
  const command = getComand(currentPlatform);

  setInterval(() => {
    const currentTime = getCurrentUnixTime();
    const childProcess = exec(command);

    childProcess.stdout.on('data', (data)=> {
      writeOnOneLine(data);
  
      if (currentTime % 60 === 0) {
        fs.appendFileSync(logFileName, data);
      }
    })

    childProcess.stderr.on('data', (data) => {
      process.stderr.write(data)
    });

  }, timeToRefresh);
}

monitorProcesses();

module.exports = monitorProcesses;
