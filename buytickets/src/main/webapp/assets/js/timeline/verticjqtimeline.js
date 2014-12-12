$(function() {
  
	
		
	
	  function initLiNodes() {

		  $.ajax({
		    	type:"get",
		    	async:true,
		    	dataType:"json",
		    	success:function(data){	
		    		var dt =$(data)[0].phyout;
		    		var ct = dt.length;
		    		
		    		//添加纵向时间轴样式
		    		var ulNode = $('ul.vertictimeline');
		    	
		    		
		    		 
			    		 var liNodes = ulNode.find('li'), count = liNodes.length, i, liNode;
			    		  for(i=0; i<count; i++) {
				    		  liNode = $(liNodes.get(i));
				    		  if(i % 2 !== 0) {
				    		 liNode.addClass('alt');
				    		  } else {
				    		  liNode.removeClass('alt');
				    		  }
				    		  if($(liNodes[i]).attr("id") == "outpat"){
				    			  liNode.find('.number').append(" <img src='/ehr/assets/css/img/outpatient.png'></img>");
				    		  }
				    		  else if($(liNodes[i]).attr("id") == "phyexamin")
				    			  {	  
				    			  liNode.find('.number').append(" <img src='/ehr/assets/css/img/bodycheck.png'></img>");
				    			  }
				    		  
	
			    		  }
		
		    	}
		  });
	  }
	  
	 
	  
	  initLiNodes();
});