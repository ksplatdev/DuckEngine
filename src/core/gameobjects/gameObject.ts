/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Duck } from '../../index';
import randomInt from '../math/randomInt';
import Game from '../game';
import Texture from '../texture/texture';
import Scene from '../scene';
import PhysicsBody from '../physics/physicsBody';
import uniqueID from '../../utils/uniqueID';
import Color from '../renderer/models/color';

/**
 * @class GameObject
 * @classdesc Creates a DuckEngine GameObject
 * @description The GameObject Class. All GameObjects extend this class
 * @since 1.0.0-beta
 */
export default class GameObject<textureType extends Duck.Types.Texture.Type>
	extends PhysicsBody<textureType>
	implements Duck.Types.Renderable
{
	/**
	 * @memberof GameObject
	 * @description The texture of the GameObject
	 * @type Texture
	 * @since 1.0.0-beta
	 */
	public texture: Texture<textureType>;

	/**
	 * @memberof GameObject
	 * @description Determines if a GameObject should be rendered or not (note: Camera.cull and autoCull overwrite this property)
	 * @type boolean
	 * @since 2.0.0
	 */
	public visible: boolean;

	/**
	 * @memberof GameObject
	 * @description Determines the depth or zIndex of a GameObject
	 * @type number
	 * @since 2.0.0
	 */
	public zIndex: number;

	/**
	 * @memberof GameObject
	 * @description Determines if the GameObject should be visible by the current scene's current camera
	 * @type boolean
	 * @since 2.1.0
	 */
	public culled: boolean;

	// methods

	/**
	 * @constructor
	 * @description Creates a GameObject instance.
	 * @param {Duck.Types.Collider.ShapeString} shape Shape of the gameobject
	 * @param {number} x X position
	 * @param {number} y Y position
	 * @param {number} w Width
	 * @param {number} h Height
	 * @param {number} r Radius
	 * @param {Texture<textureType>} texture Texture instance
	 * @param {Game} game Game instance
	 * @param {Scene} scene Scene instance
	 * @since 1.0.0-beta
	 */
	constructor(
		shape: Duck.Types.Collider.ShapeString,
		x: number,
		y: number,
		w: number,
		h: number,
		r: number,
		texture: Texture<textureType>,
		game: Game,
		scene: Scene
	) {
		const id = uniqueID();

		super(shape, id, x, y, w, h, r, game, scene);

		this.texture = texture;

		this.visible = true;
		this.zIndex = Duck.Layers.Rendering.zIndex.gameobject;
		this.culled = true;

		// fix blend mode due to StaticLight setting blend mode to lighten
		if (this.game.renderer.ctx) {
			this.game.renderer.setBlendMode('source-over');
		}
	}

	/**
	 * @memberof GameObject
	 * @description Draws the gameobject.
	 *
	 * DO NOT CALL MANUALLY, CALLED IN GAME LOOP USING SCENE.displayList
	 *
	 * @since 1.0.0-beta
	 */
	public _draw() {}

	/**
	 * @memberof GameObject
	 * @description Sets the visible property and calls the game.renderer.pipeline.pool method to immediately update the visibility
	 *
	 * **Note: this calls Game.renderer.pipeline.pool to immediately update the visibility**
	 *
	 * @param {boolean} visible What to set the visible property to
	 * @since 2.1.0
	 */
	public setVisible(visible: boolean) {
		this.visible = visible;
		this.game.renderer.pipeline.pool();
	}

	/**
	 * @memberof GameObject
	 * @description Sets the scale of the GameObject
	 * @param {Duck.Types.Misc.Scale|number} scale Scale of the gameobject, can be a number to change the radius
	 * @since 1.0.0-beta
	 */
	public setScale(scale: Duck.Types.Misc.Scale | number) {
		if (typeof scale !== 'number') {
			if (scale.width) {
				this.w = scale.width;
			}

			if (scale.height) {
				this.h = scale.height;
			}
		} else {
			this.r = scale;
		}
	}

	/**
	 * @memberof GameObject
	 * @description Sets the fill color of the GameObject
	 * @param {string} fillColor Fill color
	 * @since 1.0.0-beta
	 */
	public setFillColor(fillColor: string) {
		(this.texture.texture as unknown as Color).value = fillColor;
	}
}
