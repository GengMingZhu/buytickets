function drawVisualization(url,ele) {
	  // var mpiindex = $("#mpipk").val();
      // 创建时间轴
	   $.ajax({
	    	type:"get",
	    	url: url,
	    	async:true,
	    	dataType:"json",
	    	success:function(data){	
		      var dt = new google.visualization.DataTable();
		      dt.addColumn('datetime', 'start');
		      dt.addColumn('datetime', 'end');
		      dt.addColumn('string', 'content');
		      
		      for (var i = 0; i < data.length; i++) {
		    	  //获取事件的时间
		    	  var STARTDATE = data[i].STARTDATE;
		    	  //时间戳转化为DATA
		          var time_num =  new Date(STARTDATE); 
		          //获取事件的内容
		          var datacontent = data[i].DIAGCONTENT;  
		    	  dt.addRow([time_num,null, datacontent]);
              }
		      
		      //时间轴的宽高
		      var options = {
		        "width":  "100%",
		        "height": "200px",
		        "style": "box" // optional
		      };
		
		     // 初始化时间轴
		     var timeline = new links.Timeline(ele);
		    
		     //时间轴添加事件及样式
		      timeline.draw(dt, options);
		    }
    
	   });
 	} 	  
