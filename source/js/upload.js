'use strict';

var bar = document.getElementById('js-progressbar-avatar');

UIkit.upload('#js-upload-avatar', {
	url: MyDiaryAPI + '/upload/avatar',
	multiple: false,
	beforeSend: function () {
		console.log('beforeSend', arguments);
	},
	beforeAll: function () {
		console.log('beforeAll', arguments);
	},
	load: function () {
		console.log('load', arguments);
	},
	error: function () {
		bar.setAttribute('hidden', 'hidden');
		console.log('error', arguments);
	},
	complete: function () {
		bar.setAttribute('hidden', 'hidden');
		console.log('complete', arguments);
	},
	loadStart: function (e) {
		console.log('loadStart', arguments);
		bar.removeAttribute('hidden');
		bar.max = e.total;
		bar.value = e.loaded;
	},
	progress: function (e) {
		console.log('progress', arguments);
		bar.max = e.total;
		bar.value = e.loaded;
	},
	loadEnd: function (e) {
		console.log('loadEnd', arguments);
		bar.max = e.total;
		bar.value = e.loaded;
	},
	completeAll: function () {
		console.log('completeAll', arguments);
		setTimeout(function () {
			bar.setAttribute('hidden', 'hidden');
		}, 1000);
		alert('Upload Completed');
	}
});