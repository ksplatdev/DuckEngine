import { Duck } from '../..';
import Debug from '../debug/debug';
import Game from '../game';
import Group from '../group/group';
import clamp from '../math/clamp';
import Vector2 from '../math/vector2';
import Color from '../renderer/models/color';
import Scene from '../scene';
import Collider from './models/collider';
import Hitbox from './models/hitbox';

/**
 * @class PhysicsBody
 * @classdesc Creates a DuckEngine PhysicsBody
 * @description The PhysicsBody Class. The GameObject class extends this class
 * @since 2.0.0
 */
export default class PhysicsBody<textureType extends Duck.Types.Texture.Type> {
	/**
	 * @memberof PhysicsBody
	 * @description The unique identifier for a GameObject
	 * @type string
	 * @since 2.0.0
	 */
	public readonly id: string;

	/**
	 * @memberof PhysicsBody
	 * @description The shape of the GameObject, 'rect', 'circle', 'roundrect', or 'sprite'
	 * @type Duck.Types.Collider.ShapeString
	 * @since 2.0.0
	 */
	public readonly shape: Duck.Types.Collider.ShapeString;

	/**
	 * @memberof PhysicsBody
	 * @description The current global position of the GameObject
	 * @type Vector2
	 * @since 2.0.0
	 */
	public position: Vector2;

	/**
	 * @memberof PhysicsBody
	 * @description The width of the GameObject
	 * @type number
	 * @since 2.0.0
	 */
	public w: number;

	/**
	 * @memberof PhysicsBody
	 * @description The height of the GameObject
	 * @type number
	 * @since 2.0.0
	 */
	public h: number;

	/**
	 * @memberof PhysicsBody
	 * @description The radius of the GameObject
	 * @type number
	 * @since 2.0.0
	 */
	public r: number;

	/**
	 * @memberof PhysicsBody
	 * @description PhysicsBody config, includes: type - KinematicBody | RigidBody | StaticBody
	 *
	 * defaults: { type: 'KinematicBody'}
	 *
	 * @type Duck.Types.PhysicsBody.Config
	 * @since 2.0.0
	 */
	public options: Duck.Types.PhysicsBody.Config;

	/**
	 * @memberof PhysicsBody
	 * @description The Game instance
	 * @type Game
	 * @since 2.0.0
	 */
	public game: Game;

	/**
	 * @memberof PhysicsBody
	 * @description The Scene instance
	 * @type Game
	 * @since 2.0.0
	 */
	public scene: Scene;

	/**
	 * @memberof PhysicsBody
	 * @description The Collider instance of the PhysicsBody
	 * @type Collider | undefined
	 * @since 2.0.0
	 */
	public collider: Collider | undefined;

	/**
	 * @memberof PhysicsBody
	 * @description An array or group of GameObjects that can collide with the PhysicsBody
	 * @type Duck.TypeClasses.GameObjects.GameObject<textureType>[] | Group<Duck.TypeClasses.GameObjects.GameObject<textureType>>
	 * @since 2.0.0
	 */
	public collidesWith:
		| Duck.TypeClasses.GameObjects.GameObject<textureType>[]
		| Group<Duck.TypeClasses.GameObjects.GameObject<textureType>>;

	/**
	 * @memberof PhysicsBody
	 * @description The Collider Hitbox of the PhysicsBody
	 * @type Hitbox | undefined
	 * @since 2.0.0
	 */
	public hitbox: Hitbox | undefined;

	/**
	 * @memberof PhysicsBody
	 * @description The velocity of the PhysicsBody
	 * @type Vector2
	 * @since 2.0.0
	 */
	public velocity: Vector2;

	/**
	 * @memberof PhysicsBody
	 * @description The bounds of the PhysicsBody
	 * @type Duck.Types.Math.BoundsLike
	 * @since 2.0.0
	 */
	public bounds: Duck.Types.Math.BoundsLike;

	/**
	 * @memberof PhysicsBody
	 * @description Determines if the PhysicsBody._update is called by the Scene.physicsServer used by Scene.physicsList
	 * , changing this value does nothing, must use PhysicsBody.setEnabled
	 * @type boolean
	 * @since 2.0.0
	 */
	public enabled: boolean;

	/**
	 * @memberof PhysicsBody
	 * @description Determines if the PhysicsBody is attached to another PhysicsBody
	 * @type boolean
	 * @since 2.0.0
	 */
	public isAttached: boolean;

	/**
	 * @memberof PhysicsBody
	 * @description PhysicsBodies that are attached
	 * @type PhysicsBody<Duck.Types.Texture.Type>[]
	 * @since 2.0.0
	 */
	public attachedChildren: PhysicsBody<Duck.Types.Texture.Type>[];

	/**
	 * @memberof PhysicsBody
	 * @description The offset between the PhysicsBody that self is attached to
	 * @type Vector2
	 * @since 2.0.0
	 */
	public attachOffset: Vector2;

	/**
	 * @memberof PhysicsBody
	 * @description Object that has all the physics method
	 * @type { addCollider: (collidesWith: Duck.TypeClasses.GameObjects.GameObject[]) => Collider;
	 *	setBounds: (x: number, y: number, w: number, h: number) => void
	 * }
	 * @since 2.0.0
	 */
	public physics: {
		/**
		 * @memberof PhysicsBody#physics
		 * @description Adds a collider to the PhysicsBody
		 * @param {Duck.TypeClasses.GameObjects.GameObject<textureType>[]} collidesWith What the GameObject collides with
		 * @since 2.0.0
		 */
		addCollider: (
			collidesWith: Duck.TypeClasses.GameObjects.GameObject<textureType>[]
		) => Collider | undefined;

		/**
		 * @memberof PhysicsBody#physics
		 * @description Adds a hitbox to the PhysicsBody
		 * @param {number} [w] Width of hitbox, optional -> defaults: PhysicsBody.w or PhysicsBody.r * 2
		 * @param {number} [h] Height of hitbox, optional -> defaults: PhysicsBody.h or PhysicsBody.r * 2
		 * @param {Vector2} [offset=Vector2.ZERO] Offset of hitbox, optional -> defaults: Vector2.ZERO
		 * @since 2.0.0
		 */
		addHitbox: (w?: number, h?: number, offset?: Vector2) => Hitbox;

		/**
		 * @memberof GameObject#physics
		 * @description Adds bounds to the GameObject
		 * @param {number} x X position
		 * @param {number} y Y position
		 * @param {number} w Width of the bounds
		 * @param {number} h Height of the bounds
		 * @since 2.0.0
		 */
		setBounds: (x: number, y: number, w: number, h: number) => void;
	};

	/**
	 * @constructor PhysicsBody
	 * @description Creates a PhysicsBody instance. Extended by GameObject
	 * @param {Duck.Types.Collider.ShapeString} shape Shape of PhysicsBody
	 * @param {number} id ID from GameObject ID
	 * @param {number} x X position
	 * @param {number} y Y position
	 * @param {number} w Width
	 * @param {number} h Height
	 * @param {number} r Radius
	 * @param {Game} game Game instance
	 * @param {Scene} scene Scene instance
	 * @since 2.0.0
	 */
	constructor(
		shape: Duck.Types.Collider.ShapeString,
		id: string,
		x: number,
		y: number,
		w: number,
		h: number,
		r: number,
		game: Game,
		scene: Scene
	) {
		this.shape = shape;
		this.id = id;

		this.position = new Vector2(x, y);
		this.w = w;
		this.h = h;
		this.r = r;

		this.options = {
			type: 'KinematicBody',
		};

		this.game = game;
		this.scene = scene;

		this.velocity = Vector2.ZERO;

		this.collider = undefined;
		this.collidesWith = [];

		this.enabled = true;

		this.isAttached = false;
		this.attachedChildren = [];
		this.attachOffset = Vector2.ZERO;

		this.bounds = {
			x: -Infinity,
			y: -Infinity,
			w: Infinity,
			h: Infinity,
		};

		// methods
		this.physics = {
			addCollider: (
				collidesWith:
					| Duck.Types.GameObject<textureType>[]
					| Group<Duck.Types.GameObject<textureType>>
			) => {
				if (!this.hitbox) {
					new Debug.Error(
						'Cannot add collider to PhysicsObject. No hitbox exists. Create a hitbox first using PhysicsObject.physics.addHitbox'
					);
					return undefined;
				}

				if (!this.game.config.physics?.enabled) {
					new Debug.Error(
						'Cannot add collider to PhysicsObject. Game Config.physics.enabled must be truthy!'
					);
				}

				this.collidesWith = collidesWith;

				this.collider = new Collider(
					this.hitbox,
					collidesWith,
					this.game
				);

				return this.collider;
			},
			addHitbox: (
				w?: number,
				h?: number,
				offset = Vector2.ZERO,
				debugColor?: Color
			) => {
				if (!this.game.config.physics?.enabled) {
					new Debug.Error(
						'Cannot add hitbox to PhysicsObject. Game Config.physics.enabled must be truthy!'
					);
				}

				this.hitbox = new Hitbox(
					this.position,
					w || 0,
					h || 0,
					offset,
					this,
					this.game,
					this.scene,
					debugColor
				);

				if (!w && !h) {
					this.hitbox.auto(offset);
				}

				this.scene.displayList.add(this.hitbox);

				return this.hitbox;
			},
			setBounds: (x: number, y: number, w: number, h: number) => {
				this.bounds.x = x;
				this.bounds.y = y;
				this.bounds.w = w;
				this.bounds.h = h;
			},
		};
	}

	public setEnabled(enabled: boolean) {
		this.enabled = enabled;
		return this.enabled;
	}

	/**
	 * @memberof PhysicsBody
	 * @description Updates the PhysicsBody's position by the velocity. Sets velocity to 0 on every tick.
	 * Clamps position to bounds if exists. Rounds pixels if roundPixels game config is set to true.
	 * Updates hitbox.collisionState if hitbox exists.
	 *
	 * DO NOT CALL MANUALLY, CALLED IN SCENE.__tick
	 *
	 * @since 2.0.0
	 */
	public _update() {
		this.position.x += this.velocity.x * this.game.smoothDeltaTime;
		this.position.y += this.velocity.y * this.game.smoothDeltaTime;

		// clamp to bounds
		this.position.x = clamp(this.position.x, this.bounds.x, this.bounds.w);
		this.position.y = clamp(this.position.y, this.bounds.y, this.bounds.h);

		// set to none
		this.velocity.x = 0;
		this.velocity.y = 0;

		// roundPixels
		if (this.game.config.roundPixels) {
			this.position.round();
		}

		// apply gravity
		if (this.game.config.physics?.gravity) {
			if (
				this.options.type === 'KinematicBody' ||
				this.options.type === 'RigidBody'
			) {
				this.applyGravity(
					Vector2.fromVector2Like(this.game.config.physics.gravity)
				);
			}
		}

		// update attached children position
		this.attachedChildren.forEach((object) => {
			const pos = this.position.clone();
			pos.subtract(object.attachOffset);

			object.position = pos;
			if (object.hitbox) {
				object.hitbox.position = object.position
					.clone()
					.add(object.hitbox.offset);
			}
		});
	}

	/**
	 * @memberof PhysicsBody
	 * @description Sets the PhysicsBody type, PhysicsBody type determines what can be applied and what effects the body
	 * @param {Duck.Types.PhysicsBody.Type} type The type of the PhysicsBody, 'KinematicBody' | 'RigidBody' | 'StaticBody'
	 * @since 2.0.0
	 */
	public setType(type: Duck.Types.PhysicsBody.Type) {
		this.options.type = type;
		return this.options;
	}

	/**
	 * @memberof PhysicsBody
	 * @description Attaches self to another PhysicsBody, makes self unmovable and follows the PhysicsBody accordingly
	 * @param {PhysicsBody<Duck.Types.Texture.Type>} object PhysicsBody to attach to
	 * @param {Vector2} [diffOffset=Vector2] A different offset, optional -> defaults: Difference in positions from PhysicsBody to self
	 * @since 2.0.0
	 */
	public attachTo(
		object: PhysicsBody<Duck.Types.Texture.Type>,
		diffOffset?: Vector2
	) {
		const offset =
			diffOffset ||
			Vector2.fromVec(object.position).subtract(this.position);

		this.isAttached = true;
		this.attachOffset = offset;

		object.attachedChildren.push(this);
	}

	/**
	 * @memberof PhysicsBody
	 * @description Attaches a child PhysicsBody to self, makes child unmovable and follows the self accordingly
	 * @param {PhysicsBody<Duck.Types.Texture.Type>} object PhysicsBody to attach
	 * @param {Vector2} [diffOffset=Vector2] A different offset, optional -> defaults: Difference in positions from self to PhysicsBody
	 * @since 2.0.0
	 */
	public attachChild(
		object: PhysicsBody<Duck.Types.Texture.Type>,
		diffOffset?: Vector2
	) {
		const offset =
			diffOffset ||
			Vector2.fromVec(this.position).subtract(object.position);

		object.isAttached = true;
		object.attachOffset = offset;

		this.attachedChildren.push(object);
	}

	/**
	 * @memberof PhysicsBody
	 * @description Detaches self from another PhysicsBody
	 * @param {PhysicsBody<Duck.Types.Texture.Type>} object PhysicsBody to detach from
	 * @since 2.0.0
	 */
	public detachFrom(object: PhysicsBody<Duck.Types.Texture.Type>) {
		const f = object.attachedChildren.find((o) => o.id === this.id);

		if (f) {
			this.isAttached = false;
			this.attachOffset = Vector2.ZERO;
			object.attachedChildren.splice(
				object.attachedChildren.findIndex((o) => o.id === this.id),
				1
			);
		} else {
			new Debug.Error(
				'Cannot detachFrom from object, PhysicsBody is not attached to anything.'
			);
		}
	}

	/**
	 * @memberof PhysicsBody
	 * @description Detaches PhysicsBody from self
	 * @param {PhysicsBody<Duck.Types.Texture.Type>} object PhysicsBody to detach
	 * @since 2.0.0
	 */
	public detachChild(object: PhysicsBody<Duck.Types.Texture.Type>) {
		const f = this.attachedChildren.find((o) => o.id === object.id);

		if (f) {
			object.isAttached = false;
			object.attachOffset = Vector2.ZERO;
			this.attachedChildren.splice(
				this.attachedChildren.findIndex((o) => o.id === object.id),
				1
			);
		} else {
			new Debug.Error(
				'Cannot detachChild from PhysicsBody, object is not attached to anything.'
			);
		}
	}

	/**
	 * @memberof PhysicsBody
	 * @description Sets the velocity based on an axis, PhysicsBody.options.type must be KinematicBody
	 * @param {'x'|'y'} axis The axis to set the velocity of
	 * @param {number} pxPerSecond The value to set the velocity axis as, in pixels per second
	 * @since 2.0.0
	 */
	public setVelocity(axis: 'x' | 'y', pxPerSecond: number) {
		if (this.options.type !== 'KinematicBody') {
			new Debug.Error(
				`Cannot set velocity as PhysicsBody.options.type is ${this.options.type} instead of KinematicBody.`
			);
			return;
		}

		if (this.isAttached) {
			new Debug.Error(
				'Cannot set velocity as PhysicsBody is attached to another PhysicsBody.'
			);
			return;
		}

		if (axis === 'x') {
			this.velocity.x = pxPerSecond;
		}

		if (axis === 'y') {
			this.velocity.y = pxPerSecond;
		}
	}

	/**
	 * @memberof PhysicsBody
	 * @description Sets the velocity.x, PhysicsBody.options.type must be KinematicBody
	 * @param {number} pxPerSecond The value to set the velocity axis as, in pixels per second
	 * @since 2.0.0
	 */
	public setVelocityX(pxPerSecond: number) {
		if (this.options.type !== 'KinematicBody') {
			new Debug.Error(
				`Cannot set velocity X as PhysicsBody.options.type is ${this.options.type} instead of KinematicBody.`
			);
			return;
		}

		if (this.isAttached) {
			new Debug.Error(
				'Cannot set velocity X as PhysicsBody is attached to another PhysicsBody.'
			);
			return;
		}

		this.velocity.x = pxPerSecond;
	}

	/**
	 * @memberof PhysicsBody
	 * @description Sets the velocity.y, PhysicsBody.options.type must be KinematicBody
	 * @param {number} pxPerSecond The value to set the velocity.y as, in pixels per second
	 * @since 2.0.0
	 */
	public setVelocityY(pxPerSecond: number) {
		if (this.options.type !== 'KinematicBody') {
			new Debug.Error(
				`Cannot set velocity Y as PhysicsBody.options.type is ${this.options.type} instead of KinematicBody.`
			);
			return;
		}

		if (this.isAttached) {
			new Debug.Error(
				'Cannot set velocity Y as PhysicsBody is attached to another PhysicsBody.'
			);
			return;
		}

		this.velocity.y = pxPerSecond;
	}

	/**
	 * @memberof PhysicsBody
	 * @description Accelerates the velocity by an amount, PhysicsBody.options.type must be KinematicBody
	 * @param {Vector2} target The target velocity
	 * @param {number} amount The value to increase the velocity by
	 * @since 2.0.0
	 */
	public accelerateVelocity(target: Vector2, amount: number) {
		if (this.options.type !== 'KinematicBody') {
			new Debug.Error(
				`Cannot accelerate velocity as PhysicsBody.options.type is ${this.options.type} instead of KinematicBody.`
			);
			return;
		}

		if (this.isAttached) {
			new Debug.Error(
				'Cannot accelerate velocity as PhysicsBody is attached to another PhysicsBody.'
			);
			return;
		}

		this.velocity.moveTowards(this.velocity, target, amount);
	}

	/**
	 * @memberof PhysicsBody
	 * @description Applies friction to the velocity by an amount, PhysicsBody.options.type must be KinematicBody or RigidBody
	 * @param {number} frictionAmount The value to decrease the velocity by
	 * @since 2.0.0
	 */
	public applyFriction(frictionAmount: Vector2) {
		if (
			this.options.type !== 'KinematicBody' &&
			this.options.type !== 'RigidBody'
		) {
			new Debug.Error(
				`Cannot apply friction as PhysicsBody.options.type is ${this.options.type} instead of KinematicBody or RigidBody.`
			);
			return;
		}

		if (this.isAttached) {
			new Debug.Error(
				'Cannot apply friction as PhysicsBody is attached to another PhysicsBody.'
			);
			return;
		}

		this.velocity.subtract(frictionAmount).clampMin(0);
	}

	/**
	 * @memberof PhysicsBody
	 * @description Applies gravity to the velocity by a Vector2, PhysicsBody.options.type must be KinematicBody or RigidBody
	 * @param {Vector2} gravity The Vector2 to add to the velocity by
	 * @since 2.0.0
	 */
	public applyGravity(gravity: Vector2) {
		if (
			this.options.type !== 'KinematicBody' &&
			this.options.type !== 'RigidBody'
		) {
			new Debug.Error(
				`Cannot apply gravity as PhysicsBody.options.type is ${this.options.type} instead of KinematicBody or RigidBody.`
			);
			return;
		}

		if (this.isAttached) {
			new Debug.Error(
				'Cannot apply gravity as PhysicsBody is attached to another PhysicsBody.'
			);
			return;
		}

		if (gravity.x !== 0) {
			this.velocity.x += gravity.x;
		}
		if (gravity.y !== 0) {
			this.velocity.y += gravity.y;
		}
	}

	/**
	 * @memberof PhysicsBody
	 * @description Applies gravity to the velocity by a Vector2, PhysicsBody.options.type must be KinematicBody or RigidBody
	 * @param {Duck.Types.Math.BoundsLike} [bounds=PhysicsBody.bounds] The bounds of the PhysicsBody, optional -> defaults: PhysicsBody.bounds, if none
	 * are set, it is infinite
	 * @param {number} [restitution=1] How much energy is lost when bouncing, a number between 0-1 to loose energy,
	 * 1-any to increase energy, 1 = none, must be a positive number
	 * @since 2.0.0
	 */
	public bounceVelocityBounds(bounds = this.bounds, restitution = 1) {
		if (
			this.options.type !== 'KinematicBody' &&
			this.options.type !== 'RigidBody'
		) {
			new Debug.Error(
				`Cannot bounce velocity as PhysicsBody.options.type is ${this.options.type} instead of KinematicBody or RigidBody.`
			);
			return;
		}

		if (this.isAttached) {
			new Debug.Error(
				'Cannot bounce velocity as PhysicsBody is attached to another PhysicsBody.'
			);
			return;
		}

		if (this.position.x > bounds.w || this.position.x < bounds.x) {
			this.velocity.x = this.velocity.x * -restitution;
		}
		if (this.position.y > bounds.h || this.position.y < bounds.y) {
			this.velocity.y = this.velocity.y * -restitution;
		}
	}

	/**
	 * @memberof PhysicsBody
	 * @description Reflects the velocity, sets the velocity as the opposite value of the velocity, PhysicsBody.options.type must be KinematicBody or RigidBody
	 *
	 * @example myPhysicsBody.setVelocity('x', 3);
	 * myPhysicsBody.reflect(); // velocity: 0, -3
	 *
	 * @since 2.0.0
	 */
	public reflectVelocity() {
		if (
			this.options.type !== 'KinematicBody' &&
			this.options.type !== 'RigidBody'
		) {
			new Debug.Error(
				`Cannot reflect velocity as PhysicsBody.options.type is ${this.options.type} instead of KinematicBody or RigidBody.`
			);
			return;
		}

		if (this.isAttached) {
			new Debug.Error(
				'Cannot reflect velocity as PhysicsBody is attached to another PhysicsBody.'
			);
			return;
		}

		this.velocity.reflect();
	}

	/**
	 * @memberof PhysicsBody
	 * @description Auto scales the PhysicsBody.hitbox to fit the shape
	 * @param {Vector2} [offset] Position offset, optional -> defaults: undefined
	 * @since 2.0.0
	 */
	public autoFitHitbox(offset?: Vector2) {
		this.hitbox?.auto(offset);
	}

	/**
	 * @memberof PhysicsBody
	 * @description Scales the PhysicsBody.hitbox
	 * @param {Vector2} scale Scale Vector2, x is width, y is height
	 * @since 2.0.0
	 */
	public scaleHitbox(scale: Vector2) {
		this.hitbox?.scale(scale);
	}

	/**
	 * @memberof PhysicsBody
	 * @description Gets the top most coordinate of the PhysicsBody
	 * @returns {number}
	 * @since 2.0.0
	 */
	public getTop() {
		return this.position.y;
	}

	/**
	 * @memberof PhysicsBody
	 * @description Gets the bottom most coordinate of the PhysicsBody
	 * @returns {number}
	 * @since 2.0.0
	 */
	public getBottom() {
		return this.position.y + this.h;
	}

	/**
	 * @memberof PhysicsBody
	 * @description Gets the left most coordinate of the PhysicsBody
	 * @returns {number}
	 * @since 2.0.0
	 */
	public getLeft() {
		return this.position.x;
	}

	/**
	 * @memberof PhysicsBody
	 * @description Gets the right most coordinate of the PhysicsBody
	 * @returns {number}
	 * @since 2.0.0
	 */
	public getRight() {
		return this.position.x + this.w;
	}

	/**
	 * @memberof PhysicsBody
	 * @description Gets the center coordinates of the PhysicsBody
	 * @returns {Vector2}
	 * @since 2.0.0
	 */
	public getCenter() {
		if (this.shape === 'circle') {
			return new Vector2(this.position.x, this.position.y);
		} else {
			return new Vector2(
				this.position.x + this.w / 2,
				this.position.y + this.h / 2
			);
		}
	}

	/**
	 * @memberof PhysicsBody
	 * @description Gets the centerY coordinate of the PhysicsBody
	 * @returns {number}
	 * @since 2.0.0
	 */
	public getCenterY() {
		if (this.shape === 'circle') {
			return this.position.y + this.r;
		} else {
			return this.position.y + this.h / 2;
		}
	}

	/**
	 * @memberof PhysicsBody
	 * @description Gets the centerX coordinate of the PhysicsBody
	 * @returns {number}
	 * @since 2.0.0
	 */
	public getCenterX() {
		if (this.shape === 'circle') {
			return this.position.x + this.r;
		} else {
			return this.position.x + this.w / 2;
		}
	}

	/**
	 * @memberof PhysicsBody
	 * @description Checks and returns the Collision Type if two hitboxes are colliding
	 * @param {PhysicsBody<Duck.Types.Texture.Type>} obj PhysicsBody to check their hitbox with
	 * @returns {false | Duck.Types.Collider.CollisionResponseType | undefined}
	 * @since 2.0.0
	 */
	public isColliding(obj: PhysicsBody<Duck.Types.Texture.Type>) {
		if (obj.hitbox) {
			return this.hitbox?.intersectsFaceWith(obj.hitbox) !== 'none'
				? this.hitbox?.intersectsFaceWith(obj.hitbox)
				: false;
		} else {
			return false;
		}
	}

	/**
	 * @memberof PhysicsBody
	 * @description Checks and returns the Collision Type if multiple hitboxes are colliding
	 * @param {Group<PhysicsBody<Duck.Types.Texture.Type>> | PhysicsBody<Duck.Types.Texture.Type>[]} objects PhysicsBodies to check their hitbox with
	 * @returns {false | Duck.Types.Collider.CollisionResponseType}
	 * @since 2.0.0
	 */
	public isCollidingGroup(
		objects:
			| Group<PhysicsBody<Duck.Types.Texture.Type>>
			| PhysicsBody<Duck.Types.Texture.Type>[]
	) {
		const hitboxes: Hitbox[] = [];

		if (Array.isArray(objects)) {
			objects.forEach((obj) => {
				if (obj.hitbox) {
					hitboxes.push(obj.hitbox);
				}
			});
		} else {
			objects.each((obj) => {
				if (obj.hitbox) {
					hitboxes.push(obj.hitbox);
				}
			});
		}

		const states = this.hitbox?.groupIntersectsFaceWith(hitboxes);

		return states?.includes('top')
			? 'top'
			: false || states?.includes('bottom')
			? 'bottom'
			: false || states?.includes('left')
			? 'left'
			: false || states?.includes('right')
			? 'right'
			: false;
	}
}
