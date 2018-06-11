'use strict';


(function($){

	var init = function(){		
		var token = user.token.validate();
		if(token){
			var hash = window.location.hash;
			if( hash != ''){
				load(hash);
			}else{
				load('app');
			}
		}else{
			load('user/signin');
		}
	}

	$(document).on('click', '[data-page]', function(ev){
		ev.preventDefault();
		var page = $(this).attr('href');
		if(!page) page = $(this).data('page');
		window.location.hash = '/'+page;
		load(page);
	});

	$(document).on('click', '[type="submit"]', function(ev){
		if($(this).hasClass('trumbowyg-modal-button')) return;
		ev.preventDefault();
		var form = $(this).closest("form");
		var data = form.serializeArray();
		var dataj = {};
		data.forEach(function(i){
			dataj[i.name] = i.value;
		});
		if(form.attr('action').indexOf('api') == 0) var url = API + form.attr('action').replace('api/','');
		if(form.attr('action').indexOf('cda') == 0) var url = CDA + form.attr('action').replace('cda/','');
		api(url, form.attr('method'), form.attr('data-handler'), dataj, ev);
	});

	init();

})(jQuery);


	


