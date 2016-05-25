var GPIO = {
	OUT : 0,
	IN : 0,
	FLOAT: 0,
	NEGEDGE: 0,
	setMode: function(){},
	write: function(led,level){
		if(level){
			$('#led').addClass('on');
		}else{
			$('#led').removeClass('on');
		}
	},
	setISR: function(button, edge, send){
		$('#button').click(send);
	}
}

var File = {
	open: function(){},
	read: function(){},
	write: function(){}
}

var emulation = 'ws://localhost:8080'
