/**
 * 
 * @param dimcityId 州市下拉菜单
 * @param dimcountyId 区县下拉菜单
 * @param dimcity 页面加载刷新时已选定州市值
 */
function loadRegion(dimcityId,dimcountyId,dimcity){
	$("#"+dimcityId).select2();
	$("#"+dimcountyId).select2();
	$("#"+dimcountyId).select2('val',$("#"+dimcountyId+" option:eq(0)").val());
	
	//加载州市
	$.ajax({
		
		url:ctx+"/orgUtilControllet/city",
		type:"post",
		dataType:"json",
		async:false,
		success:function(data){
			var option="";
			if(data!=null)
				if(data.length==1){//只有一个结果时，则认为是区县级用户，州市不可选择
					option="<option value='"+data[0].DICCODE+"'>"+data[0].DICVALUE+"</option>";
					dimcity=data[0].DICCODE;
				}else{
					option="<option value=''>--请选择--</option>";
					for(var i=0;i<data.length;i++){
						option+="<option value='"+data[i].DICCODE+"'>"+data[i].DICVALUE+"</option>";
					}
				}
			$("#"+dimcityId).html(option);
			if(dimcity == ""){
				$("#"+dimcityId).select2('val',$("#"+dimcityId+" option:eq(0)").val());
			}else{
				$("#"+dimcityId).select2('val',dimcity);
			}
			
		}
	});
	//页面加载时如果dimcity有值，则查询区县
	if(dimcity!=undefined&&dimcity!=''){
		$.ajax({
			url:ctx+"/orgUtilControllet/county",
			data:{dimcity:dimcity},
			type:"post",
			dataType:"json",
			async:false,
			success:function(data){
				var option="<option value=''>--请选择--</option>";
				if(data!=null)
					for(var i=0;i<data.length;i++){
						option+="<option value='"+data[i].DICCODE+"'>"+data[i].DICVALUE+"</option>";
					}
				$("#"+dimcountyId).html(option);
				$("#"+dimcountyId).select2('val',$("#"+dimcountyId+" option:eq(0)").val());
			}
		});
	}
	//级联区县
	$("#"+dimcityId).change(function(){
		var diccode=$(this).val();
		$.ajax({
			url:ctx+"/orgUtilControllet/county",
			data:{dimcity:diccode},
			type:"post",
			dataType:"json",
			async:false,
			success:function(data){
				var option="<option value=''>--请选择--</option>";
				if(data!=null)
					for(var i=0;i<data.length;i++){
						option+="<option value='"+data[i].DICCODE+"'>"+data[i].DICVALUE+"</option>";
					}
				$("#"+dimcountyId).html(option);
				$("#"+dimcountyId).select2('val',$("#"+dimcountyId+" option:eq(0)").val());
			}
		});
	});
};