export class Factory<V, C extends new (...args: any[]) => V> extends Map<string, C> {

	public add(ctor: C) {
		this.set(ctor.name, ctor);
		return this;
	}

}
