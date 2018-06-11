
var user = {

	signin: {
		validate: function(){
			return validateForm(user.signin.form());
		},
		form: function(){ return $('#signin') },
		before: function(){
			$('.alert').fadeOut().remove();
			var btn = user.signin.form().find('[type="submit"]');
			var spn = user.signin.form().find('.spinner');
			spn.css('min-height', btn.height());			
			btn.fadeOut(function(){ spn.fadeIn(); });
		},
		done: function(r){
			console.log(r);
			if(r.error && !r.error.code){
				user.token.set(r.data.jwt);
				load('app');
			}else{
				var t = '<b>Sign-in fail.</b><br/>'	+ r.error.text
				var f = user.signin.form();
				f.prepend(getAlert(t,'danger','shake'));
			}
		},
		fail: function(e){			
			var t = (e.status == 401)? '<b>Sign-in fail.</b><br/>Wrong email or password.' : '<b>Sign-in fail.</b><br/>' + e.statusText;			
			var f = user.signin.form();
			f.prepend(getAlert(t,'danger','shake'));
		},
		always: function(){
			var btn = user.signin.form().find('[type="submit"]');
			var spn = user.signin.form().find('.spinner');
			spn.fadeOut(function(){ btn.fadeIn(); });
		}
	},

	token: {
		validate: function(jwt){
			if(!jwt) jwt = user.token.get();
			if(!jwt) return false;
			var parseJwt = function(t) {
				var base64Url = t.split('.')[1];
				var base64 = base64Url.replace('-', '+').replace('_', '/');
				return JSON.parse(window.atob(base64));
			};
			var data = parseJwt(jwt);
			var ok = false;
			if(data.nbf) ok = ((data.nbf*1000) < Date.now());
			if(ok && data.exp) ok = ((data.exp*1000) > Date.now());			
			return (ok)? jwt : false;
		},
		get: function(){
			if (typeof(Storage) !== "undefined") return localStorage.getItem("MyDiary");
		},		
		set: function(jwt){
			if (typeof(Storage) !== "undefined") localStorage.setItem("MyDiary", jwt);			
		}
	},

}


