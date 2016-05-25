var uniqid = require('uniqid'), WebSocketServer = require('ws').Server, wss = new WebSocketServer({port: 8080});

var Clients = {};

wss.on('connection', function (ws) {
	ws.on('message', function (message) {
		var evdata = message.split(':');
		var evfunction = evdata.shift();
		if (typeof BlinkRServer[evfunction] === 'function') {
			BlinkRServer[evfunction](ws,evdata);
		}
	});
});

var BlinkRServer = {
	blinkR: function (ws,params) {
		if (!params.length || params[0] != 'noname') {
			var clientId = uniqid();
			ws.send('rename:' + clientId);
		} else {
			var clientId = params[0];
		}
		Clients[clientId] = ws;
	},
	blink: function (ws) {
		ws.send('blink');
	}
}

