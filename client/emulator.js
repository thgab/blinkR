var GPIO = {
	OUT: 0,
	IN: 0,
	FLOAT: 0,
	NEGEDGE: 0,
	setMode: function () {
		console.log(arguments);
	},
	write: function (led, level) {
		console.log(arguments);
		if (level) {
			$('#led').addClass('on');
		} else {
			$('#led').removeClass('on');
		}
	},
	setISR: function (button, edge, send) {
		console.log(arguments);
		$('#button').click(send);
	}
}

var File = {
	open: function () {
		console.log(arguments);
		return {
			read: function () {
				console.log(arguments);
				return 'noname';
			},
			write: function () {
				console.log(arguments);
			},
			close: function () {
				console.log(arguments);
			}
		};
	},
}

var emulation = 'ws://localhost:8080'
