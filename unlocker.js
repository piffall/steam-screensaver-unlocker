#!/usr/bin/env node

// Event based steam screensaver unlocker
var exec = require('child_process').exec;
var events = require('events');
var fileTailer = require('file-tail');

// Deamonize
//require('daemon')()

// Start event loop.
var emitter = new events.EventEmitter();

// Define path
var defaultSteamHome = process.env.HOME + "/.steam";
var streamLogFile = "/steam/logs/streaming_log.txt";
var logFile = defaultSteamHome + streamLogFile;

// Show some output to user
console.log("Monitoring log file: " + logFile);

// Test with this file
if (process.argv[2] == "test") {
  logFile = 'logfile.log';
}

// Tail the file
ft = fileTailer.startTailing(logFile);
ft.on('line', function(line){
  emitter.emit("newline");
});

// Handle new line
emitter.on("newline",function(){
  console.log('In-home streaming activity detected, unlocking screen.');
  exec("DISPLAY=:0 gnome-screensaver-command -d", function(error, stdout, stderr){
    if (error) {
      console.log("ERROR: " + stderr);
    }
  });
});

// ... never ends
