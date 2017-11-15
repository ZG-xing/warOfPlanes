//我的飞机：对象
//敌机：构造函数
//子弹：构造函数
//游戏引擎：对象

window.onload=function(){
	
	let oList=document.getElementById('list');
//	let oMain=document.getElementById('main');
	let oLi=oList.getElementsByTagName('li');
	
	for(let i=0;i<oLi.length;i++){
		oLi[i].onclick=function(){
			//移除list节点
			oList.parentNode.removeChild(oList);
			
			//子弹发射频率
			myPlane.fireInterval=this.value-0;  //减0是为了变成数字
			
			//开始游戏
			gameEngine.init().start();
//			gameEngine.listenKeyboard();
		}
	}
	
}
