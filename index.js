"use strict";
/**
 *  osx-volume - get and set the volume of your Mac
 *
 *  Copyright 2014 Dennis Timmermann <dennis@tmrmn.com> License MIT
 */

var exec = require('child_process').exec
var reg = /(\w+)(?=,|$)/g

var lib = {}

/**
 * simple bubblesort, returns how often it swapped. We can simpy use the charCode as values
 * @param  {Array} input
 * @return {Integer} times wapped
 * @api private
 */

/**
 * set the system volume, range 0 to 100
 *
 * @param {Integer} level range 0 to 100
 * @param {Function} cb callback arguments: error, stdout, stderr
 */
lib.set = function(level, cb) {
	var cmd = 'osascript -e "set volume output volume ' + level + '"'
	exec(cmd, cb)
}

/**
 * mute the system
 *
 * @param {Function} cb callback arguments: error, stdout, stderr
 */
lib.mute = function(cb) {
	var cmd = 'osascript -e "set volume with output muted"'
	exec(cmd, cb)
}

/**
 * unmute the system
 *
 * @param {Function} cb callback arguments: error, stdout, stderr
 */
lib.unmute = function(cb) {
	var cmd = 'osascript -e "set volume without output muted"'
	exec(cmd, cb)
}

/**
 * get the volume levels as an object
 * { out: [0..100],
 * 	 in: [0..100],
 * 	 alert: [0..100],
 * 	 muted [true|false]
 * }
 *
 * @param {Function} cb callback arguments: levels Object, error, stdout, stderr
 */
lib.levels = function(cb) {
	var cmd = 'osascript -e "get volume settings"'
	exec(cmd, function(error, stdout, stderr) {
		var result = stdout.trim().match(reg) || []
		if(result.length != 4) error += stderr + 'doesn\'t match expectation'
		cb({'out':result[0], 'in':result[1], 'alert':result[2],'muted':result[3]}, error, stdout, stderr)
	})
}

/**
 * get the output volume, range 0 to 100
 *
 * @param {Function} cb callback arguments: error, stdout, stderr
 */
lib.get = function(cb) {
	lib.levels(function(e, error, stdout, stderr) {
		cb(e.out, error, stdout, stderr)
	})
}

// export
module.exports = lib
