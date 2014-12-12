$(function() {
	var statistics = '/statistics/';
	var urls = [ 'allInfo', 'gravidaSta', 'childrenSta', 'disCtrlSta',
			'disMngSta', 'medSvcSta' ];
	
	showAll();
	
	$('#query').click(function(){
		var startDate = $('#start_date').val();
		var endDate = $('#end_date').val();
		if(!startDate || !endDate){
			alert("日期无效!");
			return false;
		}
		if(new Date(startDate) - new Date(endDate) > 0){
			alert("开始日期不能大于结束日期!");
			return false;
		}
		showAll();
	});
	
	function showAll() {
		$('div.statistics_content').each(function(index) {
			show(ctx + statistics + urls[index], $(this));
		});
	};
	
	function show(url, container) {
		$.ajax({
			url : url,
			dataType : 'json',
			data: {
				startDate: $('#start_date').val(),
				endDate: $('#end_date').val()
			},
			success : function(datas, textStatus) {
				container.html('');
				createStaInfo(datas, container);
			},
			error : function(msg) {
				container.html('<span style="color: #f00;margin: 0 50px;display: inline-block;padding: 20px;">数据加载失败！</span>');
			}
		});
	}

	function createInfo() {
		return $('<div class="statistics_info"></div>');
	}

	function createCellInfo() {
		return $('<div class="cell_info"></div>');
	}

	function createCellTitle() {
		return $('<span class="cell_info_title"></span>');
	}

	function createCellText() {
		return $('<span></span>');
	}

	function createStaInfo(datas, container) {
		var info = null, cellInfo = null;
		for (var i = 0; i < datas.length; i++) {
			if(i < 3)
				container.append(createInfo());
			info = container.children('div.statistics_info').eq(i % 3);
			cellInfo = createCellInfo();
			cellInfo.append(createCellTitle().text(datas[i]['title']+':'));
			cellInfo.append(createCellText().text(datas[i]['count']));
			info.append(cellInfo);
		}
	}

});