$(function(){

	//自适应高度
	$("#leftside,#left").css("_height", $("#rightside").height() + 35).css(
			"min-height", $("#rightside").height() + 35);
    $("#leftside ul li,#left ul li").addClass("menu");
	//左侧菜单变化
	$("#leftside ul li,#left ul li").hover(function() {
        $(this).removeClass("menu")
        $(this).addClass("menuhover");
	}, function() {
        $(this).removeClass("menuhover")
        $(this).addClass("menu");
	});
	//置顶操作
	$("body").prepend('<div id="gotop">置顶</div><div class="clr"></div>');
	$(document).scroll(function(event) {
		if ($(this).scrollTop()<=100) {
			$("#gotop").fadeOut("slow");
            $("#left").css("top","130px");
		} else {
			$("#gotop").fadeIn("slow");
            $("#left").css("top","20px");
		}
	});
	$("#gotop").click(function(){
		$(document).scrollTop(0);
	});
/*	$(".form_chk").toggle(function(){
	},function(){

	});*/
    //菜单翻动
    $("#sliderbar").hide();
     var menu_length=  $("#left_menu li").length;
     var menu_height= -menu_length*(40+5)+10;
     $("#slidebardown").on('click',function(){
         if($("#left ul").position().top>menu_height+500){
             $("#slidebarup").removeClass("updisable").addClass("upshow");
             $("#left ul").css("top",$("#left ul").position().top-20);
         }else{
             $(this).removeClass("downshow").addClass("downdisable");
         }
     });
    $("#slidebarup").on('click',function(){
        if($("#left ul").position().top<0){
            $("#slidebardown").removeClass("downdisable").addClass("downshow");
            $("#left ul").css("top",$("#left ul").position().top+20);
        }
        else{
            $(this).removeClass("upshow").addClass("updisable");
        }


    });
    if(menu_length>10){
        $("#sliderbar").show();

    }

});