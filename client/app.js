var button = 0;
var led = 2;
var wsurl = emulation || 'ws://dev.thgab.com:8080';
var send = function () {
	ws.send('blink')
}
GPIO.setMode(led, GPIO.OUT, GPIO.FLOAT);
GPIO.setMode(button, GPIO.IN, GPIO.PULLUP);
GPIO.write(led, 0);

var name = 'noname';
var f = File.open('myname', 'r');
if (f) {
	name = f.read();
	f.close();
}

var ws = new WebSocket(wsurl);

ws.onopen = function (ev) {
	GPIO.setISR(button, GPIO.NEGEDGE, send);
	ws.send('blinkR:' + name);
};

ws.onmessage = function (ev) {
	var evdata = ev.data.split(':');
	var evfunction = evdata.shift();
	if (typeof blinkR[evfunction] === 'function') {
		blinkR[evfunction](evdata);
	}
};

var blinkR = {
	blink: function () {
		GPIO.write(led, 1);
		var xt = setTimeout(function () {
			GPIO.write(led, 0);
		}, 500);
	},
	rename: function (name) {
		var f = File.open('myname', 'w+');
		f.write(name[0]);
		f.close();
	}
}
