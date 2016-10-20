/*
 *	Author		:蔡应
 *	Time		：2014年7月18日15:08:21
 *	Abstract	：广州长隆改版——长隆欢乐世界内页js文件
 *
 */

//欢乐旅程
if( getByClass02("equipMenuWrap")[0] ){
	fnRides();
}
function fnRides(){
	var oUrl = window.location.href;
		urlRides = oUrl.split("/")[oUrl.split("/").length-2],
		urlEq = oUrl.split("/")[oUrl.split("/").length-1].split(".")[0],
		arrUrlR = ["xfd","jjdd","hbet","chw","ssj","hytd"],
		arrUrl = [ 
			["uxhb","cletjx","zzb","jffy","mxgcm","ppc","yyc"], //旋风岛
			["shgsc","mtgsc","dlss"] ,   //尖叫地带
			["jlxt","qmcd","kzjc","mhzm","btc","sbqq","jhxf","bjtx","klgx","hltt","ttt","kxly"] ,	//哈比儿童王国
			["czgsc","cjdbc","fmjtgsc","fkbs"] ,	//彩虹湾
			["cjsz","ppc","jlyj","hdpl"] ,	//欢乐水世界
			["swyy","slsm","xjjz"]	//幻影天地
		],
		iRides = 0,		//当前栏目位置
		iEq = 0;		//当前设备位置
		
		//确定当前页面位置
		for ( var i=0; i<arrUrlR.length ; i++ ){
			if( arrUrlR[i] == urlRides){
				iRides = i;
				for( var z=0; z<arrUrl[iRides].length ; z++){
					if( arrUrl[iRides][z] == urlEq){
						iEq = z;
						break;
					}
				}
				break ;
			}
		}
		//console.log(oUrl+":"+urlRides+":"+urlEq+":"+iThis+":"+iEq);
	
	//添加当前位置效果
	
	
	//二级导航
	var ridesMenu = getByClass02("ridesMenu")[0],
		aRidesMenu = ridesMenu.getElementsByTagName("a"),
		moveActive = getByClass(ridesMenu,"moveActive")[0];
	
	aRidesMenu[iRides].className = "active";
	moveActive.style.left = 120*iRides+"px";
	
	for( var i=0; i<aRidesMenu.length ; i++){
		aRidesMenu[i].index = i; 
		aRidesMenu[i].onmouseover = function(){
			for( var z=0; z<aRidesMenu.length ; z++){
				aRidesMenu[z].className = "null";
			}
			aRidesMenu[this.index].className = "active";
			startMove(moveActive ,{"left":120*this.index},5);
		}
		aRidesMenu[i].onmouseout = function(){
			for( var z=0; z<aRidesMenu.length ; z++){
				aRidesMenu[z].className = "null";
			}
			aRidesMenu[iRides].className = "active";
			startMove(moveActive ,{"left":120*iRides},5);
		}	
	}
	
	//设备导航
	var parWrap = getByClass02("equipMenuWrap")[0],
		equipIcon = getByClass(parWrap,"equipIcon")[0],
		equipNum = getByClass(parWrap,"equipNum")[0],
		equipList = getByClass(parWrap,"equipList")[0],
		listItem = equipList.getElementsByTagName("ul"),
		aList = equipList.getElementsByTagName("a"),
		equipPrev = getByClass(parWrap,"equipPrev")[0],
		equipNext = getByClass(parWrap,"equipNext")[0],
		iNum = Math.ceil(aList.length/5),
		iIcon = Math.ceil((iEq+1)/5);
	
	equipNum.innerHTML = "<em>"+iIcon+"<\/em>/"+iNum; 
	var iEquipNum = equipNum.getElementsByTagName("em")[0];
		
	for( var i=0; i<iNum; i++){
		equipIcon.innerHTML+= '<a href="javascript:;"></a>' ;
	}
	var aIcon = equipIcon.getElementsByTagName("a");
	
	aList[iEq].className = "active";
	listItem[iIcon-1].className = "active"; 
	aIcon[iIcon-1].className = "active";
	
	//设备导航效果
	var iEqThis = iIcon-1;
	
	for( var i=0; i<aIcon.length ; i++){
		aIcon[i].index = i;
		aIcon[i].onmouseover = function(){
			iEqThis = this.index;
			aniEq();
		}
	}
	equipPrev.onclick = function(){
		if( iEqThis > 0){
			iEqThis--;
		}else {
			iEqThis = iNum-1;
		}
		aniEq();
	}
	equipNext.onclick = function(){
		if( iEqThis < iNum-1 ){
			iEqThis++;
		}else {
			iEqThis = 0;
		}
		aniEq();
	}
	function aniEq(){
		iEquipNum.innerHTML = iEqThis+1;
		for( var z=0; z<aIcon.length ; z++){
			aIcon[z].className = listItem[z].className = "null";
		}
		aIcon[iEqThis].className = listItem[iEqThis].className = "active";
	}
	
	//底部导航
	var ridesBotNav = document.getElementById("ridesBotNav"),
		parDl = ridesBotNav.getElementsByTagName("dl")[0],
		oDt = ridesBotNav.getElementsByTagName("dt")[0],
		parDd = ridesBotNav.getElementsByTagName("dd")[0],
		aDd = parDd.getElementsByTagName("a"),
		iconNav = getByClass(ridesBotNav,"iconNav")[0],
		aIconNav = iconNav.getElementsByTagName("li");
	
	oDt.innerHTML = aDd[iRides].innerHTML;	
	
	aIconNav[iEq].className = "active";
	
	var timerAIcon=null;
	
	for( var i=0; i<aIconNav.length ; i++){
		aIconNav[i].index = i;
		aIconNav[i].onmouseover = function(){
			clearInterval( timerAIcon);
			for( var z=0; z<aIconNav.length ; z++){
				aIconNav[z].className = "null";
			}
			aIconNav[this.index].className = "active";
		}
		aIconNav[i].onmouseout = function(){
			timerAIcon = setInterval(function(){
					for( var z=0; z<aIconNav.length ; z++){
						aIconNav[z].className = "null";
					}
					aIconNav[iEq].className = "active";
			},500)
		}
		aIconNav[i].onclick = function(){
			window.location.href = this.getElementsByTagName("a")[0].href;
		}
	}     
	
	
	var parDlTimer = null;
	parDl.onmouseover = function(){
		clearTimeout(parDlTimer);
		parDd.style.display = "block";
	}
	parDl.onmouseout = function(){
		parDlTimer = setTimeout(function(){
			parDd.style.display = "none";
		},500);
	}
	
	
	var ridesCon = document.getElementById("ridesCon"),
		webPrev = getByClass(ridesCon,"webPrev")[0],
		webNext = getByClass(ridesCon,"webNext")[0];
	
	myAddEvent(window,"scroll",function(){
		var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
		if( scrollTop > 250 &&  scrollTop < 1100){
			ridesBotNav.style.display = webPrev.style.display = webNext.style.display =  "block";
			webPrev.style.top = webNext.style.top =	scrollTop+200+"px";		
		}else {
			ridesBotNav.style.display = webPrev.style.display = webNext.style.display =  "none";
		}
	})
	
}


//欢乐旅程焦点图
if(getByClass02("equipPic")[0]){
	fnEqPic();
}
function fnEqPic(){
	var equipPic = getByClass02("equipPic")[0],
		eqMaxPic = getByClass(equipPic,"eqMaxPic")[0],
		aMaxPic = eqMaxPic.getElementsByTagName("img"),
		eqMinPic = getByClass(equipPic,"eqMinPic")[0],
		aMinPic = eqMinPic.getElementsByTagName("li"),
		picPrev = getByClass(equipPic,"picPrev")[0],
		picNext = getByClass(equipPic,"picNext")[0],
		iThis = 0;
	
	for( var i=0; i<aMinPic.length ; i++){
		aMinPic[i].index = i;
		aMinPic[i].onclick = function(){
			iThis = this.index;
			aniEqPic();
		}
		aMinPic[i].onmouseover = function(){
			clearInterval(timer);
		}
		aMinPic[i].onmouseout = function(){
			timer = setInterval(function(){
				if( iThis < aMinPic.length-1 ){
					iThis++;
				}else {
					iThis = 0;
				}
				aniEqPic();
			},2500);
		}
	}
	picPrev.onmouseover = picNext.onmouseover = function(){
		clearInterval(timer);
	}
	picPrev.onmouseout = picNext.onmouseoutr = function(){
		timer = setInterval(function(){
			if( iThis < aMinPic.length-1 ){
				iThis++;
			}else {
				iThis = 0;
			}
			aniEqPic();
		},2500);
	}
	
	picPrev.onclick = function(){
		if( iThis > 0){
			iThis--;
		}else {
			iThis = aMinPic.length-1;
		}
		aniEqPic();
	}
	picNext.onclick = function(){
		if( iThis < aMinPic.length-1 ){
			iThis++;
		}else {
			iThis = 0;
		}
		aniEqPic();
	}
	var timer = setInterval(function(){
			if( iThis < aMinPic.length-1 ){
				iThis++;
			}else {
				iThis = 0;
			}
			aniEqPic();
		},2500);
	
	/*function aniEqPic(){
		for( var z=0; z<aMinPic.length ; z++){
			aMinPic[z].className = "null";
			aMaxPic[z].style.zIndex = 9;
			startMove(aMaxPic[z],{"opacity":0},8);
		}
		aMinPic[iThis].className = "active";
		aMaxPic[iThis].style.zIndex = 10;
		startMove(aMaxPic[iThis],{"opacity":100},8);
	}*/
	function aniEqPic(){
		for( var z=0; z<aMinPic.length ; z++){
			aMinPic[z].className = "null";
			aMaxPic[z].style.zIndex = 9;
			startMove(aMaxPic[z],{"opacity":0,"width":0,"height":0,"left":330,"top":185},12);
		}
		aMinPic[iThis].className = "active";
		aMaxPic[iThis].style.zIndex = 10;
		aMaxPic[iThis].style.width = "660px";
		aMaxPic[iThis].style.height = "370px";
		aMaxPic[iThis].style.left = "4px";
		aMaxPic[iThis].style.top = "4px";
		startMove(aMaxPic[iThis],{"opacity":100},8);
		if(aMinPic.length >4){
			if( iThis >2 ){
				startMove(eqMinPic,{"left":(2-iThis)*160},5);
			}else if( iThis <=2 ){
				startMove(eqMinPic,{"left":0},5);
			}
			
		}
	}	
}


//欢乐旅程
if(getByClass02("quickRides")[0] ){
	fnQuickRides();
}
function fnQuickRides(){
	var quickRides = getByClass02("quickRides")[0],
		aQuick = quickRides.getElementsByTagName("a");
	for( var i=0; i<aQuick.length ; i++){
		aQuick[i].index = i;
		
		aQuick[i].onmouseover = function(){
			
			for( var z=0; z<aQuick.length ; z++){
				startMove(aQuick[z],{"paddingTop":0},5);
			}
			startMove(this,{"paddingTop":94},5);
		}
	}
		
}

//内页页面标题
if( getByClass02("webTitle")[0] ){
	fnWebTitle();
}
function fnWebTitle(){
	var webTitle = getByClass02("webTitle")[0],
		left = getByClass(webTitle,"bgLeft")[0],
		right = getByClass(webTitle,"bgRight")[0],
		text = webTitle.getElementsByTagName("em")[0];
	
	 setTimeout(function(){
		startMove(left,{"opacity":100},15);	
		startMove(right,{"opacity":100},15);
		startMove(text,{"opacity":100},20);	
	 },500);	
}

//内页页面切换
if( document.getElementById("slideWeb") ){
	fnShow();
}
function fnShow(){
	
	var oConWrap = document.getElementById("slideWeb"),
		oMenu = getByClass(oConWrap,"slideWebMenu")[0],
		oContent = document.getElementById("slideWebCon"),
		aMenu = oMenu.getElementsByTagName("a"),
		aCon = getByClass(oContent,"webItem"),
		oPrev = getByClass(oConWrap,"slideWebPrev")[0],
		oNext = getByClass(oConWrap,"slideWebNext")[0],
		aShadow = getByClass(oContent,"webShadow"),
		dHeight = 700,
		iNow = 0;
		
	oConWrap.style.height = aCon[iNow].offsetHeight+400+"px";
	
	var arrHeight = [];
	for( var i=0; i<aCon.length ; i++){
		aCon[i].index = i; 
		arrHeight.push(aCon[i].offsetHeight+400);
		//if ( i!=0){aCon[i].style.height = dHeight+"px"; }
	}
	
	
	//滚动事件
	var scrollTop = 0;
	
	myAddEvent( window,"scroll",winScroll);
	
	function winScroll(){
		scrollTop = document.documentElement.scrollTop||document.body.scrollTop ;
		for( var i=0; i<aCon.length ; i++){
			if ( i!=iNow){
				aCon[i].style.marginTop = scrollTop+"px"; 
			}
		}
	}
	
	
	for( var x=0; x<aMenu.length ; x++){
		aMenu[x].index = aShadow[x].index = x;
		aShadow[x].onclick = aMenu[x].onclick = function(){
			iNow = this.index; 
			fnAniWeb();
		}
		 
	}
	
	
	//伪地址
	var oUrl = window.location.hash;
	var patt1=new RegExp("#web");
	var patt2 = /[1-9]/g;
	if( patt1.test(oUrl)){
		iNow = oUrl.match(patt2)-1;
		fnAniWeb();
	}
	
	if(getByClass02("share_ico")[0]){
		getByClass02("share_ico")[0].onclick = function(){
			iNow =1;
			fnAniWeb();
		}
	}
	oPrev.onclick = function(){
		if( iNow > 0){
			iNow--;
		}else {
			iNow = aMenu.length-1;
		}
		fnAniWeb();
	}
	oNext.onclick = function(){
		if( iNow < aMenu.length-1 ){
			iNow++;
		}else {
			iNow = 0;
		}
		fnAniWeb();
	}
	
	
	function fnAniWeb(){
		for( var z=0; z<aCon.length ; z++){
			/*if ( z!=iNow){ 
				aCon[z].style.height = dHeight+"px"; 
			}else {
				aCon[z].style.height = arrHeight[z]+"px";
			}
			*/aShadow[z].style.display = "block";
			aCon[z].style.marginTop = 0; 
			aMenu[z].className = "null" ;
		}
		window.location.hash ="#web0"+(iNow+1);
		oConWrap.style.height = aCon[iNow].offsetHeight+400+"px";
		aShadow[iNow].style.display = "none";
		aMenu[iNow].className = "active";
		startMoveScrollTop(1,100);
		startMove(oContent,{"left":-1090*iNow},8);
		myAddEvent( window,"scroll",winScroll);
	}

}


//精彩演艺焦点图
if(getByClass02("showFocusPic")[0]){
	for( var i=0 ; i<getByClass02("showFocusPic").length ; i++){
		fnShowPic(i);
	}
}
function fnShowPic(iNum){
	var equipPic = getByClass02("showFocusPic")[iNum],
		eqMaxPic = getByClass(equipPic,"eqMaxPic")[0],
		aMaxPic = eqMaxPic.getElementsByTagName("img"),
		eqMinPic = getByClass(equipPic,"eqMinPic")[0],
		aMinPic = eqMinPic.getElementsByTagName("li"),
		picPrev = getByClass(equipPic,"picPrev")[0],
		picNext = getByClass(equipPic,"picNext")[0],
		iThis = 0;
	
	for( var i=0; i<aMinPic.length ; i++){
		aMinPic[i].index = i;
		aMinPic[i].onclick = function(){
			iThis = this.index;
			aniEqPic();
		}
		aMinPic[i].onmouseover = function(){
			clearInterval(timer);
		}
		aMinPic[i].onmouseout = function(){
			timer = setInterval(function(){
				if( iThis < aMinPic.length-1 ){
					iThis++;
				}else {
					iThis = 0;
				}
				aniEqPic();
			},2500);
		}
	}
	picPrev.onmouseover = picNext.onmouseover = function(){
		clearInterval(timer);
	}
	picPrev.onmouseout = picNext.onmouseoutr = function(){
		timer = setInterval(function(){
			if( iThis < aMinPic.length-1 ){
				iThis++;
			}else {
				iThis = 0;
			}
			aniEqPic();
		},2500);
	}
	
	picPrev.onclick = function(){
		if( iThis > 0){
			iThis--;
		}else {
			iThis = aMinPic.length-1;
		}
		aniEqPic();
	}
	picNext.onclick = function(){
		if( iThis < aMinPic.length-1 ){
			iThis++;
		}else {
			iThis = 0;
		}
		aniEqPic();
	}
	var timer = setInterval(function(){
			if( iThis < aMinPic.length-1 ){
				iThis++;
			}else {
				iThis = 0;
			}
			aniEqPic();
		},2500);
	
	/*function aniEqPic(){
		for( var z=0; z<aMinPic.length ; z++){
			aMinPic[z].className = "null";
			aMaxPic[z].style.zIndex = 9;
			startMove(aMaxPic[z],{"opacity":0},8);
		}
		aMinPic[iThis].className = "active";
		aMaxPic[iThis].style.zIndex = 10;
		startMove(aMaxPic[iThis],{"opacity":100},8);
	}*/
	function aniEqPic(){
		for( var z=0; z<aMinPic.length ; z++){
			aMinPic[z].className = "null";
			aMaxPic[z].style.zIndex = 9;
			startMove(aMaxPic[z],{"opacity":0},12);
		}
		aMinPic[iThis].className = "active";
		aMaxPic[iThis].style.zIndex = 10;
		startMove(aMaxPic[iThis],{"opacity":100},8);
	}
		
}



//欢乐商城导航

if(getByClass02("shopMenu")[0]){
	fnShopMenu();
}
function fnShopMenu(){
	var shopMenu = getByClass02("shopMenu")[0],
		aMenu = shopMenu.getElementsByTagName("a"),
		arrTop = [900,1250,1600,1950,2250,2600,3000,3350];
	
	for( var i=0; i<aMenu.length ; i++){
		aMenu[i].index = i;
		aMenu[i].onclick = function(){
			startMoveScrollTop(1,arrTop[this.index]);	
		}
	}	
}


//欢乐商城焦点图
/*if(getByClass02("shopFocusPic")[0]){
	for( var i=0 ; i<getByClass02("shopFocusPic").length ; i++){
		fnShopPic(i);
	}
}*/
function fnShopPic(iNum){
	var equipPic = getByClass02("shopFocusPic")[iNum],
		eqMaxPic = getByClass(equipPic,"eqMaxPic")[0],
		aMaxPic = eqMaxPic.getElementsByTagName("img"),
		eqMinPic = getByClass(equipPic,"eqMinPic")[0],
		aMinPic = eqMinPic.getElementsByTagName("li"),
		iThis = 0;
	
	for( var i=0; i<aMinPic.length ; i++){
		aMinPic[i].index = i;
		aMinPic[i].onclick = function(){
			iThis = this.index;
			aniEqPic();
		}
		aMinPic[i].onmouseover = function(){
			clearInterval(timer);
		}
		aMinPic[i].onmouseout = function(){
			timer = setInterval(function(){
				if( iThis < aMinPic.length-1 ){
					iThis++;
				}else {
					iThis = 0;
				}
				aniEqPic();
			},2500);
		}
	}
	
	
	var timer = setInterval(function(){
			if( iThis < aMinPic.length-1 ){
				iThis++;
			}else {
				iThis = 0;
			}
			aniEqPic();
		},2500);
	
	/*function aniEqPic(){
		for( var z=0; z<aMinPic.length ; z++){
			aMinPic[z].className = "null";
			aMaxPic[z].style.zIndex = 9;
			startMove(aMaxPic[z],{"opacity":0},8);
		}
		aMinPic[iThis].className = "active";
		aMaxPic[iThis].style.zIndex = 10;
		startMove(aMaxPic[iThis],{"opacity":100},8);
	}*/
	function aniEqPic(){
		for( var z=0; z<aMinPic.length ; z++){
			aMinPic[z].className = "null";
			aMaxPic[z].style.zIndex = 9;
			startMove(aMaxPic[z],{"opacity":0},12);
		}
		aMinPic[iThis].className = "active";
		aMaxPic[iThis].style.zIndex = 10;
		startMove(aMaxPic[iThis],{"opacity":100},8);
	}
		
}

//美味餐饮
if( getByClass02("restaurantWrap")[0]){
	fnFood(0);
	fnFood(1);
	fnFood(2);
}
function fnFood(iNum){
	var restFood = getByClass02("restaurantWrap")[iNum],
		restMenu = getByClass(restFood,"restaurantMenu")[0],
		aMenu = restMenu.getElementsByTagName("li"),
		aMenuH3 = restMenu.getElementsByTagName("h3"),
		aMenuA = restMenu.getElementsByTagName("a"),
		restCon = getByClass(restFood,"restaurantItem");

	
	for( var i=0; i<aMenu.length ; i++){
		aMenu[i].index = i;
		aMenu[i].onclick = function(){
			if( aMenuH3[this.index].style.display == "block" ){
				startMove(restFood,{"height":159},8,function(){
					for( var z=0; z<aMenu.length ; z++){
						aMenuH3[z].style.display = "none";
						aMenuH3[z].style.opacity = 0;
						aMenuH3[z].style.filter = "alpha(opacity=0)";
						aMenuA[z].className = "null";
						restCon[z].style.display = "none";
					}
				});
			}else{
				for( var z=0; z<aMenu.length ; z++){
					aMenuH3[z].style.display = "none";
					aMenuH3[z].style.opacity = 0;
					aMenuH3[z].style.filter = "alpha(opacity=0)";
					aMenuA[z].className = "null";
					restCon[z].style.display = "none";
				}
				aMenuH3[this.index].style.display = "block";
				aMenuA[this.index].className = "active";
				restCon[this.index].style.display = "block";
				startMove(aMenuH3[this.index],{"opacity":100},8);
				startMove(restFood,{"height":756},8);
			}
		}
		/*aMenuA[i].onclick = function(){
			
		}*/
	}
}

//美味餐饮焦点图
if(getByClass02("restFocusPic")[0]){
	for( var i=0; i<getByClass02("restFocusPic").length ; i++){
		fnFoodPic(i);
	}
}
function fnFoodPic(iNum){
	var equipPic = getByClass02("restFocusPic")[iNum],
		eqMaxPic = getByClass(equipPic,"eqMaxPic")[0],
		aMaxPic = eqMaxPic.getElementsByTagName("img"),
		eqMinPic = getByClass(equipPic,"eqMinPic")[0],
		aMinPic = eqMinPic.getElementsByTagName("li"),
		picPrev = getByClass(equipPic,"picPrev")[0],
		picNext = getByClass(equipPic,"picNext")[0],
		oTitle = equipPic.getElementsByTagName("h4")[0],
		iThis = 0;
	
	
	
	for( var i=0; i<aMinPic.length ; i++){
		aMinPic[i].index = i;
		aMinPic[i].onclick = function(){
			iThis = this.index;
			aniEqPic();
		}
		aMinPic[i].onmouseover = function(){
			clearInterval(timer);
		}
		aMinPic[i].onmouseout = function(){
			timer = setInterval(function(){
				if( iThis < aMinPic.length-1 ){
					iThis++;
				}else {
					iThis = 0;
				}
				aniEqPic();
			},3000);
		}
	}
	picPrev.onmouseover = picNext.onmouseover = function(){
		clearInterval(timer);
	}
	picPrev.onmouseout = picNext.onmouseoutr = function(){
		timer = setInterval(function(){
			if( iThis < aMinPic.length-1 ){
				iThis++;
			}else {
				iThis = 0;
			}
			aniEqPic();
		},3000);
	}
	
	picPrev.onclick = function(){
		if( iThis > 0){
			iThis--;
		}else {
			iThis = aMinPic.length-1;
		}
		aniEqPic();
	}
	picNext.onclick = function(){
		if( iThis < aMinPic.length-1 ){
			iThis++;
		}else {
			iThis = 0;
		}
		aniEqPic();
	}
	var timer = setInterval(function(){
			if( iThis < aMinPic.length-1 ){
				iThis++;
			}else {
				iThis = 0;
			}
			aniEqPic();
		},3000);
	
	/*function aniEqPic(){
		for( var z=0; z<aMinPic.length ; z++){
			aMinPic[z].className = "null";
			aMaxPic[z].style.zIndex = 9;
			startMove(aMaxPic[z],{"opacity":0},8);
		}
		aMinPic[iThis].className = "active";
		aMaxPic[iThis].style.zIndex = 10;
		startMove(aMaxPic[iThis],{"opacity":100},8);
	}*/
	function aniEqPic(){
		for( var z=0; z<aMinPic.length ; z++){
			aMinPic[z].className = "null";
			aMaxPic[z].style.zIndex = 9;
			startMove(aMaxPic[z],{"opacity":0,"height":0},20);
		}
		aMinPic[iThis].className = "active";
		aMaxPic[iThis].style.zIndex = 10;
		aMaxPic[iThis].style.width = "642px";
		aMaxPic[iThis].style.height = "406px";
		startMove(aMaxPic[iThis],{"opacity":100},8);
		oTitle.innerHTML = '<span>'+aMaxPic[iThis].alt+'<\/span>' ;
		if(aMinPic.length >4){
			if( iThis >2 ){
				startMove(eqMinPic,{"top":(2-iThis)*80+3},5);
			}else if( iThis <=2 ){
				startMove(eqMinPic,{"top":3},5);
			}
			
		}
	}	
}


//园区时间表
if( getByClass02("time_btn")[0]){
	fnTimeTab();
}
function fnTimeTab(){
	var timeBtn = getByClass02("time_btn")[0],
		aTimeBtn = timeBtn.getElementsByTagName("a"),
		tabCon= getByClass02("table_con");
	
	for(var i=0; i<aTimeBtn.length ; i++){
		aTimeBtn[i].index = i ;
		aTimeBtn[i].onclick = function(){
			for(var z=0; z<aTimeBtn.length ; z++){
				aTimeBtn[z].className = "null" ;
				tabCon[z].style.display = "none";
			}
			aTimeBtn[this.index].className = "active" ;
			tabCon[this.index].style.display = "block";
		}
	}	
	
}


//美味餐饮焦点图
if(getByClass02("aboutFocusPic")[0]){
	fnAboutPic();
	
}
function fnAboutPic(){


	var equipPic = getByClass02("aboutFocusPic")[0],
		eqMaxPic = getByClass(equipPic,"eqMaxPic")[0],
		aMaxPic = eqMaxPic.getElementsByTagName("img"),
		eqMinPic = getByClass(equipPic,"eqMinPic")[0],
		aMinPic = eqMinPic.getElementsByTagName("li"),
		picPrev = getByClass(equipPic,"picPrev")[0],
		picNext = getByClass(equipPic,"picNext")[0],
		iThis = 0;
	
	
	
	for( var i=0; i<aMinPic.length ; i++){
		aMinPic[i].index = i;
		aMinPic[i].onclick = function(){
			iThis = this.index;
			aniEqPic();
		}
		aMinPic[i].onmouseover = function(){
			clearInterval(timer);
		}
		aMinPic[i].onmouseout = function(){
			timer = setInterval(function(){
				if( iThis < aMinPic.length-1 ){
					iThis++;
				}else {
					iThis = 0;
				}
				aniEqPic();
			},3000);
		}
	}
	picPrev.onmouseover = picNext.onmouseover = function(){
		clearInterval(timer);
	}
	picPrev.onmouseout = picNext.onmouseoutr = function(){
		timer = setInterval(function(){
			if( iThis < aMinPic.length-1 ){
				iThis++;
			}else {
				iThis = 0;
			}
			aniEqPic();
		},3000);
	}
	
	picPrev.onclick = function(){
		if( iThis > 0){
			iThis--;
		}else {
			iThis = aMinPic.length-1;
		}
		aniEqPic();
	}
	picNext.onclick = function(){
		if( iThis < aMinPic.length-1 ){
			iThis++;
		}else {
			iThis = 0;
		}
		aniEqPic();
	}
	var timer = setInterval(function(){
			if( iThis < aMinPic.length-1 ){
				iThis++;
			}else {
				iThis = 0;
			}
			aniEqPic();
		},3000);
	
	/*function aniEqPic(){
		for( var z=0; z<aMinPic.length ; z++){
			aMinPic[z].className = "null";
			aMaxPic[z].style.zIndex = 9;
			startMove(aMaxPic[z],{"opacity":0},8);
		}
		aMinPic[iThis].className = "active";
		aMaxPic[iThis].style.zIndex = 10;
		startMove(aMaxPic[iThis],{"opacity":100},8);
	}*/
	function aniEqPic(){
		for( var z=0; z<aMinPic.length ; z++){
			aMinPic[z].className = "null";
			aMaxPic[z].style.zIndex = 9;
			startMove(aMaxPic[z],{"opacity":0,"height":0},20);
		}
		aMinPic[iThis].className = "active";
		aMaxPic[iThis].style.zIndex = 10;
		aMaxPic[iThis].style.width = "725px";
		aMaxPic[iThis].style.height = "385px";
		startMove(aMaxPic[iThis],{"opacity":100},8);
		if(aMinPic.length >4){
			if( iThis >2 ){
				startMove(eqMinPic,{"top":(2-iThis)*98+3},5);
			}else if( iThis <=2 ){
				startMove(eqMinPic,{"top":3},5);
			}
			
		}
	}	
}


//推荐线路
if( getByClass02("lineCon")[0]){
	fnLine();
}
function fnLine(){
	for(var i=0; i<getByClass02("lineCon").length ; i++){
		fnLineMap(i);
	}
	function fnLineMap(iNum){
		var parLine = getByClass02("lineCon")[iNum],
			lineEqList = getByClass(parLine,"lineEqList")[0],
			aLineEqList = lineEqList.getElementsByTagName("a"),
			linePointList = getByClass(parLine,"linePointList")[0],
			aPoint = linePointList.getElementsByTagName("a"),
			lineEqInfo = getByClass(parLine,"lineEqInfo")[0],
			aInfo = lineEqInfo.getElementsByTagName("li"),
			iThis =0; 
		
		for( var i=0; i<aPoint.length ; i++){
			aPoint[i].index = i ; 
			aPoint[i].onmouseover = function(){
				iThis = this.index ; 
				
				for( var z=0; z<aInfo.length ; z++){
					aInfo[z].style.display = "none";
					aInfo[z].style.zIndex = 10;
				}

				// document.title = aInfo.length+":"+iThis;
				lineEqInfo.style.display = "block" ;
				lineEqInfo.style.left = aPoint[iThis].offsetLeft-90+"px";
				lineEqInfo.style.top = aPoint[iThis].offsetTop-175+"px";
				aInfo[iThis].style.zIndex = 11;
				aInfo[iThis].style.display = "block";

			}
			aPoint[i].onmouseout = function(){
				lineEqInfo.style.display = "none" ;
			}
		}
		lineEqInfo.onmouseover = function(){
			for( var z=0; z<aPoint.length ; z++){
				aInfo[z].style.display = "none";
				aInfo[z].style.zIndex = 10;
			}
			lineEqInfo.style.display = "block" ;
			lineEqInfo.style.left = aPoint[iThis].offsetLeft-90+"px";
			lineEqInfo.style.top = aPoint[iThis].offsetTop-175+"px";
			aInfo[iThis].style.display = "block";
			aInfo[iThis].style.zIndex = 11;
		}	
		lineEqInfo.onmouseout = function(){
			lineEqInfo.style.display = "none" ;
		}
	}
	
	
	//线路选项卡
	for( var i=0; i<getByClass02("lineSubMenu").length ; i++){
		fnMapTab(i);
	}
	function fnMapTab(iNum){
		var tabMenu = getByClass02("lineSubMenu")[iNum],
			aMenu = tabMenu.getElementsByTagName("a"),
			tabConWrap = getByClass02("lineConWrap")[iNum],
			tabCon =  getByClass(tabConWrap,"lineCon");
		
		aMenu[0].onclick = function(){
			tabMenu.style.backgroundPosition = "0px -40px";
			tabCon[0].style.display = "block";
			tabCon[1].style.display = "none";
		}
		aMenu[1].onclick = function(){
			tabMenu.style.backgroundPosition = "0px 0px";
			tabCon[1].style.display = "block";
			tabCon[0].style.display = "none";
		}	
	}
	
	
	
	
	
	//线路切换
	var lineMenu = getByClass02("lineMenu")[0],
		aLineMenu = lineMenu.getElementsByTagName("a"),
		lineItem = getByClass02("lineItem");
	
	
	//伪地址
	var oUrl = window.location.hash;
	var patt1=new RegExp("#web");
	var patt2 = /[1-9]/g;
	if( patt1.test(oUrl)){
		iNow = oUrl.match(patt2)-1;
		fnAniTab();
	}
	var iNow = 0;
	
	
	for(var i=0; i<aLineMenu.length ; i++){
		aLineMenu[i].index = i; 
		aLineMenu[i].onclick = function(){
			iNow = this.index;
			fnAniTab();
		}
	}	
	
	function fnAniTab(){
		for(var z=0; z<aLineMenu.length ; z++){
			aLineMenu[z].className = "null";
			lineItem[z].style.display = "none";
		}
		window.location.hash ="#web0"+(iNow+1);
		aLineMenu[iNow].className = "active";
		lineItem[iNow].style.display = "block";
	}

}
	


//园区地图
if( document.getElementById("map")){
	fnMap();
}
function fnMap(){
	/*var oMapShadow = document.getElementById("parkMapShadow");
	var oHideMap = document.getElementById("hideMap");
	var oParkMapBg = document.getElementById("parkMapBg");
	var aShowMap = getByClass02("showMap");*/
	
	var oMapP = document.getElementById("map");
	var oMap = oMapP.getElementsByTagName("img")[0];
	var oAmp = document.getElementById("amp");
	var oNor = document.getElementById("normal");
	var oShr = document.getElementById("shr");
	
	var pWidth = parseInt(getStyle( oMapP ,"width"));
	var pHeight = parseInt(getStyle( oMapP, "height"));
	
	var mapW0 = 2000;
	var mapH0 = 1800; 
	var halfW = oMapP.offsetWidth/2 ;
	var halfH = oMapP.offsetHeight/2 ;
	var m = 3;
	var isFirefox = (navigator.userAgent.indexOf("Gecko") !==-1); //判断火狐浏览器
	
	
	
	//火狐下滚动缩放
	/*if( isFirefox ){
		oMap.addEventListener("DOMMouseScroll" ,function(ev){
			var oldMapW = oMap.offsetWidth;
			var oldMapH = oMap.offsetHeight;
			var oEvent = ev||event ;
			var n2 = oldMapW/mapW0 ;
			m = Math.floor(oMap.offsetWidth/mapW0*10);
			if( oEvent.detail == -3){
			}else if( oEvent.detail == 3){
				m-- ;
			}
			if( m< 4){
				m=4;
			}
			var n = m/10 ;
			oMap.style.width = mapW0*n+"px" ;
			oMap.style.height = mapH0*n+"px" ;
			m++ ;
				oMap.style.left =(oMap.offsetLeft-halfW)*n/n2+halfW+"px";
			oMap.style.top =(oMap.offsetTop-halfH)*n/n2+halfH+"px";
			if(oMap.offsetLeft > 0 ){
				oMap.style.left = 0+"px";
			}else if( oMap.offsetLeft < wrapW-oMap.offsetWidth){
				oMap.style.left = wrapW-oMap.offsetWidth+"px";
			} 
			if( oMap.offsetTop >0 ){
				oMap.style.top = 0+"px";
			}else if( oMap.offsetTop < wrapH-oMap.offsetHeight){
				oMap.style.top = wrapH-oMap.offsetHeight+"px";
			} 
			return false; 
		} ,false);
	}*/
	//滚动缩放
	/*oMap.onmousewheel =function(ev){
		var oldMapW = oMap.offsetWidth;
		var oldMapH = oMap.offsetHeight;
		var n2 = oldMapW/mapW0 ;
		var oEvent = ev||event ;
		m = Math.floor(oMap.offsetWidth/mapW0*10);
		oEvent.wheelDelta/120;
		if( oEvent.wheelDelta/120 ==1){
			m++ ;
		}else if( oEvent.wheelDelta/120 == -1){
			m-- ;
		}
		if( m< 3){
			m=3;
		}
		var n = m/10 ;
		oMap.style.width = mapW0*n+"px" ;
		oMap.style.height = mapH0*n+"px" ;
		oMap.style.left =(oMap.offsetLeft-halfW)*n/n2+halfW+"px";
		oMap.style.top =(oMap.offsetTop-halfH)*n/n2+halfH+"px";
		if(oMap.offsetLeft > 0 ){
			oMap.style.left = 0+"px";
		}else if( oMap.offsetLeft < wrapW-oMap.offsetWidth){
			oMap.style.left = wrapW-oMap.offsetWidth+"px";
		} 
		if( oMap.offsetTop >0 ){
			oMap.style.top = 0+"px";
		}else if( oMap.offsetTop < wrapH-oMap.offsetHeight){
			oMap.style.top = wrapH-oMap.offsetHeight+"px";
		} 
	}*/
	
	//放大点击
	oAmp.onclick = function(){
		var m = Math.floor(oMap.offsetWidth/mapW0*10);
		if( m <10){
			m++ ;
			var n = m/10 ;
			var n2 = n-0.1 ;
			oMap.style.width = mapW0*n+"px";
			oMap.style.height = mapH0*n+"px"
			oMap.style.left =(oMap.offsetLeft-halfW)*n/n2+halfW+"px";
			oMap.style.top =(oMap.offsetTop-halfH)*n/n2+halfH+"px";
			if(oMap.offsetLeft > 0 ){
				oMap.style.left = 0+"px";
			}else if( oMap.offsetLeft < pWidth-oMap.offsetWidth){
				oMap.style.left = pWidth-oMap.offsetWidth+"px";
			} 
			if( oMap.offsetTop >0 ){
				oMap.style.top = 0+"px";
			}else if( oMap.offsetTop < pHeight-oMap.offsetHeight){
				oMap.style.top = pHeight-oMap.offsetHeight+"px";
			} 
		}
	}
	//缩小点击
	oShr.onclick = function(){
		var m = Math.ceil(oMap.offsetWidth/mapW0*10);
		if( m > 4){
			m-- ;
			var n = m/10 ;
			var n2 = n+0.1 ;
			oMap.style.width = mapW0*n+"px";
			oMap.style.height = mapH0*n+"px"
			oMap.style.left =(oMap.offsetLeft-halfW)*n/n2+halfW+"px";
			oMap.style.top =(oMap.offsetTop-halfH)*n/n2+halfH+"px";
			if(oMap.offsetLeft > 0 ){
				oMap.style.left = 0+"px";
			}else if( oMap.offsetLeft < pWidth-oMap.offsetWidth){
				oMap.style.left = pWidth-oMap.offsetWidth+"px";
			} 
			if( oMap.offsetTop >0 ){
				oMap.style.top = 0+"px";
			}else if( oMap.offsetTop < pHeight-oMap.offsetHeight){
				oMap.style.top = pHeight-oMap.offsetHeight+"px";
			} 
		}
	}
	
	//1:1缩放
	oNor.onclick = function(){
		var n = 1;
		var oldMapW = oMap.offsetWidth;
		var n2 = oldMapW/mapW0 ; 
		oMap.style.width = mapW0+"px" ;
		oMap.style.height = mapH0+"px" ;
		//alert( n+":"+n2+oMap.offsetLeft+":"+oMap.offsetTop);
		oMap.style.left =(oMap.offsetLeft-halfW)*n/n2+halfW+"px";
		oMap.style.top =(oMap.offsetTop-halfH)*n/n2+halfH+"px";
		if(oMap.offsetLeft > 0 ){
			oMap.style.left = 0+"px";
		}else if( oMap.offsetLeft < pWidth-oMap.offsetWidth){
			oMap.style.left = pWidth-oMap.offsetWidth+"px";
		} 
		if( oMap.offsetTop >0 ){
			oMap.style.top = 0+"px";
		}else if( oMap.offsetTop <pHeight-oMap.offsetHeight){
			oMap.style.top = pHeight-oMap.offsetHeight+"px";
		} 
		//alert( n+":"+n2+oMap.offsetLeft+":"+oMap.offsetTop);
	}
	
	//拖动效果
	oMap.onmousedown = function(ev){
		var oEvent = ev||event ;
		var oldL = oMap.offsetLeft+1 ;
		var oldT = oMap.offsetTop+1 ;
		var mapW = oMap.offsetWidth ;
		var mapH = oMap.offsetHeight ;
		var disX = oldL - getPos(oEvent).x ;
		var disY = oldT - getPos(oEvent).y ;
		
		if( oMap.setCapture){
			oMap.onmousemove = mouseMove ;
			oMap.onmouseup = mouseUp ;
			oMap.setCapture() ;
		}else{
			document.onmousemove = mouseMove;
			document.onmouseup = mouseUp ;
		}
		function mouseMove(ev){
			var oEvent = ev||event ;
			var nowL = getPos(oEvent).x+disX;
			var nowT = getPos(oEvent).y+disY;
			if( nowL <= pWidth- mapW ){
				nowL = pWidth- mapW ;
			}else if( nowL >=0 ){
				nowL =0 ;
			}
			if( nowT <= pHeight - mapH ){
				nowT = pHeight - mapH ;
			}else if( nowT >= 0){
				nowT =0 ;
			}
			oMap.style.left= nowL+"px";
			oMap.style.top = nowT+"px";
		}
		function mouseUp(){
			this.onmousemove = null;
			this.onmouseup = null;
			if( oMap.setCapture ){
				oMap.releaseCapture() ;
			}
		}
		return false; 
	}
}


//园区地图tab
if( getByClass02("mapMarkMenu")[0]) {
	fnMapTab()
}
function fnMapTab(){
	var tabMenu = getByClass02("mapMarkMenu")[0],
		aMenu = tabMenu.getElementsByTagName("a"),
		tabCon =  getByClass02("mapMarkItem");
	
	aMenu[0].onclick = function(){
		tabMenu.style.backgroundPosition = "0px -40px";
		tabCon[0].style.display = "block";
		tabCon[1].style.display = "none";
	}
	aMenu[1].onclick = function(){
		tabMenu.style.backgroundPosition = "0px 0px";
		tabCon[1].style.display = "block";
		tabCon[0].style.display = "none";
	}	
}

//设施分类
	
<!--设施分类-->
if( getByClass02("guide_con")[0] ){
	fnGuideCon();
}
function fnGuideCon(){
	var parMenu = getByClass02("facility_item")[0],
		aMenu = parMenu.getElementsByTagName("a"),
		moveActive = getByClass(parMenu,"moveActive")[0],
		aCon = getByClass02("facility_con"),
		iNow = 0;
	


	//伪地址
	var oUrl = window.location.hash;
	var patt1=new RegExp("#web");
	var patt2 = /[1-9]/g;
	if( patt1.test(oUrl)){
		iNow = oUrl.match(patt2)-1;
		fnAniTab();
	}
	
	


	for( var i=0; i<aMenu.length ; i++){
		aMenu[i].index = i;
		aMenu[i].onclick = function(){
			iNow = this.index;
			fnAniTab();
		}
	}	

	function fnAniTab(){
		for( var z=0; z<aMenu.length ; z++){
			aCon[z].style.display = "none";
			aMenu[z].style.color = "#686868";	
		}
		aCon[iNow].style.display = "block";
		aMenu[iNow].style.color = "#ff6c00";	
		startMove(moveActive,{"left":iNow*254},10);
		window.location.hash ="#web0"+(iNow+1);
	}
}
	

