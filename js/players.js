"use strict"
class Players {
	constructor(name,weapon,y,x,sprite,movecount,healthPoints,defense){
		this.name = name;
  		this.weapon = weapon;
  		this.y=y;
  		this.x=x;
  		this.sprite=sprite;
  		this.movecount=movecount;
  		this.healthPoints=healthPoints;
  		this.defense=defense;
	};

	eventMove() {
		$(window).keypress(function(event){
			if (event.which == 122 && currentPlayer.movecount < 3) { // Haut
				currentPlayer.moveUp();
				currentPlayer.movecount++;
			};
			if (event.which == 115 && currentPlayer.movecount < 3) { // Bas 
				currentPlayer.moveDown();
				currentPlayer.movecount++;
			};
			if (event.which == 113 && currentPlayer.movecount < 3) { // Gauche
				currentPlayer.moveLeft();
				currentPlayer.movecount++;
			};
			if (event.which == 100 && currentPlayer.movecount < 3) { // Droite
				currentPlayer.moveRight();
				currentPlayer.movecount++;
			};
			game.windowUpdate();
		});
	};

	moveDown(){
		let currentCell = cellArray[this.y][this.x];
		if (this.y === 9 || cellArray[this.y+1][this.x].type === "impassable") { // Si le joueur est contre un mur ou va vers une impassable, ne rien faire et ne pas compter de coup
			console.log("Un obstacle vous gêne");
			if(this.movecount > 0) {
				this.movecount--;
			}
		}
		else {
			delete currentCell.player;
			currentCell.checkCurrent()
			this.y+=1;
			let destinationCell = cellArray[this.y][this.x]; // La cell ou il va
			destinationCell.type="player"; // La cell devient une cell joueur
			destinationCell.player = this;
			destinationCell.checkNext();
			this.checkFight();
		}
	};

	moveUp(){
		let currentCell = cellArray[this.y][this.x];
		if (this.y === 0 || cellArray[this.y-1][this.x].type === "impassable") { // Si le joueur est contre un mur ou va vers une impassable, ne rien faire et ne pas compter de coup
			console.log("Un obstacle vous gêne");
			if(this.movecount > 0) {
				this.movecount--;
			}
		}
		else {
			delete currentCell.player;
			currentCell.checkCurrent()
			this.y-=1;
			let destinationCell = cellArray[this.y][this.x]; // La cell ou il va
			destinationCell.type="player"; // La cell devient une cell joueur
			destinationCell.player = this;
			destinationCell.checkNext();
			this.checkFight();
		}
	};
	moveRight(){
		let currentCell = cellArray[this.y][this.x];
		if (this.x === 9 || cellArray[this.y][this.x+1].type === "impassable") { // Si le joueur est contre un mur ou va vers une impassable, ne rien faire et ne pas compter de coup
			console.log("Un obstacle vous gêne");
			if(this.movecount > 0) {
				this.movecount--;
			}
		}
		else {
			delete currentCell.player;
			currentCell.checkCurrent()
			this.x+=1;
			let destinationCell = cellArray[this.y][this.x]; // La cell ou il va
			destinationCell.type="player"; // La cell devient une cell joueur
			destinationCell.player = this;
			destinationCell.checkNext();
			this.checkFight();
		}
	};

	moveLeft(){
		let currentCell = cellArray[this.y][this.x];
		if (this.x === 0 || cellArray[this.y][this.x-1].type === "impassable") { // Si le joueur est contre un mur ou va vers une impassable, ne rien faire et ne pas compter de coup
			console.log("Un obstacle vous gêne");
			if(this.movecount > 0) {
				this.movecount--;
			}
		}
		else {
			delete currentCell.player;
			currentCell.checkCurrent()
			this.x-=1;
			let destinationCell = cellArray[this.y][this.x]; // La cell ou il va
			destinationCell.checkNext();
			this.checkFight();
		}
	};

	checkFight() { // A OPTIMISER switch/case
		if (cellArray[this.y-1][this.x].type === "player" || cellArray[this.y+1][this.x].type === "player" || cellArray[this.y][this.x-1].type === "player" || cellArray[this.y][this.x+1].type === "player") {
		} 
	};
	
	attack() {
		if (otherPlayer.defense === 1) {
			otherPlayer.healthPoints -= this.weapon['damage']/2;
			otherPlayer.defense=0;
		}
		else {
			otherPlayer.healthPoints -= this.weapon['damage'];
		}
		if (otherPlayer.healthPoints <= 0) {
			game.endFight();
		}
	};
	defenseStance() {
		this.defense = 1;
	};
};

var player1;
var player2;