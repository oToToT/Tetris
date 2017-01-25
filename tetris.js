var tetris;
$(function(){
	var block = function(t){
		this.type=t;
		this.pos=[[],[],[],[]];
		this.deg=0;
	}

	var pause=true;
	var started=false;
	var canvasG = document.getElementById('mainGame');
	var ctxG = canvasG.getContext('2d');
	var canvasP = document.getElementById('preCtx');
	var ctxP = canvasP.getContext('2d');

	tetris = {
		graphB:[19,19,19,19,19,19,19,19,19,19],
		graphL:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		graphR:[9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],
		colors: {
			"red": "rgb(255,0,0)",
			"green": "rgb(0,255,0)",
			"blue": "rgb(0,0,255)",
			"purple": "rgb(255,0,255)",
			"yellow": "rgb(234, 217, 68)",
			"pink": "rgb(255, 168, 165)",
			"orange": "rgb(255, 157, 0)",
			0:"rgb(255, 168, 165)",
			1:"rgb(0,255,0)",
			2:"rgb(234, 217, 68)",
			3:"rgb(0,0,255)",
			4:"rgb(255, 157, 0)",
			5:"rgb(255,0,0)",
			6:"rgb(255,0,255)",
		},
		prevBlock: new block(),
		curBlock: new block(),
		end:function(){
			pause=1;
			$("#dialog").show();
			$("#dialog").html("結束了拉，你以為還有嗎OAO<br>很糞吧www，因為旋轉寫不出來，消掉沒空寫啊")
		},
		right: function(){
			if(!pause){
				if(tetris.curBlock.pos[3][0] < tetris.graphR[tetris.curBlock.pos[3][1]]){
					for(var i=3;i>=0;i--){
						tetris.removeBlock(ctxG,tetris.curBlock.pos[i][0]*30, tetris.curBlock.pos[i][1]*30);
						tetris.curBlock.pos[i][0]++;
						tetris.drawBlock(ctxG,tetris.curBlock.pos[i][0]*30, tetris.curBlock.pos[i][1]*30, tetris.colors[tetris.curBlock.type]);
					}
				}
			}
		},
		left: function(){
			if(!pause){
				if(tetris.curBlock.pos[0][0] > tetris.graphL[tetris.curBlock.pos[0][1]]){
					for(var i=0;i<4;i++){
						tetris.removeBlock(ctxG,tetris.curBlock.pos[i][0]*30, tetris.curBlock.pos[i][1]*30);
						tetris.curBlock.pos[i][0]--;
						tetris.drawBlock(ctxG,tetris.curBlock.pos[i][0]*30, tetris.curBlock.pos[i][1]*30, tetris.colors[tetris.curBlock.type]);
					}
				}
			}
		},
		down: function(){
			if(!pause){
				var bottom=false;
				var top=false;
				for(var i=0;i<4;i++){
					tetris.removeBlock(ctxG,tetris.curBlock.pos[i][0]*30, tetris.curBlock.pos[i][1]*30);
					tetris.curBlock.pos[i][1]++;
					tetris.drawBlock(ctxG,tetris.curBlock.pos[i][0]*30, tetris.curBlock.pos[i][1]*30, tetris.colors[tetris.curBlock.type]);
					if(tetris.curBlock.pos[i][1] >= tetris.graphB[tetris.curBlock.pos[i][0]]){
						bottom=true;
					}
				}
				if(bottom){
					$("#score").html(Number($("#score").html())+2);
					for(var i=0;i<4;i++){
						tetris.graphL[tetris.curBlock.pos[i][1]]=tetris.curBlock.pos[i][0]+1;
						tetris.graphB[tetris.curBlock.pos[i][0]] = tetris.curBlock.pos[i][1]-1;
						if(tetris.curBlock.pos[i][1] == 0){
							top=1;
						}
					}
					for(var i=3;i>=0;i--){
						tetris.graphR[tetris.curBlock.pos[i][1]]=tetris.curBlock.pos[i][0]-1;
					}
					if(top){
						tetris.end()
					}
					tetris.drawPrev(Math.floor((Math.random()*100)%7));
				}
			}
		},
		up: function(){
			tetris.curBlock.deg++;
			tetris.curBlock.deg%=4;
			var d = tetris.curBlock.deg;
			var b = tetris.curBlock;

			switch(tetris.curBlock.type){
				case 0:
					switch(d){
						case 0:
							tetris.curBlock.pos[0]=[b.curBlock.pos[0][0]-1,b.curBlock.pos[0][1]-2];
							tetris.curBlock.pos[1]=b.curBlock.pos[1];
							tetris.curBlock.pos[2]=[b.curBlock.pos[2][0]+1,b.curBlock.pos[2][1]-1];
							tetris.curBlock.pos[3]=[b.curBlock.pos[0][0]+1,b.curBlock.pos[0][1]+2];
							break;
						case 1:
							tetris.curBlock.pos[0]=[b.curBlock.pos[0][0],b.curBlock.pos[0][1]-2];
							tetris.curBlock.pos[1]=b.curBlock.pos[2];
							tetris.curBlock.pos[2]=[b.curBlock.pos[1][0],b.curBlock.pos[1][1]-1];
							tetris.curBlock.pos[3]=[b.curBlock.pos[3][0]-1,b.curBlock.pos[3][1]+1];
							break;
						case 2:
							tetris.curBlock.pos[0]=[b.curBlock.pos[0][0],b.curBlock.pos[0][1]-2];
							tetris.curBlock.pos[1]=b.curBlock.pos[2];
							tetris.curBlock.pos[2]=[b.curBlock.pos[1][0],b.curBlock.pos[1][1]-1];
							tetris.curBlock.pos[3]=[b.curBlock.pos[3][0]-1,b.curBlock.pos[3][1]+1];
							break;
						case 3:
							tetris.curBlock.pos[0]=[b.curBlock.pos[0][0],b.curBlock.pos[0][1]-2];
							tetris.curBlock.pos[1]=b.curBlock.pos[2];
							tetris.curBlock.pos[2]=[b.curBlock.pos[1][0],b.curBlock.pos[1][1]-1];
							tetris.curBlock.pos[3]=[b.curBlock.pos[3][0]-1,b.curBlock.pos[3][1]+1];
							break;
					}
					break;
				case 2:
					switch(d){
						case 0:
							tetris.curBlock.pos[0]=[b.curBlock.pos[0][0]-1,b.curBlock.pos[0][1]-2];
							tetris.curBlock.pos[1]=b.curBlock.pos[1];
							tetris.curBlock.pos[2]=[b.curBlock.pos[2][0]+1,b.curBlock.pos[2][1]-1];
							tetris.curBlock.pos[3]=[b.curBlock.pos[0][0]+1,b.curBlock.pos[0][1]+2];
							break;
						case 1:
							tetris.curBlock.pos[0]=[b.curBlock.pos[0][0],b.curBlock.pos[0][1]-2];
							tetris.curBlock.pos[1]=b.curBlock.pos[2];
							tetris.curBlock.pos[2]=[b.curBlock.pos[1][0],b.curBlock.pos[1][1]-1];
							tetris.curBlock.pos[3]=[b.curBlock.pos[3][0]-1,b.curBlock.pos[3][1]+1];
							break;
						case 2:
							tetris.curBlock.pos[0]=[b.curBlock.pos[0][0],b.curBlock.pos[0][1]-2];
							tetris.curBlock.pos[1]=b.curBlock.pos[2];
							tetris.curBlock.pos[2]=[b.curBlock.pos[1][0],b.curBlock.pos[1][1]-1];
							tetris.curBlock.pos[3]=[b.curBlock.pos[3][0]-1,b.curBlock.pos[3][1]+1];
							break;
						case 3:
							tetris.curBlock.pos[0]=[b.curBlock.pos[0][0],b.curBlock.pos[0][1]-2];
							tetris.curBlock.pos[1]=b.curBlock.pos[2];
							tetris.curBlock.pos[2]=[b.curBlock.pos[1][0],b.curBlock.pos[1][1]-1];
							tetris.curBlock.pos[3]=[b.curBlock.pos[3][0]-1,b.curBlock.pos[3][1]+1];
							break;
					}
					break;
				case 3:
					switch(d){
						case 0:
							tetris.curBlock.pos[0]=[b.curBlock.pos[0][0]-1,b.curBlock.pos[0][1]-2];
							tetris.curBlock.pos[1]=b.curBlock.pos[1];
							tetris.curBlock.pos[2]=[b.curBlock.pos[2][0]+1,b.curBlock.pos[2][1]-1];
							tetris.curBlock.pos[3]=[b.curBlock.pos[0][0]+1,b.curBlock.pos[0][1]+2];
							break;
						case 1:
							tetris.curBlock.pos[0]=[b.curBlock.pos[0][0],b.curBlock.pos[0][1]-2];
							tetris.curBlock.pos[1]=b.curBlock.pos[2];
							tetris.curBlock.pos[2]=[b.curBlock.pos[1][0],b.curBlock.pos[1][1]-1];
							tetris.curBlock.pos[3]=[b.curBlock.pos[3][0]-1,b.curBlock.pos[3][1]+1];
							break;
						case 2:
							tetris.curBlock.pos[0]=[b.curBlock.pos[0][0],b.curBlock.pos[0][1]-2];
							tetris.curBlock.pos[1]=b.curBlock.pos[2];
							tetris.curBlock.pos[2]=[b.curBlock.pos[1][0],b.curBlock.pos[1][1]-1];
							tetris.curBlock.pos[3]=[b.curBlock.pos[3][0]-1,b.curBlock.pos[3][1]+1];
							break;
						case 3:
							tetris.curBlock.pos[0]=[b.curBlock.pos[0][0],b.curBlock.pos[0][1]-2];
							tetris.curBlock.pos[1]=b.curBlock.pos[2];
							tetris.curBlock.pos[2]=[b.curBlock.pos[1][0],b.curBlock.pos[1][1]-1];
							tetris.curBlock.pos[3]=[b.curBlock.pos[3][0]-1,b.curBlock.pos[3][1]+1];
							break;
					}
					break;
				case 4:
					switch(d){
						case 0:
							tetris.curBlock.pos[0]=[b.curBlock.pos[0][0]-1,b.curBlock.pos[0][1]-2];
							tetris.curBlock.pos[1]=b.curBlock.pos[1];
							tetris.curBlock.pos[2]=[b.curBlock.pos[2][0]+1,b.curBlock.pos[2][1]-1];
							tetris.curBlock.pos[3]=[b.curBlock.pos[0][0]+1,b.curBlock.pos[0][1]+2];
							break;
						case 1:
							tetris.curBlock.pos[0]=[b.curBlock.pos[0][0],b.curBlock.pos[0][1]-2];
							tetris.curBlock.pos[1]=b.curBlock.pos[2];
							tetris.curBlock.pos[2]=[b.curBlock.pos[1][0],b.curBlock.pos[1][1]-1];
							tetris.curBlock.pos[3]=[b.curBlock.pos[3][0]-1,b.curBlock.pos[3][1]+1];
							break;
						case 2:
							tetris.curBlock.pos[0]=[b.curBlock.pos[0][0],b.curBlock.pos[0][1]-2];
							tetris.curBlock.pos[1]=b.curBlock.pos[2];
							tetris.curBlock.pos[2]=[b.curBlock.pos[1][0],b.curBlock.pos[1][1]-1];
							tetris.curBlock.pos[3]=[b.curBlock.pos[3][0]-1,b.curBlock.pos[3][1]+1];
							break;
						case 3:
							tetris.curBlock.pos[0]=[b.curBlock.pos[0][0],b.curBlock.pos[0][1]-2];
							tetris.curBlock.pos[1]=b.curBlock.pos[2];
							tetris.curBlock.pos[2]=[b.curBlock.pos[1][0],b.curBlock.pos[1][1]-1];
							tetris.curBlock.pos[3]=[b.curBlock.pos[3][0]-1,b.curBlock.pos[3][1]+1];
							break;
					}
					break;
				case 5:
					switch(d){
						case 0:
							tetris.curBlock.pos[0]=[b.curBlock.pos[0][0]-1,b.curBlock.pos[0][1]-2];
							tetris.curBlock.pos[1]=b.curBlock.pos[1];
							tetris.curBlock.pos[2]=[b.curBlock.pos[2][0]+1,b.curBlock.pos[2][1]-1];
							tetris.curBlock.pos[3]=[b.curBlock.pos[0][0]+1,b.curBlock.pos[0][1]+2];
							break;
						case 1:
							tetris.curBlock.pos[0]=[b.curBlock.pos[0][0],b.curBlock.pos[0][1]-2];
							tetris.curBlock.pos[1]=b.curBlock.pos[2];
							tetris.curBlock.pos[2]=[b.curBlock.pos[1][0],b.curBlock.pos[1][1]-1];
							tetris.curBlock.pos[3]=[b.curBlock.pos[3][0]-1,b.curBlock.pos[3][1]+1];
							break;
						case 2:
							tetris.curBlock.pos[0]=[b.curBlock.pos[0][0],b.curBlock.pos[0][1]-2];
							tetris.curBlock.pos[1]=b.curBlock.pos[2];
							tetris.curBlock.pos[2]=[b.curBlock.pos[1][0],b.curBlock.pos[1][1]-1];
							tetris.curBlock.pos[3]=[b.curBlock.pos[3][0]-1,b.curBlock.pos[3][1]+1];
							break;
						case 3:
							tetris.curBlock.pos[0]=[b.curBlock.pos[0][0],b.curBlock.pos[0][1]-2];
							tetris.curBlock.pos[1]=b.curBlock.pos[2];
							tetris.curBlock.pos[2]=[b.curBlock.pos[1][0],b.curBlock.pos[1][1]-1];
							tetris.curBlock.pos[3]=[b.curBlock.pos[3][0]-1,b.curBlock.pos[3][1]+1];
							break;
					}
					break;
				case 6:
					switch(d){
						case 0:
							tetris.curBlock.pos[0]=[b.curBlock.pos[0][0]-1,b.curBlock.pos[0][1]-2];
							tetris.curBlock.pos[1]=b.curBlock.pos[1];
							tetris.curBlock.pos[2]=[b.curBlock.pos[2][0]+1,b.curBlock.pos[2][1]-1];
							tetris.curBlock.pos[3]=[b.curBlock.pos[0][0]+1,b.curBlock.pos[0][1]+2];
							break;
						case 1:
							tetris.curBlock.pos[0]=[b.curBlock.pos[0][0],b.curBlock.pos[0][1]-2];
							tetris.curBlock.pos[1]=b.curBlock.pos[2];
							tetris.curBlock.pos[2]=[b.curBlock.pos[1][0],b.curBlock.pos[1][1]-1];
							tetris.curBlock.pos[3]=[b.curBlock.pos[3][0]-1,b.curBlock.pos[3][1]+1];
							break;
						case 2:
							tetris.curBlock.pos[0]=[b.curBlock.pos[0][0],b.curBlock.pos[0][1]-2];
							tetris.curBlock.pos[1]=b.curBlock.pos[2];
							tetris.curBlock.pos[2]=[b.curBlock.pos[1][0],b.curBlock.pos[1][1]-1];
							tetris.curBlock.pos[3]=[b.curBlock.pos[3][0]-1,b.curBlock.pos[3][1]+1];
							break;
						case 3:
							tetris.curBlock.pos[0]=[b.curBlock.pos[0][0],b.curBlock.pos[0][1]-2];
							tetris.curBlock.pos[1]=b.curBlock.pos[2];
							tetris.curBlock.pos[2]=[b.curBlock.pos[1][0],b.curBlock.pos[1][1]-1];
							tetris.curBlock.pos[3]=[b.curBlock.pos[3][0]-1,b.curBlock.pos[3][1]+1];
							break;
					}
					break;
			}
		},
		render: function(){
			if(!pause){
				var bottom=false;
				var top=false;
				for(var i=0;i<4;i++){
					tetris.removeBlock(ctxG,tetris.curBlock.pos[i][0]*30, tetris.curBlock.pos[i][1]*30);
					tetris.curBlock.pos[i][1]++;
					tetris.drawBlock(ctxG,tetris.curBlock.pos[i][0]*30, tetris.curBlock.pos[i][1]*30, tetris.colors[tetris.curBlock.type]);
					if(tetris.curBlock.pos[i][1] >= tetris.graphB[tetris.curBlock.pos[i][0]]){
						bottom=true;
					}
				}
				if(bottom){
					$("#score").html(Number($("#score").html())+2);
					for(var i=0;i<4;i++){
						tetris.graphL[tetris.curBlock.pos[i][1]]=tetris.curBlock.pos[i][0]+1;
						tetris.graphB[tetris.curBlock.pos[i][0]] = tetris.curBlock.pos[i][1]-1;
						if(tetris.curBlock.pos[i][1] == 0){
							top=1;
						}
					}
					for(var i=3;i>=0;i--){
						tetris.graphR[tetris.curBlock.pos[i][1]]=tetris.curBlock.pos[i][0]-1;
					}
					if(top){
						tetris.end()
					}
					tetris.drawPrev(Math.floor((Math.random()*100)%7));
				}
				setTimeout(tetris.render, 500);
			}else{
				setTimeout(tetris.render, 200);
			}
		},
		init: function(){
			tetris.drawPrev(Math.floor((Math.random()*100)%7));
		},
		start : function(){
			tetris.drawPrev(Math.floor((Math.random()*100)%7));
			tetris.render();
		}, 
		pause: function(){

		},
		removeBlock:function(ctx,x,y){
			ctx.clearRect(x,y,30,30);
		},
		drawBlock:function(ctx,x,y,color){
			ctx.fillStyle=color;
			ctx.fillRect(x,y,30,30);
			ctx.strokeStyle="white";
			ctx.strokeRect(x,y,30,30);
		},
		drawPrev: function(n){
			tetris.curBlock = tetris.prevBlock;
			tetris.prevBlock = new block(n);
			ctxP.clearRect(0,0,canvasP.width,canvasP.height);
			switch(n){
				//[][][][]
				case 0:
					tetris.drawBlock(ctxP,0,45,tetris.colors["pink"]);
					tetris.prevBlock.pos[0]=[3,0-1];
					tetris.drawBlock(ctxP,30,45,tetris.colors["pink"]);
					tetris.prevBlock.pos[1]=[4,0-1];
					tetris.drawBlock(ctxP,60,45,tetris.colors["pink"]);
					tetris.prevBlock.pos[2]=[5,0-1];
					tetris.drawBlock(ctxP,90,45,tetris.colors["pink"]);
					tetris.prevBlock.pos[3]=[6,0-1];
					break;
				//[][]
				//[][]
				case 1:
					tetris.drawBlock(ctxP,30,30,tetris.colors["green"]);
					tetris.prevBlock.pos[0]=[4,1-1];
					tetris.drawBlock(ctxP,30,60,tetris.colors["green"]);
					tetris.prevBlock.pos[1]=[4,0-1];
					tetris.drawBlock(ctxP,60,30,tetris.colors["green"]);
					tetris.prevBlock.pos[2]=[5,1-1];
					tetris.drawBlock(ctxP,60,60,tetris.colors["green"]);
					tetris.prevBlock.pos[3]=[5,0-1];
					break;
				//[][][]
				//  []
				case 2:
					tetris.drawBlock(ctxP,15,30,tetris.colors["yellow"]);
					tetris.prevBlock.pos[0]=[3,0-1];
					tetris.drawBlock(ctxP,45,60,tetris.colors["yellow"]);
					tetris.prevBlock.pos[1]=[4,1-1];
					tetris.drawBlock(ctxP,45,30,tetris.colors["yellow"]);
					tetris.prevBlock.pos[2]=[4,0-1];
					tetris.drawBlock(ctxP,75,30,tetris.colors["yellow"]);
					tetris.prevBlock.pos[3]=[5,0-1];
					break;
				//[][][]
				//    []
				case 3:
					tetris.drawBlock(ctxP,15,30,tetris.colors["blue"]);
					tetris.prevBlock.pos[0]=[3,0-1];
					tetris.drawBlock(ctxP,45,30,tetris.colors["blue"]);
					tetris.prevBlock.pos[1]=[4,0-1];
					tetris.drawBlock(ctxP,75,30,tetris.colors["blue"]);
					tetris.prevBlock.pos[3]=[5,0-1];
					tetris.drawBlock(ctxP,75,60,tetris.colors["blue"]);
					tetris.prevBlock.pos[2]=[5,1-1];
					break;
				//[][][]
				//[]
				case 4:
					tetris.drawBlock(ctxP,15,60,tetris.colors["orange"]);
					tetris.prevBlock.pos[0]=[3,1-1];
					tetris.drawBlock(ctxP,15,30,tetris.colors["orange"]);
					tetris.prevBlock.pos[1]=[3,0-1];
					tetris.drawBlock(ctxP,45,30,tetris.colors["orange"]);
					tetris.prevBlock.pos[2]=[4,0-1];
					tetris.drawBlock(ctxP,75,30,tetris.colors["orange"]);
					tetris.prevBlock.pos[3]=[5,0-1];
					break;
				//[][]
				//  [][]
				case 5:
					tetris.drawBlock(ctxP,15,30,tetris.colors["red"]);
					tetris.prevBlock.pos[0]=[3,0-1];
					tetris.drawBlock(ctxP,45,60,tetris.colors["red"]);
					tetris.prevBlock.pos[1]=[4,1-1];
					tetris.drawBlock(ctxP,45,30,tetris.colors["red"]);
					tetris.prevBlock.pos[2]=[4,0-1];
					tetris.drawBlock(ctxP,75,60,tetris.colors["red"]);
					tetris.prevBlock.pos[3]=[5,1-1];
					break;
				//  [][]
				//[][]
				case 6:
					tetris.drawBlock(ctxP,45,30,tetris.colors["purple"]);
					tetris.prevBlock.pos[0]=[3,1-1];
					tetris.drawBlock(ctxP,75,30,tetris.colors["purple"]);
					tetris.prevBlock.pos[1]=[4,1-1];
					tetris.drawBlock(ctxP,45,60,tetris.colors["purple"]);
					tetris.prevBlock.pos[2]=[4,0-1];
					tetris.drawBlock(ctxP,15,60,tetris.colors["purple"]);
					tetris.prevBlock.pos[3]=[5,0-1];
					break;
			}
		}
	};
	$("#dialog").hide();
	tetris.init();
	$("body").keydown(function(e){
		switch(e.keyCode){
			case 38: tetris.up();e.preventDefault();break;
			case 37: tetris.left();e.preventDefault();break;
			case 39: tetris.right();e.preventDefault();break;
			case 40: tetris.down();e.preventDefault();break;
		}
	})
	$("#start").click(function(){
		if(pause){
			if(!started){
				tetris.start();
				started=true;
			}
			this.innerHTML = "Pause";
		}else{
			tetris.pause();
			this.innerHTML = "Start";
		}
		pause=!pause;
	});
});