//敌机
//class Enemy extends Base{
class Enemy{

	//属性
	constructor(type){
//		super();
		this.ele=null;
		this.speed=10;  //速度
		this.hp=1;  //血量
		this.dieImgs=[];
		this.score = 10; //分数
		this.type = type;
	}
		
	
	//方法
	//初始化
	init(){
		this.ele = document.createElement('div');
		gameEngine.ele.appendChild(this.ele);
		
		//在页面上添加敌机的同时，也将当前敌机对象this添加到数组allEnemies中
		gameEngine.allEnemies.push(this);
		
		switch(this.type){
			//大型
			case this.Enemy_Type_Large:
				this.ele.className="enemy-large";
				this.speed=this.Enemy_Speed_Large;
				this.hp=this.Enemy_Hp_Large;
				this.dieImgs=["images/plane3_die1.png","images/plane3_die2.png","images/plane3_die3.png","images/plane3_die4.png","images/plane3_die5.png","images/plane3_die6.png"]
				this.score = 30;
				break;
			//中型
			case this.Enemy_Type_Middle:
				this.ele.className="enemy-middle";
				this.speed=this.Enemy_Speed_Middle;
				this.hp=this.Enemy_Hp_Middle;
				this.dieImgs=["images/plane2_die1.png","images/plane2_die2.png","images/plane2_die3.png","images/plane2_die4.png"]
				this.score = 20;
				break;
			//小型
			case this.Enemy_Type_Small:
				this.ele.className="enemy-small";
				this.speed=this.Enemy_Speed_Small;
				this.hp=this.Enemy_Hp_Small;
				this.dieImgs=["images/plane1_die1.png","images/plane1_die2.png","images/plane1_die3.png"]
				this.score = 10;
				break;
		}
		//位置
		this.ele.style.left=parseInt(Math.random()*(gameEngine.ele.offsetWidth-this.ele.offsetWidth))+"px";
		this.ele.style.top=-this.ele.offsetHeight+"px";
		
		return this;
	}
	//敌机移动
	move(){
//		let that=this;
		this.timer=setInterval(()=>{
			if(this.ele.offsetTop>gameEngine.ele.offsetHeight){
				clearInterval(this.timer);
				gameEngine.ele.removeChild(this.ele);  //移除敌机节点
				
				//当在页面上移除敌机节点时，同时也将当前敌机对象从数组allEnemies中移除
				gameEngine.allEnemies.splice(gameEngine.allEnemies.indexOf(this),1);
				
			}else{
				this.ele.style.top=this.ele.offsetTop+this.speed+"px";
			}
			
		},30)
	}
	
	//受到一点伤害
	hurt(){
		this.hp--;
		
		if(this.hp==0){
			this.boom();
			gameEngine.totalScore += this.score;
		}
	}
	//爆炸
	boom(){
		clearInterval(this.timer);
		//动画
		let i=0;
//		let that=this;
		let dieTimer=setInterval(()=>{
			if(i>=this.dieImgs.length){
				clearInterval(dieTimer);
				gameEngine.ele.removeChild(this.ele);  //移除当前爆炸敌机节点
				gameEngine.allEnemies.splice(gameEngine.allEnemies.indexOf(this),1);

			}else{
//				this.ele.style.background="url("+this.dieImgs[i++]+")no-repeat"
				this.ele.style.background=`url(${this.dieImgs[i++]})`;
			}
		},100)
	}
}

//原型
Enemy.prototype.Enemy_Type_Large=1;  //类型
Enemy.prototype.Enemy_Type_Middle=2;
Enemy.prototype.Enemy_Type_Small=3;

Enemy.prototype.Enemy_Speed_Large=2;  //速度
Enemy.prototype.Enemy_Speed_Middle=4;
Enemy.prototype.Enemy_Speed_Small=6;

Enemy.prototype.Enemy_Hp_Large=6;  //血量
Enemy.prototype.Enemy_Hp_Middle=3;
Enemy.prototype.Enemy_Hp_Small=1;