$(function() {
	$.fn.fullpage({
		//背景颜色
		slidesColor: ['#fffff','#e4e4e4','#7BAABE','#316595','#dadada','#e9f6fd','#ffffff','#e7e7e7','#316595','#ff9900','#d7e4ea','#cfcfcf'],
		//小导航标志
		anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7', 'page8', 'page9', 'page10', 'page11', 'page12'],
		menu: '#menu',
		loopTop:true,
		loopBottom:true,
		scrollingSpeed:500,
		//verticalCentered: false,
		//navigation: true,
		//navigationPosition:'right',
		//autoScrolling:false,
		//开始
		afterLoad: function(anchorLink, index){
			if(index == 1){}
			
		},
		onLeave: function(index, direction){

		}
		//结束
	});
});