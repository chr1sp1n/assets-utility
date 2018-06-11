'use strict';

var dashboard = { 
	
	notes: {
		noteToDecrypt: false,
		list:[],
		get:{
			before: function(){
				$('#loading-overlay').show();
			},
			done: function(r){
				if(r.error && !r.error.code){					
					if( Array.isArray(r.data) && r.data.length > 0 ){
						var d = $('#dashboard');
						d.find('.no-notes').hide();
						for(var ni in r.data){
							var note = r.data[ni];
							dashboard.notes.list.push(note);
							dashboard.update(note);
						}						
					}else{
						showError({code:1, text:'Generic error!'});		
					}
				}else{
					showError(r.error);	
				}
			},
			fail: function(e){
				showError(e.responseText, e);
			},
			always: function(){
				$('#loading-overlay').fadeOut(function(){
					$('#dashboard').fadeIn();
				});
			}
		},
		decrypt:{
			done: function(r){				
				if(r.error && r.error.code === false){
					var note = r.data[0];
					if( (!note.html && note.html_present) || (!note.title && note.title_present)) {
						showError({code:2, text:"Decrypt fail!"});
					}else{
						note.state = 1;
						dashboard.update(note);
						if(dashboard.notes.noteToDecrypt !== false) editor.open(note);
					}
				}else{
					showError(r.error);	
				}
			},
			fail: function(e){
				showError(e.responseText, e);
			},
			always: function(){
				UIkit.modal('.uk-modal').hide();
			},
		},
		encrypt:{
			done: function(r){				
				if(r.error && r.error.code===false){
					if( Array.isArray(r.data) && r.data.length > 0 ){						
						dashboard.update(r.data[0]);
					}else{
						showError({code:1, text:'Generic error!'});		
					}
				}else{
					showError(r.error);	
				}				
			},
			fail: function(e){
				showError(e.responseText, e);
			},
			always: function(){
				UIkit.modal('.uk-modal').hide();
			}
		},
	},

	update: function(note){
		dashboard.notes.list.forEach(function(nt, i, notes){			
			if(note && (nt.id_note == note.id_note)) notes[i] = note;
			var noteThumb = $('#'+note.id_note);				
			if(noteThumb.length==0){
				var nt = $('#note-template').html();
				var n = nt.replace(new RegExp('{{id_note}}', 'g'), note.id_note);						
				$('#dashboard').find('.notes').prepend(n);
				noteThumb = $('#'+note.id_note);
			}
			noteThumb.find('[data-title]').html((note.title)?note.title:'No Title');
			noteThumb.find('[datetime]').attr('datetime', note.datetime).html(formatDatetime(note.datetime));
			noteThumb.find('[data-html]').html((note.html)?note.html:'No text');
			noteThumb.find('[data-encrypt]').removeAttr('hidden');
			noteThumb.find('[data-decrypt]').attr('hidden','');				
			if(note.state==2){
				noteThumb.find('[data-encrypt]').attr('hidden','');
				noteThumb.find('[data-decrypt]').removeAttr('hidden');
				noteThumb.find('[data-global-decrypt]').attr('hidden','');					
			}else if(note.state==3){
				noteThumb.find('[data-encrypt]').attr('hidden','');
				noteThumb.find('[data-global-decrypt]').removeAttr('hidden');					
				noteThumb.find('[data-decrypt]').attr('hidden','');
			}else{
				noteThumb.find('[data-encrypt]').removeAttr('hidden');
				noteThumb.find('[data-decrypt]').attr('hidden','');
				noteThumb.find('[data-global-decrypt]').attr('hidden','');				
			}
		});
	},

	init:function(){		
		api(API + 'notes/get', 'get', 'dashboard.notes.get');
	}

 };

 var editor = {

	open:function(note){
		var ds = $('#dashboard');
		var ed = $('#editor');
		ds.fadeOut(function(){
			editor.fill(note, ed);			
		});
	},

	close:function(){
		var ds = $('#dashboard');
		var ed = $('#editor');
		ed.fadeOut(function(){			
			ds.fadeIn();
		});
	},

	fill:function(note, ed){		
		var frm = ed.find('#editor-form');
		frm.find('[name="title"]').val(note.title);
		frm.find('[name="html"]').val(note.html);
		frm.find('#datetime').html(formatDatetime(note.datetime));
		frm.find('[name="datetime"]').val(formatDatetime(note.datetime));		
		editor.create(ed.find('#wysiwyg'), note);
		ed.fadeIn();
	},	

	create: function(element, note){		
		emojify.setConfig({ img_dir : 'assets/images/emoji' });
		element.trumbowyg('destroy');
		element.html(note.html).trumbowyg({
			svgPath:'assets/images/editor/icons.svg',
			lang: 'en',
			autogrow: true,
			autogrowOnEnter: true,
			imageWidthModalEdit: true,
			btnsDef: {				
				image: {
					dropdown: ['insertImage', 'base64'],
					ico: 'insertImage'
				}
			},			
			btns: [
				['viewHTML'],
				['undo','redo'],
				['formatting','preformatted','lineheight'],
				['fontfamily','fontsize'],
				['foreColor','backColor'],
				['strong','em','del'],
				['superscript','subscript'],
				['link'],
				['image'],
				['emoji'],
				['justifyLeft','justifyCenter','justifyRight','justifyFull'],
				['unorderedList','orderedList'],
				['horizontalRule'],
				['removeformat'],				
				['fullscreen']
			]
		});
		emojify.run();
	}

};

 (function($){

	$(document).on('click', '[data-decrypt]', function(ev){
		ev.preventDefault();		
		if(dashboard.notes.noteToDecrypt){
			var note = [dashboard.notes.noteToDecrypt];
		}else{
			var id_note = $(this).closest('.note').attr('id');
			var nt = $(this);
			var note = dashboard.notes.list.filter(function(nt){
				return nt.id_note == id_note;
			});
		}
		if(note.length>0){
			note = note[0];			
			var jmdl = $('#modal-ask-password');
			jmdl.find('.title').html('Enter passphrase to decrypt note');
			jmdl.find('#ask-password-form').attr('action', 'api/notes/get').attr('data-handler', 'dashboard.notes.decrypt');
			jmdl.find('[name="password"]').val('');
			if(note.passname){
				jmdl.find('[data-passphrase-name]').removeAttr('hidden').find('[name="passname"]').val(note.passname).attr('disabled','disabled');			
			}else{
				jmdl.find('[data-passphrase-name]').attr('hidden','').find('[name="passname"]').val('');
			}
			jmdl.find('[data-rm-passphrase]').removeAttr('hidden');
			jmdl.find('[name="id_note"]').val(note.id_note);
			jmdl.find('[type="submit"]').html('Decrypt');	
			UIkit.modal('#modal-ask-password').show();
		}else{
			showError({code:3, text:'Note not found!'});			
		}		
	});

	$(document).on('click', '[data-encrypt]', function(ev){
		ev.preventDefault();
		var nt = $(this);
		var id_note = nt.closest('.note').attr('id');
		var note = dashboard.notes.list.filter(function(nt){
			return nt.id_note == id_note;
		});
		if(note.length>0){
			note = note[0];
			var jmdl = $('#modal-ask-password');
			jmdl.find('.title').html('Enter passphrase to encrypt note');		
			jmdl.find('#ask-password-form').attr('action', 'api/notes/set').attr('data-handler', 'dashboard.notes.encrypt');		
			jmdl.find('[name="password"]').val('');
			jmdl.find('[data-passphrase-name]').removeAttr('hidden').find('[name="passname"]').val(note.passname).removeAttr('disabled');
			jmdl.find('[data-rm-passphrase]').attr('hidden','');
			jmdl.find('[name="id_note"]').val( note.id_note );
			jmdl.find('[name="title"]').val( note.title );
			jmdl.find('[name="html"]').val( note.html );
			jmdl.find('[name="datetime"]').val( note.datetime );				
			jmdl.find('[type="submit"]').html('Encrypt');				
			UIkit.modal('#modal-ask-password').show();			
		}else{
			showError({code:3, text:'Note not found!'});			
		}
	});	

	$(document).on('click', '[data-global-decrypt]', function(ev){
		ev.preventDefault();
		return;
	});

	$(document).on('click', '[uk-close]', function(ev){
		dashboard.notes.noteToDecrypt = false;
	});

	$(document).on('click', '[data-note-open]', function(ev){
		ev.preventDefault();
		var nt = $(this);
		var id_note = nt.closest('.note').attr('id');
		var note = dashboard.notes.list.filter(function(nt){			
			return nt.id_note == id_note;
		});
		if(note.length>0){
			note = note[0];
			if(note.state==1){
				dashboard.notes.noteToDecrypt = false;
				editor.open(note);
			}else{
				dashboard.notes.noteToDecrypt = note;
				$('[data-decrypt]').trigger( "click" );
			}			
		}else{
			showError({code:3, text:'Note not found!'});			
		}
	});
	
	$(document).on('click', '[data-note-close]', function(ev){
		ev.preventDefault();
		editor.close();
	});

	$(document).on('click', '[data-dt-picker]', function(ev){
		ev.preventDefault();
		var frm = $('#editor-form');		
		frm.find('[name="datetime"]').datetimepicker({
			format:'l, j F, Y, H:i',
			// //defaultDate:'+03.01.1970',
			// //defaultTime:'10:00',			
			step:1,
			lang:'en',			
			timepickerScrollbar:false,
			closeOnDateSelect:false,
			closeOnWithoutClick:false,
			onClose: function(dt, $i){
				$i.datetimepicker('destroy');
				frm.find('#datetime').html(formatDatetime(dt));
				frm.find('[name="datetime"]').val(formatDatetime(dt));				
			}
		});		
		frm.find('[name="datetime"]').datetimepicker('show');
	});

	$(document).on('input propertychange', '.trumbowyg-editor', function() {		
		emojify.run(); 
	});

	$('#dashboard').ready(function(ev){
		dashboard.init();
	});

 })(jQuery);





function getBase64Image(img){	
	var canvas = document.createElement("canvas");
	var img1 = document.createElement("img"); 
    img1.setAttribute('src', img);
    canvas.width = img1.width; 
    canvas.height = img1.height; 
    var ctx = canvas.getContext("2d"); 
    ctx.drawImage(img1, 0, 0); 
    var dataURL = canvas.toDataURL("image/png");
    alert("from getbase64 function"+dataURL );    
    return dataURL;
} 