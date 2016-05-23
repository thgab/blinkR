var button = 0;
var led = 2;
var send = function(){
	ws.send('blink')
}
GPIO.setMode(led, 0, 0);
GPIO.write(led, 0);

var ws = new WebSocket('ws://dev.thgab.com:8080');

ws.onopen = function(ev) {
GPIO.setMode(button, 1, 1);
GPIO.setISR(button, 2, send);
	ws.send('hello');
};

ws.onmessage = function(ev) {
	if(ev.data == 'blink'){
		GPIO.write(led, 1);
		var xt = setTimeout(function() { GPIO.write(led, 0); }, 500);
	}
};