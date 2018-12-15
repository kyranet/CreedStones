// Type definitions for p2.js v0.6.0
// Project: https://github.com/schteppe/p2.js/

declare namespace p2 {

	export class AABB {

		public constructor(options?: {
			upperBound?: number[];
			lowerBound?: number[];
		});

		public setFromPoints(points: number[][], position: number[], angle: number, skinSize: number): void;
		public copy(aabb: AABB): void;
		public extend(aabb: AABB): void;
		public overlaps(aabb: AABB): boolean;

	}

	export class Broadphase {

		public static AABB: number;
		public static BOUNDING_CIRCLE: number;

		public static NAIVE: number;
		public static SAP: number;

		public static boundingRadiusCheck(bodyA: Body, bodyB: Body): boolean;
		public static aabbCheck(bodyA: Body, bodyB: Body): boolean;
		public static canCollide(bodyA: Body, bodyB: Body): boolean;

		public constructor(type: number);

		public type: number;
		public result: Body[];
		public world: World;
		public boundingVolumeType: number;

		public setWorld(world: World): void;
		public getCollisionPairs(world: World): Body[];
		public boundingVolumeCheck(bodyA: Body, bodyB: Body): boolean;

	}

	export class GridBroadphase extends Broadphase {

		public constructor(options?: {
			xmin?: number;
			xmax?: number;
			ymin?: number;
			ymax?: number;
			nx?: number;
			ny?: number;
		});

		public xmin: number;
		public xmax: number;
		public ymin: number;
		public ymax: number;
		public nx: number;
		public ny: number;
		public binsizeX: number;
		public binsizeY: number;

	}

	export class NativeBroadphase extends Broadphase {

	}

	export class Narrowphase {

		public contactEquations: ContactEquation[];
		public frictionEquations: FrictionEquation[];
		public enableFriction: boolean;
		public slipForce: number;
		public frictionCoefficient: number;
		public surfaceVelocity: number;
		public reuseObjects: boolean;
		public resuableContactEquations: any[];
		public reusableFrictionEquations: any[];
		public restitution: number;
		public stiffness: number;
		public relaxation: number;
		public frictionStiffness: number;
		public frictionRelaxation: number;
		public enableFrictionReduction: boolean;
		public contactSkinSize: number;

		public collidedLastStep(bodyA: Body, bodyB: Body): boolean;
		public reset(): void;
		public createContactEquation(bodyA: Body, bodyB: Body, shapeA: Shape, shapeB: Shape): ContactEquation;
		public createFrictionFromContact(c: ContactEquation): FrictionEquation;

	}

	export class SAPBroadphase extends Broadphase {

		public axisList: Body[];
		public axisIndex: number;

	}

	export class Constraint {

		public static DISTANCE: number;
		public static GEAR: number;
		public static LOCK: number;
		public static PRISMATIC: number;
		public static REVOLUTE: number;

		public constructor(bodyA: Body, bodyB: Body, type: number, options?: {
			collideConnected?: boolean;
			wakeUpBodies?: boolean;
		});

		public type: number;
		public equeations: Equation[];
		public bodyA: Body;
		public bodyB: Body;
		public collideConnected: boolean;

		public update(): void;
		public setStiffness(stiffness: number): void;
		public setRelaxation(relaxation: number): void;

	}

	export class DistanceConstraint extends Constraint {

		public constructor(bodyA: Body, bodyB: Body, type: number, options?: {
			collideConnected?: boolean;
			wakeUpBodies?: boolean;
			distance?: number;
			localAnchorA?: number[];
			localAnchorB?: number[];
			maxForce?: number;
		});

		public localAnchorA: number[];
		public localAnchorB: number[];
		public distance: number;
		public maxForce: number;
		public upperLimitEnabled: boolean;
		public upperLimit: number;
		public lowerLimitEnabled: boolean;
		public lowerLimit: number;
		public position: number;

		public setMaxForce(f: number): void;
		public getMaxForce(): number;

	}

	export class GearConstraint extends Constraint {

		public constructor(bodyA: Body, bodyB: Body, type: number, options?: {
			collideConnected?: boolean;
			wakeUpBodies?: boolean;
			angle?: number;
			ratio?: number;
			maxTorque?: number;
		});

		public ratio: number;
		public angle: number;

		public setMaxTorque(torque: number): void;
		public getMaxTorque(): number;

	}

	export class LockConstraint extends Constraint {

		public constructor(bodyA: Body, bodyB: Body, type: number, options?: {
			collideConnected?: boolean;
			wakeUpBodies?: boolean;
			localOffsetB?: number[];
			localAngleB?: number;
			maxForce?: number;
		});

		public setMaxForce(force: number): void;
		public getMaxForce(): number;

	}

	export class PrismaticConstraint extends Constraint {

		public constructor(bodyA: Body, bodyB: Body, type: number, options?: {
			collideConnected?: boolean;
			wakeUpBodies?: boolean;
			maxForce?: number;
			localAnchorA?: number[];
			localAnchorB?: number[];
			localAxisA?: number[];
			disableRotationalLock?: boolean;
			upperLimit?: number;
			lowerLimit?: number;
		});

		public localAnchorA: number[];
		public localAnchorB: number[];
		public localAxisA: number[];
		public position: number;
		public velocity: number;
		public lowerLimitEnabled: boolean;
		public upperLimitEnabled: boolean;
		public lowerLimit: number;
		public upperLimit: number;
		public upperLimitEquation: ContactEquation;
		public lowerLimitEquation: ContactEquation;
		public motorEquation: Equation;
		public motorEnabled: boolean;
		public motorSpeed: number;

		public enableMotor(): void;
		public disableMotor(): void;
		public setLimits(lower: number, upper: number): void;

	}

	export class RevoluteConstraint extends Constraint {

		public constructor(bodyA: Body, bodyB: Body, type: number, options?: {
			collideConnected?: boolean;
			wakeUpBodies?: boolean;
			worldPivot?: number[];
			localPivotA?: number[];
			localPivotB?: number[];
			maxForce?: number;
		});

		public pivotA: number[];
		public pivotB: number[];
		public motorEquation: RotationalVelocityEquation;
		public motorEnabled: boolean;
		public angle: number;
		public lowerLimitEnabled: boolean;
		public upperLimitEnabled: boolean;
		public lowerLimit: number;
		public upperLimit: number;
		public upperLimitEquation: ContactEquation;
		public lowerLimitEquation: ContactEquation;

		public enableMotor(): void;
		public disableMotor(): void;
		public motorIsEnabled(): boolean;
		public setLimits(lower: number, upper: number): void;
		public setMotorSpeed(speed: number): void;
		public getMotorSpeed(): number;

	}

	export class AngleLockEquation extends Equation {

		public constructor(bodyA: Body, bodyB: Body, options?: {
			angle?: number;
			ratio?: number;
		});

		public computeGq(): number;
		public setRatio(ratio: number): number;
		public setMaxTorque(torque: number): number;

	}

	export class ContactEquation extends Equation {

		public constructor(bodyA: Body, bodyB: Body);

		public contactPointA: number[];
		public penetrationVec: number[];
		public contactPointB: number[];
		public normalA: number[];
		public restitution: number;
		public firstImpact: boolean;
		public shapeA: Shape;
		public shapeB: Shape;

		public computeB(a: number, b: number, h: number): number;

	}

	export class Equation {

		public static DEFAULT_STIFFNESS: number;
		public static DEFAULT_RELAXATION: number;

		public constructor(bodyA: Body, bodyB: Body, minForce?: number, maxForce?: number);

		public minForce: number;
		public maxForce: number;
		public bodyA: Body;
		public bodyB: Body;
		public stiffness: number;
		public relaxation: number;
		public G: number[];
		public offset: number;
		public a: number;
		public b: number;
		public epsilon: number;
		public timeStep: number;
		public needsUpdate: boolean;
		public multiplier: number;
		public relativeVelocity: number;
		public enabled: boolean;

		public gmult(G: number[], vi: number[], wi: number[], vj: number[], wj: number[]): number;
		public computeB(a: number, b: number, h: number): number;
		public computeGq(): number;
		public computeGW(): number;
		public computeGWlambda(): number;
		public computeGiMf(): number;
		public computeGiMGt(): number;
		public addToWlambda(deltalambda: number): number;
		public computeInvC(eps: number): number;

	}

	export class FrictionEquation extends Equation {

		public constructor(bodyA: Body, bodyB: Body, slipForce: number);

		public contactPointA: number[];
		public contactPointB: number[];
		public t: number[];
		public shapeA: Shape;
		public shapeB: Shape;
		public frictionCoefficient: number;

		public setSlipForce(slipForce: number): number;
		public getSlipForce(): number;
		public computeB(a: number, b: number, h: number): number;

	}

	export class RotationalLockEquation extends Equation {

		public constructor(bodyA: Body, bodyB: Body, options?: {
			angle?: number;
		});

		public angle: number;

		public computeGq(): number;

	}

	export class RotationalVelocityEquation extends Equation {

		public constructor(bodyA: Body, bodyB: Body);

		public computeB(a: number, b: number, h: number): number;

	}

	export class EventEmitter {

		public on(type: string, listener: Function, context: any): EventEmitter;
		public has(type: string, listener: Function): boolean;
		public off(type: string, listener: Function): EventEmitter;
		public emit(event: any): EventEmitter;

	}

	export class ContactMaterialOptions {

		public friction: number;
		public restitution: number;
		public stiffness: number;
		public relaxation: number;
		public frictionStiffness: number;
		public frictionRelaxation: number;
		public surfaceVelocity: number;

	}

	export class ContactMaterial {

		public static idCounter: number;

		public constructor(materialA: Material, materialB: Material, options?: ContactMaterialOptions);

		public id: number;
		public materialA: Material;
		public materialB: Material;
		public friction: number;
		public restitution: number;
		public stiffness: number;
		public relaxation: number;
		public frictionStuffness: number;
		public frictionRelaxation: number;
		public surfaceVelocity: number;
		public contactSkinSize: number;

	}

	export class Material {

		public static idCounter: number;

		public constructor(id: number);

		public id: number;

	}

	export class vec2 {

		public static crossLength(a: number[], b: number[]): number;
		public static crossVZ(out: number[], vec: number[], zcomp: number): number;
		public static crossZV(out: number[], zcomp: number, vec: number[]): number;
		public static rotate(out: number[], a: number[], angle: number): void;
		public static rotate90cw(out: number[], a: number[]): number;
		public static centroid(out: number[], a: number[], b: number[], c: number[]): number[];
		public static create(): number[];
		public static clone(a: number[]): number[];
		public static fromValues(x: number, y: number): number[];
		public static copy(out: number[], a: number[]): number[];
		public static set(out: number[], x: number, y: number): number[];
		public static toLocalFrame(out: number[], worldPoint: number[], framePosition: number[], frameAngle: number): void;
		public static toGlobalFrame(out: number[], localPoint: number[], framePosition: number[], frameAngle: number): void;
		public static add(out: number[], a: number[], b: number[]): number[];
		public static subtract(out: number[], a: number[], b: number[]): number[];
		public static sub(out: number[], a: number[], b: number[]): number[];
		public static multiply(out: number[], a: number[], b: number[]): number[];
		public static mul(out: number[], a: number[], b: number[]): number[];
		public static divide(out: number[], a: number[], b: number[]): number[];
		public static div(out: number[], a: number[], b: number[]): number[];
		public static scale(out: number[], a: number[], b: number): number[];
		public static distance(a: number[], b: number[]): number;
		public static dist(a: number[], b: number[]): number;
		public static squaredDistance(a: number[], b: number[]): number;
		public static sqrDist(a: number[], b: number[]): number;
		public static length(a: number[]): number;
		public static len(a: number[]): number;
		public static squaredLength(a: number[]): number;
		public static sqrLen(a: number[]): number;
		public static negate(out: number[], a: number[]): number[];
		public static normalize(out: number[], a: number[]): number[];
		public static dot(a: number[], b: number[]): number;
		public static str(a: number[]): string;

	}

	export class BodyOptions {

		public mass: number;
		public position: number[];
		public velocity: number[];
		public angle: number;
		public angularVelocity: number;
		public force: number[];
		public angularForce: number;
		public fixedRotation: number;

	}

	export class Body extends EventEmitter {

		public sleepyEvent: {
			type: string;
		};

		public sleepEvent: {
			type: string;
		};

		public wakeUpEvent: {
			type: string;
		};

		public static DYNAMIC: number;
		public static STATIC: number;
		public static KINEMATIC: number;
		public static AWAKE: number;
		public static SLEEPY: number;
		public static SLEEPING: number;

		public constructor(options?: BodyOptions);

		public id: number;
		public world: World;
		public shapes: Shape[];
		public shapeOffsets: number[][];
		public shapeAngles: number[];
		public mass: number;
		public invMass: number;
		public inertia: number;
		public invInertia: number;
		public invMassSolve: number;
		public invInertiaSolve: number;
		public fixedRotation: number;
		public position: number[];
		public interpolatedPosition: number[];
		public interpolatedAngle: number;
		public previousPosition: number[];
		public previousAngle: number;
		public velocity: number[];
		public vlambda: number[];
		public wlambda: number[];
		public angle: number;
		public angularVelocity: number;
		public force: number[];
		public angularForce: number;
		public damping: number;
		public angularDamping: number;
		public type: number;
		public boundingRadius: number;
		public aabb: AABB;
		public aabbNeedsUpdate: boolean;
		public allowSleep: boolean;
		public wantsToSleep: boolean;
		public sleepState: number;
		public sleepSpeedLimit: number;
		public sleepTimeLimit: number;
		public gravityScale: number;

		public updateSolveMassProperties(): void;
		public setDensity(density: number): void;
		public getArea(): number;
		public getAABB(): AABB;
		public updateAABB(): void;
		public updateBoundingRadius(): void;
		public addShape(shape: Shape, offset?: number[], angle?: number): void;
		public removeShape(shape: Shape): boolean;
		public updateMassProperties(): void;
		public applyForce(force: number[], worldPoint: number[]): void;
		public toLocalFrame(out: number[], worldPoint: number[]): void;
		public toWorldFrame(out: number[], localPoint: number[]): void;
		public fromPolygon(path: number[][], options?: {
			optimalDecomp?: boolean;
			skipSimpleCheck?: boolean;
			removeCollinearPoints?: any; //boolean | number
		}): boolean;
		public adjustCenterOfMass(): void;
		public setZeroForce(): void;
		public resetConstraintVelocity(): void;
		public applyDamping(dy: number): void;
		public wakeUp(): void;
		public sleep(): void;
		public sleepTick(time: number, dontSleep: boolean, dt: number): void;
		public getVelocityFromPosition(story: number[], dt: number): number[];
		public getAngularVelocityFromPosition(timeStep: number): number;
		public overlaps(body: Body): boolean;

	}

	export class Spring {

		public constructor(bodyA: Body, bodyB: Body, options?: {

			stiffness?: number;
			damping?: number;
			localAnchorA?: number[];
			localAnchorB?: number[];
			worldAnchorA?: number[];
			worldAnchorB?: number[];

		});

		public stiffness: number;
		public damping: number;
		public bodyA: Body;
		public bodyB: Body;

		public applyForce(): void;

	}

	export class LinearSpring extends Spring {

		public localAnchorA: number[];
		public localAnchorB: number[];
		public restLength: number;

		public setWorldAnchorA(worldAnchorA: number[]): void;
		public setWorldAnchorB(worldAnchorB: number[]): void;
		public getWorldAnchorA(result: number[]): number[];
		public getWorldAnchorB(result: number[]): number[];
		public applyForce(): void;

	}

	export class RotationalSpring extends Spring {

		public constructor(bodyA: Body, bodyB: Body, options?: {
			restAngle?: number;
			stiffness?: number;
			damping?: number;
		});

		public restAngle: number;

	}

	export class Capsule extends Shape {

		public constructor(length?: number, radius?: number);

		public length: number;
		public radius: number;

	}

	export class Circle extends Shape {

		public constructor(radius: number);

		public radius: number;

	}

	export class Convex extends Shape {

		public static triangleArea(a: number[], b: number[], c: number[]): number;

		public constructor(vertices: number[][], axes: number[]);

		public vertices: number[][];
		public axes: number[];
		public centerOfMass: number[];
		public triangles: number[];
		public boundingRadius: number;

		public projectOntoLocalAxis(localAxis: number[], result: number[]): void;
		public projectOntoWorldAxis(localAxis: number[], shapeOffset: number[], shapeAngle: number, result: number[]): void;

		public updateCenterOfMass(): void;

	}

	export class Heightfield extends Shape {

		public constructor(data: number[], options?: {
			minValue?: number;
			maxValue?: number;
			elementWidth: number;
		});

		public data: number[];
		public maxValue: number;
		public minValue: number;
		public elementWidth: number;

	}

	export class Shape {

		public static idCounter: number;
		public static CIRCLE: number;
		public static PARTICLE: number;
		public static PLANE: number;
		public static CONVEX: number;
		public static LINE: number;
		public static RECTANGLE: number;
		public static CAPSULE: number;
		public static HEIGHTFIELD: number;

		public constructor(type: number);

		public type: number;
		public id: number;
		public boundingRadius: number;
		public collisionGroup: number;
		public collisionMask: number;
		public material: Material;
		public area: number;
		public sensor: boolean;

		public computeMomentOfInertia(mass: number): number;
		public updateBoundingRadius(): number;
		public updateArea(): void;
		public computeAABB(out: AABB, position: number[], angle: number): void;

	}

	export class Line extends Shape {

		public constructor(length?: number);

		public length: number;

	}

	export class Particle extends Shape {

	}

	export class Plane extends Shape {

	}

	export class Rectangle extends Shape {

		public static sameDimensions(a: Rectangle, b: Rectangle): boolean;

		public constructor(width?: number, height?: number);

		public width: number;
		public height: number;

	}

	export class Solver extends EventEmitter {

		public static GS: number;
		public static ISLAND: number;

		public constructor(options?: {}, type?: number);

		public type: number;
		public equations: Equation[];
		public equationSortFunction: Equation; //Equation | boolean

		public solve(dy: number, world: World): void;
		public solveIsland(dy: number, island: Island): void;
		public sortEquations(): void;
		public addEquation(eq: Equation): void;
		public addEquations(eqs: Equation[]): void;
		public removeEquation(eq: Equation): void;
		public removeAllEquations(): void;

	}

	export class GSSolver extends Solver {

		public constructor(options?: {
			iterations?: number;
			tolerance?: number;
		});

		public iterations: number;
		public tolerance: number;
		public useZeroRHS: boolean;
		public frictionIterations: number;
		public usedIterations: number;

		public solve(h: number, world: World): void;

	}

	export class OverlapKeeper {

		public constructor(bodyA: Body, shapeA: Shape, bodyB: Body, shapeB: Shape);

		public shapeA: Shape;
		public shapeB: Shape;
		public bodyA: Body;
		public bodyB: Body;

		public tick(): void;
		public setOverlapping(bodyA: Body, shapeA: Shape, bodyB: Body, shapeB: Body): void;
		public bodiesAreOverlapping(bodyA: Body, bodyB: Body): boolean;
		public set(bodyA: Body, shapeA: Shape, bodyB: Body, shapeB: Shape): void;

	}

	export class TupleDictionary {

		public data: number[];
		public keys: number[];

		public getKey(id1: number, id2: number): string;
		public getByKey(key: number): number;
		public get(i: number, j: number): number;
		public set(i: number, j: number, value: number): number;
		public reset(): void;
		public copy(dict: TupleDictionary): void;

	}

	export class Utils {

		public static appendArray<T>(a: Array<T>, b: Array<T>): Array<T>;
		public static chanceRoll(chance: number): boolean;
		public static defaults(options: any, defaults: any): any;
		public static extend(a: any, b: any): void;
		public static randomChoice(choice1: any, choice2: any): any;
		public static rotateArray(matrix: any[], direction: any): any[];
		public static splice<T>(array: Array<T>, index: number, howMany: number): void;
		public static shuffle<T>(array: T[]): T[];
		public static transposeArray<T>(array: T[]): T[];

	}

	export class Island {

		public equations: Equation[];
		public bodies: Body[];

		public reset(): void;
		public getBodies(result: any): Body[];
		public wantsToSleep(): boolean;
		public sleep(): boolean;

	}

	export class IslandManager extends Solver {

		public static getUnvisitedNode(nodes: Node[]): IslandNode; // IslandNode | boolean

		public equations: Equation[];
		public islands: Island[];
		public nodes: IslandNode[];

		public visit(node: IslandNode, bds: Body[], eqs: Equation[]): void;
		public bfs(root: IslandNode, bds: Body[], eqs: Equation[]): void;
		public split(world: World): Island[];

	}

	export class IslandNode {

		public constructor(body: Body);

		public body: Body;
		public neighbors: IslandNode[];
		public equations: Equation[];
		public visited: boolean;

		public reset(): void;

	}

	export class World extends EventEmitter {

		public postStepEvent: {
			type: string;
		};

		public addBodyEvent: {
			type: string;
		};

		public removeBodyEvent: {
			type: string;
		};

		public addSpringEvent: {
			type: string;
		};

		public impactEvent: {
			type: string;
			bodyA: Body;
			bodyB: Body;
			shapeA: Shape;
			shapeB: Shape;
			contactEquation: ContactEquation;
		};

		public postBroadphaseEvent: {
			type: string;
			pairs: Body[];
		};

		public beginContactEvent: {
			type: string;
			shapeA: Shape;
			shapeB: Shape;
			bodyA: Body;
			bodyB: Body;
			contactEquations: ContactEquation[];
		};

		public endContactEvent: {
			type: string;
			shapeA: Shape;
			shapeB: Shape;
			bodyA: Body;
			bodyB: Body;
		};

		public preSolveEvent: {
			type: string;
			contactEquations: ContactEquation[];
			frictionEquations: FrictionEquation[];
		};

		public static NO_SLEEPING: number;
		public static BODY_SLEEPING: number;
		public static ISLAND_SLEEPING: number;

		public static integrateBody(body: Body, dy: number): void;

		public constructor(options?: {
			solver?: Solver;
			gravity?: number[];
			broadphase?: Broadphase;
			islandSplit?: boolean;
			doProfiling?: boolean;
		});

		public springs: Spring[];
		public bodies: Body[];
		public solver: Solver;
		public narrowphase: Narrowphase;
		public islandManager: IslandManager;
		public gravity: number[];
		public frictionGravity: number;
		public useWorldGravityAsFrictionGravity: boolean;
		public useFrictionGravityOnZeroGravity: boolean;
		public doProfiling: boolean;
		public lastStepTime: number;
		public broadphase: Broadphase;
		public constraints: Constraint[];
		public defaultMaterial: Material;
		public defaultContactMaterial: ContactMaterial;
		public lastTimeStep: number;
		public applySpringForces: boolean;
		public applyDamping: boolean;
		public applyGravity: boolean;
		public solveConstraints: boolean;
		public contactMaterials: ContactMaterial[];
		public time: number;
		public stepping: boolean;
		public islandSplit: boolean;
		public emitImpactEvent: boolean;
		public sleepMode: number;

		public addConstraint(c: Constraint): void;
		public addContactMaterial(contactMaterial: ContactMaterial): void;
		public removeContactMaterial(cm: ContactMaterial): void;
		public getContactMaterial(materialA: Material, materialB: Material): ContactMaterial; // ContactMaterial | boolean
		public removeConstraint(c: Constraint): void;
		public step(dy: number, timeSinceLastCalled?: number, maxSubSteps?: number): void;
		public runNarrowphase(np: Narrowphase, bi: Body, si: Shape, xi: any[], ai: number, bj: Body, sj: Shape, xj: any[], aj: number, cm: number, glen: number): void;
		public addSpring(s: Spring): void;
		public removeSpring(s: Spring): void;
		public addBody(body: Body): void;
		public removeBody(body: Body): void;
		public getBodyByID(id: number): Body; //Body | boolean
		public disableBodyCollision(bodyA: Body, bodyB: Body): void;
		public enableBodyCollision(bodyA: Body, bodyB: Body): void;
		public clear(): void;
		public clone(): World;
		public hitTest(worldPoint: number[], bodies: Body[], precision: number): Body[];
		public setGlobalEquationParameters(parameters: {
			relaxation?: number;
			stiffness?: number;
		}): void;
		public setGlobalStiffness(stiffness: number): void;
		public setGlobalRelaxation(relaxation: number): void;
	}

}
