import { Duck } from '../../../index';
import Debug from '../../debug/debug';
import Game from '../../game';
import GameObject from '../gameObject';
import clamp from '../../math/clamp';
import Vector2 from '../../math/vector2';
import Texture from '../../texture/texture';
import Scene from '../../scene';
import Color from '../../renderer/models/color';

/**
 * @class Particle
 * @classdesc Creates a DuckEngine Particle
 * @description The Particle Class. A particle that can be emitted by a ParticleEmitter
 * @extends GameObject
 * @since 1.0.0
 */
export default class Particle extends GameObject<'either'> {
	/**
	 * @memberof Particle
	 * @description The float velocity of the Particle
	 * @type Vector2
	 * @since 2.0.0
	 */
	public floatVelocity: Vector2;

	/**
	 * @memberof Particle
	 * @description The original fill color or img path of the Particle
	 * @type string | Color
	 * @since 2.0.0
	 */
	public originalFillColorOrIMGPath: string | Color;

	/**
	 * @memberof Particle
	 * @description The age of the particle in seconds
	 * @type number
	 * @since 1.0.0
	 */
	public age: number;

	/**
	 * @constructor Particle
	 * @description Creates a Particle instance
	 * @param {Duck.Types.Collider.ShapeString} shape Shape of the particle
	 * @param {number} w Width of the particle
	 * @param {number} h Height of the particle
	 * @param {number} r Radius of the particle
	 * @param {string | Color} fillColorOrIMGPath String path or Color to fill the particle with, can be an image path
	 * @param {Game} game Game instance
	 * @param {Scene} scene Scene instance
	 * @since 1.0.0-beta
	 */
	constructor(
		shape: Duck.Types.Collider.ShapeString,
		w: number,
		h: number,
		r: number,
		fillColorOrIMGPath: string | Color,
		game: Game,
		scene: Scene
	) {
		super(
			shape,
			0,
			0,
			w,
			h,
			r,
			Texture.fromEither(fillColorOrIMGPath, w, h),
			game,
			scene
		);

		this.originalFillColorOrIMGPath = fillColorOrIMGPath;

		this.w = w;
		this.h = h;
		this.r = r;

		this.floatVelocity = Vector2.ZERO;

		this.zIndex = Duck.Layers.Rendering.zIndex.particle;
		this.visible = false;

		// age

		this.age = 0;

		setInterval(() => {
			this.age++;
		}, 1000);
	}

	/**
	 * @memberof Particle
	 * @description Draws the particle. Do not call manually, called automatically in scene loop
	 * @since 1.0.0-beta
	 */
	public _draw() {
		if (this.game.renderer.ctx) {
			switch (this.shape) {
				case 'circle':
					this.game.renderer.drawCircle(
						this.position.x,
						this.position.y,
						this.r,
						this.texture.texture as unknown as Color
					);
					break;

				case 'rect':
					this.game.renderer.drawRect(
						this.position.x,
						this.position.y,
						this.w,
						this.h,
						this.texture.texture as unknown as Color
					);
					break;

				case 'roundrect':
					this.game.renderer.drawRoundRect(
						this.position.x,
						this.position.y,
						this.w,
						this.h,
						this.r,
						this.texture.texture as unknown as Color
					);
					break;

				case 'sprite':
					this.game.renderer.drawSprite(
						this.position.x,
						this.position.y,
						this.w,
						this.h,
						this.texture.texture as unknown as Texture<'image'>
					);

					break;

				default:
					if (this.game.config.debug) {
						new Debug.Warn(
							'Cannot draw Particle. Particle Shape is not a "circle", "rect", "roundrect", or "sprite".'
						);
					}
					break;
			}
		} else {
			new Debug.Error(
				'Cannot draw particle. CanvasRenderingContext2D is undefined.'
			);
		}
	}

	/**
	 * @memberof Particle
	 *
	 * *Modified from gameobject*
	 *
	 * @description Updates the gameobject's position by the velocity. Sets velocity to 0 on every tick.
	 * DO NOT CALL MANUALLY, CALLED IN SCENE.__tick(deltaTime)
	 * @since 2.0.0
	 */
	public _update() {
		this.position.x += this.velocity.x * this.game.smoothDeltaTime;
		this.position.y += this.velocity.y * this.game.smoothDeltaTime;

		// float
		this.position.x += this.floatVelocity.x * this.game.smoothDeltaTime;
		this.position.y += this.floatVelocity.y * this.game.smoothDeltaTime;

		// clamp to bounds
		this.position.x = clamp(this.position.x, this.bounds.x, this.bounds.w);
		this.position.y = clamp(this.position.y, this.bounds.y, this.bounds.h);

		// set to none
		this.velocity.x = 0;
		this.velocity.y = 0;

		// don't round pixels for particles

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
	 * @memberof Particle
	 * @description Sets the particle's image src. Only works if particle's shape was initially 'sprite'
	 * @param {string} imagePath Image path
	 * @since 1.0.0-beta
	 */
	public setImagePath(imagePath: string) {
		this.texture.setImagePath(imagePath);
	}
}
