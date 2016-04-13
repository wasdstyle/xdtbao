function okDialog(str) {
	art.dialog({
		content: str,
		okVal  : '确&nbsp;定',
		fixed  : true,
		lock   : true,
		opacity: 0.2,
		drag   : false,
		ok     : function() {},
		close  : function() {}
	});
}