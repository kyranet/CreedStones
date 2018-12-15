import { GameManager } from '../../managers/GameManager';
import { Character } from './Character';

export class NPC extends Character {

	public constructor(gameManager: GameManager, x: number, y: number) {
		super(gameManager, x, y, 'npc');
	}

	/**
	 * The onIteraction handler
	 */
	public interaction() {
		return this;
	}

}

NPC.factory.add(NPC);
