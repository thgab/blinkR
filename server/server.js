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
		if (!params.length || params[0] == 'noname') {
			var clientId = uniqid();
			ws.send('rename:' + clientId);
		} else {
			var clientId = params[0];
		}
		Clients[clientId] = ws;
		ws.clientId = clientId;
		console.log(ws.clientId);
	},
	blink: function (ws, params) {
		if(typeof ws.clientId === 'undefined' && params.length && typeof Clients[params[0]] !== 'undefined'){
			Clients[params[0]].send('blink');
		}else{
			ws.send('blink');
		}
	},
	list: function (ws, params) {
		var list = [];
		for(var clientId in Clients) {
			if (Clients.hasOwnProperty(clientId)) {
				list.push(clientId);
			}
		}
		ws.send(list.toString());
	}
}

