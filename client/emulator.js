var GPIO = {
	OUT : 0,
	IN : 1,
	FLOAT: 0,
	setMode: function(){},
	write: function(led,level){
		if(level){
			$('#led').addClass('on');
		}else{
			$('#led').removeClass('on');
		}
	}
}

var File = {
	open: function(){},
	read: function(){},
	write: function(){}
}


