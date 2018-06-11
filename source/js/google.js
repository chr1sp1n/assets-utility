var onGoogleSignInOKNeededData = function(user){	
	if(user.error && !user.error.code){
		UserObj = user.data;
		load('user/signup',function(el){
			console.log(UserObj);
			$('#signup').find('[name="email"]').val(UserObj.Email);
			$('#signup').find('[name="firstname"]').val(UserObj.FirstName);
			$('#signup').find('[name="lastname"]').val(UserObj.LastName);			
			$('#signup').find('[name="password"]').parent().attr('hidden','');
			$('#signup').find('[name="repassword"]').parent().attr('hidden','');
			$('.google-signout').parent().removeAttr('hidden');
			$('.google-signed').removeAttr('hidden');
			$('.back-signin').attr('hidden','');
			if(UserObj.Picture){
				$('.no-avatar').attr('hidden','');
				$('.avatar').removeAttr('hidden').children('img').attr('src', UserObj.Picture);
			}
			$(el).removeAttr('hidden');
		});
	}
}

var onGoogleSignInOK = function(user){
	UserObj = user;
	console.log(user);
}

var onGoogleSignInError = function(r){
	console.log(r);
}

var onGoogleSignOut = function(){
	load('user/signin');
}