import { Duck } from '../../..';
import uniqueID from '../../../utils/uniqueID';
import Debug from '../../debug/debug';
import Game from '../../game';
import Group from '../../group/group';
import Vector2 from '../../math/vector2';
import Scene from '../../scene';
import hitboxFaceIntersect from '../utils/hitboxFaceIntersect';
import PhysicsBody from '../physicsBody';
import rectToRectIntersect from '../utils/rectToRectIntersect';
import Color from '../../renderer/models/color';

/**
 * @class Hitbox
 * @classdesc Creates a DuckEngine Hitbox
 * @description The Hitbox Class. A AABB Hitbox used for Colliders
 * @since 2.0.0
 */
export default class Hitbox implements Duck.Types.Renderable {
	/**
	 * @memberof Hitbox
	 * @description The unique identifier for a Hitbox
	 * @type string
	 * @since 2.0.0
	 */
	public readonly id: string;

	/**
	 * @memberof Hitbox
	 * @description The Position of the Hitbox
	 * @type Vector2
	 * @since 2.0.0
	 */
	public position: Vector2;

	/**
	 * @memberof Hitbox
	 * @description The Offset Position of the hitbox
	 * @type Vector2
	 * @since 2.0.0
	 */
	public offset: Vector2;

	/**
	 * @memberof Hitbox
	 * @description The Width of the Hitbox
	 * @type number
	 * @since 2.0.0
	 */
	public w: number;

	/**
	 * @memberof Hitbox
	 * @description The Height of the Hitbox
	 * @type number
	 * @since 2.0.0
	 */
	public h: number;

	/**
	 * @memberof Hitbox
	 * @description Game instance
	 * @type Game
	 * @since 2.0.0
	 */
	public game: Game;

	/**
	 * @memberof Hitbox
	 * @description Scene instance
	 * @type Scene
	 * @since 2.0.0
	 */
	public scene: Scene;

	/**
	 * @memberof Hitbox
	 * @description PhysicsBody that the Hitbox is attached to
	 * @type PhysicsBody<Duck.Types.Texture.Type>
	 * @since 2.0.0
	 */
	public physicsObject: PhysicsBody<Duck.Types.Texture.Type>;

	/**
	 * @memberof Hitbox
	 * @description The debug color of the Hitbox, determines if the visibility of the hitbox
	 * @type Color | undefined
	 * @since
	 */
	public debugColor: Color | undefined;

	/**
	 * @memberof Hitbox
	 * @description Determines if the Hitbox will be drawn on the screen as a debug aid
	 * @type boolean
	 * @since 2.0.0
	 */
	public visible: boolean;

	/**
	 * @memberof Hitbox
	 * @description The zIndex of the Hitbox, effects how the Hitbox is layered if it is drawn on the screen as a debug aid
	 * @type number
	 * @since 2.0.0
	 */
	public zIndex: number;

	/**
	 * @memberof Hitbox
	 * @description Determines if the Hitbox should be visible by the current scene's current camera
	 * @type boolean
	 * @since 2.1.0
	 */
	public culled: boolean;

	/**
	 * @memberof Hitbox
	 * @description A string determining the state of the current collision
	 * @type Duck.Types.Collider.CollisionResponseType
	 * @since 2.0.0
	 */
	public collisionState: Duck.Types.Collider.CollisionResponseType;

	/**
	 * @constructor Hitbox
	 * @param {number} id The PhysicsBody ID
	 * @param {Vector2} position The position of the Hitbox
	 * @param {number} w The width of the Hitbox
	 * @param {number} h The height of the Hitbox
	 * @param {Vector2} offset The offset position of the Hitbox
	 * @param {PhysicsBody<Duck.Types.Texture.Type>} physicsObject The PhysicsBody that the Hitbox is attached to
	 * @param {Game} game Game instance
	 * @param {Scene} scene Scene instance
	 * @param {Color|undefined} [debugColor=undefined] The debugColor of the Hitbox
	 */
	constructor(
		position: Vector2,
		w: number,
		h: number,
		offset: Vector2,
		physicsObject: PhysicsBody<Duck.Types.Texture.Type>,
		game: Game,
		scene: Scene,
		debugColor?: Color
	) {
		this.id = uniqueID();
		this.position = position;
		this.offset = offset;
		this.w = w;
		this.h = h;
		this.game = game;
		this.scene = scene;
		this.physicsObject = physicsObject;

		this.debugColor = debugColor;
		this.visible = debugColor ? true : false;
		this.zIndex = Duck.Layers.Rendering.zIndex.graphicDebug;
		this.culled = debugColor ? true : false;

		this.collisionState = 'none';
	}

	/**
	 * @memberof Hitbox
	 * @description Draws the hitbox if a debugColor is passed in the constructor.
	 *
	 * DO NOT CALL MANUALLY, CALLED IN GAME LOOP USING SCENE.displayList
	 *
	 * @since 2.0.0
	 */
	public _draw() {
		if (this.game.renderer.ctx) {
			if (this.debugColor) {
				this.game.renderer.drawRect(
					this.position.x,
					this.position.y,
					this.w,
					this.h,
					this.debugColor
				);
			}
		} else {
			new Debug.Error(
				'CanvasRenderingContext2D is undefined. HTMLCanvasElement is undefined.'
			);
		}
	}

	/**
	 * @memberof Hitbox
	 * @description Sets the Hitboxes position to the PhysicsBodies position plus the passed offset if one was set
	 *
	 * DO NOT CALL MANUALLY, CALLED IN SCENE.__tick
	 *
	 * @since 2.0.0
	 */
	public _update(physicsObject: PhysicsBody<Duck.Types.Texture.Type>) {
		this.physicsObject = physicsObject;

		// resolve
		this.position = this.physicsObject.position.add(this.offset);
	}

	/**
	 * @memberof Hitbox
	 * @description Sets the debugColor and visibility of the Hitbox as a debug aid
	 * @param {string} debugColor Color
	 * @param {boolean} [visible=true] What to set the visible property as, optional -> defaults: true
	 * @since 2.0.0
	 */
	public setDebugColor(debugColor: string, visible = true) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		this.debugColor!.value = debugColor;
		this.visible = visible;
	}

	/**
	 * @memberof Hitbox
	 * @description Sets the width and height of the Hitbox
	 * @param {Vector2} scale The new scale of the Hitbox
	 * @since 2.0.0
	 */
	public scale(scale: Vector2) {
		this.w = scale.x;
		this.h = scale.y;
	}

	/**
	 * @memberof Hitbox
	 * @description Sets position of the Hitbox
	 * @param {Vector2} newPosition The new position of the Hitbox
	 * @param {Vector2} [offset] The new offset position of the Hitbox, optional -> defaults: Hitbox.offset
	 * @since 2.0.0
	 */
	public setPosition(newPosition: Vector2, offset = this.offset) {
		this.offset = offset;
		this.position = newPosition.add(this.offset);
	}

	/**
	 * @memberof Hitbox
	 * @description Auto scales, positions, and offsets the Hitbox based on the shape of the PhysicsBody
	 * @param {Vector2} [offset] The new offset position of the Hitbox, optional
	 * @since 2.0.0
	 */
	public auto(offset?: Vector2) {
		if (this.physicsObject.shape === 'circle') {
			// top left corner
			const topLeft = new Vector2(
				this.physicsObject.position.x - this.physicsObject.r,
				this.physicsObject.position.y - this.physicsObject.r
			);

			if (offset) {
				topLeft.add(offset);
			}

			this.position = topLeft;

			this.scale(
				new Vector2(this.physicsObject.r * 2, this.physicsObject.r * 2)
			);
		} else {
			this.position = this.physicsObject.position;

			if (offset) {
				this.position.add(offset);
			}

			this.scale(new Vector2(this.physicsObject.w, this.physicsObject.h));
		}
	}

	/**
	 * @memberof Hitbox
	 * @description Checks if the Hitbox is intersecting with another Hitbox
	 * @param {Hitbox} Hitbox Hitbox to use to test the intersection
	 * @returns {boolean}
	 * @since 2.0.0
	 */
	public intersectsWith(hitbox: Hitbox) {
		return rectToRectIntersect(
			{
				position: {
					x: this.position.x,
					y: this.position.y,
				},
				w: this.w,
				h: this.h,
			},
			{
				position: {
					x: hitbox.position.x,
					y: hitbox.position.y,
				},
				w: hitbox.w,
				h: hitbox.h,
			}
		);
	}

	/**
	 * @memberof Hitbox
	 * @description Checks if the Hitbox is intersecting with another Hitbox and returns the face that is colliding
	 * @param {Hitbox} hitbox Hitbox to use to test the intersection
	 * @returns {Duck.Types.Collider.CollisionResponseType}
	 * @since 2.0.0
	 */
	public intersectsFaceWith(hitbox: Hitbox) {
		this.collisionState = hitboxFaceIntersect(this, hitbox);

		return this.collisionState;
	}

	/**
	 * @memberof Hitbox
	 * @description Checks if the Hitbox is intersecting with other Hitboxes and returns the face that is colliding
	 * @param {Group<Hitbox> | Hitbox[]} hitboxes Hitboxes to use to test the intersection
	 * @returns {Duck.Types.Collider.CollisionResponseType[]}
	 * @since 2.0.0
	 */
	public groupIntersectsFaceWith(hitboxes: Group<Hitbox> | Hitbox[]) {
		const collisionStates: Duck.Types.Collider.CollisionResponseType[] = [];

		if (Array.isArray(hitboxes)) {
			for (let i = 0; i < hitboxes.length; i++) {
				const hitbox = hitboxes[i];

				collisionStates.push(hitboxFaceIntersect(this, hitbox));
			}
		} else {
			for (let i = 0; i < hitboxes.group.length; i++) {
				const hitbox = hitboxes.group[i];

				collisionStates.push(hitboxFaceIntersect(this, hitbox));
			}
		}

		return collisionStates;
	}

	/**
	 * @memberof Hitbox
	 * @description Gets the top most coordinate of the Hitbox
	 * @returns {number}
	 * @since 2.0.0
	 */
	public getTop() {
		return this.position.y;
	}

	/**
	 * @memberof Hitbox
	 * @description Gets the bottom most coordinate of the Hitbox
	 * @returns {number}
	 * @since 2.0.0
	 */
	public getBottom() {
		return this.position.y + this.h;
	}

	/**
	 * @memberof Hitbox
	 * @description Gets the left most coordinate of the Hitbox
	 * @returns {number}
	 * @since 2.0.0
	 */
	public getLeft() {
		return this.position.x;
	}

	/**
	 * @memberof Hitbox
	 * @description Gets the right most coordinate of the Hitbox
	 * @returns {number}
	 * @since 2.0.0
	 */
	public getRight() {
		return this.position.x + this.w;
	}

	/**
	 * @memberof Hitbox
	 * @description Gets the center coordinates of the Hitbox
	 * @returns {Vector2}
	 * @since 2.0.0
	 */
	public getCenter() {
		return new Vector2(
			this.position.x + this.w / 2,
			this.position.y + this.h / 2
		);
	}

	/**
	 * @memberof Hitbox
	 * @description Gets the centerY coordinate of the Hitbox
	 * @returns {number}
	 * @since 2.0.0
	 */
	public getCenterY() {
		return this.position.y + this.h / 2;
	}

	/**
	 * @memberof Hitbox
	 * @description Gets the centerX coordinate of the Hitbox
	 * @returns {number}
	 * @since 2.0.0
	 */
	public getCenterX() {
		return this.position.x + this.w / 2;
	}
}
