//DATABANK全站监测代码
var _ydspq = _ydspq || []; //_air
	_ydspq.push(['_setAccount', '5000248']);
	_ydspq.push(['_trackPageview']);	 

	(function() {
		var yda   = document.createElement('script'); 
		yda.type  = 'text/javascript'; 
		yda.async = true;
		yda.src   = ('https:' == document.location.protocol ? 'https://databank.air.yoyi.com.cn' : 'http://databank.air.yoyi.com.cn') + '/yat.js';

	    var s = document.getElementsByTagName('script')[0]; 
	    s.parentNode.insertBefore(yda, s);
	})();