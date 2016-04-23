#!/usr/bin/env node

// Event based steam screensaver unlocker
var fs = require('fs');
var exec = require('child_process').exec;
var events = require('events');
var fileTailer = require('file-tail');

// Start event loop.
var emitter = new events.EventEmitter();

// Define path
var defaultSteamHome = process.env.HOME + "/.steam";
var streamLogFile = "/steam/logs/streaming_log.txt";
var logFile = defaultSteamHome + streamLogFile;

// Run or test
if (process.argv[2] == "test") {
  logFile = '/tmp/monitor_example_file.log';
  setInterval(() => {
    fs.appendFile(logFile, "Example data line", (err) => {
      console.log("Writting in file...");
    });
  },1000);
} else {
  require('daemon')()
}


// Show some output to user
console.log("Monitoring log file: " + logFile);

// Tail the file
ft = fileTailer.startTailing(logFile);
ft.on('line', (line) => {
  emitter.emit("newline");
});

// Handle new line
emitter.on("newline",() => {
  exec("DISPLAY=:0 gnome-screensaver-command -d", (error, stdout, stderr) => {
    if (error) {
      console.log("ERROR: " + stderr);
    } else {
      console.log('In-home streaming activity detected, unlocking screen.');
    }
  });
});

// ... never ends
