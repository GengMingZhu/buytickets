$(function(){
	$(".menubox li").click(function(){
		var index = $(this).index();
		$(".menubox li").removeClass("hover");
		$(".menubox li:eq('"+index+"')").addClass("hover");
		$(".table1").hide();
		$(".table1:eq('"+index+"')").show();
	});
	// 开启浮动层
	$(".menubox li:eq(2),.title a:eq(1)").click(function(){
		if($("#menuList").hasClass("s")){
			$("#menuList").removeClass("s").stop().animate({left:'100%'});
		}else{
			$(".menubox li:eq(0)").click();
			$("#menuList").addClass("s").stop().animate({left:'30%'});
		}
	});
});