const windowsCommand = `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`;
const unixLikeOSCommand = "ps -A -o %cpu,%mem,comm | sort -nr | head -n 1";
const timeToRefresh = 100;
const logFileName = 'activityMonitor.log';

function getCurrentUnixTime() {
    return Math.floor(Date.now() / 1000);
}

function clearLine() {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
}

function getComand(platform) {
    let command;
    switch (platform) {
      case 'linux':
        command = unixLikeOSCommand;
        break;
      case 'darwin':
        command = unixLikeOSCommand;
        break;
      case 'win32':
        command = windowsCommand;
        break;
      default:
        console.error('Unsupported operating system.');
        return;
    }
    return command;
}

module.exports = { getCurrentUnixTime, clearLine, getComand, logFileName, windowsCommand, unixLikeOSCommand, timeToRefresh }