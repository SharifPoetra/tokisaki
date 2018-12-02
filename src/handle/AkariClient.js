const { Client, Collection } = require('discord.js');
const Economy = require("discordeco.js");

class AkariBot extends Client {
  constructor (opt) {
    super (opt);
        this.health = Object.seal({
      cpu: new Array(96).fill(0),
      prc: new Array(96).fill(0),
      ram: new Array(96).fill(0),
      cmd: new Array(96).fill(0), 
      pings: new Array(96).fill(0)
    });
    
    this.eco = new Economy();
    this.snek = require('node-superfetch');
    this.config = require('../config.json');
    this.util = require('./util.js');
    this.userLevel = require('../../src/database/xp');
    this.userBalance = require('../../src/database/balance');
    this.version = require('../../package.json').version;
  }
    updateStats() {
    const { heapTotal, heapUsed } = process.memoryUsage();
    const { loadavg } = require('os');
    this.health.cpu.shift();
    this.health.cpu.push(((loadavg()[0] * 10000) | 0) / 100);
    
    this.health.prc.shift();
    this.health.prc.push(((100 * (heapTotal / 1048576)) | 0) / 100);
    
    this.health.ram.shift();
		this.health.ram.push(((100 * (heapUsed / 1048576)) | 0) / 100);

		this.health.cmd.shift();
		this.health.cmd.push(0);
  }
}

module.exports = AkariBot;
