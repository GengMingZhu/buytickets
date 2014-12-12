$(function(){
	
	var isIE = false;
	var isMozila = false;
	
	checkIE();
	
	// 检查是否是IE
	function checkIE(){
		jQuery.browser = {};
		jQuery.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
		jQuery.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
		jQuery.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
		jQuery.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
		
		var ua = window.navigator.userAgent;  

		match = /MSIE ([\w.]+)/.exec(ua);
		if (match) {
			$.browser.version = match[1];
		} else {
			//document.write('Not IE Kernal');
		}
		isIE = $.browser.msie && $.browser.version <=8;
		isMozila = $.browser.mozilla;
	}
	// 进度条
	function loading(l,t){
		var longs = l || '100%';
		var time = t || 1000;
		$('.loading').clearQueue();
		$('.loading').animate({'width':longs},time);
//		console.debug(longs+"--"+time);
		if(longs == '100%'){
			$(".loading").fadeOut();
		}
	};
	loading('33%',500);
	
	loadData();
	function loadData(){
		var mpiindex = $("#mpiindex").val();
		$.ajax({
			url:ctx+"/person/loadData/"+mpiindex,
			type:"post",
			dataType:"json",
			async:true,
			success:function(data){
				var articleInfo = new Array(); // 右侧时间轴
				var data1 = data.phyout;
				loading('60%',500);
				var week_day_arr = ['星期日', '星期一','星期二','星期三','星期四','星期五','星期六'];
				//
				var mainAside = new Array(); // 左侧年月时间
				var time_year = "";
				var time_month = "";
				var len = data1.length;
				for(var i = 0 ; i < len; i++){
					var time = new Date();
					var datetime = "";
					var year = "";
					var month = "";
					var day = "";
					var week_day = "";
					if(data1[i].DATETIMEABST == " "){
						datetime = "xxxx-xx-xx";
						year = "xxxx";
						month = "xx";
						day = "xx";
						week_day = "xx";
					}else{
						time = new Date(Date.parse(data1[i].DATETIMEABST.replace(/-|\./g,"/")));
						datetime = data1[i].DATETIMEABST;
						year = time.getFullYear();
						month = time.getMonth()+1;
						day = time.getDate();
						week_day = week_day_arr[time.getDay()];
					}
					if(data1[i].TB_NAME == 'OUTPATEME'){
						articleInfo.push("<div class='article w351' data-year='"+year+"' data-month='"+month+"' data-day='"+day+"' id='article"+i+"'>");
						articleInfo.push("  <header>");
						articleInfo.push("	  <time datetime='"+datetime+"' class='time_base w45'>"+day+"</time>");
						articleInfo.push("	  <a style='color:#333;' class='outpateme' href='"+ctx+"/commonQuery/"+data1[i].OTP_PK+"?bizname=outpateme&mpiindex="+mpiindex+"' pk='"+data1[i].OTP_PK+"'>");
						articleInfo.push("	  <h2 class='titleOneLine'>");
						articleInfo.push(year+"年"+month+"月"+day+"日  "+week_day+"<span style='margin-left:10px;'>门诊</span><p style='text-align: center;'>"+data1[i].VISIT_ORG_NAME+"</p>");
						articleInfo.push("</h2>");
						articleInfo.push("	  </a>");
						articleInfo.push("</header>");
						articleInfo.push("<p>科室："+data1[i].VISIT_DEPT_NAME+"</p>");
						articleInfo.push("<p>医生："+data1[i].SERVICER_NAME+"</p>");
						articleInfo.push("<p>症状开始日期："+data1[i].SYMPTOM_START_DATE+"</p>");
						articleInfo.push("<p>主诉："+data1[i].SUBJECTIVE+"</p>");
						articleInfo.push("<p>治疗方案："+data1[i].TREAT_PLAN+"</p>");
						articleInfo.push("<p>门诊费用："+data1[i].CLIN_COST+"</p>");
						articleInfo.push("<p>门诊症状："+data1[i].CLIN_SYMPTOM_NAME+"</p>");
						articleInfo.push("<p>诊断："+data1[i].DIAG_NAME.replace(/[\r\n]/g, "")+"</p>");
						articleInfo.push("<hr>");
						articleInfo.push("<footer>");
//						articleInfo.push(" <span class='tags' style='float:right'><a href='"+ctx+"/outpatient/xml/"+mpiindex+"?otp_pk="+data1[i].OTP_PK+"' title='详细信息' rel='category tag'>详细信息</a></span>");
						articleInfo.push(" <span class='tags' style='float:right'><a class='outpateme' href='"+ctx+"/commonQuery/"+data1[i].OTP_PK+"?bizname=outpateme&mpiindex="+mpiindex+"' pk='"+data1[i].OTP_PK+"' title='详细信息' rel='category tag'>详细信息</a></span>");
						articleInfo.push(" <span class='tags' style='float:right;cursor: pointer;'><a class='mzpicture' pk='"+data1[i].CLIN_NO+"' title='查看影像' rel='category tag'>查看影像</a></span>");
						articleInfo.push(" </footer>");
						articleInfo.push("<span class='arrowLeft'></span>");
						articleInfo.push("</div>");
					}else if(data1[i].TB_NAME == 'PHYEXA'){
						articleInfo.push("<div class='article w351' data-year='"+year+"' data-month='"+month+"' data-day='"+day+"' id='article"+i+"'>");
						articleInfo.push("  <header>");
						articleInfo.push("	  <time datetime='"+datetime+"' class='time_base w45'>"+day+"</time>");
						
						articleInfo.push("	  <a style='color:#333;' class='phyexa' href='"+ctx+"/commonQuery/"+data1[i].FIELD_PK+"?bizname=phyexa&mpiindex="+mpiindex+"' pk='"+data1[i].FIELD_PK+"'>");
						articleInfo.push("	  <h2 class='titleOneLine'>");

						articleInfo.push(year+"年"+month+"月"+day+"日  "+week_day+"<span style='margin-left:10px;'>健康体检</span><p style='text-align: center;'>"+data1[i].TESTING_ORG_NAME+"</p>");
						articleInfo.push("</h2>");
						articleInfo.push("	  </a>");
						
						articleInfo.push("</header>");
						
						articleInfo.push("<p>身高(cm)："+data1[i].BODY_HEIGHT+"</p>");
						articleInfo.push("<p>体重(kg)："+data1[i].BODY_WEIGHT+"</p>");
						articleInfo.push("<p>腰围(cm)："+data1[i].WAIST_LINE+"</p>");
						articleInfo.push("<p>臀围(cm)："+data1[i].HIP_CIRCUM+"</p>");
						articleInfo.push("<p>心率(次/min)："+data1[i].HEART_RATE+"</p>");
						if(data1[i].FBS_VALUE >= 3.90 && data1[i].FBS_VALUE < 6.1){
							articleInfo.push("<p>空腹血糖值(mmol/L)："+data1[i].FBS_VALUE+"</p>");
						}else{
							articleInfo.push("<p style='font-weight: bold;'>空腹血糖值(mmol/L)："+data1[i].FBS_VALUE+"<span style='color:red;'>↑</span></p>");
						}
						articleInfo.push("<p>呼吸频率(次/分钟)："+data1[i].BREATHE_FREQ+"</p>");
						articleInfo.push("<p>左眼裸眼远视力值："+data1[i].LEFT_FSM+"</p>");
						articleInfo.push("<p>右眼裸眼远视力值："+data1[i].RIGHT_FSM+"</p>");
						articleInfo.push("<p>检查医生："+data1[i].TESTER_NAME+"</p>");
						
						articleInfo.push("<hr>");
						articleInfo.push("<footer>");
//						articleInfo.push(" <span class='tags' style='float:right'><a href='"+ctx+"/bodycheck/xml/"+mpiindex+"?field_pk="+data1[i].FIELD_PK+"' title='详细信息' rel='category tag'>详细信息</a></span>");
						articleInfo.push(" <span class='tags' style='float:right'><a class='phyexa' href='"+ctx+"/commonQuery/"+data1[i].FIELD_PK+"?bizname=phyexa&mpiindex="+mpiindex+"' pk='"+data1[i].FIELD_PK+"' title='详细信息' rel='category tag'>详细信息</a></span>");
						
						articleInfo.push(" </footer>");
						articleInfo.push("<span class='arrowLeft'></span>");
						articleInfo.push("</div>");
						
					}else if(data1[i].TB_NAME == 'INHS'){
						articleInfo.push("<div class='article w351' data-year='"+year+"' data-month='"+month+"' data-day='"+day+"' id='article"+i+"'>");
						articleInfo.push("  <header>");
						articleInfo.push("	  <time datetime='"+datetime+"' class='time_base w45'>"+day+"</time>");
						articleInfo.push("	  <a style='color:#333;' class='inhs' href='"+ctx+"/commonQuery/"+data1[i].INHS_PK+"?bizname=inhs&mpiindex="+mpiindex+"' pk='"+data1[i].INHS_PK+"'>");
						articleInfo.push("	  <h2 class='titleOneLine'>");
						articleInfo.push(year+"年"+month+"月"+day+"日  "+week_day+"<span style='margin-left:10px;'>住院</span><p style='text-align: center;'>"+data1[i].INPAT_ORG_NAME+"</p>");
						articleInfo.push("</h2>");
						articleInfo.push("	  </a>");
						articleInfo.push("</header>");
						articleInfo.push("<p>科室名称："+data1[i].INPAT_DEPT_NAME+"</p>");
						articleInfo.push("<p>入院日期："+data1[i].INPAT_DATE+"</p>");
						articleInfo.push("<p>出院日期："+data1[i].OUTPAT_DATE+"</p>");
						articleInfo.push("<p>住院症状："+data1[i].INPAT_SYMPTOM_NAME+"</p>");
						articleInfo.push("<p>住院诊断："+data1[i].INPAT_DIAG_NAME+"</p>");
						articleInfo.push("<p>医嘱："+data1[i].TREAT_PLAN+"</p>");
						articleInfo.push("<hr>");
						articleInfo.push("<footer>");
//						articleInfo.push(" <span class='tags' style='float:right'><a href='"+ctx+"/inpatient/xml/"+mpiindex+"?inhs_pk="+data1[i].INHS_PK+"' title='详细信息' rel='category tag'>详细信息</a></span>");
						articleInfo.push(" <span class='tags' style='float:right'><a class='inhs' href='"+ctx+"/commonQuery/"+data1[i].INHS_PK+"?bizname=inhs&mpiindex="+mpiindex+"' pk='"+data1[i].INHS_PK+"' title='详细信息' rel='category tag'>详细信息</a></span>");
						articleInfo.push(" <span class='tags' style='float:right;cursor:pointer;'><a class='zypicture' pk='"+data1[i].IN_HOS_NO+"' title='查看影像' rel='category tag'>查看影像</a></span>");
						articleInfo.push(" </footer>");
						articleInfo.push("<span class='arrowLeft'></span>");
						articleInfo.push("</div>");
					}else if(data1[i].TB_NAME == 'DIABETFOL'){
						articleInfo.push("<div class='article w351' data-year='"+year+"' data-month='"+month+"' data-day='"+day+"' id='article"+i+"'>");
						articleInfo.push("  <header>");
						articleInfo.push("	  <time datetime='"+datetime+"' class='time_base w45'>"+day+"</time>");
						articleInfo.push("	  <a style='color:#333;' class='diabetfol' href='"+ctx+"/commonQuery/"+data1[i].FIELD_PK+"?bizname=diabetfol&mpiindex="+mpiindex+"' pk='"+data1[i].FIELD_PK+"'>");
						articleInfo.push("	  <h2 class='titleOneLine'>");
						articleInfo.push(year+"年"+month+"月"+day+"日  "+week_day+"<span style='margin-left:10px;'>糖尿病</span><p style='text-align: center;'>"+data1[i].FOLLOWUP_ORG_NAME+"</p>");
						articleInfo.push("</h2>");
						articleInfo.push("	  </a>");
						articleInfo.push("</header>");
						articleInfo.push("<p>随访方式："+data1[i].FOLLOWUP_WAY_CD+"</p>");
						articleInfo.push("<p>随访医生："+data1[i].FOLLOWUP_DOCTOR_NAME+"</p>");
						if(data1[i].BS_2H_AF_EATING_VALUE >= 7.8 && data1[i].BS_2H_AF_EATING_VALUE < 11.1){
							articleInfo.push("<p style='font-weight: bold;'>餐后两小时血糖值（mmol/L）："+data1[i].BS_2H_AF_EATING_VALUE+"<span style='color:red;'>↑</span></p>");
						}else if(data1[i].BS_2H_AF_EATING_VALUE >= 11.1){
							articleInfo.push("<p style='font-weight: bold;'>餐后两小时血糖值（mmol/L）："+data1[i].BS_2H_AF_EATING_VALUE+"<span style='color:red;'>↑↑</span></p>");
						}else{
							articleInfo.push("<p>餐后两小时血糖值（mmol/L）："+data1[i].BS_2H_AF_EATING_VALUE+"</p>");
						}
						if(data1[i].SHB_VALUE <= 6.5){
							articleInfo.push("<p>糖化血红蛋白值(%)："+data1[i].SHB_VALUE+"</p>");
						}else{
							articleInfo.push("<p style='font-weight: bold;'>糖化血红蛋白值(%)："+data1[i].SHB_VALUE+"<span style='color:red;'>↑</span></p>");
						}
						
						articleInfo.push("<p>下次随访日期："+data1[i].NEXT_FOLLOWUP_DATE+"</p>");
						articleInfo.push("<hr>");
						articleInfo.push("<footer>");
//						articleInfo.push(" <span class='tags' style='float:right'><a href='"+ctx+"/diabet/xml/"+mpiindex+"?field_pk="+data1[i].FIELD_PK+"' title='详细信息' rel='category tag'>详细信息</a></span>");
						articleInfo.push(" <span class='tags' style='float:right'><a class='diabetfol' href='"+ctx+"/commonQuery/"+data1[i].FIELD_PK+"?bizname=diabetfol&mpiindex="+mpiindex+"' pk='"+data1[i].FIELD_PK+"' title='详细信息' rel='category tag'>详细信息</a></span>");

						articleInfo.push(" </footer>");
						articleInfo.push("<span class='arrowLeft'></span>");
						articleInfo.push("</div>");
					}else if(data1[i].TB_NAME == 'HYPETEFOL'){
						articleInfo.push("<div class='article w351' data-year='"+year+"' data-month='"+month+"' data-day='"+day+"' id='article"+i+"'>");
						articleInfo.push("  <header>");
						articleInfo.push("	  <time datetime='"+datetime+"' class='time_base w45'>"+day+"</time>");
						articleInfo.push("	  <a style='color:#333;' class='hypetefol' href='"+ctx+"/commonQuery/"+data1[i].FIELD_PK+"?bizname=hypetefol&mpiindex="+mpiindex+"' pk='"+data1[i].FIELD_PK+"'>");
						articleInfo.push("	  <h2 class='titleOneLine'>");
						articleInfo.push(year+"年"+month+"月"+day+"日  "+week_day+"<span style='margin-left:10px;'>高血压</span><p style='text-align: center;'>"+data1[i].FOLLOWUP_ORG_NAME+"</p>");
						articleInfo.push("</h2>");
						articleInfo.push("	  </a>");
						articleInfo.push("</header>");
						articleInfo.push("<p>随访方式："+data1[i].FOLLOWUP_WAY_CD+"</p>");
						articleInfo.push("<p>随访医生："+data1[i].FOLLOWUP_DOCTOR_NAME+"</p>");
						// 高血压
						if(data1[i].SBP >= 140 && data1[i].SBP < 160){
							articleInfo.push("<p style='font-weight: bold;'>收缩压（mmHg）："+data1[i].SBP+"<span style='color:red;'>↑</span></p>");
						}else if(data1[i].SBP >= 160 && data1[i].SBP < 180){
							articleInfo.push("<p style='font-weight: bold;'>收缩压（mmHg）："+data1[i].SBP+"<span style='color:red;'>↑↑</span></p>");
						}else if(data1[i].SBP >= 180){
							articleInfo.push("<p style='font-weight: bold;'>收缩压（mmHg）："+data1[i].SBP+"<span style='color:red;'>↑↑↑</span></p>");
						}else{
							articleInfo.push("<p>收缩压（mmHg）："+data1[i].SBP+"</p>");
						}
						// 舒张压
						if(data1[i].DBP >= 90 && data1[i].DBP < 100){
							articleInfo.push("<p style='font-weight: bold;'>舒张压（mmHg）："+data1[i].DBP+"<span style='color:red;'>↑</span></p>");
						}else if(data1[i].DBP >= 100 && data1[i].DBP < 110){
							articleInfo.push("<p style='font-weight: bold;'>舒张压（mmHg）："+data1[i].DBP+"<span style='color:red;'>↑↑</span></p>");
						}else if(data1[i].DBP >= 110){
							articleInfo.push("<p style='font-weight: bold;'>舒张压（mmHg）："+data1[i].DBP+"<span style='color:red;'>↑↑↑</span></p>");
						}else{
							articleInfo.push("<p>舒张压（mmHg）："+data1[i].DBP+"</p>");
						}
						if(data1[i].HEART_RATE > 100){
							articleInfo.push("<p style='font-weight: bold;'>心率(次/min)："+data1[i].HEART_RATE+"<span style='color:red;'>↑</span></p>");
						}else{
							articleInfo.push("<p>心率(次/min)："+data1[i].HEART_RATE+"</p>");
						}
						articleInfo.push("<p>下次随访日期："+data1[i].NEXT_FOLLOWUP_DATE+"</p>");
						articleInfo.push("<hr>");
						articleInfo.push("<footer>");
//						articleInfo.push(" <span class='tags' style='float:right'><a href='"+ctx+"/hyperfol/xml/"+mpiindex+"?field_pk="+data1[i].FIELD_PK+"' title='详细信息' rel='category tag'>详细信息</a></span>");
						articleInfo.push(" <span class='tags' style='float:right'><a class='hypetefol' href='"+ctx+"/commonQuery/"+data1[i].FIELD_PK+"?bizname=hypetefol&mpiindex="+mpiindex+"' pk='"+data1[i].FIELD_PK+"' title='详细信息' rel='category tag'>详细信息</a></span>");

						articleInfo.push(" </footer>");
						articleInfo.push("<span class='arrowLeft'></span>");
						articleInfo.push("</div>");
					}else if(data1[i].TB_NAME == "WOMENFOLPRO"){
						articleInfo.push("<div class='article w351' data-year='"+year+"' data-month='"+month+"' data-day='"+day+"' id='article"+i+"'>");
						articleInfo.push("  <header>");
						articleInfo.push("	  <time datetime='"+datetime+"' class='time_base w45'>"+day+"</time>");
						articleInfo.push("	  <a style='color:#333;' class='womenfolpro' href='"+ctx+"/commonQuery/"+data1[i].FIELD_PK+"?bizname=womenfolpro&mpiindex="+mpiindex+"' pk='"+data1[i].FIELD_PK+"'>");
						articleInfo.push("	  <h2 class='titleOneLine'>");

						articleInfo.push(year+"年"+month+"月"+day+"日  "+week_day+"<span style='margin-left:10px;'>产前随访</span><p style='text-align: center;'>"+data1[i].VISITING_ORG_NAME+"</p>");
						articleInfo.push("</h2>");
						articleInfo.push("	  </a>");
						articleInfo.push("</header>");
						articleInfo.push("<p>访视医生："+data1[i].VISIT_DOCTOR_NAME+"</p>");
						articleInfo.push("<p>孕周(周)："+data1[i].PREG_WEEK+"</p>");
						articleInfo.push("<p>末次月经日期："+data1[i].FINAL_MENSES_DATE+"</p>");
						articleInfo.push("<p>预产期："+data1[i].ECB_DATE+"</p>");
						articleInfo.push("<p>下次随访日期："+data1[i].NEXT_VISIT_DATE+"</p>");
						articleInfo.push("<hr>");
						articleInfo.push("<footer>");
//						articleInfo.push(" <span class='tags' style='float:right'><a href='"+ctx+"/womenfolpro/xml/"+mpiindex+"?field_pk="+data1[i].FIELD_PK+"' title='详细信息' rel='category tag'>详细信息</a></span>");
						articleInfo.push(" <span class='tags' style='float:right'><a class='womenfolpro' href='"+ctx+"/commonQuery/"+data1[i].FIELD_PK+"?bizname=womenfolpro&mpiindex="+mpiindex+"' pk='"+data1[i].FIELD_PK+"' title='详细信息' rel='category tag'>详细信息</a></span>");

						articleInfo.push(" </footer>");
						articleInfo.push("<span class='arrowLeft'></span>");
						articleInfo.push("</div>");
					}else if(data1[i].TB_NAME == "VACCINREP"){
						articleInfo.push("<div class='article w351' data-year='"+year+"' data-month='"+month+"' data-day='"+day+"' id='article"+i+"'>");
						articleInfo.push("  <header>");
						articleInfo.push("	  <time datetime='"+datetime+"' class='time_base w45'>"+day+"</time>");
						articleInfo.push("	  <a style='color:#333;' class='vaccinrep' href='"+ctx+"/commonQuery/"+data1[i].FIELD_PK+"?bizname=vaccinrep&mpiindex="+mpiindex+"' pk='"+data1[i].FIELD_PK+"'>");
						articleInfo.push("	  <h2 class='titleOneLine'>");
						articleInfo.push(year+"年"+month+"月"+day+"日  "+week_day+"<span style='margin-left:10px;'>预防接种</span><p style='text-align: center;'>"+data1[i].VACC_ORG_NAME+"</p>");
						articleInfo.push("</h2>");
						articleInfo.push("	  </a>");
						articleInfo.push("</header>");
						articleInfo.push("<p>疫苗名称："+data1[i].VACCINE_NAME+"</p>");
						articleInfo.push("<p>接种剂次："+data1[i].VACC_TIMES+"</p>");
						articleInfo.push("<p>接种部位："+data1[i].VACC_PART_CODE+"</p>");
						articleInfo.push("<p>疫苗有效日期："+data1[i].VACC_VALIDDATE+"</p>");
						articleInfo.push("<hr>");
						articleInfo.push("<footer>");
//						articleInfo.push(" <span class='tags' style='float:right'><a href='"+ctx+"/vaccinrep/xml/"+mpiindex+"?field_pk="+data1[i].FIELD_PK+"' title='详细信息' rel='category tag'>详细信息</a></span>");
						articleInfo.push(" <span class='tags' style='float:right'><a class='vaccinrep' href='"+ctx+"/commonQuery/"+data1[i].FIELD_PK+"?bizname=vaccinrep&mpiindex="+mpiindex+"' pk='"+data1[i].FIELD_PK+"' title='详细信息' rel='category tag'>详细信息</a></span>");

						articleInfo.push(" </footer>");
						articleInfo.push("<span class='arrowLeft'></span>");
						articleInfo.push("</div>");
					}
					// 判断年份是否相等
					if(year != time_year){
						// 输出年份
						time_year = year;
						mainAside.push("<li><a href='javascript:void(0);' title='"+year+"年' data-year = '"+year+"'>"+year+"s</a></li>");
						time_month = month;
						mainAside.push("<li><a href='javascript:void(0);' style='display: none;' title='"+month+"月' data-year = '"+year+"' data-month = '"+month+"'>"+month+"月</a></li>");
					}else if(month != time_month){
						// 输出月份
						time_month = month;
						mainAside.push("<li><a href='javascript:void(0);' style='display: none;' title='"+month+"月' data-year = '"+year+"' data-month = '"+month+"'>"+month+"月</a></li>");
					}
				}
				$(".articleInfo.fl").append(articleInfo.join(" "));
				$(".mainAside ul").append(mainAside.join(" "));
//				var start = new Date().getTime();  
				setPosition();
				loading('78%',1000);
//				var end = new Date().getTime();   
				//console.debug(end-start);
				// 点击年份
				yearClick();
				showPicture();
				loading('100%',1000);
			}
		});
	}

function setPosition() {
	var month = -1;
	var lastLeft = 0;
	var currIndex = -1;
	var lastFirstTime = '';
	var $timeLine = $('#timeLine');
	$('.article').each(function(index, element) {
		var $this = $(this); // 当前对象
		
		if ($this.find('h2').height() > 40) {
			$this.find('h2').removeClass('titleOneLine').addClass('titleTwoLine');
		}
		currIndex += 1;
		if (month != 0 && $this.attr('data-month') != month) {
			$this.css('clear', 'both');
			currIndex = 0;
			$timeLine.append("<div style='top:" + ($this.position().top == 0 ? 0: $this.position().top - 10) + "px'  class='timePoint_month' data-year='"+$this.attr('data-year')+"' data-month='"+$this.attr('data-month')+"'>"+ $this.attr('data-year') + "年" + $this.attr('data-month') + "月</div>");
			lastLeft = index;
		} else {
			if (index != 0 && $this.position().left == 73) {
				var top = $('#article' + lastLeft).position().top + $('#article' + lastLeft).height();
				var bottom = top;
				if (bottom - top > 40) {
					$this.css('margin-top', -Math.abs(50 - bottom + top) + 'px');
				}
				
				lastLeft = index;
			}
		}
		if (currIndex == 0)
		  lastFirstTime = $this.attr('data-day');
		if (currIndex == 1 && $this.attr('data-day') != lastFirstTime)
		  $this.css('margin-top', '55px');
		month = $this.attr('data-month');
		var styleTop = $this.position().top + 6 + parseInt($this.css('margin-top'));
		$timeLine.append('<div id="timePoint' + index + '" style="top:0px;"  class="timePoint"><time>' + month + '-' + $this.attr('data-day') + '</time></div>');
		$('#timePoint' + index).stop().animate({
			top: styleTop + 'px'
		},
		1500, 'swing');
//		isIE && $('#timePoint' + index + ' time').stop().animate({
//			'opacity': '0'
//		},
//		500);
//		$this.append('<span id="arrowLine' + index + '" class="arrowLine"></span>');
//		$this.mouseover(function() {
//			if ($this.position().left == 63) {
//				$('#arrowLine' + index).stop().animate({
//					width: '20px',
//					left: '-28px'
//				},
//				500);
//			} else {
//				$('#arrowLine' + index).stop().animate({
//					width: '410px',
//					left: '-418px'
//				},
//				300);
//			}
//			$('#timePoint' + index + ' time').stop().animate({
//				'opacity': '1'
//			},
//			500);
//		});
//		$this.mouseout(function() {
//			$('#arrowLine' + index).stop().animate({
//				width: '0',
//				left: '-8px'
//			},
//			200);
//			$('#timePoint' + index + ' time').stop().animate({
//				'opacity': '0'
//			},
//			500);
//		});
	});
	
	$(".article").mouseover(function() {
		var id = $(this).attr("id");
		var index = id.substring(7);
		
		$(this).append('<span id="arrowLine' + index + '" class="arrowLine"></span>');
		if ($(this).position().left == 63) {
			$('#arrowLine' + index).stop().animate({
				width: '20px',
				left: '-28px'
			},
			500);
		} else {
			$('#arrowLine' + index).stop().animate({
				width: '410px',
				left: '-418px'
			},
			300);
		}
		$('#timePoint' + index + ' time').stop().animate({
			'opacity': '1'
		},
		500);
	});
	$(".article").mouseout(function() {
		var id = $(this).attr("id");
		var index = id.substring(7);
		$('#arrowLine' + index).stop().animate({
			width: '0',
			left: '-8px'
		},
		200);
		$('#timePoint' + index + ' time').stop().animate({
			'opacity': '0'
		},
		500);
		$("span[class^='arrowLine']").remove();
	});
	
}
// 点击左侧年月 滑动页面
function yearClick(){
	$(".mainAside ul li a").click(function(){
		var year = $(this).attr("data-year");
		var month = $(this).attr("data-month");
		if(month == undefined){
			// 显示隐藏
			var size = $("a[data-year='"+year+"']:visible").size();
			if(size > 1){
				$("a[data-year='"+year+"']:gt(0)").hide();
			}else{
				$("a[data-year='"+year+"']:gt(0)").show();
			}
//			var top = $(".timePoint_month[data-year='"+year+"']").first().position().top + 410;
//			$("body").animate({scrollTop:top},500);
		}
		else{
			var top = $(".timePoint_month[data-year='"+year+"'][data-month='"+month+"']").first().position().top + 195;
			if(isMozila){
				top = top - 6;
			}
			$("html,body").animate({scrollTop:top},500);
		}
	});
}
// 左侧滚动
$(document).scroll(function(){
	var tp2 = $(".mainArticle.fr").position().top;
	var $leftMenuObj = $(".mainAside.fl");
	if($(this).scrollTop() > tp2){
		$leftMenuObj.stop().animate({top:"110px"},500);
		$leftMenuObj.css({position:"fixed",left:"3%"});
	}else{
		$leftMenuObj.stop().animate({top:"0px"},100);
		$leftMenuObj.css({position:"relative",top:"auto",left:"auto"});
	}
});
// 现在滚动到第一个位置
$("#archive").click(function(){
	var top = $(".mainArticle.fr").first().position().top;
	$("html,body").animate({scrollTop:top},500);
});

function showPicture(){
	//弹出影像图片窗口 
	$(".mzpicture,.zypicture").click(function(){
		var id = $(this).attr("pk");
		var cname = $(this).attr("class");
		var ak = "http://192.168.10.120:8090/Hinacomweb/DisplayImage.aspx?OEM=001&AutoClose=true&UserId=superadmin&UserName=superadmin&Role=Radiologist&IsThirdParty=true";
		if(cname == 'mzpicture'){
			ak += "&OutPatientID="+id+"";
		}else if(cname == 'zypicture'){
			ak += "&InhospitalID="+id+"";
		}
		//console.debug(cname+"--影像--"+id);
		window.showModalDialog(ak);
	});
}

});