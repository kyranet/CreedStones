export enum Direction {
	up,
	down,
	right,
	left
}

export enum BoulderState {
	stop,
	move
}

export enum HidingType {
	none,
	bushes,
	cave,
	haystack
}

export const CharacterState: ICharacterState = {
	dead: 0,
	run: 1,
	stand: 2,
	walk: 3
};

export const PlayerState: IPlayerState = {
	...CharacterState,
	hidden: 4
};

export const EnemyState: IEnemyState = {
	...CharacterState,
	onRoute: 4,
	pursuit: 5
};

interface ICharacterState {
	dead: 0;
	run: 1;
	stand: 2;
	walk: 3;
}

interface IPlayerState extends ICharacterState {
	hidden: 4;
}

interface IEnemyState extends ICharacterState {
	onRoute: 4;
	pursuit: 5;
}
