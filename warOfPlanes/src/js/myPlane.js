
let myPlane={
	ele:null,
	fireInterval:300,
	
	
	init(){
		this.ele=document.createElement('div');
		gameEngine.ele.appendChild(this.ele);
		this.ele.className="myplane";
		this.ele.style.left=(gameEngine.ele.offsetWidth-this.ele.offsetWidth)/2+"px";
		this.ele.style.top=gameEngine.ele.offsetHeight-this.ele.offsetHeight+"px";
		return this;
	},
	move(){
		myPlane.ele.onmousedown=function(e){
			e=e||event;
			e.preventDefault();
			let disX=e.offsetX;
			let disY=e.offsetY;
//			console.log(gameEngine.ele.offsetLeft);
			
			document.onmousemove=function(e){
				e=e||event;
				let x=e.pageX-disX-gameEngine.ele.offsetLeft;
				let y=e.pageY-disY;
				//判断边界
				if(x<0){
					x=0;
				}else if(x>gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth){
					x=gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth;
				}
				if(y<0){
					y=0;
				}else if(y>gameEngine.ele.offsetHeight-myPlane.ele.offsetHeight){
					y=gameEngine.ele.offsetHeight-myPlane.ele.offsetHeight;
				}
				myPlane.ele.style.left=x+"px";
				myPlane.ele.style.top=y+"px";
				
			}
			document.onmouseup=function(e){
				document.onmousemove=document.onmouseup=null;
			}
		}
	},
	
	//发射子弹
	fire(){
		setInterval(()=>{
			let bullet=new Bullet();
			bullet.init().move();
		},this.fireInterval);
	},
	
	//爆炸
	boom(callback){
		clearInterval(this.timer);
		//动画
		let dieImgs=["images/me_die1.png","images/me_die2.png","images/me_die3.png","images/me_die4.png"];
		let i=0;
		let dieTimer = setInterval(()=>{
			if(i>=dieImgs.length){
				clearInterval(dieTimer);
				gameEngine.ele.removeChild(myPlane.ele);
				callback();
			}else{
				myPlane.ele.style.background="url("+dieImgs[i++]+")";
			}
		},100);
	}
}
