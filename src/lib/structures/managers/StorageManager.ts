import { GameManager } from './GameManager';

export class StorageManager {

	public constructor(private readonly gameManager: GameManager) { }

	public save() {
		localStorage.clear();
		localStorage.setItem('player', JSON.stringify(this.gameManager.player));
		localStorage.setItem('gameObjects', JSON.stringify(this.gameManager.gameObjects));
	}

}
