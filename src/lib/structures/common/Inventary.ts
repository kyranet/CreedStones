import { IItemSerialized, Item } from '../../items/Item';

export class Inventary extends Map<string, Item> {

	public active: Item;

	/**
	 * Set the active item from the inventary
	 * @param item The new active item
	 */
	public setActive(item: Item) {
		this.active = item;
		return this;
	}

	public toJSON(): IInventarySerialized {
		return {
			active: this.active.name,
			items: [...this.values()]
		};
	}

}

export interface IInventarySerialized {
	active: string;
	items: IItemSerialized[];
}
