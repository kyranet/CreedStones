import { HidingType, PlayerState } from '../../common/types';
import { GameManager } from '../../managers/GameManager';
import { HidingSpot, IHidingSpotSerialized } from '../hidingSpots/HidingSpot';
import { Character, ICharacterSerialized } from './Character';

export class Player extends Character {

	public hidingSpot: HidingSpot = null;
	public money = 0;

	public constructor(gameManager: GameManager, x: number, y: number) {
		super(gameManager, x, y, 'player');
	}

	/**
	 * Hides the player, changing the state and setting the hiding spot
	 * @param hidingSpot The hiding spot
	 */
	public hide(hidingSpot: HidingSpot) {
		if (hidingSpot.hidingType !== HidingType.none) {
			this.setState(PlayerState.hidden);
			this.hidingSpot = hidingSpot;
		}
		return this;
	}

	/**
	 * Reveals the player, leaving the hiding place if there was any
	 */
	public reveal() {
		if (this.hidingSpot) {
			this.setState(this.health ? PlayerState.stand : PlayerState.dead);
			this.hidingSpot = null;
		}
		return this;
	}

	public fromJSON(data: IPlayerSerialized) {
		super.fromJSON(data);
		return this;
	}

	public toJSON(): IPlayerSerialized {
		return {
			...super.toJSON(),
			hidingSpot: this.hidingSpot.toJSON(),
			money: this.money
		};
	}

}

export interface IPlayerSerialized extends ICharacterSerialized {
	hidingSpot: IHidingSpotSerialized;
	money: number;
}
