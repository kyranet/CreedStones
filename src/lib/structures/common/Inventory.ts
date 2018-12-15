import { IItemSerialized, Item } from '../items/Item';

export class Inventory extends Map<string, Item> {

	public active: Item;

	/**
	 * Set the active item from the inventory
	 * @param item The new active item
	 */
	public setActive(item: Item) {
		this.active = item;
		return this;
	}

	public toJSON(): IInventorySerialized {
		return {
			active: this.active.name,
			items: [...this.values()]
		};
	}

}

/**
 * The serialized inventory data
 */
export interface IInventorySerialized {
	active: string;
	items: IItemSerialized[];
}
