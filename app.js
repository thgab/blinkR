var button = 0;
var led = 2;
var wsurl = 'ws://dev.thgab.com:8080';
var send = function () {
	ws.send('blink')
}
GPIO.setMode(led, GPIO.OUT, GPIO.FLOAT);
GPIO.setMode(button, GPIO.IN, GPIO.PULLUP);
GPIO.write(led, 0);

var ws = new WebSocket(wsurl);

ws.onopen = function (ev) {
	GPIO.setISR(button, GPIO.NEGEDGE, send);
	ws.send('blinkR');
};

ws.onmessage = function (ev) {
	if (ev.data == 'blink') {
		GPIO.write(led, 1);
		var xt = setTimeout(function () {
			GPIO.write(led, 0);
		}, 500);
	}
};