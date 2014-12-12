$(function(){
	$("#submit").click(function(){
		var email = $("#email").val();
		var password = $("#password").val();
		var code = $("#code").val();
	});
	
	function getCookies(){
		$.ajax({
	    	type:"post",
	    	url: ctx + "/cockpit/ms/queryMsYearMonth",
	    	async:true,
	    	dataType:"json",
	    	success:function(data){
	    		var arr = new Array();
	    		for(var i = 0 ;i< data.ret.length; i++){
	    			arr.push("<option value='"+data.ret[i].ID+"'>"+data.ret[i].TEXT+"</option>");
	    		}
	    		var str = arr.join(" ");
	    		$("#dimyear").html(str);
	    		$("#dimyear").select2('val', $('#dimyear option:eq(0)').val());		
	    		// 初始化页面数据
	    		initPageData();
	    		// 初始化弹窗
	    		initAlertModel();
	    	}, error: function (msg) {
	        	$.gritter.add({
	          		title:	'提示',
	          		text:	"加载失败："+msg,
	          		sticky: false
	          	});
	        }
	    });
	}
});