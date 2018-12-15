declare module 'easystarjs' {
	export = EasyStar;
}

declare namespace EasyStar {

	export const TOP: 'TOP';
	export const TOP_RIGHT: 'TOP_RIGHT';
	export const RIGHT: 'RIGHT';
	export const BOTTOM_RIGHT: 'BOTTOM_RIGHT';
	export const BOTTOM: 'BOTTOM';
	export const BOTTOM_LEFT: 'BOTTOM_LEFT';
	export const LEFT: 'LEFT';
	export const TOP_LEFT: 'TOP_LEFT';
	/**
	 * The directions
	 */
	type Direction = 'TOP' | 'TOP_RIGHT' | 'RIGHT' | 'BOTTOM_RIGHT' | 'BOTTOM' | 'BOTTOM_LEFT' | 'LEFT' | 'TOP_LEFT';

	// tslint:disable-next-line:class-name
	export class js {

		/**
		 * Sets the collision grid that EasyStar uses.
		 *
		 * @param tiles An array of numbers that represent
		 * which tiles in your grid should be considered
		 * acceptable, or "walkable".
		 */
		public setAcceptableTiles(tiles: number[] | number): void;

		/**
		 * Enables sync mode for this EasyStar instance..
		 * if you're into that sort of thing.
		 */
		public enableSync(): void;

		/**
		 * Disables sync mode for this EasyStar instance.
		 */
		public disableSync(): void;

		/**
		 * Enable diagonal pathfinding.
		 */
		public enableDiagonals(): void;

		/**
		 * Disable diagonal pathfinding.
		 */
		public disableDiagonals(): void;

		/**
		 * Sets the collision grid that EasyStar uses.
		 *
		 * @param grid The collision grid that this EasyStar instance will read from.
		 * This should be a 2D Array of Numbers.
		 */
		public setGrid(grid: number[][]): void;

		/**
		 * Sets the tile cost for a particular tile type.
		 *
		 * @param The tile type to set the cost for.
		 * @param The multiplicative cost associated with the given tile.
		 */
		public setTileCost(tileType: number, cost: number): void;

		/**
		 * Sets the an additional cost for a particular point.
		 * Overrides the cost from setTileCost.
		 *
		 * @param x The x value of the point to cost.
		 * @param y The y value of the point to cost.
		 * @param The multiplicative cost associated with the given point.
		 */
		public setAdditionalPointCost(x: number, y: number, cost: number): void;

		/**
		 * Remove the additional cost for a particular point.
		 *
		 * @param x The x value of the point to stop costing.
		 * @param y The y value of the point to stop costing.
		 */
		public removeAdditionalPointCost(x: number, y: number): void;

		/**
		 * Remove all additional point costs.
		 */
		public removeAllAdditionalPointCosts(): void;

		/**
		 * Sets the number of search iterations per calculation.
		 * A lower number provides a slower result, but more practical if you
		 * have a large tile-map and don't want to block your thread while
		 * finding a path.
		 *
		 * @param iterations The number of searches to prefrom per calculate() call.
		 */
		public setIterationsPerCalculation(iterations: number): void;

		/**
		 * Avoid a particular point on the grid,
		 * regardless of whether or not it is an acceptable tile.
		 *
		 * @param x The x value of the point to avoid.
		 * @param y The y value of the point to avoid.
		 */
		public avoidAdditionalPoint(x: number, y: number): void;

		/**
		 * Stop avoiding a particular point on the grid.
		 *
		 * @param x The x value of the point to stop avoiding.
		 * @param y The y value of the point to stop avoiding.
		 */
		public stopAvoidingAdditionalPoint(x: number, y: number): void;

		/**
		 * Enables corner cutting in diagonal movement.
		 */
		public enableCornerCutting(): void;

		/**
		 * Disables corner cutting in diagonal movement.
		 */
		public disableCornerCutting(): void;

		/**
		 * Stop avoiding all additional points on the grid.
		 */
		public stopAvoidingAllAdditionalPoints(): void;

		/**
		 * Find a path.
		 *
		 * @param startX The X position of the starting point.
		 * @param startY The Y position of the starting point.
		 * @param endX The X position of the ending point.
		 * @param endY The Y position of the ending point.
		 * @param callback A function that is called when your path
		 * is found, or no path is found.
		 * @return A numeric, non-zero value which identifies the created instance. This value can be passed to cancelPath to cancel the path calculation.
		 *
		 */
		public findPath(startX: number, startY: number, endX: number, endY: number, callback: (path: { x: number; y: number }[]) => void): number;

		/**
		 * Cancel a path calculation.
		 *
		 * @param instanceId The instance ID of the path being calculated
		 * @return True if an instance was found and cancelled.
		 */
		public cancelPath(instanceId: number): boolean;

		/**
		 * This method steps through the A* Algorithm in an attempt to
		 * find your path(s). It will search 4-8 tiles (depending on diagonals) for every calculation.
		 * You can change the number of calculations done in a call by using
		 * easystar.setIteratonsPerCalculation().
		 */
		public calculate(): void;

		/**
		 * Sets a directional condition on a tile
		 *
		 * @param x The x value of the point.
		 * @param y The y value of the point.
		 * @param allowedDirections A list of all the allowed directions from which the tile is accessible.
		 *
		 * eg. easystar.setDirectionalCondition(1, 1, ['TOP']): You can only access the tile by walking down onto it,
		 */
		public setDirectionalCondition(x: number, y: number, allowedDirections: Direction[]): void;

		/**
		 * Remove all directional conditions
		 */
		public removeAllDirectionalConditions(): void;
	}

}
