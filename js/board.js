"use strict";
class Board {
	constructor() {
	}
	generateMap() {
		let cellId=0; // Position / ID des cells
		cellArray = [];
		for(let y=0; y < 10; y++) {
			cellArray[y] = []; // Nouvelle row de x:0 a x:9
			for (let x = 0; x < 10; x++) {
				cellArray[y][x] = new Cellule("empty",y,x,cellId++,"floor-1.jpg"); // 10 cells dans la row (x), type empty de base
			};
		};
	};
	generateObstacles() {
		let i=0; 
		while (i<12) { 
			let newY = getY(); // Nouveau Y
			let newX = getX(); // Nouveau X

			while(cellArray[newY][newX].type !== "empty") { // Tant que la case n'est pas vide, regénérer X et Y
				newY = getY();				
				newX = getX();
			}
			cellArray[newY][newX].type="impassable";
			cellArray[newY][newX].sprite="rocks.png";
			i++;
		};
	};
	generateWeapons() {
		let i=0; // Implémentation des armes si ce n'est pas une case impassable et pas déjà une case arme
		while (i<4) { 
			let newY = getY(); // Nouveau Y
			let newX = getX(); // Nouveau X
			while(cellArray[newY][newX].type !== "empty") { // Tant que la case n'est pas vide, regénérer X et Y
				newY = getY();				
				newX = getX();
			}
			cellArray[newY][newX].type="weapon"; // Passage de la propriété type de la cellule en "impassable"
			if (i==0) {cellArray[newY][newX].weapon=dagger;}
			if (i==1) {cellArray[newY][newX].weapon=sword;}
			if (i==2) {cellArray[newY][newX].weapon=axe;}
			if (i==3) {cellArray[newY][newX].weapon=hammer;}
			i++;
		};
	};
	generatePlayers() {
		for(let i=0; i<2; i++) {
				let newY = getY();				
				let newX = getX();
			while(cellArray[newY][newX].type !== "empty") { // Tant que la case n'est pas vide, regénérer X et Y
				newY = getY();				
				newX = getX();
			};
			if (i === 0) {
				player1 = new Players("player1",fists,"","","player1.png",0,100,0);
				cellArray[newY][newX].player=player1;
				player1.y=newY;
				player1.x=newX;
				cellArray[newY][newX].type="player";
			};
			if (i===1) { 
				while(newX === player1.x +1 || newX === player1.x -1 ||newY === player1.y +1 || newY === player1.y -1) {
					newY = getY();				
					newX = getX();
				};
				player2 = new Players("player2",fists,"","","player2.png",0,100,0);
				cellArray[newY][newX].player=player2;
				player2.y=newY;
				player2.x=newX;
				cellArray[newY][newX].type="player";
			};
		};
	};
displayMap() {
		var map = $('.map');
		let cellId=0;
		console.log(cellArray)
		for (let y = 0; y < 10; y++) {
			let row = $('<div class="row"></div>');
			row.appendTo(map);
			for(let x=0; x < 10; x++) {
				let newCell = $('<div class="cell"></div>');
				switch(cellArray[y][x].type) {
					case "weapon":
						newCell.css("background-image", "url(img/"+cellArray[y][x].weapon['sprite']);
						break;
					case "player":
						newCell.css("background-image", "url(img/"+cellArray[y][x].player['sprite']);
						break;
					case "impassable":
						newCell.css("background-image", "url(img/"+cellArray[y][x].sprite);
						break;
					default: 
						newCell.css("background-image", "url(img/"+cellArray[y][x].sprite);
						break;
				}
				newCell.attr("id",cellId);
				newCell.appendTo(row);
				cellId++;
			}	
		}		
	};
	hideMap() {
		$('.map').fadeOut();
		$('.windowInfos').fadeOut();
	}
	displayFight() {
		$('.fightWindow').show();
	}
};

class Cellule { // Constructeur cellule
	constructor(type,y,x,id,sprite){
		this.type = type;
		this.y = y;
		this.x = x;
  		this.id = id;
  		this.sprite=sprite;
	}
	checkCurrent() {
		if (this.hasOwnProperty("weapon")) {
			this.type="weapon";
			$("div[id='"+this.id+"']").css("background-image", "url(img/"+this.weapon['sprite']);
		}
		else {
			this.type="empty";
			$("div[id='"+this.id+"']").css("background-image", "url(img/"+this.sprite);
		}
	}
	checkNext() {
		if (this.hasOwnProperty("weapon")) {
			let ancienWeapon = currentPlayer.weapon;
			currentPlayer.weapon = this.weapon;
			this.weapon = ancienWeapon;
			$("div[id='"+this.id+"']").css("background-image", "url(img/"+ancienWeapon['sprite']);
		}
		this.type="player"; // La cell devient une cell joueur
		this.player = currentPlayer;
		$("div[id='"+this.id+"']").css("background-image", "url(img/"+currentPlayer.sprite);
	}
}
var cellArray = []; // Tableau des cellules