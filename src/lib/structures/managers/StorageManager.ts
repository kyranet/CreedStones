import { Player } from '../gameObjects/characters/Player';
import { GameObject, IGameObjectSerialized } from '../gameObjects/GameObject';
import { GameManager } from './GameManager';

export class StorageManager {

	public constructor(private readonly gameManager: GameManager) { }

	public save() {
		localStorage.clear();
		localStorage.setItem('gameObjects', JSON.stringify(this.gameManager.gameObjects));
		localStorage.setItem('level', this.gameManager.level.toString());
	}

	public load() {
		// Clear the game manager
		this.gameManager.clear();

		// Load the data
		const level = Number(localStorage.getItem('level'));
		if (Number.isNaN(level)) throw new Error(`Could not find a saved file.`);

		this.gameManager.level = level;

		const gameObjects = JSON.parse(localStorage.getItem('gameObjects')) as IGameObjectSerialized[];
		if (gameObjects) {
			for (const gameObject of gameObjects) {
				const Ctor = GameObject.factory.get(gameObject.type);
				if (Ctor) new Ctor(this.gameManager, 0, 0).fromJSON(gameObject);
				throw new Error(`Could not find a constructor for ${gameObject.type || 'unknown'}. Aborting.`);
			}

			this.gameManager.player = this.gameManager.gameObjects.find((gameObject) => gameObject instanceof Player) as Player;
		}
	}

}
