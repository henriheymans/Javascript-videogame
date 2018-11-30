"use strict"
class Weapon {
	constructor(name, damage, model, sprite){
		this.name = name;
  		this.damage = damage;
  		this.model=model;
  		this.sprite=sprite;
	}
}
let weaponArray= [];
let fists = new Weapon("fists",10,"wFists","fists.png");
let dagger = new Weapon("dagger",15,"wDagger","dagger.png");
let sword = new Weapon("sword",20,"wSword","sword.png");
let axe = new Weapon("axe",25,"wAxe","axe.png");
let hammer = new Weapon("hammer",30,"wHammer","hammer.png");
weaponArray.push(fists, dagger, sword, axe, hammer);