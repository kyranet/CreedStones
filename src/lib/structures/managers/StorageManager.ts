import { Player } from '../gameObjects/characters/Player';
import { GameObject, IGameObjectSerialized } from '../gameObjects/GameObject';
import { GameManager } from './GameManager';

export class StorageManager {

	public constructor(private readonly gameManager: GameManager) { }

	public save() {
		localStorage.clear();
		localStorage.setItem('gameObjects', JSON.stringify(this.gameManager.gameObjects));
	}

	public load() {
		// Clear the game manager
		this.gameManager.clear();

		// Load the data
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
