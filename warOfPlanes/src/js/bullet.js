//class Bullet extends Base{
class Bullet{
	
	constructor(){
//		super();
		this.ele = null;
	}
	
	init(){
		this.ele=document.createElement('div');
		gameEngine.ele.appendChild(this.ele);
		
		//当页面上添加一颗子弹时，就将当前的子弹对象this也添加到数组allBullets里面去
		gameEngine.allBullets.push(this);
//		console.log(gameEngine.allBullets);
		
		this.ele.className="bullet";
		this.ele.style.left=myPlane.ele.offsetLeft+myPlane.ele.offsetWidth/2-this.ele.offsetWidth/2+1+"px";
		this.ele.style.top=myPlane.ele.offsetTop-this.ele.offsetHeight+"px";
		return this;
	}
	move(){
		let that=this;
		this.timer=setInterval(()=>{
			if(that.ele.offsetTop<-18){
				clearInterval(this.timer);  //移除定时器
				gameEngine.ele.removeChild(this.ele);
				
				//在页面上移除子弹节点的同事时，要将该子弹对象从数组allBullets中移除
				gameEngine.allBullets.splice(gameEngine.allBullets.indexOf(that),1);
				
			}else{
				that.ele.style.top=that.ele.offsetTop-10+"px";
			}
			
		},30);
	}
	
	//爆炸
	boom(){
		
		//停止移动
		clearInterval(this.timer);
		
		//动画
		this.ele.className = "bullet-die";
		const imgs = ["images/die1.png","images/die2.png"];
//		let that = this;
//		let i = 0;
		let that=this,i = 0;
		let dieTimer = setInterval(()=>{
			if(i>=1){
				clearInterval(dieTimer);
				gameEngine.ele.removeChild(that.ele);  //移除子弹节点
			}else{
//				that.ele.style.background = "url("+imgs[++i]+")no-repeat";
				that.ele.style.background = `url(${imgs[++i]})`;  //模板字符串

			}
		},200)
	}
}
