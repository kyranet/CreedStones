import { Game } from 'phaser';
import { GameObject } from '../common/GameObject';
import { Player } from '../gameObjects/characters/Player';
import { MapManager } from './MapManager';

export class GameManager {
	public map: MapManager = null;
	public player: Player = null;
	public gameObjects: GameObject[] = [];

	public constructor(public game: Game) {
		this.player = new Player(this, 0, 0);
	}

}
