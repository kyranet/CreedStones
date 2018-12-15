// Type definitions for PIXI with Phaser Deviations.

declare namespace PIXI {

	export const game: Phaser.Game;
	export const WEBGL_RENDERER: number;
	export const CANVAS_RENDERER: number;
	export const VERSION: string;

	export enum blendModes {
		NORMAL,
		ADD,
		MULTIPLY,
		SCREEN,
		OVERLAY,
		DARKEN,
		LIGHTEN,
		COLOR_DODGE,
		COLOR_BURN,
		HARD_LIGHT,
		SOFT_LIGHT,
		DIFFERENCE,
		EXCLUSION,
		HUE,
		SATURATION,
		COLOR,
		LUMINOSITY

	}

	export enum scaleModes {

		DEFAULT,
		LINEAR,
		NEAREST

	}

	export const defaultRenderOptions: PixiRendererOptions;

	export const INTERACTION_REQUENCY: number;
	export const AUTO_PREVENT_DEFAULT: boolean;

	export const PI_2: number;
	export const RAD_TO_DEG: number;
	export const DEG_TO_RAD: number;

	export const RETINA_PREFIX: string;
	export const identityMatrix: Matrix;
	export const glContexts: WebGLRenderingContext[];
	export const instances: any[];

	export const TextureSilentFail: boolean;
	export const BitmapText: { fonts: {} };

	export function isPowerOfTwo(width: number, height: number): boolean;

	export function rgb2hex(rgb: number[]): string;
	export function hex2rgb(hex: string): number[];

	export function autoDetectRenderer(width?: number, height?: number, options?: PixiRendererOptions): PixiRenderer;
	export function autoDetectRecommendedRenderer(width?: number, height?: number, options?: PixiRendererOptions): PixiRenderer;

	export function canUseNewCanvasBlendModes(): boolean;
	export function getNextPowerOfTwo(value: number): number;

	export function AjaxRequest(): XMLHttpRequest;

	export function CompileFragmentShader(gl: WebGLRenderingContext, shaderSrc: string[]): any;
	export function CompileProgram(gl: WebGLRenderingContext, vertexSrc: string[], fragmentSrc: string[]): any;

	export interface IEventCallback {
		(e?: IEvent): void;
	}

	export interface IEvent {
		type: string;
		content: any;
	}

	export interface HitArea {
		contains(x: number, y: number): boolean;
	}

	export interface IInteractionDataCallback {
		(interactionData: InteractionData): void;
	}

	export interface PixiRenderer {

		autoResize: boolean;
		clearBeforeRender: boolean;
		height: number;
		resolution: number;
		transparent: boolean;
		type: number;
		view: HTMLCanvasElement;
		width: number;

		destroy(): void;
		render(stage: DisplayObjectContainer): void;
		resize(width: number, height: number): void;

	}

	export interface PixiRendererOptions {

		autoResize?: boolean;
		antialias?: boolean;
		clearBeforeRender?: boolean;
		preserveDrawingBuffer?: boolean;
		resolution?: number;
		transparent?: boolean;
		view?: HTMLCanvasElement;

	}

	export interface BitmapTextStyle {

		font?: string;
		align?: string;
		tint?: string;

	}

	export interface TextStyle {

		align?: string;
		dropShadow?: boolean;
		dropShadowColor?: string;
		dropShadowAngle?: number;
		dropShadowDistance?: number;
		fill?: string;
		font?: string;
		lineJoin?: string;
		stroke?: string;
		strokeThickness?: number;
		wordWrap?: boolean;
		wordWrapWidth?: number;

	}

	export interface Loader {

		load(): void;

	}

	export interface MaskData {

		alpha: number;
		worldTransform: number[];

	}

	export interface RenderSession {

		context: CanvasRenderingContext2D;
		maskManager: CanvasMaskManager;
		scaleMode: scaleModes;
		smoothProperty: string;
		roundPixels: boolean;

	}

	export interface ShaderAttribute {
		// TODO: Find signature of shader attributes
	}

	export interface FilterBlock {

		visible: boolean;
		renderable: boolean;

	}

	/**
	 * This is the base class for creating a PIXI filter. Currently only webGL supports filters.
	 * If you want to make a custom filter this should be your base class.
	 */
	export class AbstractFilter {

		/**
		 * This is the base class for creating a PIXI filter. Currently only webGL supports filters.
		 * If you want to make a custom filter this should be your base class.
		 *
		 * @param fragmentSrc The fragment source in an array of strings.
		 * @param uniforms An object containing the uniforms for this filter.
		 */
		public constructor(fragmentSrc: string | string[], uniforms: any);

		public dirty: boolean;
		public padding: number;
		public uniforms: any;
		public fragmentSrc: string | string[];

		public apply(frameBuffer: WebGLFramebuffer): void;

		/**
		 * Syncs the uniforms between the class object and the shaders.
		 */
		public syncUniforms(): void;

	}

	export class AlphaMaskFilter extends AbstractFilter {

		public constructor(texture: Texture);

		public map: Texture;

		public onTextureLoaded(): void;

	}

	export class AsciiFilter extends AbstractFilter {

		public size: number;

	}

	export class AssetLoader implements Mixin {

		public assetURLs: string[];
		public crossorigin: boolean;
		public loadersByType: { [key: string]: Loader };

		public constructor(assetURLs: string[], crossorigin: boolean);

		public listeners(eventName: string): Function[];
		public emit(eventName: string, data?: any): boolean;
		public dispatchEvent(eventName: string, data?: any): boolean;
		public on(eventName: string, fn: Function): Function;
		public addEventListener(eventName: string, fn: Function): Function;
		public once(eventName: string, fn: Function): Function;
		public off(eventName: string, fn: Function): Function;
		public removeAllEventListeners(eventName: string): void;

		public load(): void;

	}

	export class AtlasLoader implements Mixin {

		public url: string;
		public baseUrl: string;
		public crossorigin: boolean;
		public loaded: boolean;

		public constructor(url: string, crossorigin: boolean);

		public listeners(eventName: string): Function[];
		public emit(eventName: string, data?: any): boolean;
		public dispatchEvent(eventName: string, data?: any): boolean;
		public on(eventName: string, fn: Function): Function;
		public addEventListener(eventName: string, fn: Function): Function;
		public once(eventName: string, fn: Function): Function;
		public off(eventName: string, fn: Function): Function;
		public removeAllEventListeners(eventName: string): void;

		public load(): void;

	}

	/**
	 * A texture stores the information that represents an image. All textures have a base texture.
	 */
	export class BaseTexture implements Mixin {

		/**
		 * Helper function that creates a base texture from the given canvas element.
		 *
		 * @param canvas The canvas element source of the texture
		 * @param scaleMode See {{#crossLink "PIXI/scaleModes:property"}}PIXI.scaleModes{{/crossLink}} for possible values
		 */
		public static fromCanvas(canvas: HTMLCanvasElement, scaleMode?: scaleModes): BaseTexture;

		/**
		 * A texture stores the information that represents an image. All textures have a base texture.
		 *
		 * @param source the source object (image or canvas)
		 * @param scaleMode See {{#crossLink "PIXI/scaleModes:property"}}PIXI.scaleModes{{/crossLink}} for possible values
		 */
		public constructor(source: HTMLImageElement, scaleMode: scaleModes);

		/**
		 * A texture stores the information that represents an image. All textures have a base texture.
		 *
		 * @param source the source object (image or canvas)
		 * @param scaleMode See {{#crossLink "PIXI/scaleModes:property"}}PIXI.scaleModes{{/crossLink}} for possible values
		 */
		public constructor(source: HTMLCanvasElement, scaleMode: scaleModes);

		/**
		 * [read-only] The height of the base texture set when the image has loaded
		 */
		public height: number;

		/**
		 * [read-only] Set to true once the base texture has loaded
		 */
		public hasLoaded: boolean;

		/**
		 * Set this to true if a mipmap of this texture needs to be generated. This value needs to be set before the texture is used
		 * Also the texture must be a power of two size to work
		 */
		public mipmap: boolean;

		/**
		 * Controls if RGB channels should be pre-multiplied by Alpha  (WebGL only)
		 * Default: true
		 */
		public premultipliedAlpha: boolean;

		/**
		 * The Resolution of the texture.
		 */
		public resolution: number;

		/**
		 * The scale mode to apply when scaling this texture
		 * Default: PIXI.scaleModes.LINEAR
		 */
		public scaleMode: scaleModes;

		/**
		 * A BaseTexture can be set to skip the rendering phase in the WebGL Sprite Batch.
		 *
		 * You may want to do this if you have a parent Sprite with no visible texture (i.e. uses the internal `__default` texture)
		 * that has children that you do want to render, without causing a batch flush in the process.
		 */
		public skipRender: boolean;

		/**
		 * The image source that is used to create the texture.
		 */
		public source: HTMLImageElement;

		/**
		 * [read-only] The width of the base texture set when the image has loaded
		 */
		public width: number;

		public listeners(eventName: string): Function[];
		public emit(eventName: string, data?: any): boolean;
		public dispatchEvent(eventName: string, data?: any): boolean;
		public on(eventName: string, fn: Function): Function;
		public addEventListener(eventName: string, fn: Function): Function;
		public once(eventName: string, fn: Function): Function;
		public off(eventName: string, fn: Function): Function;
		public removeAllEventListeners(eventName: string): void;

		/**
		 * Forces this BaseTexture to be set as loaded, with the given width and height.
		 * Then calls BaseTexture.dirty.
		 * Important for when you don't want to modify the source object by forcing in `complete` or dimension properties it may not have.
		 *
		 * @param width - The new width to force the BaseTexture to be.
		 * @param height - The new height to force the BaseTexture to be.
		 */
		public forceLoaded(width: number, height: number): void;

		/**
		 * Destroys this base texture
		 */
		public destroy(): void;

		/**
		 * Sets all glTextures to be dirty.
		 */
		public dirty(): void;

		/**
		 * Removes the base texture from the GPU, useful for managing resources on the GPU.
		 * Atexture is still 100% usable and will simply be reuploaded if there is a sprite on screen that is using it.
		 */
		public unloadFromGPU(): void;

	}

	export class BitmapFontLoader implements Mixin {

		public constructor(url: string, crossorigin: boolean);

		public baseUrl: string;
		public crossorigin: boolean;
		public texture: Texture;
		public url: string;

		public listeners(eventName: string): Function[];
		public emit(eventName: string, data?: any): boolean;
		public dispatchEvent(eventName: string, data?: any): boolean;
		public on(eventName: string, fn: Function): Function;
		public addEventListener(eventName: string, fn: Function): Function;
		public once(eventName: string, fn: Function): Function;
		public off(eventName: string, fn: Function): Function;
		public removeAllEventListeners(eventName: string): void;

		public load(): void;

	}

	export class BlurFilter extends AbstractFilter {

		public blur: number;
		public blurX: number;
		public blurY: number;

	}

	export class BlurXFilter extends AbstractFilter {

		public blur: number;

	}

	export class BlurYFilter extends AbstractFilter {

		public blur: number;

	}

	/**
	 * Creates a Canvas element of the given size.
	 */
	export class CanvasBuffer {

		/**
		 * Creates a Canvas element of the given size.
		 *
		 * @param width the width for the newly created canvas
		 * @param height the height for the newly created canvas
		 */
		public constructor(width: number, height: number);

		/**
		 * The Canvas object that belongs to this CanvasBuffer.
		 */
		public canvas: HTMLCanvasElement;

		/**
		 * A CanvasRenderingContext2D object representing a two-dimensional rendering context.
		 */
		public context: CanvasRenderingContext2D;

		/**
		 * The height of the Canvas in pixels.
		 */
		public height: number;

		/**
		 * The width of the Canvas in pixels.
		 */
		public width: number;

		/**
		 * Frees the canvas up for use again.
		 */
		public destroy(): void;

		/**
		 * Clears the canvas that was created by the CanvasBuffer class.
		 */
		public clear(): void;

		/**
		 * Resizes the canvas to the specified width and height.
		 *
		 * @param width the new width of the canvas
		 * @param height the new height of the canvas
		 */
		public resize(width: number, height: number): void;

	}

	/**
	 * The CanvasPool is a global static object that allows Pixi and Phaser to pool canvas DOM elements.
	 */
	export class CanvasPool {

		/**
		 * Creates a new Canvas DOM element, or pulls one from the pool if free.
		 *
		 * @param parent The parent of the canvas element.
		 * @param width The width of the canvas element.
		 * @param height The height of the canvas element.
		 * @return The canvas element.
		 */
		public static create(parent: HTMLElement, width?: number, height?: number): HTMLCanvasElement;

		/**
		 * Gets the first free canvas index from the pool.
		 */
		public static getFirst(): HTMLCanvasElement;

		/**
		 * Removes the parent from a canvas element from the pool, freeing it up for re-use.
		 *
		 * @param parent The parent of the canvas element.
		 */
		public static remove(parent: HTMLElement): void;

		/**
		 * Removes the parent from a canvas element from the pool, freeing it up for re-use.
		 *
		 * @param canvas The canvas element to remove
		 */
		public static removeByCanvas(canvas: HTMLCanvasElement): HTMLCanvasElement;

		/**
		 * Gets the total number of used canvas elements in the pool.
		 * @return The number of in-use (parented) canvas elements in the pool.
		 */
		public static getTotal(): number;

		/**
		 * Gets the total number of free canvas elements in the pool.
		 * @return The number of free (un-parented) canvas elements in the pool.
		 */
		public static getFree(): number;

	}

	/**
	 * A set of functions used to handle masking.
	 */
	export class CanvasMaskManager {

		/**
		 * This method adds it to the current stack of masks.
		 *
		 * @param maskData the maskData that will be pushed
		 * @param renderSession The renderSession whose context will be used for this mask manager.
		 */
		public pushMask(maskData: MaskData, renderSession: RenderSession): void;

		/**
		 * Restores the current drawing context to the state it was before the mask was applied.
		 *
		 * @param renderSession The renderSession whose context will be used for this mask manager.
		 */
		public popMask(renderSession: RenderSession): void;

	}

	/**
	 * The CanvasRenderer draws the Stage and all its content onto a 2d canvas. This renderer should be used for browsers that do not support webGL.
	 * Don't forget to add the CanvasRenderer.view to your DOM or you will not see anything :)
	 */
	export class CanvasRenderer implements PixiRenderer {

		/**
		 * The CanvasRenderer draws the Stage and all its content onto a 2d canvas. This renderer should be used for browsers that do not support webGL.
		 * Don't forget to add the CanvasRenderer.view to your DOM or you will not see anything :)
		 *
		 * @param game A reference to the Phaser Game instance
		 */
		public constructor(game: Phaser.Game);

		public game: Phaser.Game;

		/**
		 * The renderer type.
		 */
		public type: number;

		/**
		 * The resolution of the canvas.
		 */
		public resolution: number;

		/**
		 * This sets if the CanvasRenderer will clear the canvas or not before the new render pass.
		 * If the Stage is NOT transparent Pixi will use a canvas sized fillRect operation every frame to set the canvas background color.
		 * If the Stage is transparent Pixi will use clearRect to clear the canvas every frame.
		 * Disable this by setting this to false. For example if your game has a canvas filling background image you often don't need this set.
		 */
		public clearBeforeRender: boolean;

		/**
		 * Whether the render view is transparent
		 */
		public transparent: boolean;

		/**
		 * Whether the render view should be resized automatically
		 */
		public autoResize: boolean;

		/**
		 * The width of the canvas view
		 * Default: 800
		 */
		public width: number;

		/**
		 * The height of the canvas view
		 * Default: 600
		 */
		public height: number;

		/**
		 * The canvas element that everything is drawn to.
		 */
		public view: HTMLCanvasElement;

		/**
		 * The canvas 2d context that everything is drawn with
		 */
		public context: CanvasRenderingContext2D;

		/**
		 * Boolean flag controlling canvas refresh.
		 */
		public refresh: boolean;

		/**
		 * Internal const.
		 */
		public count: number;
		public maskManager: CanvasMaskManager;

		/**
		 * The render session is just a bunch of parameter used for rendering
		 */
		public renderSession: RenderSession;

		/**
		 * Renders the Stage to this canvas view
		 *
		 * @param stage the Stage element to be rendered
		 */
		public render(stage: DisplayObjectContainer): void;

		/**
		 * Resizes the canvas view to the specified width and height
		 *
		 * @param width the new width of the canvas view
		 * @param height the new height of the canvas view
		 */
		public resize(width: number, height: number): void;

		/**
		 * Removes everything from the renderer and optionally removes the Canvas DOM element.
		 *
		 * @param removeView Removes the Canvas element from the DOM. - Default: true
		 */
		public destroy(removeView?: boolean): void;

	}

	/**
	 * Utility methods for Sprite/Texture tinting.
	 */
	export class CanvasTinter {

		/**
		 * Basically this method just needs a sprite and a color and tints the sprite with the given color.
		 *
		 * @param sprite the sprite to tint
		 * @param color the color to use to tint the sprite with
		 * @return The tinted canvas
		 */
		public static getTintedTexture(sprite: Sprite, color: number): HTMLCanvasElement;

		/**
		 * Tint a texture using the "multiply" operation.
		 *
		 * @param texture the texture to tint
		 * @param color the color to use to tint the sprite with
		 * @param canvas the current canvas
		 */
		public static tintWithMultiply(texture: Texture, color: number, canvas: HTMLCanvasElement): void;
		public static tintWithOverlay(texture: Texture, color: number, canvas: HTMLCanvasElement): void;
		public static tintWithPerPixel(texture: Texture, color: number, canvas: HTMLCanvasElement): void;

		/**
		 * Whether or not the Canvas BlendModes are supported, consequently the ability to tint using the multiply method.
		 */
		public static canUseMultiply: boolean;
		public static tintMethod: any;

	}

	export class Circle implements HitArea {

		public constructor(x: number, y: number, radius: number);

		public x: number;
		public y: number;
		public radius: number;

		public clone(): Circle;
		public contains(x: number, y: number): boolean;
		public getBounds(): Rectangle;

	}

	export class ColorMatrixFilter extends AbstractFilter {

		public constructor();

		public matrix: number[];

	}

	export class ColorStepFilter extends AbstractFilter {

		public step: number;

	}

	export class ConvolutionFilter extends AbstractFilter {

		public constructor(matrix: number[], width: number, height: number);

		public matrix: Matrix;
		public width: number;
		public height: number;

	}

	export class CrossHatchFilter extends AbstractFilter {

		public blur: number;

	}

	export class DisplacementFilter extends AbstractFilter {

		public constructor(texture: Texture);

		public map: Texture;
		public offset: Point;
		public scale: Point;

	}

	export class DotScreenFilter extends AbstractFilter {

		public angle: number;
		public scale: Point;

	}

	export class DisplayObject {

		public alpha: number;
		public buttonMode: boolean;
		public cacheAsBitmap: boolean;
		public defaultCursor: string;
		public filterArea: Rectangle;
		public filters: AbstractFilter[];
		public hitArea: HitArea;
		public interactive: boolean;
		public mask: Graphics;
		public parent: DisplayObjectContainer;
		public pivot: Point;
		public position: Point;
		public renderable: boolean;
		public rotation: number;
		public scale: Point;
		public stage: DisplayObjectContainer;
		public visible: boolean;
		public worldAlpha: number;
		public worldPosition: Point;
		public worldScale: Point;
		public worldTransform: Matrix;
		public worldRotation: number;
		public worldVisible: boolean;
		public x: number;
		public y: number;

		public click(e: InteractionData): void;
		public displayObjectUpdateTransform(): void;
		public getBounds(matrix?: Matrix): Rectangle;
		public getLocalBounds(): Rectangle;
		public generateTexture(resolution?: number, scaleMode?: number, renderer?: PixiRenderer | number): RenderTexture;
		public mousedown(e: InteractionData): void;
		public mouseout(e: InteractionData): void;
		public mouseover(e: InteractionData): void;
		public mouseup(e: InteractionData): void;
		public mousemove(e: InteractionData): void;
		public mouseupoutside(e: InteractionData): void;
		public rightclick(e: InteractionData): void;
		public rightdown(e: InteractionData): void;
		public rightup(e: InteractionData): void;
		public rightupoutside(e: InteractionData): void;
		public setStageReference(stage: DisplayObjectContainer): void;
		public tap(e: InteractionData): void;
		public toGlobal(position: Point): Point;
		public toLocal(position: Point, from: DisplayObject): Point;
		public touchend(e: InteractionData): void;
		public touchendoutside(e: InteractionData): void;
		public touchstart(e: InteractionData): void;
		public touchmove(e: InteractionData): void;
		public updateTransform(parent?: PIXI.DisplayObjectContainer): void;

	}

	/**
	 * A DisplayObjectContainer represents a collection of display objects.
	 * It is the base class of all display objects that act as a container for other objects.
	 */
	export class DisplayObjectContainer extends DisplayObject {

		/**
		 * A DisplayObjectContainer represents a collection of display objects.
		 * It is the base class of all display objects that act as a container for other objects.
		 */
		public constructor();

		/**
		 * [read-only] The array of children of this container.
		 */
		public children: DisplayObject[];

		/**
		 * The height of the displayObjectContainer, setting this will actually modify the scale to achieve the value set
		 */
		public height: number;

		/**
		 * The width of the displayObjectContainer, setting this will actually modify the scale to achieve the value set
		 */
		public width: number;

		/**
		 * If `ignoreChildInput`  is `false` it will allow this objects _children_ to be considered as valid for Input events.
		 *
		 * If this property is `true` then the children will _not_ be considered as valid for Input events.
		 *
		 * Note that this property isn't recursive: only immediate children are influenced, it doesn't scan further down.
		 */
		public ignoreChildInput: boolean;

		/**
		 * Adds a child to the container.
		 *
		 * @param child The DisplayObject to add to the container
		 * @return The child that was added.
		 */
		public addChild(child: DisplayObject): DisplayObject;

		/**
		 * Adds a child to the container at a specified index. If the index is out of bounds an error will be thrown
		 *
		 * @param child The child to add
		 * @param index The index to place the child in
		 * @return The child that was added.
		 */
		public addChildAt(child: DisplayObject, index: number): DisplayObject;

		/**
		 * Retrieves the bounds of the displayObjectContainer as a rectangle. The bounds calculation takes all visible children into consideration.
		 * @return The rectangular bounding area
		 */
		public getBounds(): Rectangle;

		/**
		 * Returns the child at the specified index
		 *
		 * @param index The index to get the child from
		 * @return The child at the given index, if any.
		 */
		public getChildAt(index: number): DisplayObject;

		/**
		 * Returns the index position of a child DisplayObject instance
		 *
		 * @param child The DisplayObject instance to identify
		 * @return The index position of the child display object to identify
		 */
		public getChildIndex(child: DisplayObject): number;

		/**
		 * Retrieves the non-global local bounds of the displayObjectContainer as a rectangle. The calculation takes all visible children into consideration.
		 * @return The rectangular bounding area
		 */
		public getLocalBounds(): Rectangle;

		/**
		 * Removes a child from the container.
		 *
		 * @param child The DisplayObject to remove
		 * @return The child that was removed.
		 */
		public removeChild(child: DisplayObject): DisplayObject;

		/**
		 * Removes a child from the specified index position.
		 *
		 * @param index The index to get the child from
		 * @return The child that was removed.
		 */
		public removeChildAt(index: number): DisplayObject;

		/**
		 * Removes all children from this container that are within the begin and end indexes.
		 *
		 * @param beginIndex The beginning position. Default value is 0.
		 * @param endIndex The ending position. Default value is size of the container.
		 */
		public removeChildren(beginIndex?: number, endIndex?: number): DisplayObject[];

		/**
		 * Removes the current stage reference from the container and all of its children.
		 */
		public removeStageReference(): void;

		/**
		 * Changes the position of an existing child in the display object container
		 *
		 * @param child The child DisplayObject instance for which you want to change the index number
		 * @param index The resulting index number for the child display object
		 */
		public setChildIndex(child: DisplayObject, index: number): void;

		/**
		 * Swaps the position of 2 Display Objects within this container.
		 *
		 * @param child -
		 * @param child2 -
		 */
		public swapChildren(child: DisplayObject, child2: DisplayObject): void;

	}

	export class Ellipse implements HitArea {

		public constructor(x: number, y: number, width: number, height: number);

		public x: number;
		public y: number;
		public width: number;
		public height: number;

		public clone(): Ellipse;
		public contains(x: number, y: number): boolean;
		public getBounds(): Rectangle;

	}

	/**
	 * Creates an homogenous object for tracking events so users can know what to expect.
	 */
	export class Event {

		/**
		 * Creates an homogenous object for tracking events so users can know what to expect.
		 *
		 * @param target The target object that the event is called on
		 * @param name The string name of the event that was triggered
		 * @param data Arbitrary event data to pass along
		 */
		public constructor(target: any, name: string, data: any);

		/**
		 * The original target the event triggered on.
		 */
		public target: any;

		/**
		 * The string name of the event that this represents.
		 */
		public type: string;

		/**
		 * The data that was passed in with this event.
		 */
		public data: any;

		/**
		 * The timestamp when the event occurred.
		 */
		public timeStamp: number;

		/**
		 * Stops the propagation of events up the scene graph (prevents bubbling).
		 */
		public stopPropagation(): void;
		public preventDefault(): void;

		/**
		 * Stops the propagation of events to sibling listeners (no longer calls any listeners).
		 */
		public stopImmediatePropagation(): void;

	}

	/**
	 * Mixins event emitter functionality to a class
	 */
	export class EventTarget {

		/**
		 * Mixes in the properties of the EventTarget prototype onto another object
		 *
		 * @param object The obj to mix into
		 */
		public static mixin(obj: any): void;

	}

	export class FilterTexture {

		/**
		 *
		 *
		 * @param gl the current WebGL drawing context
		 * @param width the horizontal range of the filter
		 * @param height the vertical range of the filter
		 * @param scaleMode See {{#crossLink "PIXI/scaleModes:property"}}PIXI.scaleModes{{/crossLink}} for possible values
		 */
		public constructor(gl: WebGLRenderingContext, width: number, height: number, scaleMode: scaleModes);

		public fragmentSrc: string[];
		public frameBuffer: WebGLFramebuffer;
		public gl: WebGLRenderingContext;
		public program: WebGLProgram;
		public scaleMode: number;
		public texture: WebGLTexture;

		/**
		 * Clears the filter texture.
		 */
		public clear(): void;

		/**
		 * Resizes the texture to the specified width and height
		 *
		 * @param width the new width of the texture
		 * @param height the new height of the texture
		 */
		public resize(width: number, height: number): void;

		/**
		 * Destroys the filter texture.
		 */
		public destroy(): void;

	}

	/**
	 * A GraphicsData object.
	 */
	export class GraphicsData {

		/**
		 * A GraphicsData object.
		 */
		public constructor(lineWidth?: number, lineColor?: number, lineAlpha?: number, fillColor?: number, fillAlpha?: number, fill?: boolean, shape?: any);

		public lineWidth: number;
		public lineColor: number;
		public lineAlpha: number;
		public fillColor: number;
		public fillAlpha: number;
		public fill: boolean;
		public shape: any;
		public type: number;

	}

	/**
	 * The Graphics class contains methods used to draw primitive shapes such as lines, circles and rectangles to the display, and color and fill them.
	 */
	export class Graphics extends DisplayObjectContainer {

		public static POLY: number;
		public static RECT: number;
		public static CIRC: number;
		public static ELIP: number;
		public static RREC: number;

		/**
		 * The blend mode to be applied to the graphic shape. Apply a value of PIXI.blendModes.NORMAL to reset the blend mode.
		 * Default: PIXI.blendModes.NORMAL;
		 */
		public blendMode: number;

		/**
		 * The bounds' padding used for bounds calculation.
		 */
		public boundsPadding: number;

		/**
		 * The alpha value used when filling the Graphics object.
		 */
		public fillAlpha: number;

		/**
		 * Whether this shape is being used as a mask.
		 */
		public isMask: boolean;

		/**
		 * The width (thickness) of any lines drawn.
		 */
		public lineWidth: number;

		/**
		 * The color of any lines drawn.
		 * Default: 0
		 */
		public lineColor: number;

		/**
		 * The tint applied to the graphic shape. This is a hex value. Apply a value of 0xFFFFFF to reset the tint.
		 * Default: 0xFFFFFF
		 */
		public tint: number;
		public worldAlpha: number;

		/**
		 * The arc method creates an arc/curve (used to create circles, or parts of circles).
		 *
		 * @param cx The x-coordinate of the center of the circle
		 * @param cy The y-coordinate of the center of the circle
		 * @param radius The radius of the circle
		 * @param startAngle The starting angle, in radians (0 is at the 3 o'clock position of the arc's circle)
		 * @param endAngle The ending angle, in radians
		 * @param anticlockwise Optional. Specifies whether the drawing should be counterclockwise or clockwise. False is default, and indicates clockwise, while true indicates counter-clockwise.
		 * @param segments Optional. The number of segments to use when calculating the arc. The default is 40. If you need more fidelity use a higher number.
		 */
		public arc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number, anticlockwise: boolean): Graphics;
		public arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): Graphics;

		/**
		 * Specifies a simple one-color fill that subsequent calls to other Graphics methods
		 * (such as lineTo() or drawCircle()) use when drawing.
		 *
		 * @param color the color of the fill
		 * @param alpha the alpha of the fill
		 */
		public beginFill(color?: number, alpha?: number): Graphics;

		/**
		 * Calculate the points for a bezier curve and then draws it.
		 *
		 * @param cpX Control point x
		 * @param cpY Control point y
		 * @param cpX2 Second Control point x
		 * @param cpY2 Second Control point y
		 * @param toX Destination point x
		 * @param toY Destination point y
		 */
		public bezierCurveTo(cpX: number, cpY: number, cpX2: number, cpY2: number, toX: number, toY: number): Graphics;

		/**
		 * Clears the graphics that were drawn to this Graphics object, and resets fill and line style settings.
		 */
		public clear(): Graphics;

		/**
		 * Destroys a previous cached sprite.
		 */
		public destroyCachedSprite(): void;

		/**
		 * Draws a circle.
		 *
		 * @param x The X coordinate of the center of the circle
		 * @param y The Y coordinate of the center of the circle
		 * @param diameter The diameter of the circle
		 */
		public drawCircle(x: number, y: number, diameter: number): Graphics;

		/**
		 * Draws an ellipse.
		 *
		 * @param x The X coordinate of the center of the ellipse
		 * @param y The Y coordinate of the center of the ellipse
		 * @param width The half width of the ellipse
		 * @param height The half height of the ellipse
		 */
		public drawEllipse(x: number, y: number, width: number, height: number): Graphics;

		/**
		 * Draws a polygon using the given path.
		 *
		 * @param path The path data used to construct the polygon. Can either be an array of points or a Phaser.Polygon object.
		 */
		public drawPolygon(...path: any[]): Graphics;

		/**
		 *
		 *
		 * @param x The X coord of the top-left of the rectangle
		 * @param y The Y coord of the top-left of the rectangle
		 * @param width The width of the rectangle
		 * @param height The height of the rectangle
		 */
		public drawRect(x: number, y: number, width: number, height: number): Graphics;

		/**
		 *
		 *
		 * @param x The X coord of the top-left of the rectangle
		 * @param y The Y coord of the top-left of the rectangle
		 * @param width The width of the rectangle
		 * @param height The height of the rectangle
		 * @param radius Radius of the rectangle corners. In WebGL this must be a value between 0 and 9.
		 */
		public drawRoundedRect(x: number, y: number, width: number, height: number, radius: number): Graphics;

		/**
		 * Draws the given shape to this Graphics object. Can be any of Circle, Rectangle, Ellipse, Line or Polygon.
		 *
		 * @param shape The Shape object to draw.
		 * @return The generated GraphicsData object.
		 */
		public drawShape(shape: Circle): GraphicsData;

		/**
		 * Draws the given shape to this Graphics object. Can be any of Circle, Rectangle, Ellipse, Line or Polygon.
		 *
		 * @param shape The Shape object to draw.
		 * @return The generated GraphicsData object.
		 */
		public drawShape(shape: Rectangle): GraphicsData;

		/**
		 * Draws the given shape to this Graphics object. Can be any of Circle, Rectangle, Ellipse, Line or Polygon.
		 *
		 * @param shape The Shape object to draw.
		 * @return The generated GraphicsData object.
		 */
		public drawShape(shape: Ellipse): GraphicsData;

		/**
		 * Draws the given shape to this Graphics object. Can be any of Circle, Rectangle, Ellipse, Line or Polygon.
		 *
		 * @param shape The Shape object to draw.
		 * @return The generated GraphicsData object.
		 */
		public drawShape(shape: Polygon): GraphicsData;

		/**
		 * Applies a fill to the lines and shapes that were added since the last call to the beginFill() method.
		 */
		public endFill(): Graphics;

		/**
		 * Useful function that returns a texture of the graphics object that can then be used to create sprites
		 * This can be quite useful if your geometry is complicated and needs to be reused multiple times.
		 *
		 * @param resolution The resolution of the texture being generated - Default: 1
		 * @param scaleMode Should be one of the PIXI.scaleMode consts
		 * @param padding Add optional extra padding to the generated texture (default 0)
		 * @return a texture of the graphics object
		 */
		public generateTexture(resolution?: number, scaleMode?: number, padding?: number): RenderTexture;

		/**
		 * Specifies the line style used for subsequent calls to Graphics methods such as the lineTo() method or the drawCircle() method.
		 *
		 * @param lineWidth width of the line to draw, will update the objects stored style
		 * @param color color of the line to draw, will update the objects stored style
		 * @param alpha alpha of the line to draw, will update the objects stored style
		 */
		public lineStyle(lineWidth?: number, color?: number, alpha?: number): Graphics;

		/**
		 * Draws a line using the current line style from the current drawing position to (x, y);
		 * The current drawing position is then set to (x, y).
		 *
		 * @param x the X coordinate to draw to
		 * @param y the Y coordinate to draw to
		 */
		public lineTo(x: number, y: number): Graphics;

		/**
		 * Moves the current drawing position to x, y.
		 *
		 * @param x the X coordinate to move to
		 * @param y the Y coordinate to move to
		 */
		public moveTo(x: number, y: number): Graphics;

		/**
		 * Calculate the points for a quadratic bezier curve and then draws it.
		 * Based on: https://stackoverflow.com/questions/785097/how-do-i-implement-a-bezier-curve-in-c
		 *
		 * @param cpX Control point x
		 * @param cpY Control point y
		 * @param toX Destination point x
		 * @param toY Destination point y
		 */
		public quadraticCurveTo(cpX: number, cpY: number, toX: number, toY: number): Graphics;

	}

	export class GrayFilter extends AbstractFilter {

		public gray: number;

	}

	export class ImageLoader implements Mixin {

		public constructor(url: string, crossorigin?: boolean);

		public texture: Texture;

		public listeners(eventName: string): Function[];
		public emit(eventName: string, data?: any): boolean;
		public dispatchEvent(eventName: string, data?: any): boolean;
		public on(eventName: string, fn: Function): Function;
		public addEventListener(eventName: string, fn: Function): Function;
		public once(eventName: string, fn: Function): Function;
		public off(eventName: string, fn: Function): Function;
		public removeAllEventListeners(eventName: string): void;

		public load(): void;
		public loadFramedSpriteSheet(frameWidth: number, frameHeight: number, textureName: string): void;

	}

	export class InteractionData {

		public global: Point;
		public target: Sprite;
		public originalEvent: Event;

		public getLocalPosition(displayObject: DisplayObject, point?: Point, globalPos?: Point): Point;

	}

	export class InteractionManager {

		public currentCursorStyle: string;
		public last: number;
		public mouse: InteractionData;
		public mouseOut: boolean;
		public mouseoverEnabled: boolean;
		public onMouseMove: Function;
		public onMouseDown: Function;
		public onMouseOut: Function;
		public onMouseUp: Function;
		public onTouchStart: Function;
		public onTouchEnd: Function;
		public onTouchMove: Function;
		public pool: InteractionData[];
		public resolution: number;
		public stage: DisplayObjectContainer;
		public touches: { [id: string]: InteractionData };

		public constructor(stage: DisplayObjectContainer);
	}

	export class InvertFilter extends AbstractFilter {

		public invert: number;

	}

	export class JsonLoader implements Mixin {

		public constructor(url: string, crossorigin?: boolean);

		public baseUrl: string;
		public crossorigin: boolean;
		public loaded: boolean;
		public url: string;

		public listeners(eventName: string): Function[];
		public emit(eventName: string, data?: any): boolean;
		public dispatchEvent(eventName: string, data?: any): boolean;
		public on(eventName: string, fn: Function): Function;
		public addEventListener(eventName: string, fn: Function): Function;
		public once(eventName: string, fn: Function): Function;
		public off(eventName: string, fn: Function): Function;
		public removeAllEventListeners(eventName: string): void;

		public load(): void;

	}

	export class Matrix {

		public a: number;
		public b: number;
		public c: number;
		public d: number;
		public tx: number;
		public ty: number;

		public append(matrix: Matrix): Matrix;
		public apply(pos: Point, newPos: Point): Point;
		public applyInverse(pos: Point, newPos: Point): Point;
		public determineMatrixArrayType(): number[];
		public identity(): Matrix;
		public rotate(angle: number): Matrix;
		public fromArray(array: number[]): void;
		public translate(x: number, y: number): Matrix;
		public toArray(transpose: boolean): number[];
		public scale(x: number, y: number): Matrix;

	}

	export interface Mixin {

		listeners(eventName: string): Function[];
		emit(eventName: string, data?: any): boolean;
		dispatchEvent(eventName: string, data?: any): boolean;
		on(eventName: string, fn: Function): Function;
		addEventListener(eventName: string, fn: Function): Function;
		once(eventName: string, fn: Function): Function;
		off(eventName: string, fn: Function): Function;
		removeAllEventListeners(eventName: string): void;

	}

	export class NoiseFilter extends AbstractFilter {

		public noise: number;

	}

	export class NormalMapFilter extends AbstractFilter {

		public map: Texture;
		public offset: Point;
		public scale: Point;

	}

	export class PixelateFilter extends AbstractFilter {

		public size: number;

	}

	export interface IPixiShader {

		fragmentSrc: string[];
		gl: WebGLRenderingContext;
		program: WebGLProgram;
		vertexSrc: string[];

		destroy(): void;
		init(): void;

	}

	export class PixiShader implements IPixiShader {

		/**
		 *
		 *
		 * @param gl the current WebGL drawing context
		 */
		public constructor(gl: WebGLRenderingContext);

		/**
		 * Uniform attributes cache.
		 */
		public attributes: ShaderAttribute[];

		/**
		 * The Default Vertex shader source.
		 */
		public defaultVertexSrc: string[];

		/**
		 * A dirty flag
		 */
		public dirty: boolean;

		/**
		 * A local flag
		 */
		public firstRun: boolean;

		/**
		 * A local texture counter for multi-texture shaders.
		 */
		public textureCount: number;

		/**
		 * The fragment shader.
		 */
		public fragmentSrc: string[];
		public gl: WebGLRenderingContext;

		/**
		 * The WebGL program.
		 */
		public program: WebGLProgram;
		public vertexSrc: string[];

		/**
		 * Initialises a Sampler2D uniform (which may only be available later on after initUniforms once the texture has loaded)
		 */
		public initSampler2D(): void;

		/**
		 * Initialises the shader uniform values.
		 *
		 * Uniforms are specified in the GLSL_ES Specification: http://www.khronos.org/registry/webgl/specs/latest/1.0/
		 * http://www.khronos.org/registry/gles/specs/2.0/GLSL_ES_Specification_1.0.17.pdf
		 */
		public initUniforms(): void;

		/**
		 * Updates the shader uniform values.
		 */
		public syncUniforms(): void;

		/**
		 * Destroys the shader.
		 */
		public destroy(): void;

		/**
		 * Initialises the shader.
		 */
		public init(): void;

	}

	export class PixiFastShader implements IPixiShader {

		/**
		 *
		 *
		 * @param gl the current WebGL drawing context
		 */
		public constructor(gl: WebGLRenderingContext);

		/**
		 * A local texture counter for multi-texture shaders.
		 */
		public textureCount: number;

		/**
		 * The fragment shader.
		 */
		public fragmentSrc: string[];
		public gl: WebGLRenderingContext;

		/**
		 * The WebGL program.
		 */
		public program: WebGLProgram;

		/**
		 * The vertex shader.
		 */
		public vertexSrc: string[];

		/**
		 * Destroys the shader.
		 */
		public destroy(): void;

		/**
		 * Initialises the shader.
		 */
		public init(): void;

	}

	export class PrimitiveShader implements IPixiShader {

		/**
		 *
		 *
		 * @param gl the current WebGL drawing context
		 */
		public constructor(gl: WebGLRenderingContext);

		/**
		 * The fragment shader.
		 */
		public fragmentSrc: string[];
		public gl: WebGLRenderingContext;

		/**
		 * The WebGL program.
		 */
		public program: WebGLProgram;

		/**
		 * The vertex shader.
		 */
		public vertexSrc: string[];

		/**
		 * Destroys the shader.
		 */
		public destroy(): void;

		/**
		 * Initialises the shader.
		 */
		public init(): void;

	}

	export class ComplexPrimitiveShader implements IPixiShader {

		/**
		 *
		 *
		 * @param gl the current WebGL drawing context
		 */
		public constructor(gl: WebGLRenderingContext);

		/**
		 * The fragment shader.
		 */
		public fragmentSrc: string[];
		public gl: WebGLRenderingContext;

		/**
		 * The WebGL program.
		 */
		public program: WebGLProgram;

		/**
		 * The vertex shader.
		 */
		public vertexSrc: string[];

		/**
		 * Destroys the shader.
		 */
		public destroy(): void;

		/**
		 * Initialises the shader.
		 */
		public init(): void;

	}

	export class StripShader implements IPixiShader {

		/**
		 *
		 *
		 * @param gl the current WebGL drawing context
		 */
		public constructor(gl: WebGLRenderingContext);

		/**
		 * The fragment shader.
		 */
		public fragmentSrc: string[];
		public gl: WebGLRenderingContext;

		/**
		 * The WebGL program.
		 */
		public program: WebGLProgram;

		/**
		 * The vertex shader.
		 */
		public vertexSrc: string[];

		/**
		 * Destroys the shader.
		 */
		public destroy(): void;

		/**
		 * Initialises the shader.
		 */
		public init(): void;

	}

	export class Point {

		public constructor(x?: number, y?: number);

		public x: number;
		public y: number;

		public clone(): Point;
		public set(x: number, y: number): void;

	}

	export class Polygon implements HitArea {

		public constructor(points: Point[]);
		public constructor(points: number[]);
		public constructor(...points: Point[]);
		public constructor(...points: number[]);

		public points: any[];

		public clone(): Polygon;
		public contains(x: number, y: number): boolean;

	}

	export class Rectangle implements HitArea {

		public constructor(x?: number, y?: number, width?: number, height?: number);

		public x: number;
		public y: number;
		public width: number;
		public height: number;

		public clone(): Rectangle;
		public contains(x: number, y: number): boolean;

	}

	export class RGBSplitFilter extends AbstractFilter {

		public red: Point;
		public green: Point;
		public blue: Point;

	}

	export class Rope extends Strip {

		public points: Point[];
		public vertices: number[];

		/**
		 *
		 *
		 * @param texture - The texture to use on the rope.
		 * @param points - An array of {PIXI.Point}.
		 */
		public constructor(texture: Texture, points: Point[]);

		public refresh(): void;
		public setTexture(texture: Texture): void;

	}

	export class RoundedRectangle implements HitArea {

		public constructor(x?: number, y?: number, width?: number, height?: number, radius?: number);

		public x: number;
		public y: number;
		public width: number;
		public height: number;
		public radius: number;

		public clone(): RoundedRectangle;
		public contains(x: number, y: number): boolean;

	}

	export class SepiaFilter extends AbstractFilter {

		public sepia: number;

	}

	export class SmartBlurFilter extends AbstractFilter {

		public blur: number;

	}

	export class SpineLoader implements Mixin {

		public url: string;
		public crossorigin: boolean;
		public loaded: boolean;

		public constructor(url: string, crossOrigin: boolean);

		public listeners(eventName: string): Function[];
		public emit(eventName: string, data?: any): boolean;
		public dispatchEvent(eventName: string, data?: any): boolean;
		public on(eventName: string, fn: Function): Function;
		public addEventListener(eventName: string, fn: Function): Function;
		public once(eventName: string, fn: Function): Function;
		public off(eventName: string, fn: Function): Function;
		public removeAllEventListeners(eventName: string): void;

		public load(): void;

	}

	export class SpineTextureLoader {

		public constructor(basePath: string, crossorigin: boolean);

		public load(page: AtlasPage, file: string): void;
		public unload(texture: BaseTexture): void;

	}

	/**
	 * The Sprite object is the base for all textured objects that are rendered to the screen
	 */
	export class Sprite extends DisplayObjectContainer {

		/**
		 * The Sprite object is the base for all textured objects that are rendered to the screen
		 *
		 * @param texture The texture for this sprite
		 *
		 *                A sprite can be created directly from an image like this :
		 *                const sprite = new PIXI.Sprite.fromImage('assets/image.png');
		 *                yourStage.addChild(sprite);
		 *                then obviously don't forget to add it to the stage you have already created
		 */
		public constructor(texture: Texture);

		/**
		 * The anchor sets the origin point of the texture.
		 * The default is 0,0 this means the texture's origin is the top left
		 * Setting than anchor to 0.5,0.5 means the textures origin is centered
		 * Setting the anchor to 1,1 would mean the textures origin points will be the bottom right corner
		 */
		public anchor: Point;

		/**
		 * The blend mode to be applied to the sprite. Set to PIXI.blendModes.NORMAL to remove any blend mode.
		 *
		 * Warning: You cannot have a blend mode and a filter active on the same Sprite. Doing so will render the sprite invisible.
		 * Default: PIXI.blendModes.NORMAL;
		 */
		public blendMode: blendModes;

		/**
		 * Controls if this Sprite is processed by the core Phaser game loops and Group loops.
		 * Default: true
		 */
		public exists: boolean;

		/**
		 * The shader that will be used to render the texture to the stage. Set to null to remove a current shader.
		 * Default: null
		 */
		public shader: IPixiShader;

		/**
		 * The texture that the sprite is using
		 */
		public texture: Texture;

		/**
		 * The tint applied to the sprite. This is a hex value. A value of 0xFFFFFF will remove any tint effect.
		 * Default: 0xFFFFFF
		 */
		public tint: number;

		/**
		 * Sets the texture of the sprite. Be warned that this doesn't remove or destroy the previous
		 * texture this Sprite was using.
		 *
		 * @param texture The PIXI texture that is displayed by the sprite
		 * @param destroy Call Texture.destroy on the current texture before replacing it with the new one?
		 */
		public setTexture(texture: Texture, destroyBase?: boolean): void;

	}

	/**
	 * The SpriteBatch class is a really fast version of the DisplayObjectContainer
	 * built solely for speed, so use when you need a lot of sprites or particles.
	 * And it's extremely easy to use :
	 *
	 *    const container = new PIXI.SpriteBatch();
	 *
	 *    stage.addChild(container);
	 *
	 *    for(const i  = 0; i < 100; i++)
	 *    {
	 *        const sprite = new PIXI.Sprite.fromImage("myImage.png");
	 *        container.addChild(sprite);
	 *    }
	 * And here you have a hundred sprites that will be renderer at the speed of light
	 */
	export class SpriteBatch extends DisplayObjectContainer {

		/**
		 * The SpriteBatch class is a really fast version of the DisplayObjectContainer
		 * built solely for speed, so use when you need a lot of sprites or particles.
		 * And it's extremely easy to use :
		 *
		 *    const container = new PIXI.SpriteBatch();
		 *
		 *    stage.addChild(container);
		 *
		 *    for(const i  = 0; i < 100; i++)
		 *    {
		 *        const sprite = new PIXI.Sprite.fromImage("myImage.png");
		 *        container.addChild(sprite);
		 *    }
		 * And here you have a hundred sprites that will be renderer at the speed of light
		 *
		 * @param texture -
		 */
		public constructor(texture?: Texture);

		public ready: boolean;
		public textureThing: Texture;

		public initWebGL(gl: WebGLRenderingContext): void;

	}

	export class SpriteSheetLoader implements Mixin {

		public constructor(url: string, crossorigin?: boolean);

		public baseUrl: string;
		public crossorigin: boolean;
		public frames: any;
		public texture: Texture;
		public url: string;

		public listeners(eventName: string): Function[];
		public emit(eventName: string, data?: any): boolean;
		public dispatchEvent(eventName: string, data?: any): boolean;
		public on(eventName: string, fn: Function): Function;
		public addEventListener(eventName: string, fn: Function): Function;
		public once(eventName: string, fn: Function): Function;
		public off(eventName: string, fn: Function): Function;
		public removeAllEventListeners(eventName: string): void;

		public load(): void;

	}

	export class Strip extends DisplayObjectContainer {

		public static DrawModes: {

			TRIANGLE_STRIP: number;
			TRIANGLES: number;

		};

		/**
		 *
		 *
		 * @param texture The texture to use
		 * @param width the width
		 * @param height the height
		 */
		public constructor(texture: Texture);

		/**
		 * The blend mode to be applied to the sprite. Set to PIXI.blendModes.NORMAL to remove any blend mode.
		 * Default: PIXI.blendModes.NORMAL;
		 */
		public blendMode: number;
		public colors: number[];

		/**
		 * Whether the strip is dirty or not
		 */
		public dirty: boolean;
		public indices: number[];

		/**
		 * Triangles in canvas mode are automatically antialiased, use this value to force triangles to overlap a bit with each other.
		 */
		public canvasPadding: number;

		/**
		 * The texture of the strip
		 */
		public texture: Texture;
		public uvs: number[];
		public vertices: number[];

		/**
		 * Returns the bounds of the mesh as a rectangle. The bounds calculation takes the worldTransform into account.
		 *
		 * @param matrix the transformation matrix of the sprite
		 * @return the framing rectangle
		 */
		public getBounds(matrix?: Matrix): Rectangle;

	}

	/**
	 * A texture stores the information that represents an image or part of an image. It cannot be added
	 * to the display list directly. Instead use it as the texture for a PIXI.Sprite. If no frame is provided then the whole image is used.
	 */
	export class Texture implements Mixin {

		public static emptyTexture: Texture;

		/**
		 * Helper function that creates a new a Texture based on the given canvas element.
		 *
		 * @param canvas The canvas element source of the texture
		 * @param scaleMode See {{#crossLink "PIXI/scaleModes:property"}}PIXI.scaleModes{{/crossLink}} for possible values
		 */
		public static fromCanvas(canvas: HTMLCanvasElement, scaleMode?: scaleModes): Texture;

		/**
		 * A texture stores the information that represents an image or part of an image. It cannot be added
		 * to the display list directly. Instead use it as the texture for a PIXI.Sprite. If no frame is provided then the whole image is used.
		 *
		 * @param baseTexture The base texture source to create the texture from
		 * @param frame The rectangle frame of the texture to show
		 * @param crop The area of original texture
		 * @param trim Trimmed texture rectangle
		 */
		public constructor(baseTexture: BaseTexture, frame?: Rectangle, crop?: Rectangle, trim?: Rectangle);

		/**
		 * The base texture that this texture uses.
		 */
		public baseTexture: BaseTexture;

		/**
		 * This is the area of the BaseTexture image to actually copy to the Canvas / WebGL when rendering,
		 * irrespective of the actual frame size or placement (which can be influenced by trimmed texture atlases)
		 */
		public crop: Rectangle;

		/**
		 * The frame specifies the region of the base texture that this texture uses
		 */
		public frame: Rectangle;

		/**
		 * The height of the Texture in pixels.
		 */
		public height: number;

		/**
		 * Does this Texture have any frame data assigned to it?
		 */
		public noFrame: boolean;

		/**
		 * This will let a renderer know that a texture has been updated (used mainly for webGL uv updates)
		 */
		public requiresUpdate: boolean;

		/**
		 * The texture trim data.
		 */
		public trim: Point;

		/**
		 * The width of the Texture in pixels.
		 */
		public width: number;
		public scope: any;

		/**
		 * This will let the renderer know if the texture is valid. If it's not then it cannot be rendered.
		 */
		public valid: boolean;

		public listeners(eventName: string): Function[];
		public emit(eventName: string, data?: any): boolean;
		public dispatchEvent(eventName: string, data?: any): boolean;
		public on(eventName: string, fn: Function): Function;
		public addEventListener(eventName: string, fn: Function): Function;
		public once(eventName: string, fn: Function): Function;
		public off(eventName: string, fn: Function): Function;
		public removeAllEventListeners(eventName: string): void;

		/**
		 * Destroys this texture
		 *
		 * @param destroyBase Whether to destroy the base texture as well
		 */
		public destroy(destroyBase: boolean): void;

		/**
		 * Specifies the region of the baseTexture that this texture will use.
		 *
		 * @param frame The frame of the texture to set it to
		 */
		public setFrame(frame: Rectangle): void;

	}

	/**
	 * A tiling sprite is a fast way of rendering a tiling image
	 */
	export class TilingSprite extends Sprite {

		/**
		 * A tiling sprite is a fast way of rendering a tiling image
		 *
		 * @param texture the texture of the tiling sprite
		 * @param width the width of the tiling sprite
		 * @param height the height of the tiling sprite
		 */
		public constructor(texture: Texture, width: number, height: number);

		/**
		 * The CanvasBuffer object that the tiled texture is drawn to.
		 */
		public canvasBuffer: PIXI.CanvasBuffer;

		/**
		 * The blend mode to be applied to the sprite
		 * Default: PIXI.blendModes.NORMAL;
		 */
		public blendMode: number;

		/**
		 * If true the TilingSprite will run generateTexture on its **next** render pass.
		 * This is set by the likes of Phaser.LoadTexture.setFrame.
		 * Default: true
		 */
		public refreshTexture: boolean;

		/**
		 * The texture that the sprite is using
		 */
		public texture: Texture;

		/**
		 * If enabled a green rectangle will be drawn behind the generated tiling texture, allowing you to visually
		 * debug the texture being used.
		 */
		public textureDebug: boolean;

		/**
		 * The tint applied to the sprite. This is a hex value
		 * Default: 0xFFFFFF
		 */
		public tint: number;

		/**
		 * The offset position of the image that is being tiled
		 */
		public tilePosition: Point;

		/**
		 * The Context fill pattern that is used to draw the TilingSprite in Canvas mode only (will be null in WebGL).
		 */
		public tilePattern: PIXI.Texture;

		/**
		 * The scaling of the image that is being tiled
		 */
		public tileScale: Point;

		/**
		 * A point that represents the scale of the texture object
		 */
		public tileScaleOffset: Point;

		public destroy(): void;

		/**
		 *
		 *
		 * @param forcePowerOfTwo Whether we want to force the texture to be a power of two
		 * @param renderSession -
		 */
		public generateTilingTexture(forcePowerOfTwo?: boolean): void;

		/**
		 * Sets the texture of the sprite. Be warned that this doesn't remove or destroy the previous
		 * texture this Sprite was using.
		 *
		 * @param texture The PIXI texture that is displayed by the sprite
		 * @param destroy Call Texture.destroy on the current texture before replacing it with the new one?
		 */
		public setTexture(texture: Texture): void;

	}

	export class TiltShiftFilter extends AbstractFilter {

		public blur: number;
		public gradientBlur: number;
		public start: number;
		public end: number;

	}

	export class TiltShiftXFilter extends AbstractFilter {

		public blur: number;
		public gradientBlur: number;
		public start: number;
		public end: number;

		public updateDelta(): void;

	}

	export class TiltShiftYFilter extends AbstractFilter {

		public blur: number;
		public gradientBlur: number;
		public start: number;
		public end: number;

		public updateDelta(): void;

	}

	export class TwistFilter extends AbstractFilter {

		public angle: number;
		public offset: Point;
		public radius: number;

	}

	export class VideoTexture extends BaseTexture {

		public static baseTextureFromVideo(video: HTMLVideoElement, scaleMode: number): BaseTexture;
		public static textureFromVideo(video: HTMLVideoElement, scaleMode: number): Texture;
		public static fromUrl(videoSrc: string, scaleMode?: number, autoPlay?: boolean, type?: string, loop?: boolean): Texture;

		public controls: boolean;
		public autoUpdate: boolean;
		public type: string;

		public changeSource(src: string, type: string, loop: boolean): void;
		public play(): void;
		public stop(): void;

		public destroy(): void;
		public updateBound(): void;
		public onPlayStart: () => void;
		public onPlayStop: () => void;
		public onCanPlay: (event: any) => void;

	}

	export class WebGLBlendModeManager {

		public currentBlendMode: number;

		/**
		 * Destroys this object.
		 */
		public destroy(): void;

		/**
		 * Sets-up the given blendMode from WebGL's point of view.
		 *
		 * @param blendMode the blendMode, should be a Pixi const, such as PIXI.BlendModes.ADD
		 */
		public setBlendMode(blendMode: number): boolean;

		/**
		 * Sets the WebGL Context.
		 *
		 * @param gl the current WebGL drawing context
		 */
		public setContext(gl: WebGLRenderingContext): void;

	}

	export class WebGLFastSpriteBatch {

		public constructor(gl: CanvasRenderingContext2D);

		public currentBatchSize: number;
		public currentBaseTexture: BaseTexture;
		public currentBlendMode: number;
		public renderSession: RenderSession;
		public drawing: boolean;
		public indexBuffer: any;

		/**
		 * Index data
		 */
		public indices: number[];
		public lastIndexCount: number;
		public matrix: Matrix;
		public maxSize: number;
		public shader: IPixiShader;
		public size: number;
		public vertexBuffer: any;

		/**
		 * Vertex data
		 */
		public vertices: number[];
		public vertSize: number;

		public end(): void;

		/**
		 *
		 *
		 * @param spriteBatch -
		 * @param renderSession -
		 */
		public begin(spriteBatch: SpriteBatch, renderSession: RenderSession): void;
		public destroy(removeView?: boolean): void;
		public flush(): void;

		/**
		 *
		 *
		 * @param spriteBatch -
		 */
		public render(spriteBatch: SpriteBatch): void;

		/**
		 *
		 *
		 * @param sprite -
		 */
		public renderSprite(sprite: Sprite): void;

		/**
		 * Sets the WebGL Context.
		 *
		 * @param gl the current WebGL drawing context
		 */
		public setContext(gl: WebGLRenderingContext): void;
		public start(): void;
		public stop(): void;

	}

	export class WebGLFilterManager {

		public filterStack: AbstractFilter[];
		public transparent: boolean;
		public offsetX: number;
		public offsetY: number;

		/**
		 * Applies the filter to the specified area.
		 *
		 * @param filter the filter that needs to be applied
		 * @param filterArea TODO - might need an update
		 * @param width the horizontal range of the filter
		 * @param height the vertical range of the filter
		 */
		public applyFilterPass(filter: AbstractFilter, filterArea: Texture, width: number, height: number): void;

		/**
		 *
		 *
		 * @param renderSession -
		 * @param buffer -
		 */
		public begin(renderSession: RenderSession, buffer: ArrayBuffer): void;

		/**
		 * Destroys the filter and removes it from the filter stack.
		 */
		public destroy(): void;

		/**
		 * Initialises the shader buffers.
		 */
		public initShaderBuffers(): void;

		/**
		 * Removes the last filter from the filter stack and doesn't return it.
		 */
		public popFilter(): void;

		/**
		 * Applies the filter and adds it to the current filter stack.
		 *
		 * @param filterBlock the filter that will be pushed to the current filter stack
		 */
		public pushFilter(filterBlock: FilterBlock): void;

		/**
		 * Initialises the context and the properties.
		 *
		 * @param gl the current WebGL drawing context
		 */
		public setContext(gl: WebGLRenderingContext): void;

	}

	/**
	 * A set of functions used by the webGL renderer to draw the primitive graphics data
	 */
	export class WebGLGraphics {

		public static graphicsDataPool: any[];

		/**
		 * Renders the graphics object
		 *
		 * @param graphics -
		 * @param renderSession -
		 */
		public static renderGraphics(graphics: Graphics, renderRession: RenderSession): void;

		/**
		 * Updates the graphics object
		 *
		 * @param graphicsData The graphics object to update
		 * @param gl the current WebGL drawing context
		 */
		public static updateGraphics(graphics: Graphics, gl: WebGLRenderingContext): void;

		/**
		 *
		 *
		 * @param webGL -
		 * @param type -
		 */
		public static switchMode(webGL: WebGLRenderingContext, type: number): any;

		/**
		 * Builds a rectangle to draw
		 *
		 * @param graphicsData The graphics object containing all the necessary properties
		 * @param webGLData -
		 */
		public static buildRectangle(graphicsData: GraphicsData, webGLData: any): void;

		/**
		 * Builds a rounded rectangle to draw
		 *
		 * @param graphicsData The graphics object containing all the necessary properties
		 * @param webGLData -
		 */
		public static buildRoundedRectangle(graphicsData: GraphicsData, webGLData: any): void;

		/**
		 * Calculate the points for a quadratic bezier curve. (helper function..)
		 * Based on: https://stackoverflow.com/questions/785097/how-do-i-implement-a-bezier-curve-in-c
		 *
		 * @param fromX Origin point x
		 * @param fromY Origin point x
		 * @param cpX Control point x
		 * @param cpY Control point y
		 * @param toX Destination point x
		 * @param toY Destination point y
		 */
		public static quadraticBezierCurve(fromX: number, fromY: number, cpX: number, cpY: number, toX: number, toY: number): number[];

		/**
		 * Builds a circle to draw
		 *
		 * @param graphicsData The graphics object to draw
		 * @param webGLData -
		 */
		public static buildCircle(graphicsData: GraphicsData, webGLData: any): void;

		/**
		 * Builds a line to draw
		 *
		 * @param graphicsData The graphics object containing all the necessary properties
		 * @param webGLData -
		 */
		public static buildLine(graphicsData: GraphicsData, webGLData: any): void;

		/**
		 * Builds a complex polygon to draw
		 *
		 * @param graphicsData The graphics object containing all the necessary properties
		 * @param webGLData -
		 */
		public static buildComplexPoly(graphicsData: GraphicsData, webGLData: any): void;

		/**
		 * Builds a polygon to draw
		 *
		 * @param graphicsData The graphics object containing all the necessary properties
		 * @param webGLData -
		 */
		public static buildPoly(graphicsData: GraphicsData, webGLData: any): boolean;

		public reset(): void;
		public upload(): void;

	}

	export class WebGLGraphicsData {

		public constructor(gl: WebGLRenderingContext);

		public gl: WebGLRenderingContext;
		public glPoints: any[];
		public color: number[];
		public points: any[];
		public indices: any[];
		public buffer: WebGLBuffer;
		public indexBuffer: WebGLBuffer;
		public mode: number;
		public alpha: number;
		public dirty: boolean;

		public reset(): void;
		public upload(): void;

	}

	export class WebGLMaskManager {

		/**
		 * Destroys the mask stack.
		 */
		public destroy(): void;

		/**
		 * Removes the last filter from the filter stack and doesn't return it.
		 *
		 * @param maskData -
		 * @param renderSession an object containing all the useful parameters
		 */
		public popMask(renderSession: RenderSession): void;

		/**
		 * Applies the Mask and adds it to the current filter stack.
		 *
		 * @param maskData -
		 * @param renderSession -
		 */
		public pushMask(maskData: any[], renderSession: RenderSession): void;

		/**
		 * Sets the drawing context to the one given in parameter.
		 *
		 * @param gl the current WebGL drawing context
		 */
		public setContext(gl: WebGLRenderingContext): void;

	}

	/**
	 * The WebGLRenderer draws the stage and all its content onto a webGL enabled canvas. This renderer
	 * should be used for browsers that support webGL. This Render works by automatically managing webGLBatchs.
	 * So no need for Sprite Batches or Sprite Clouds.
	 * Don't forget to add the view to your DOM or you will not see anything :)
	 */
	export class WebGLRenderer implements PixiRenderer {

		public static createWebGLTexture(texture: Texture, gl: WebGLRenderingContext): void;

		/**
		 * The WebGLRenderer draws the stage and all its content onto a webGL enabled canvas. This renderer
		 * should be used for browsers that support webGL. This Render works by automatically managing webGLBatchs.
		 * So no need for Sprite Batches or Sprite Clouds.
		 * Don't forget to add the view to your DOM or you will not see anything :)
		 *
		 * @param game A reference to the Phaser Game instance
		 */
		public constructor(game: Phaser.Game);

		public game: Phaser.Game;
		public type: number;

		/**
		 * The resolution of the renderer
		 * Default: 1
		 */
		public resolution: number;

		/**
		 * Whether the render view is transparent
		 */
		public transparent: boolean;

		/**
		 * Whether the render view should be resized automatically
		 */
		public autoResize: boolean;

		/**
		 * The value of the preserveDrawingBuffer flag affects whether or not the contents of the stencil buffer is retained after rendering.
		 */
		public preserveDrawingBuffer: boolean;

		/**
		 * This sets if the WebGLRenderer will clear the context texture or not before the new render pass. If true:
		 * If the Stage is NOT transparent, Pixi will clear to alpha (0, 0, 0, 0).
		 * If the Stage is transparent, Pixi will clear to the target Stage's background color.
		 * Disable this by setting this to false. For example: if your game has a canvas filling background image, you often don't need this set.
		 */
		public clearBeforeRender: boolean;

		/**
		 * The width of the canvas view
		 */
		public width: number;

		/**
		 * The height of the canvas view
		 */
		public height: number;

		/**
		 * The canvas element that everything is drawn to
		 */
		public view: HTMLCanvasElement;
		public projection: Point;
		public offset: Point;

		/**
		 * Deals with managing the shader programs and their attribs
		 */
		public shaderManager: WebGLShaderManager;

		/**
		 * Manages the rendering of sprites
		 */
		public spriteBatch: WebGLSpriteBatch;

		/**
		 * Manages the masks using the stencil buffer
		 */
		public maskManager: WebGLMaskManager;

		/**
		 * Manages the filters
		 */
		public filterManager: WebGLFilterManager;

		/**
		 * Manages the stencil buffer
		 */
		public stencilManager: WebGLStencilManager;

		/**
		 * Manages the blendModes
		 */
		public blendModeManager: WebGLBlendModeManager;
		public renderSession: RenderSession;

		public initContext(): void;

		/**
		 * Renders the stage to its webGL view
		 *
		 * @param stage the Stage element to be rendered
		 */
		public render(stage: DisplayObjectContainer): void;

		/**
		 * Renders a Display Object.
		 *
		 * @param displayObject The DisplayObject to render
		 * @param projection The projection
		 * @param buffer a standard WebGL buffer
		 */
		public renderDisplayObject(displayObject: DisplayObject, projection: Point, buffer: WebGLBuffer): void;

		/**
		 * Resizes the webGL view to the specified width and height.
		 *
		 * @param width the new width of the webGL view
		 * @param height the new height of the webGL view
		 */
		public resize(width: number, height: number): void;

		/**
		 * Updates and Creates a WebGL texture for the renderers context.
		 *
		 * @param texture the texture to update
		 * @return True if the texture was successfully bound, otherwise false.
		 */
		public updateTexture(texture: Texture): void;

		/**
		 * Removes everything from the renderer (event listeners, spritebatch, etc...)
		 */
		public destroy(): void;

		/**
		 * Maps Pixi blend modes to WebGL blend modes.
		 */
		public mapBlendModes(): void;

	}

	export class WebGLShaderManager {

		public maxAttibs: number;
		public attribState: any[];
		public stack: any[];
		public tempAttribState: any[];

		/**
		 * Destroys this object.
		 */
		public destroy(): void;

		/**
		 * Takes the attributes given in parameters.
		 *
		 * @param attribs attribs
		 */
		public setAttribs(attribs: ShaderAttribute[]): void;

		/**
		 * Initialises the context and the properties.
		 *
		 * @param gl the current WebGL drawing context
		 */
		public setContext(gl: WebGLRenderingContext): void;

		/**
		 * Sets the current shader.
		 *
		 * @param shader -
		 */
		public setShader(shader: IPixiShader): boolean;

	}

	export class WebGLStencilManager {

		public stencilStack: any[];
		public reverse: boolean;
		public count: number;

		/**
		 * TODO this does not belong here!
		 *
		 * @param graphics -
		 * @param webGLData -
		 * @param renderSession -
		 */
		public bindGraphics(graphics: Graphics, webGLData: any[], renderSession: RenderSession): void;

		/**
		 * Destroys the mask stack.
		 */
		public destroy(): void;

		/**
		 *
		 *
		 * @param graphics -
		 * @param webGLData -
		 * @param renderSession -
		 */
		public popStencil(graphics: Graphics, webGLData: any[], renderSession: RenderSession): void;
		public pushStencil(graphics: Graphics, webGLData: any[], renderSession: RenderSession): void;

		/**
		 * Sets the drawing context to the one given in parameter.
		 *
		 * @param gl the current WebGL drawing context
		 */
		public setContext(gl: WebGLRenderingContext): void;

	}

	export class WebGLSpriteBatch {

		public blendModes: number[];

		/**
		 * View on the vertices as a Uint32Array
		 */
		public colors: number[];
		public currentBatchSize: number;
		public currentBaseTexture: Texture;
		public defaultShader: AbstractFilter;
		public dirty: boolean;
		public drawing: boolean;

		/**
		 * Holds the indices
		 */
		public indices: number[];
		public lastIndexCount: number;

		/**
		 * View on the vertices as a Float32Array
		 */
		public positions: number[];
		public textures: Texture[];
		public shaders: IPixiShader[];

		/**
		 * The number of images in the SpriteBatch before it flushes
		 */
		public size: number;
		public sprites: any[];

		/**
		 * Holds the vertices
		 */
		public vertices: number[];
		public vertSize: number;

		/**
		 *
		 *
		 * @param renderSession The RenderSession object
		 */
		public begin(renderSession: RenderSession): void;

		/**
		 * Destroys the SpriteBatch.
		 */
		public destroy(): void;
		public end(): void;

		/**
		 * Renders the content and empties the current batch.
		 */
		public flush(shader?: IPixiShader): void;

		/**
		 *
		 *
		 * @param sprite the sprite to render when using this spritebatch
		 * @param matrix - Optional matrix. If provided the Display Object will be rendered using this matrix, otherwise it will use its worldTransform.
		 */
		public render(sprite: Sprite): void;

		/**
		 *
		 *
		 * @param texture -
		 * @param size -
		 * @param startIndex -
		 */
		public renderBatch(texture: Texture, size: number, startIndex: number): void;

		/**
		 * Renders a TilingSprite using the spriteBatch.
		 *
		 * @param sprite the sprite to render
		 */
		public renderTilingSprite(sprite: TilingSprite): void;
		public setBlendMode(blendMode: blendModes): void;

		/**
		 *
		 *
		 * @param gl the current WebGL drawing context
		 */
		public setContext(gl: WebGLRenderingContext): void;
		public start(): void;
		public stop(): void;

	}

	/**
	 * A RenderTexture is a special texture that allows any Pixi display object to be rendered to it.
	 *
	 * __Hint__: All DisplayObjects (i.e. Sprites) that render to a RenderTexture should be preloaded otherwise black rectangles will be drawn instead.
	 *
	 * A RenderTexture takes a snapshot of any Display Object given to its render method. The position and rotation of the given Display Objects is ignored. For example:
	 *
	 *    const renderTexture = new PIXI.RenderTexture(800, 600);
	 *    const sprite = PIXI.Sprite.fromImage("spinObj_01.png");
	 *    sprite.position.x = 800/2;
	 *    sprite.position.y = 600/2;
	 *    sprite.anchor.x = 0.5;
	 *    sprite.anchor.y = 0.5;
	 *    renderTexture.render(sprite);
	 *
	 * The Sprite in this case will be rendered to a position of 0,0. To render this sprite at its actual position a DisplayObjectContainer should be used:
	 *
	 *    const doc = new PIXI.DisplayObjectContainer();
	 *    doc.addChild(sprite);
	 *    renderTexture.render(doc);  // Renders to center of renderTexture
	 */
	export class RenderTexture extends Texture {

		/**
		 * A RenderTexture is a special texture that allows any Pixi display object to be rendered to it.
		 *
		 * __Hint__: All DisplayObjects (i.e. Sprites) that render to a RenderTexture should be preloaded otherwise black rectangles will be drawn instead.
		 *
		 * A RenderTexture takes a snapshot of any Display Object given to its render method. The position and rotation of the given Display Objects is ignored. For example:
		 *
		 *    const renderTexture = new PIXI.RenderTexture(800, 600);
		 *    const sprite = PIXI.Sprite.fromImage("spinObj_01.png");
		 *    sprite.position.x = 800/2;
		 *    sprite.position.y = 600/2;
		 *    sprite.anchor.x = 0.5;
		 *    sprite.anchor.y = 0.5;
		 *    renderTexture.render(sprite);
		 *
		 * The Sprite in this case will be rendered to a position of 0,0. To render this sprite at its actual position a DisplayObjectContainer should be used:
		 *
		 *    const doc = new PIXI.DisplayObjectContainer();
		 *    doc.addChild(sprite);
		 *    renderTexture.render(doc);  // Renders to center of renderTexture
		 *
		 * @param width The width of the render texture
		 * @param height The height of the render texture
		 * @param renderer The renderer used for this RenderTexture
		 * @param scaleMode See {{#crossLink "PIXI/scaleModes:property"}}PIXI.scaleModes{{/crossLink}} for possible values
		 * @param resolution The resolution of the texture being generated
		 */
		public constructor(width?: number, height?: number, renderer?: PixiRenderer, scaleMode?: scaleModes, resolution?: number);

		/**
		 * The framing rectangle of the render texture
		 */
		public frame: Rectangle;

		/**
		 * The base texture object that this texture uses
		 */
		public baseTexture: BaseTexture;

		/**
		 * The renderer this RenderTexture uses. A RenderTexture can only belong to one renderer at the moment if its webGL.
		 */
		public renderer: PixiRenderer;

		/**
		 * The Resolution of the texture.
		 */
		public resolution: number;
		public valid: boolean;

		/**
		 * Clears the RenderTexture.
		 */
		public clear(): void;

		/**
		 * Will return a base64 encoded string of this texture. It works by calling RenderTexture.getCanvas and then running toDataURL on that.
		 * @return A base64 encoded string of the texture.
		 */
		public getBase64(): string;

		/**
		 * Creates a Canvas element, renders this RenderTexture to it and then returns it.
		 * @return A Canvas element with the texture rendered on.
		 */
		public getCanvas(): HTMLCanvasElement;

		/**
		 * Will return a HTML Image of the texture
		 */
		public getImage(): HTMLImageElement;

		/**
		 * Resizes the RenderTexture.
		 *
		 * @param width The width to resize to.
		 * @param height The height to resize to.
		 * @param updateBase Should the baseTexture.width and height values be resized as well?
		 */
		public resize(width: number, height: number, updateBase: boolean): void;
		public render(displayObject: DisplayObject, matrix?: Matrix, clear?: boolean): void;

	}

	// SPINE

	export class BoneData {

		public constructor(name: string, parent?: any);

		public name: string;
		public parent: any;
		public length: number;
		public x: number;
		public y: number;
		public rotation: number;
		public scaleX: number;
		public scaleY: number;

	}

	export class SlotData {

		public constructor(name: string, boneData: BoneData);

		public name: string;
		public boneData: BoneData;
		public r: number;
		public g: number;
		public b: number;
		public a: number;
		public attachmentName: string;

	}

	export class Bone {

		public constructor(boneData: BoneData, parent?: any);

		public data: BoneData;
		public parent: any;
		public yDown: boolean;
		public x: number;
		public y: number;
		public rotation: number;
		public scaleX: number;
		public scaleY: number;
		public worldRotation: number;
		public worldScaleX: number;
		public worldScaleY: number;

		public updateWorldTransform(flipX: boolean, flip: boolean): void;
		public setToSetupPose(): void;

	}

	export class Slot {

		public constructor(slotData: SlotData, skeleton: Skeleton, bone: Bone);

		public data: SlotData;
		public skeleton: Skeleton;
		public bone: Bone;
		public r: number;
		public g: number;
		public b: number;
		public a: number;
		public attachment: RegionAttachment;
		public setAttachment(attachment: RegionAttachment): void;
		public setAttachmentTime(time: number): void;
		public getAttachmentTime(): number;
		public setToSetupPose(): void;

	}

	export class Skin {

		public constructor(name: string);

		public name: string;
		public attachments: any;

		public addAttachment(slotIndex: number, name: string, attachment: RegionAttachment): void;
		public getAttachment(slotIndex: number, name: string): void;

	}

	export class Animation {

		public constructor(name: string, timelines: ISpineTimeline[], duration: number);

		public name: string;
		public timelines: ISpineTimeline[];
		public duration: number;
		public apply(skeleton: Skeleton, time: number, loop: boolean): void;
		public min(skeleton: Skeleton, time: number, loop: boolean, alpha: number): void;

	}

	export class Curves {

		public constructor(frameCount: number);

		public curves: number[];

		public setLinear(frameIndex: number): void;
		public setStepped(frameIndex: number): void;
		public setCurve(frameIndex: number, cx1: number, cy1: number, cx2: number, cy2: number): void;
		public getCurvePercent(frameIndex: number, percent: number): number;

	}

	export interface ISpineTimeline {

		curves: Curves;
		frames: number[];

		getFrameCount(): number;
		apply(skeleton: Skeleton, time: number, alpha: number): void;

	}

	export class RotateTimeline implements ISpineTimeline {

		public constructor(frameCount: number);

		public curves: Curves;
		public frames: number[];
		public boneIndex: number;

		public getFrameCount(): number;
		public setFrame(frameIndex: number, time: number, angle: number): void;
		public apply(skeleton: Skeleton, time: number, alpha: number): void;

	}

	export class TranslateTimeline implements ISpineTimeline {

		public constructor(frameCount: number);

		public curves: Curves;
		public frames: number[];
		public boneIndex: number;

		public getFrameCount(): number;
		public setFrame(frameIndex: number, time: number, x: number, y: number): void;
		public apply(skeleton: Skeleton, time: number, alpha: number): void;

	}

	export class ScaleTimeline implements ISpineTimeline {

		public constructor(frameCount: number);

		public curves: Curves;
		public frames: number[];
		public boneIndex: number;

		public getFrameCount(): number;
		public setFrame(frameIndex: number, time: number, x: number, y: number): void;
		public apply(skeleton: Skeleton, time: number, alpha: number): void;

	}

	export class ColorTimeline implements ISpineTimeline {

		public constructor(frameCount: number);

		public curves: Curves;
		public frames: number[];
		public boneIndex: number;

		public getFrameCount(): number;
		public setFrame(frameIndex: number, time: number, r: number, g: number, b: number, a: number): void;
		public apply(skeleton: Skeleton, time: number, alpha: number): void;

	}

	export class AttachmentTimeline implements ISpineTimeline {

		public constructor(frameCount: number);

		public curves: Curves;
		public frames: number[];
		public attachmentNames: string[];
		public slotIndex: number;

		public getFrameCount(): number;
		public setFrame(frameIndex: number, time: number, attachmentName: string): void;
		public apply(skeleton: Skeleton, time: number, alpha: number): void;

	}

	export class SkeletonData {

		public bones: Bone[];
		public slots: Slot[];
		public skins: Skin[];
		public animations: Animation[];
		public defaultSkin: Skin;

		public findBone(boneName: string): Bone;
		public findBoneIndex(boneName: string): number;
		public findSlot(slotName: string): Slot;
		public findSlotIndex(slotName: string): number;
		public findSkin(skinName: string): Skin;
		public findAnimation(animationName: string): Animation;

	}

	export class Skeleton {

		public constructor(skeletonData: SkeletonData);

		public data: SkeletonData;
		public bones: Bone[];
		public slots: Slot[];
		public drawOrder: any[];
		public x: number;
		public y: number;
		public skin: Skin;
		public r: number;
		public g: number;
		public b: number;
		public a: number;
		public time: number;
		public flipX: boolean;
		public flipY: boolean;

		public updateWorldTransform(): void;
		public setToSetupPose(): void;
		public setBonesToSetupPose(): void;
		public setSlotsToSetupPose(): void;
		public getRootBone(): Bone;
		public findBone(boneName: string): Bone;
		public fineBoneIndex(boneName: string): number;
		public findSlot(slotName: string): Slot;
		public findSlotIndex(slotName: string): number;
		public setSkinByName(skinName: string): void;
		public setSkin(newSkin: Skin): void;
		public getAttachmentBySlotName(slotName: string, attachmentName: string): RegionAttachment;
		public getAttachmentBySlotIndex(slotIndex: number, attachmentName: string): RegionAttachment;
		public setAttachment(slotName: string, attachmentName: string): void;
		public update(data: number): void;

	}

	export class RegionAttachment {

		public offset: number[];
		public uvs: number[];
		public x: number;
		public y: number;
		public rotation: number;
		public scaleX: number;
		public scaleY: number;
		public width: number;
		public height: number;
		public rendererObject: any;
		public regionOffsetX: number;
		public regionOffsetY: number;
		public regionWidth: number;
		public regionHeight: number;
		public regionOriginalWidth: number;
		public regionOriginalHeight: number;

		public setUVs(u: number, v: number, u2: number, v2: number, rotate: number): void;
		public updateOffset(): void;
		public computeVertices(x: number, y: number, bone: Bone, vertices: number[]): void;

	}

	export class AnimationStateData {

		public constructor(skeletonData: SkeletonData);

		public skeletonData: SkeletonData;
		public animationToMixTime: any;
		public defaultMix: number;

		public setMixByName(fromName: string, toName: string, duration: number): void;
		public setMix(from: string, to: string): number;

	}

	export class AnimationState {

		public constructor(stateData: any);

		public animationSpeed: number;
		public current: any;
		public previous: any;
		public currentTime: number;
		public previousTime: number;
		public currentLoop: boolean;
		public previousLoop: boolean;
		public mixTime: number;
		public mixDuration: number;
		public queue: Animation[];

		public update(delta: number): void;
		public apply(skeleton: any): void;
		public clearAnimation(): void;
		public setAnimation(animation: any, loop: boolean): void;
		public setAnimationByName(animationName: string, loop: boolean): void;
		public addAnimationByName(animationName: string, loop: boolean, delay: number): void;
		public addAnimation(animation: any, loop: boolean, delay: number): void;
		public isComplete(): number;

	}

	export class SkeletonJson {

		public constructor(attachmentLoader: AtlasAttachmentLoader);

		public attachmentLoader: AtlasAttachmentLoader;
		public scale: number;

		public readSkeletonData(root: any): SkeletonData;
		public readAttachment(skin: Skin, name: string, map: any): RegionAttachment;
		public readAnimation(name: string, map: any, skeletonData: SkeletonData): void;
		public readCurve(timeline: ISpineTimeline, frameIndex: number, valueMap: any): void;
		public toColor(hexString: string, colorIndex: number): number;

	}

	export class Atlas {

		public static FORMAT: {

			alpha: number;
			intensity: number;
			luminanceAlpha: number;
			rgb565: number;
			rgba4444: number;
			rgb888: number;
			rgba8888: number;

		};

		public static TextureFilter: {

			nearest: number;
			linear: number;
			mipMap: number;
			mipMapNearestNearest: number;
			mipMapLinearNearest: number;
			mipMapNearestLinear: number;
			mipMapLinearLinear: number;

		};

		public static textureWrap: {

			mirroredRepeat: number;
			clampToEdge: number;
			repeat: number;

		};

		public constructor(atlasText: string, textureLoader: AtlasLoader);

		public textureLoader: AtlasLoader;
		public pages: AtlasPage[];
		public regions: AtlasRegion[];

		public findRegion(name: string): AtlasRegion;
		public dispose(): void;
		public updateUVs(page: AtlasPage): void;

	}

	export class AtlasPage {

		public name: string;
		public format: number;
		public minFilter: number;
		public magFilter: number;
		public uWrap: number;
		public vWrap: number;
		public rendererObject: any;
		public width: number;
		public height: number;

	}

	export class AtlasRegion {

		public page: AtlasPage;
		public name: string;
		public x: number;
		public y: number;
		public width: number;
		public height: number;
		public u: number;
		public v: number;
		public u2: number;
		public v2: number;
		public offsetX: number;
		public offsetY: number;
		public originalWidth: number;
		public originalHeight: number;
		public index: number;
		public rotate: boolean;
		public splits: any[];
		public pads: any[];

	}

	export class AtlasReader {

		public constructor(text: string);

		public lines: string[];
		public index: number;

		public trim(value: string): string;
		public readLine(): string;
		public readValue(): string;
		public readTuple(tuple: number): number;

	}

	export class AtlasAttachmentLoader {

		public atlas: Atlas;
		public constructor(atlas: Atlas);
		public newAttachment(skin: Skin, type: number, name: string): RegionAttachment;

	}

	export class Spine extends DisplayObjectContainer {

		public autoUpdate: boolean;
		public spineData: any;
		public skeleton: Skeleton;
		public stateData: AnimationStateData;
		public state: AnimationState;
		public slotContainers: DisplayObjectContainer[];
		public constructor(url: string);
		public createSprite(slot: Slot, descriptor: { name: string }): Sprite[];
		public update(dt: number): void;

	}

}

declare function requestAnimFrame(callback: Function): void;

declare namespace PIXI.PolyK {
	export function Triangulate(p: number[]): number[];
}
