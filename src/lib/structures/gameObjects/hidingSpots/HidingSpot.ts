import { GameManager } from '../../managers/GameManager';
import { HidingType } from '../../misc/types';
import { GameObject, IGameObjectSerialized } from '../GameObject';

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

HidingSpot.factory.add(HidingSpot);

/**
 * The serialized hiding spot data
 */
export interface IHidingSpotSerialized extends IGameObjectSerialized {
	hidingType: number;
}
