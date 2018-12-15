import { GameObject, IGameObjectSerialized } from '../../common/GameObject';
import { HidingType } from '../../common/types';
import { GameManager } from '../../managers/GameManager';

export class HidingSpot extends GameObject {

	/**
	 * The hiding type
	 */
	public hidingType = HidingType.none;

	public constructor(gameManager: GameManager, x: number, y: number) {
		super(gameManager, x, y, 'hidingSpot');
	}

	/**
	 * Set the hiding type for this spot
	 * @param hidingType The hiding type
	 */
	public setHidingType(hidingType: HidingType) {
		this.hidingType = hidingType;
		return this;
	}

	public toJSON(): IHidingSpotSerialized {
		return {
			...super.toJSON(),
			hidingType: this.hidingType
		};
	}

}

/**
 * The serialized hiding spot data
 */
export interface IHidingSpotSerialized extends IGameObjectSerialized {
	hidingType: number;
}
