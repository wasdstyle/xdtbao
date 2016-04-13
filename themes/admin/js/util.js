Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //�? 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //�? 
        "s+": this.getSeconds(), //�? 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
} 

function message(data){
	var info = {};
	try{
		info=JSON.parse(data)
	}catch(e){
		console.log(e);
		info={"errorMsg":data};
	}
	console.log(info);
	if(info.msgType=='system'||info.msgType=='template'){
		$.messager.alert('错误信息', info.errorMsg, 'info');
		console.log(info.msgType);
		console.log(info.errorMsg);
	}else{
		$.messager.alert('提示信息', info.errorMsg, 'info');
		console.log(info.msgType);
		console.log(info.errorMsg);
	}
}

function pageDataFilterForGrid(data){
	var ret={};
	ret.total=data.page.total;
	ret.rows=data.list;
	return ret;
}

function pageDataFilterForCombo(data){
	var ret=data.list;
	return ret;
}