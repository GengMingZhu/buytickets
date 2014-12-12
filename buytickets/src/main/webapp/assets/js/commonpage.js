/**
 * 分页js插件
 * 
 * @param formid 提交表单id
 * @param querybtn 查询表单按钮ID 
 * */
;(function($) {

	$.fn.pagecommon = function(formid,querybtn) {
		var ogv;
		$("#pageinput").on("focus", function() {
			ogv=$(this).val();
			$(this).val("");
             $("#pager li a").on("click",function(){
                 return false;
             })

		}).on("blur",function(){
			var pagenum=$(this).data("pagenum");
			var limit=$(this).data("pagelimit");
			var url=$(this).data("pageurl");
			var reg=/^[0-9]+$/;
			if(!reg.test($(this).val())||$(this).val()<1||$(this).val()>pagenum){
				alert('页码输入无效');
				$(this).val(ogv);
			}else{
				$("#"+formid).attr(
						"method", "post");
				$("#"+formid).attr(
						"action", url+($(this).val()-1)*limit);
				$("#"+formid).submit();
			}
                $("#pager li a").off("click");
			return false;
		});
		$(this).find("a").on("click",function(){
			var url=$(this).data("pageurl");
			$("#"+formid).attr(
					"method", "post");
			$("#"+formid).attr(
					"action", url);
			$("#"+formid).submit();
			return false;
		});
			
		$("#"+querybtn).on("click",function(){
			$("input[name=offset]").val("0");	
		});
	};
})(jQuery);