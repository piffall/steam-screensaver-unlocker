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

// Show some output to user
console.log("Monitoring log file: " + logFile);

// Tail the file
ft = fileTailer.startTailing(logFile);
ft.on('line', (line) => {
    emitter.emit("newline");
  })
  .on('stream', (stream) => {
    emitter.emit("newline");
  })
  .on('tailError', (error) => {
    console.log(error);
  });

// Handle new line
emitter.on("newline",() => {
  exec("loginctl unlock-session 3", (error, stdout, stderr) => {
    if (error) {
      console.log("ERROR: " + stderr);
    } else {
      console.log('In-home streaming activity detected, unlocking screen.');
    }
  });
});

// ... never ends
