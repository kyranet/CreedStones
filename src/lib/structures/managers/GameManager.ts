import { Player } from '../gameObjects/characters/Player';
import { GameObject } from '../gameObjects/GameObject';
import { MapManager } from './MapManager';
import { StorageManager } from './StorageManager';

export class GameManager {
	public mapManager: MapManager = null;
	public storageManager = new StorageManager(this);
	public gameObjects: GameObject[] = [];
	public player: Player = null;
	public playerName: string = null;
	public level = GameLevels.First;

	public constructor(public game: Phaser.Game) { }

	public clear() {
		for (const gameObject of this.gameObjects) gameObject.destroy(true);
		this.gameObjects.length = 0;
		return this;
	}

}

/**
 * The game's levels
 */
export enum GameLevels {
	First
}
