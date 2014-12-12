$(function(){
	
	queryYearMonth();
	
	//加载州市区县
	function queryYearMonth(){
		$.ajax({
	    	type:"post",
	    	url: ctx + "/orgUtilControllet/city",
	    	async:true,
	    	dataType:"json",
	    	success:function(data){

	    		if(data.length){
	    			loadRegion("dimcity","dimcounty",$("#dimcity_t").val());
	    		}else{
	    			$("#dimcity").select2();
	    			$("#dimcounty").select2();
	    			$("#dimcity").html("<option value=''>--请选择--</option>");
	    		}
	    		initDataInfo();
	    	}, error: function (msg) {
	        	$.gritter.add({
	          		title:	'提示',
	          		text:	"加载失败："+msg,
	          		sticky: false
	          	});
	        }
	    });
	}
	
	
	function initDataInfo(){
		
		$("#dimcity").select2("val",$("#dimcity_t").val());
		$("#dimcounty").select2("val",$("#dimcounty_t").val());
		
		
		
		/*$("#"+id).append("<span class='angular'>▼</span>");
		$("#col").val(id);*/
		$("#order").val("DESC");
	}
	
	$(".order").click(function(){
		var id = $(this).attr("id");
		var col = $("#col").val(); //原来点击的id
		if(col != ''){
			$("#"+col+" .angular").remove(); // 原来点击的id对象
		}
		var order = $("#order").val();
		if(id == col){
			// 每次点击排序不同
			if(order == 'DESC'){
				$("#"+id).append("<span class='angular'>▲</span>");
				order = 'ASC'; 
			}else{
				$("#"+id).append("<span class='angular'>▼</span>");
				order = 'DESC';
			}
		}else{
			$("#"+id).append("<span class='angular'>▼</span>");
			order = 'DESC';
		}
		$("#col").val(id);
		$("#order").val(order);
		drillQuery(id,order);
	});
	// 查询信息
	drillQuery = function doQueryData(col,order){
	
		var dimcity=$("#dimcity").val();
		var dimcounty=$("#dimcounty").val();
		var tab = $("#tab").val();
		var page = $("#page").val();
		$.ajax({
	    	type:"post",
	    	url: ctx + "/bizmonitor/pubservice/healthEducation/queryHERecordInfoAjax",
	    	data:{dimcity:dimcity,dimcounty:dimcounty,col:col,order:order,tab:tab},
	    	async:true,
	    	dataType:"json",
	    	success:function(data){
	    		if(data.flag == '1'){
	    			var data1 = data.retlist;
	    			var arr = new Array();
	    			
	    				for(var i = 0; i < data1.length;i++){
		    				arr.push("<tr>");
		    				if(data1[i].DIMCITYCODE != null){
		    					arr.push("<td nowrap='nowrap' style='overflow:hidden; text-overflow:ellipsis;' title='"+data1[i].DIMCITYDESC+"'>");
		    					arr.push("<a style='color:#0000ff;' href='#' onclick=drill("+data1[i].DIMCITYCODE+") >");
		    					arr.push(data1[i].DIMCITYDESC);
		    					arr.push("</a>");
		    					arr.push("</td>");
		    				}
		    				if(data1[i].DIMCOUNTYCODE != null){
		    					arr.push("<td nowrap='nowrap' style='overflow:hidden; text-overflow:ellipsis;' title='"+data1[i].DIMCOUNTYDESC+"'>");
		    					arr.push(data1[i].DIMCOUNTYDESC);
		    					arr.push("</td>");
		    				}
		    				
							arr.push("</tr>");
		    			}
		    			
	    			$("#dimyear").select2("val",data.dimyear);
	    			$("#dimcity").select2("val",data.dimcity);
	    			$("#dimcounty").select2("val",data.dimcounty);
	    		}else{
	    			$.gritter.add({
		          		title:	'提示',
		          		text:	"异常，查询失败",
		          		sticky: false
		          	});
	    		}
	    	}, error: function (msg) {
	        	$.gritter.add({
	          		title:	'提示',
	          		text:	"加载失败："+msg,
	          		sticky: false
	          	});
	        }
	    });
	};
	
});
//向下钻取时，提交信息
function drill(citycode){
	loadRegion("dimcity","dimcounty",citycode);
	$("#tab").val("2"); // 查询区县信息
	var col = $("#col").val();
	var order = $("#order").val();
	drillQuery(col,order);
}