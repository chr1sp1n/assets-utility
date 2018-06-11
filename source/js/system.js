'use strict';

var load = function(page, callback, el){
	
	if(page){
		$('[data-app]').load('html/'+page+'.html', function(){			
			if(callback) $(this).attr('hidden','');
			load(false, callback, this);
		});
		return;
	}
	
	if(!callback) callback = function(){};
	var includes = $('[data-include]');
	var progressBar = $('#loading-content').children('.progress');
	var message = $('#loading-content').children('.message');	
	var toBeLoaded = includes.length;
	progressBar.attr('max', toBeLoaded);
	var loadingProgress = function(toBeLoaded){
		if(toBeLoaded>0){
			progressBar.attr('value', progressBar.attr('max') - toBeLoaded);			
		}else{				
			clearTimeout(loadTimeout);			
			callback(el);
			$('#loading-overlay').fadeOut();				
		}
	};
	if(includes.length>0){
		var loadTimeout = setTimeout(function(){
			if(toBeLoaded>0){
				progressBar.fadeOut(function(){ message.fadeIn(); });
			}else{
				callback(el);
				$('#loading-overlay').fadeOut();
			}
		},2000);
		includes.each(function(){
			var page = $(this).data('include');
			if(page.indexOf('http://') < 0 && page.indexOf('https://') < 0) page = 'html/' + page + '.html';
			$(this).load(page, function(r,t,x){
				if(x.status == 200) loadingProgress(--toBeLoaded);
			});
		});
	}else{
		callback(el);
		$('#loading-overlay').fadeOut();
	}
}

var api = function(page, method, handler, data, event){
	if(!(handler && handler != '')) handler = false;	
	if( typeof(eval(handler + ".validate")) == 'function' &&  !eval(handler + ".validate()") ) return false;
	$.ajax({
		url: page,
		data: (data)?JSON.stringify(data):'',
		method: method,
		async: true,
		dataType: 'json',
		beforeSend: function(rq){
			var jwt = user.token.validate();
			if(jwt) rq.setRequestHeader('Authorization', jwt);
			if(typeof(eval(handler + ".before")) == 'function') eval(handler + ".before(this, rq, event)");
		}
	}).done(function(r){
		if(typeof(eval(handler + ".done")) == 'function') eval(handler + ".done(r,event)");
	}).fail(function(e){
		if(typeof(eval(handler + ".fail")) == 'function') eval(handler + ".fail(e,event)");
	}).always(function(){
		if(typeof(eval(handler + ".always")) == 'function') eval(handler + ".always(event)");		
	});
}

var validateForm  = function(frm){	

	var regexp = {
		email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ig
	}
	var ok = true;	

	var execute = function(i){
		if(ok) {
			$(ir[i]).off();
			$(ir[i]).removeClass(['uk-form-danger', 'uk-animation-scale-down']);
			$(ir[i]).attr('placeholder',$(ir[i]).attr('type'));					
		}else{
			$(ir[i]).addClass(['uk-form-danger', 'uk-animation-scale-down']);
			$(ir[i]).attr('placeholder',$(ir[i]).data('help'));
			$(ir[i]).change(function(){ validateForm(frm); });		
		}
	}	
	
	var ir = frm.find('[data-required]');
	for(var i=0; i<ir.length; ++i){		
		if($(ir[i]).val() == '') {
			ok = false;
			execute(i);
			return false;
		}
	}

	var ip = frm.find('[data-regexp]');
	for(var i=0; i<ip.length; ++i){
		var rx = $(ir[i]).data('regexp');
		if(regexp[rx]){
			if(!regexp[rx].test($(ir[i]).val())) ok = false;
		}else{
			if(!rx.test($(ir[i]).val())) ok = false;			
		}	
		execute(i);		
		if (!ok) return false;
	}

	return ok;
}

var getAlert = function(text, color, animation){
	var a = $('#alert-template').html();		
	a = a.replace('{{text}}',text);	
	a = a.replace('{{color}}',color?color:'default');
	a = a.replace('{{animation}}',animation?animation:'fade');
	return 	a;
}

var formatDatetime = function(datetime){	
	var dt = new Date(datetime);
	return dt.toLocaleString("en-GB", { 
		weekday: 'long', 
		year: 'numeric', 
		month: 'long', 
		day: 'numeric', 
		hour: 'numeric', 
		minute: 'numeric', 
		hour12: false
	});
}


var showError = function(error, e){
	try{
		if(typeof(error) == 'string') error = JSON.parse(error);
	}catch(e){
		error = 'Generic error';
	}
	if(error.code && error.text) error = "<b>Error: " + error.code + "</b><br/>" + error.text;
	UIkit.modal.alert(error).then(function(){
		if(e) console.error(e);
	});
}