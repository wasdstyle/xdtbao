/**
 * ${webname!}
 * @name 自定义分享
 * @description 功能模块
 * @date 2014-09-17
 * @version $V1.0$
 */
define(function(require, exports, module) {
	require('jquery');
	require('pop_frame');
	/*
	  HTML：
		*<ul id="qianShare">
		*	<li><a data-share="xlwb" href="javascript:;" target="_blank">新浪微博</a></li>
		*	<li><a data-share="txwb" href="javascript:;" target="_blank">腾讯微博</a></li>
		*	<li><a data-share="qqkj" href="javascript:;" target="_blank">QQ空间</a></li>
		*	<li><a data-share="qq" href="javascript:;" target="_blank">腾讯QQ</a></li>
		*	<li><a data-share="rr" href="javascript:;" target="_blank">人人</a></li>
		*	<li><a data-share="wx" href="javascript:;" data-erw="http://qian.wdaics.com/test/new/image/ico_apperw.png" target="_blank">微信</a></li>
		*</ul>
	  JS：
		* oShare.set({
		* 	'url': 'http://www.baidu.com',
		* 	'title': '标题',
		* 	'content': '文字描述',
		* 	'pic': 'http://qian.wdaics.com/test/new/image/icon/home_base.png'
		* });
	*/
	var QianShare = function(_box) {
		var $box = $('#' + _box),
			pointer = this,
			o = {
				url: '', 		//分享链接
				title: '', 		//标题
				content: '', 	//内容
				pic: '' 		//配图
			};
		this.set = function(obj) {
			for (var objVal in obj) {
				o[objVal] = obj[objVal];
			}
			$box.find('[data-share]').each(function() {
				$(this).attr('href', pointer.addHref($(this).data('share')));
			});
		}
		this.addHref = function(_type) {
			switch (_type) {
				case 'xlwb':
					return 'http://service.weibo.com/share/share.php?url=' + o.url + '&type=icon&ralateUid&language=zh_cn&title=' + o.content + '&pic=' + o.pic + '&searchPic=true&style=simple';
					break;
				case 'txwb':
					return 'http://share.v.t.qq.com/index.php?c=share&a=index&url=' + o.url + '&appkey=&title=' + o.content + '&pic=' + o.pic + '&line1=';
					break;
				case 'qq':
					return 'http://connect.qq.com/widget/shareqq/index.html?url=' + o.url + '&desc=&title=' + o.title + '&summary=' + o.content + '&pics=' + o.pic + '&flash=&site=&style=203&width=16&height=16&showcount=';
					break;
				case 'rr':
					return 'http://widget.renren.com/dialog/share?resourceUrl=' + o.url + '&srcUrl=' + o.url + '&title=' + o.title + '&description=' + o.content + '&pic=' + o.pic + '&charset=UTF-8';
				case 'qqkj':
					return 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + o.url + '&showcount=1&desc=&summary=' + o.content + '&title=' + o.title + '&site=&pics=' + o.pic + '&style=203&width=98&height=22&otype=share';
					break;
				case 'wx':
					var popHtml = '';
					popHtml += '<div class="row t_a_c p_t_20">';
					popHtml += '<img src="'+$box.find('[data-erw]').data('erw')+'" width="220" height="220">';
					popHtml += '</div>';
					popHtml += '<div class="row" style="position: absolute;bottom:0;left:0;width: 100%;height:60px;border-top: 1px solid #ddd;">';
					popHtml += '<p style="padding:10px">打开微信，点击底部的“发现”，使用 “扫一扫” 即可将网页分享到我的朋友圈。</p>';
					popHtml += '</div>';
					$box.find('[data-share="wx"]').pop({
						bBefore: true, 				//是否允许触发弹出层
						sTitle: "分享到微信朋友圈",	//弹出层标题
						bAutoClose: false, 			//是否自动关闭
						iCloseTime: 3, 				//几秒关闭
						iWidth: "370", 				//宽度
						iHeight: "370", 			//高度
						iSrc: "", 					//iframe地址
						sContent:popHtml, 			//不是iframe,采用html输出
						bShade: true, 				//是否有遮罩
						oTrigger: "", 				//触发弹出的对象(用于回调函数取对象)
						bHideClose: true, 			//以删除的方式关闭，否则为隐藏
						bShadeClose: true, 			//是否点遮罩关闭
						bNull: true, 				//是否事件没绑定直接弹出
						fnInit: "", 				//弹出前触发函数
						fnAfterInit: "", 			//弹出后触发函数
						fnClose: "" 				//关闭触发函数
					});
					break;
				default:
					throw '未定义'+_type+'分享';
			}
		}
	}
	module.exports = QianShare;
});