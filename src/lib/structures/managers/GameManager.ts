import { Game } from 'phaser';
import { Player } from '../gameObjects/characters/Player';
import { GameObject } from '../gameObjects/GameObject';
import { MapManager } from './MapManager';

export class GameManager {
	public map: MapManager = null;
	public player: Player = null;
	public gameObjects: GameObject[] = [];

	public constructor(public game: Game) {
		this.player = new Player(this, 0, 0);
	}

}
