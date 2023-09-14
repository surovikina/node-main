const windowsCommand = `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`;
const unixLikeOSCommand = "ps -A -o %cpu,%mem,comm | sort -nr | head -n 1";
const timeToRefresh = 100;
const logFileName = 'activityMonitor.log';

function getCurrentUnixTime() {
    return Math.floor(Date.now() / 1000);
}

function writeOnOneLine(data) {
    console.clear();
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(data);
}

function getComand(platform) {
    let command;
    switch (platform) {
      case 'linux':
      case 'darwin':      
        command = unixLikeOSCommand;
        break;
      case 'win32':
        command = windowsCommand;
        break;
      default:
        process.stderr.write('Unsupported operating system.');
        return;
    }
    return command;
}

module.exports = { getCurrentUnixTime, writeOnOneLine, getComand, logFileName, windowsCommand, unixLikeOSCommand, timeToRefresh }