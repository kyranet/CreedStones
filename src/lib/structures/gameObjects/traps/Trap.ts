import { Character } from '../characters/Character';
import { GameObject } from '../GameObject';

export class Trap extends GameObject {

	protected active = false;
	protected damageStrength = 0;
	protected lethal = false;

	public setDamageStrength(damageStrength: number) {
		this.damageStrength = damageStrength;
		return this;
	}

	public setLethal(lethal: boolean) {
		this.lethal = lethal;
		return this;
	}

	public setActive(active: boolean) {
		this.active = active;
		return this;
	}

	public onContact(character: Character) {
		if (this.lethal) character.kill();
		else character.damage(this.damageStrength);
	}

}

Trap.factory.add(Trap);
