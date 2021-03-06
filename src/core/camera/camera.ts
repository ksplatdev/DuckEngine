// core code from : https://github.com/robashton/camera
// mostly edited

import Game from '../game';
import Circle from '../gameobjects/circle';
import Rect from '../gameobjects/rect';
import Scene from '../scene';
import { Duck } from '../../index';
import rectToRectIntersect from '../physics/utils/rectToRectIntersect';
import circleToRectIntersect from '../physics/utils/circleToRectIntersect';
import Debug from '../debug/debug';
import randomInt from '../math/randomInt';
import lerp from '../math/lerp';
import circleRectCollision from '../physics/utils/circleToRectIntersect';
import RoundRect from '../gameobjects/roundrect';
import Sprite from '../gameobjects/sprite';
import StaticLight from '../lights/staticLight';
import Button from '../gameobjects/ui/button';
import Text from '../gameobjects/ui/text';
import Particle from '../gameobjects/particles/particle';
import PhysicsBody from '../physics/physicsBody';
import Map from '../map/map';

/**
 * @class Camera
 * @classdesc Creates a DuckEngine Camera
 * @description The Camera Class. Creates and uses a viewport that acts like a camera
 * @since 1.0.0-beta
 */
export default class Camera {
	/**
	 * @memberof Camera
	 * @description Game instance
	 * @type Game
	 * @since 1.0.0-beta
	 */
	public game: Game;

	/**
	 * @memberof Camera
	 * @description Scene instance
	 * @type Scene
	 * @since 2.0.0
	 */
	public scene: Scene;
	protected lookAt: number[];

	/**
	 * @memberof Camera
	 * @description The Camera's current FOV
	 * @type number
	 * @since 2.1.0
	 */
	public fieldOfView: number;

	/**
	 * @memberof Camera
	 * @description The Camera's current zoom
	 * @type number
	 * @since 2.1.0
	 */
	public distance: number;

	/**
	 * @memberof Camera
	 * @description Camera's viewport, has info about the viewport
	 * @since 1.0.0-beta
	 */
	public viewport: {
		left: number;
		right: number;
		top: number;
		bottom: number;
		w: number;
		h: number;
		scale: number[];
	};
	protected aspectRatio: number | undefined;

	/**
	 * @memberof Camera
	 * @description Determines if the camera is a main camera in the attached scene. Must be added by Scene.mainCamera
	 * @type boolean
	 * @since 1.0.0-beta
	 */
	public readonly isMain: boolean;

	protected bounds:
		| { position: { x: number; y: number }; w: number; h: number }
		| undefined;

	/**
	 * @memberof Camera
	 * @description A gameobject that the Camera is currently following
	 * @type Duck.TypeClasses.GameObjects.GameObject<Duck.Types.Texture.Type> | undefined
	 * @since
	 */
	public following:
		| Duck.TypeClasses.GameObjects.GameObject<Duck.Types.Texture.Type>
		| undefined;
	protected lerpX = 1;
	protected lerpY = 1;

	/**
	 * @constructor Camera
	 * @description Creates a Camera instance.
	 * @param {Game} game Game instance
	 * @param {Scene} scene Scene instance
	 * @since 1.0.0-beta
	 */
	constructor(game: Game, scene: Scene) {
		this.game = game;
		this.scene = scene;
		this.distance = 1000.0;
		this.isMain = false;
		if (scene.mainCamera === this) {
			this.isMain = true;
		}
		this.lookAt = [0, 0];
		this.fieldOfView = Math.PI / 4.0;
		this.viewport = {
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
			w: 0,
			h: 0,
			scale: [1.0, 1.0],
		};

		this.bounds;

		this.following;

		this.updateViewport();
	}

	/**
	 * @memberof Camera
	 * @description Begins camera path
	 *
	 * DO NOT CALL MANUALLY, CALLED IN GAME -> SCENE LOOP AUTOMATICALLY
	 *
	 * @since 1.0.0-beta
	 */
	public begin() {
		this.game.renderer.save();
		this.applyScale();
		this.applyTranslation();

		// follow
		if (this.following) {
			if (this.following.shape === 'rect') {
				if (this.bounds) {
					if (
						rectToRectIntersect(this.following as Rect, this.bounds)
					) {
						this.lookAt[0] = lerp(
							this.lookAt[0],
							this.following.getCenterX(),
							this.lerpX
						);
						this.lookAt[1] = lerp(
							this.lookAt[1],
							this.following.getCenterY(),
							this.lerpY
						);
					}
				} else {
					this.lookAt[0] = lerp(
						this.lookAt[0],
						this.following.getCenterX(),
						this.lerpX
					);
					this.lookAt[1] = lerp(
						this.lookAt[1],
						this.following.getCenterY(),
						this.lerpY
					);
				}
			}

			if (this.following.shape === 'circle') {
				if (this.bounds) {
					if (
						circleToRectIntersect(
							this.following as Circle,
							this.bounds
						)
					) {
						this.lookAt[0] = lerp(
							this.lookAt[0],
							this.following.getCenterX(),
							this.lerpX
						);
						this.lookAt[1] = lerp(
							this.lookAt[1],
							this.following.getCenterY(),
							this.lerpY
						);
					}
				} else {
					this.lookAt[0] = lerp(
						this.lookAt[0],
						this.following.getCenterX(),
						this.lerpX
					);
					this.lookAt[1] = lerp(
						this.lookAt[1],
						this.following.getCenterY(),
						this.lerpY
					);
				}
			}

			this.updateViewport();
		}
	}

	/**
	 * @memberof Camera
	 * @description Ends camera path
	 *
	 * DO NOT CALL MANUALLY, CALLED IN GAME -> SCENE LOOP AUTOMATICALLY
	 *
	 * @since 1.0.0-beta
	 */
	public end() {
		this.game.renderer.restore();
	}

	protected applyScale() {
		this.game.renderer.scale(
			this.viewport.scale[0],
			this.viewport.scale[1]
		);
	}

	protected applyTranslation() {
		this.game.renderer.translate(-this.viewport.left, -this.viewport.top);
	}

	protected updateViewport() {
		if (this.game.renderer.ctx) {
			// dpr scaling
			let cWidth = this.game.canvas.width;
			let cHeight = this.game.canvas.height;

			if (this.game.config.dprScale && window.devicePixelRatio !== 1) {
				cWidth = Number(this.game.canvas.style.width.replace('px', ''));

				cHeight = Number(
					this.game.canvas.style.height.replace('px', '')
				);

				// set zoom for dpr scaling
				this.distance = 1000 / window.devicePixelRatio;
			}

			this.aspectRatio = cWidth / cHeight;
			this.viewport.w = this.distance * Math.tan(this.fieldOfView);
			this.viewport.h = this.viewport.w / this.aspectRatio;
			this.viewport.left = this.lookAt[0] - this.viewport.w / 2.0;
			this.viewport.top = this.lookAt[1] - this.viewport.h / 2.0;
			this.viewport.right = this.viewport.left + this.viewport.w;
			this.viewport.bottom = this.viewport.top + this.viewport.h;
			this.viewport.scale[0] = cWidth / this.viewport.w;
			this.viewport.scale[1] = cHeight / this.viewport.h;
		} else {
			new Debug.Error(
				'Cannot update camera. CanvasRenderingContext2D is undefined.'
			);
		}
	}

	/**
	 * @memberof Camera
	 * @description Sets the zoom
	 * @param {number} z Zoom value
	 * @since 1.0.0-beta
	 */
	public setZoom(z: number) {
		this.distance = z;
		this.updateViewport();
	}

	/**
	 * @memberof Camera
	 * @description Sets the zoom smoothly
	 * @param {number} intervalMS How often zoom is modified by smoothValue
	 * @param {number} smoothValue The number that is added to zoom on an interval
	 * @param {number} z Target Zoom value
	 * @since 1.0.0-beta
	 */
	public setZoomSmooth(intervalMS: number, smoothValue: number, z: number) {
		let operation: 'add' | 'subtract' = 'add';

		if (this.distance < z) {
			operation = 'add';
		} else {
			operation = 'subtract';
		}

		const int = setInterval(() => {
			if (operation === 'add') {
				if (this.distance < z) {
					this.distance += smoothValue;
				} else {
					clearInterval(int);
					if (this.game.config.debug) {
						new Debug.Log(
							'Reached target camera Zoom with setZoomSmooth'
						);
					}
				}
			} else {
				if (this.distance > z) {
					this.distance -= smoothValue;
				} else {
					clearInterval(int);
					if (this.game.config.debug) {
						new Debug.Log(
							'Reached target camera Zoom with setZoomSmooth'
						);
					}
				}
			}
		}, intervalMS);
	}

	/**
	 * @memberof Camera
	 * @description Moves the camera to a position
	 * @param {number} x X position
	 * @param {number} y Y position
	 * @since 1.0.0-beta
	 */
	public moveTo(x: number, y: number) {
		this.lookAt[0] = x;
		this.lookAt[1] = y;
		this.updateViewport();
	}

	/**
	 * @memberof Camera
	 * @description Follows a GameObject
	 * @param {Duck.TypeClasses.GameObjects.GameObject<Duck.Types.Texture.Type>} gameObject Game object to follow
	 * @param {number} [lerpX=1] Lerp on the x axis, optional -> defaults: 1
	 * @param {number} [lerpY=1] Lerp on the y axis, optional -> defaults: 1
	 * @since 1.0.0-beta
	 */
	public startFollow(
		gameObject: Duck.TypeClasses.GameObjects.GameObject<Duck.Types.Texture.Type>,
		lerpX = 1,
		lerpY = 1
	) {
		this.following = gameObject;
		this.lerpX = lerpX;
		this.lerpY = lerpY;
	}

	/**
	 * @memberof Camera
	 * @description Stops following a gameobject
	 * @since 1.0.0-beta
	 */
	public stopFollow() {
		this.following = undefined;
	}

	/**
	 * @memberof Camera
	 * @description Transforms a coordinate pair from screen coordinates (relative to the canvas) into world coordinates
	 * @param {number} x X position
	 * @param {number} y Y position
	 * @param {Duck.TypeClasses.GameObjects.GameObject<Duck.Types.Texture.Type>} obj GameObject
	 * @since 1.0.0-beta
	 */
	public screenToWorld(
		x: number,
		y: number,
		obj: Duck.TypeClasses.GameObjects.GameObject<Duck.Types.Texture.Type>
	) {
		obj.position.x = x / this.viewport.scale[0] + this.viewport.left;
		obj.position.y = y / this.viewport.scale[1] + this.viewport.top;
		return obj;
	}

	/**
	 * @memberof Camera
	 * @description Transforms a coordinate pair from world coordinates into screen coordinates (relative to the canvas) -
	 * useful for interacting with a Button while having a camera
	 * @param {number} x X position
	 * @param {number} y Y position
	 * @param {Duck.TypeClasses.GameObjects.GameObject<Duck.Types.Texture.Type>} obj GameObject
	 * @since 1.0.0-beta
	 */
	public worldToScreen(
		x: number,
		y: number,
		obj: Duck.TypeClasses.GameObjects.GameObject<Duck.Types.Texture.Type>
	) {
		obj.position.x = (x - this.viewport.left) * this.viewport.scale[0];
		obj.position.y = (y - this.viewport.top) * this.viewport.scale[1];
		return obj;
	}

	/**
	 * @memberof Camera
	 * @description Sets the FOV
	 * @param {number} f FOV value
	 * @since 1.0.0-beta
	 */
	public setFOV(f: number) {
		this.fieldOfView = f;
	}

	/**
	 * @memberof Camera
	 * @description Sets the FOV smoothly
	 * @param {number} intervalMS How often FOV is modified by smoothValue
	 * @param {number} smoothValue The number that is added to FOV on an interval
	 * @param {number} f Target FOV value
	 * @since 1.0.0-beta
	 */
	public setFOVSmooth(intervalMS: number, smoothValue: number, f: number) {
		let operation: 'add' | 'subtract' = 'add';

		if (this.fieldOfView < f) {
			operation = 'add';
		} else {
			operation = 'subtract';
		}

		const int = setInterval(() => {
			if (operation === 'add') {
				if (this.fieldOfView < f) {
					this.fieldOfView += smoothValue;
				} else {
					clearInterval(int);
					if (this.game.config.debug) {
						new Debug.Log(
							'Reached target camera FOV with setFOVSmooth'
						);
					}
				}
			} else {
				if (this.fieldOfView > f) {
					this.fieldOfView -= smoothValue;
				} else {
					clearInterval(int);
					if (this.game.config.debug) {
						new Debug.Log(
							'Reached target camera FOV with setFOVSmooth'
						);
					}
				}
			}
		}, intervalMS);
	}

	/**
	 * @memberof Camera
	 * @description Resets the FOV to the default value
	 * @since 1.0.0-beta
	 */
	public resetFOV() {
		this.fieldOfView = Math.PI / 4.0;
	}

	/**
	 * @memberof Camera
	 * @description Resets the Zoom to the default value
	 * @since 1.0.0-beta
	 */
	public resetZoom() {
		this.distance = 1000.0;
	}

	/**
	 * @memberof Camera
	 * @description Bounds of the Camera, an area the camera can be in
	 * @param {{ position: { x:number; y:number }; w:number; h:number; }} bounds An object with the bounds
	 * @since 1.0.0-beta
	 */
	public setBounds(bounds: {
		position: { x: number; y: number };
		w: number;
		h: number;
	}) {
		this.bounds = bounds;
	}

	/**
	 * @memberof Camera
	 * @description Shakes the camera
	 * @param {number} intervalMS How often (in milliseconds) the passed value is added/subtracted from the Camera viewport position
	 * @param {number} timeMS For how long in milliseconds the shake lasts
	 * @param {number} v Value to be added/subtracted from the Camera viewport position
	 * @since 1.0.0
	 */
	public shake(intervalMS: number, timeMS: number, v: number) {
		const int = setInterval(() => {
			const r = randomInt(1, 4);

			if (r === 1) {
				this.lookAt[0] += v;
			}

			if (r === 2) {
				this.lookAt[0] -= v;
			}

			if (r === 3) {
				this.lookAt[1] += v;
			}

			if (r === 2) {
				this.lookAt[1] += v;
			}

			this.updateViewport();
		}, intervalMS);

		setTimeout(() => {
			clearInterval(int);
		}, timeMS);
	}

	/**
	 * @memberof Camera
	 * @description Culls/Renders objects that are passed and does not render other object that are not passed
	 * @param {Duck.Types.Renderable[]} renderableObjects Objects that should be culled/rendered
	 * @param {Duck.Types.Camera.CullingOptions} [options] Options to modify how objects are culled, optional -> defaults:
	 * { preserveVisibility: true, modifyPhysicsEnable: true }
	 *
	 * Notes:
	 *  - Calls CanvasRenderer.pipeline.pool() ignoring the pool interval
	 *
	 * @since 2.0.0
	 */
	public cull(
		renderableObjects: Duck.Types.Renderable[],
		options?: Duck.Types.Camera.CullingOptions
	) {
		const preserveVisibility = options ? options.preserveVisibility : true;
		const modifyPhysicsEnable = options
			? options.modifyPhysicsEnable
			: true;

		const visibleObjects = this.scene.displayList.visibilityFilter(true);

		const culledObjects = visibleObjects.filter((r) =>
			renderableObjects.find((_r) => _r.id === r.id)
		);
		const nonCulledObjects = visibleObjects.filter(
			(r) => !culledObjects.includes(r)
		);

		for (const culledObject of culledObjects) {
			// skip maps
			if (culledObject instanceof Map) {
				continue;
			}

			if (preserveVisibility) {
				culledObject.culled = true;
			} else {
				culledObject.visible = true;
			}

			if (modifyPhysicsEnable) {
				if (culledObject instanceof PhysicsBody) {
					culledObject.enabled = true;
				}
			}
		}

		for (const nonCulledObject of nonCulledObjects) {
			// skip maps
			if (nonCulledObject instanceof Map) {
				continue;
			}

			if (preserveVisibility) {
				nonCulledObject.culled = false;
			} else {
				nonCulledObject.visible = false;
			}

			if (modifyPhysicsEnable) {
				if (nonCulledObject instanceof PhysicsBody) {
					nonCulledObject.enabled = false;
				}
			}
		}

		// pool RendererPipeline
		this.game.renderer.pipeline.pool();
	}

	/**
	 * @memberof Camera
	 * @description A form of Frustum Culling that gets all objects visible to the player by the viewport's width and height and culls those objects
	 * and does not render objects outside/not-visible to the player/camera
	 * @param {Duck.Types.Camera.CullingOptions} [options] Options to modify how objects are culled, optional -> defaults:
	 * { preserveVisibility: true, modifyPhysicsEnable: true }
	 *
	 * Notes:
	 *  - Calls CanvasRenderer.pipeline.pool() ignoring the pool interval
	 *
	 * @since 2.0.0
	 */
	public autoCull(options?: Duck.Types.Camera.CullingOptions) {
		const preserveVisibility = options ? options.preserveVisibility : true;
		const modifyPhysicsEnable = options
			? options.modifyPhysicsEnable
			: true;

		const objects = this.scene.displayList.list;

		const culledObjects = objects.filter((r) => {
			if (
				r instanceof Rect ||
				r instanceof RoundRect ||
				r instanceof Sprite ||
				r instanceof Button ||
				r instanceof Text
			) {
				if (
					rectToRectIntersect(r, {
						position: {
							x: this.viewport.left,
							y: this.viewport.top,
						},
						w: this.viewport.w,
						h: this.viewport.h,
					})
				) {
					return true;
				} else {
					return false;
				}
			}

			if (
				r instanceof Circle ||
				r instanceof StaticLight ||
				r instanceof Particle
			) {
				if (
					circleRectCollision(r, {
						position: {
							x: this.viewport.left,
							y: this.viewport.top,
						},
						w: this.viewport.w,
						h: this.viewport.h,
					})
				) {
					return true;
				} else {
					return false;
				}
			}

			return false;
		});
		const nonCulledObjects = objects.filter(
			(r) => !culledObjects.includes(r)
		);

		for (const culledObject of culledObjects) {
			// skip maps
			if (culledObject instanceof Map) {
				continue;
			}

			if (preserveVisibility) {
				culledObject.culled = true;
			} else {
				culledObject.visible = true;
			}

			if (modifyPhysicsEnable) {
				if (culledObject instanceof PhysicsBody) {
					culledObject.enabled = true;
				}
			}
		}

		for (const nonCulledObject of nonCulledObjects) {
			// skip maps
			if (nonCulledObject instanceof Map) {
				continue;
			}

			if (preserveVisibility) {
				nonCulledObject.culled = false;
			} else {
				nonCulledObject.visible = false;
			}

			if (modifyPhysicsEnable) {
				if (nonCulledObject instanceof PhysicsBody) {
					nonCulledObject.enabled = false;
				}
			}
		}

		// pool RendererPipeline
		this.game.renderer.pipeline.pool();
	}

	/**
	 * @memberof Camera
	 * @description Returns the default zoom, also uses DPR scaling if enabled
	 * @since 1.0.0
	 */
	public get defaultZoom() {
		if (this.game.config.dprScale) {
			if (this.game.config.debug) {
				new Debug.Log(
					'Getter defaultZoom returned default zoom with dpr scaling. (info)'
				);
			}
			return 1000 / window.devicePixelRatio;
		} else {
			return 1000;
		}
	}

	/**
	 * @memberof Camera
	 * @description Returns the default FOV
	 * @since 1.0.0
	 */
	public get defaultFOV() {
		return Math.PI / 4;
	}
}
