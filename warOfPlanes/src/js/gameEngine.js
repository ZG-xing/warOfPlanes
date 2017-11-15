
//游戏引擎
//游戏加载
//创建我的飞机
//创建敌机
//控制碰撞检测
//监听键盘

let gameEngine={
	ele: null,
	allBullets:[],  //保存页面中存在的所有子弹对象
	allEnemies:[],  //页面上所有的敌机
	
	totalScore:0,  //总分数
	
	//初始化
	init(){
		this.ele = document.getElementById("main");
		return this;
//		console.log(this.ele);
	},
	
	//开始
	start(){
		console.log("start");
		this.loading(()=>{
			console.log("游戏正式开始！");
			myPlane.init().move();
			myPlane.fire();
			
			gameEngine.listenKeyboard();
			
			//创建敌机
			gameEngine.createEnemy();
			
			//碰撞检测
			gameEngine.crash();
			
			//移动背景图
			gameEngine.moveBackground();
		});
	},
	
	//加载页面
	loading(callback){
		let logo=document.createElement('div');
		this.ele.appendChild(logo);
		logo.className="logo";
		
		let load=document.createElement('div');
		this.ele.appendChild(load);
		load.className="load";
		
		let imgs=["images/loading1.png","images/loading2.png","images/loading3.png"];
		let i=0;
		let timer=setInterval(()=>{
			if(i>=5){
				clearInterval(timer);
				gameEngine.ele.removeChild(logo);
				gameEngine.ele.removeChild(load);
				if(callback) callback();
			}else{
//				load.style.background="url(" + imgs[++i%3] + ")no-repeat";
//				console.log(i);
				load.style.background=`url(${imgs[++i%3]})`;
			}
			
		},500);
	},
	//监听键盘
	listenKeyboard(){
		let xspeed=0;
		let yspeed=0;
		onkeydown=function(e){
			e=e||event;
			if(e.keyCode==37){
				xspeed=-10;
			}else if(e.keyCode==38){
				yspeed=-10;
			}else if(e.keyCode==39){
				xspeed=10;
			}else if(e.keyCode==40){
				yspeed=10;
			}
		}
		onkeyup=function(e){
			if(e.keyCode==37||e.keyCode==39){
				xspeed=0;
			}else if(e.keyCode==38||e.keyCode==40){
				yspeed=0;
			}
		}
		setInterval(()=>{
			let x=myPlane.ele.offsetLeft+xspeed;
//			console.log(xspeed);
			let y=myPlane.ele.offsetTop+yspeed;
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
		},30)
	},
	createEnemy(){
		//大型
		setInterval(()=>{
			let b=Math.random()>0.8?true:false;
			if(b){
				let enemy=new Enemy(1);
				enemy.init().move();
			}
		},6000)
		
		//中型
		setInterval(()=>{
			let b=Math.random()>0.7?true:false;
			if(b){
				let enemy=new Enemy(2);
				enemy.init().move();
			}
		},1000)
		//小型
		setInterval(()=>{
			let b=Math.random()>0.5?true:false;
			if(b){
				let enemy=new Enemy(3);
				enemy.init().move();
			}
		},1000)
	},
	
	//碰撞检测
	crash(){
		let timer = setInterval(()=>{
			for(let i=0;i<gameEngine.allEnemies.length;i++){  //遍历所有敌机
				for(let j=0;j<gameEngine.allBullets.length;j++){  //遍历所有子弹
					//判断每个子弹和每个敌机是否有碰撞
					if(isCrash(gameEngine.allEnemies[i].ele,gameEngine.allBullets[j].ele)){

						//让子弹爆炸,消失
						gameEngine.allBullets[j].boom();	
						gameEngine.allBullets.splice(j,1);
						
						//让敌机收到一点伤害
						gameEngine.allEnemies[i].hurt();
					}
				}
				
				//判断每个敌机和我的飞机是否碰撞
				if(isCrash(gameEngine.allEnemies[i].ele,myPlane.ele)){
					clearInterval(timer);
					myPlane.boom(()=>{
						let myName = prompt("请留下您的大名， 您当前的分数是:"+gameEngine.totalScore + "");
						ajax({
							type: "post",
							url: "http://60.205.181.47/myPHPCode4/uploadScore.php",
							data: {name: myName, score: gameEngine.totalScore},
							
							success(data){
								console.log("提交成功: " + data);
								//进入排行榜
								location.href = "rank.html";
							}
						})
					});
					break;
				}
			}
		},30)
	},
	
	//移动背景图
	moveBackground(){
		let y = 0;
		setInterval(()=>{
			gameEngine.ele.style.backgroundPositionY = y++ + "px";
		}, 30);
		
	}
	
}
