"use strict"
class Game {
	constructor(board,firstAttacker) {
		this.board         = new Board();
		this.firstAttacker = firstAttacker;
	};
	load() {
		this.board.generateMap(); // Génère la carte
		this.board.generateObstacles(); // Génere les obstacles 
		this.board.generateWeapons(); // Les armes
 		this.board.generatePlayers(); // Les joueurs
		this.board.displayMap(); // Affiche tout
		$('.fightWindow').hide();
		$('.windowInfos').hide();
	};
	startGame() {
		let allPlayers=[player1,player2];
		currentPlayer=allPlayers[Math.floor(Math.random() * allPlayers.length)];
		if (currentPlayer === player1) {
			otherPlayer = player2;
		} else {
			otherPlayer = player1;
		}
		currentPlayer.eventMove();
		$('.windowInfos').show();
		this.windowUpdate();	
	};
	endTurn() {
		if (currentPlayer === player1) {
			currentPlayer = player2;
			otherPlayer   = player1;
		}
		else {
			currentPlayer = player1;
			otherPlayer   = player2;
		}
		currentPlayer.movecount=0;
		this.windowUpdate();		
	};
	windowUpdate() {
		$('.playerName').html(currentPlayer.name);
		$('.playerSprite').css("background-image", "url(img/"+currentPlayer['sprite']);
		$('.weaponName').html(currentPlayer.weapon['name'].toUpperCase());
		$('.weaponImage').css("background-image", "url(img/"+currentPlayer.weapon['sprite']);
		$('.weaponInfos').html("Votre arme actuelle inflige <strong>"+currentPlayer.weapon['damage'] + "</strong> dégâts")
		$('.moveCount').html("Vous avez joué : " + currentPlayer.movecount + " coups / 3");
		$('.healthbar').html("Vos points de vie : " + currentPlayer.healthPoints);
	};
	displayFight() {
		alert('Le combat débute');
		this.board.hideMap();
		this.board.displayFight();
		this.fightWindowUpdate();
		this.startFight();
	};
	displayPlayerTurn(){
		if (currentPlayer) {
			let currentTurn = $('.playerTurn').html('Au tour de ' + currentPlayer.name);
			currentTurn.fadeIn(1200);
			currentTurn.fadeOut(1200);
		} 
	};

	startFight() {
		this.displayPlayerTurn();
		this.firstAttacker = currentPlayer;

		$(".fw-attack").click(function() {
			currentPlayer.attack();
			game.updateHealthbar();
			game.endTurn();
			game.displayPlayerTurn();	
		});

		$(".fw-defense").click(function() {
			currentPlayer.defenseStance();
			game.endTurn();
			game.displayPlayerTurn();	
		});	
	};

	fightWindowUpdate() {
		// CurrentPlayer
		$('.c-fw-name').html(currentPlayer.name);
		$('.c-fw-player').css('background-image',"url(img/"+currentPlayer['sprite']);
		$('.c-fw-weapon').css("background-image", "url(img/"+currentPlayer.weapon['sprite']);
		$('.c-fw-healthbar').html(currentPlayer.healthPoints + " HP");
		$('.c-fw-healthbar').css('width',currentPlayer.healthPoints+'%');
		$('.c-fw-damages').html("Votre arme inflige : " + currentPlayer.weapon['damage'] + " points de dégâts");
		// otherPlayer
		$('.o-fw-name').html(otherPlayer.name);
		$('.o-fw-player').css('background-image',"url(img/"+otherPlayer['sprite']);
		$('.o-fw-weapon').css("background-image", "url(img/"+otherPlayer.weapon['sprite']);
		$('.o-fw-healthbar').html(otherPlayer.healthPoints + " HP");
		$('.o-fw-healthbar').css('width',otherPlayer.healthPoints+'%');
		$('.o-fw-damages').html("Votre arme inflige : " + otherPlayer.weapon['damage'] + " points de dégâts");
	};

	updateHealthbar() {
		if (this.firstAttacker === player1) {
			$('.o-fw-healthbar').html(player2.healthPoints+" HP");
			$('.o-fw-healthbar').css("width",player2.healthPoints+"%");
			$('.c-fw-healthbar').html(player1.healthPoints+" HP");
			$('.c-fw-healthbar').css("width",player1.healthPoints+"%");
		} else {
			$('.o-fw-healthbar').html(player1.healthPoints+" HP");
			$('.o-fw-healthbar').css("width",player1.healthPoints+"%");
			$('.c-fw-healthbar').html(player2.healthPoints+" HP");
			$('.c-fw-healthbar').css("width",player2.healthPoints+"%");
		};
	};
	endFight() {
		alert(currentPlayer.name + " a gagné !");
		location.reload(true);
	}
};
// Initialisation de variables requises //
var currentPlayer;
var otherPlayer;
// Lancement du chargement //
var game = new Game();
game.load();

$('.startGame').click(function(){
	game.startGame();
	$(this).fadeOut(300);
});

$('.endTurn').click(function(){
	game.endTurn();
});