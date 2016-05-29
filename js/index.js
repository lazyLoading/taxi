//多接口请求
$.zajaxV2 = function(settings){
	var settings = $.extend({
		    "type": "POST",
		     "url": "",
		    "postArr": [],
		    "dataType": "json",
     "successFunc": function(json){},
        "failFunc": function(json){}
	},settings);

	var len = settings.postArr.length;
	if(len<1) return;

	var count = 0;
	var processTip = true;
	var set = {};

	$.each(settings.postArr, function(){
		var funcName = this.func;
		var alias = this.alias;
		$.ajax({
			type: settings.type,                                          
			url: this.url,
			beforeSend: function(request) {
                request.setRequestHeader("requestType", "wap");
            },
			contentType: 'application/json;charset=UTF-8',         
			dataType: settings.dataType,                                    
			data: this.argument ? JSON.stringify(this.argument): '{}',       
			success: function (json) {
				if (json.responseCode==1000) {
					var nobj = {};
					alias ? nobj[alias] = json : nobj[funcName] = json;
					set = $.extend(set, nobj);	
				} else {
					var nobj = {};
					alias ? nobj[alias] = json : nobj[funcName] = json;
					set = $.extend(set, nobj);	

				}
				
				count++;
				if(len==count) {  //如果队列请求完成
					if (processTip) {    //如果所有请求成功
						settings.successFunc(set);
					} else {
						settings.failFunc(set);
					}
				}
			},
			error: function(xhr, type){

					var nobj = {};

					alias ? nobj[alias] = null : nobj[funcName] = null;

					set = $.extend(set, nobj);

					count++;
					if(len==count) {  //如果队列请求完成
						if (processTip) {    //如果所有请求成功
							settings.successFunc(set);
						} else {
							settings.failFunc(set);
						}
					}

			}
		});
		
	});

};

function GetRequest() { 
	var url = location.search; //获取url中"?"符后的字串 
	var theRequest = new Object(); 
	if (url.indexOf("?") != -1) { 
		var str = url.substr(1); 
		strs = str.split("&"); 
		for(var i = 0; i < strs.length; i ++) { 
			theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
		} 
	} 
	return theRequest; 
} 


//获取当前页面参数数组
var get_url_parames = function(){
	return GetRequest();
};

if (location.hostname.indexOf('qbao.com') != -1) {
  var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
  document.write(unescape("%3Cspan id='cnzz_stat_icon_1255072395'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s11.cnzz.com/z_stat.php%3Fid%3D1255072395%26show%3Dpic' type='text/javascript'%3E%3C/script%3E"));
} else {
  var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
  document.write(unescape("%3Cspan id='cnzz_stat_icon_1255070442'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s95.cnzz.com/z_stat.php%3Fid%3D1255070442%26show%3Dpic' type='text/javascript'%3E%3C/script%3E"));
}



//url中获取
$.urlParam = function (name) {
	var result = (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, ''])[1];
	return decodeURIComponent(result);
};

//价格格式转换
function priceformat(str) {
	var str = str.toString();
	var count = Math.floor((str.length - 1) / 3);
	var strtoarray = str.split('');
	strtoarray.reverse();
	for (var i = 1; i <= count; i++) {
		strtoarray.splice(3 * i + i - 1, 0, ',');
	}
	strtoarray.reverse();
	var formatnum = strtoarray.join('');
	return formatnum;
};