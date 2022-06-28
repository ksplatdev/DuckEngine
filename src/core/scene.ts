import Game from './game';
import Render from '../base/render';
import { Duck } from '../index';
import Debug from './debug/debug';
import Sprite from './gameobjects/sprite';
import Rect from './gameobjects/rect';
import Circle from './gameobjects/circle';
import RoundRect from './gameobjects/roundrect';
import Particle from './gameobjects/particles/particle';
import ParticleEmitter from './gameobjects/particles/particleEmitter';
import SoundPlayer from './sound/soundPlayer';
import Input from './input/input';
import Camera from './camera/camera';
import StaticLight from './lights/staticLight';
import Group from './group/group';
import Cutscene from './cutscene/cutscene';
import Loader from './loader/loader';
import randomInt from './math/randomInt';
import randomFloat from './math/randomFloat';
import isHex from '../helper/color/isHex';
import isHSL from '../helper/color/isHSL';
import isRGB from '../helper/color/isRGB';
import rgbToRGBA from '../helper/color/rgbToRGBA';
import rgbToHSL from '../helper/color/rgbToHSL';
import rgbaToHSLA from '../helper/color/rgbaToHSLA';
import rgbaToRGB from '../helper/color/rgbaToRGB';
import hexToRGBA from '../helper/color/hexToRGBA';
import hexToRGB from '../helper/color/hexToRGB';
import hexToHSL from '../helper/color/hexToHSL';
import randomColor from '../helper/color/randomColor';
import randomColorWithAlpha from '../helper/color/randomAlphaColor';
import rectToRectIntersect from './physics/utils/rectToRectIntersect';
import circleToRectIntersect from './physics/utils/circleToRectIntersect';
import TileMap from './map/tilemap';
import Once from '../base/once';
import Amount from '../base/amount';
import Button from './gameobjects/ui/button';
import Text from './gameobjects/ui/text';
import Effect from './effect/effect';
import ExplosionEffect from './effect/preset/explosion';
import SmokeEffect from './effect/preset/smoke';
import DisplayList from './models/displayList';
import CanvasModulate from './gameobjects/misc/canvasModulate';
import Vector2 from './math/vector2';
import clamp from './math/clamp';
import lerp from './math/lerp';
import PhysicsServer from './physics/server/physicsServer';
import PhysicsList from './models/physicsList';
import Area from './physics/models/area';
import PhysicsBody from './physics/physicsBody';
import GameObject from './gameobjects/gameObject';
import Tileset from './map/tileset';
import TileLayer from './map/tilelayer';
import Timer from '../base/timer';
import Color from './renderer/models/color';

/**
 * @class Scene
 * @classdesc Creates a DuckEngine Scene
 * @description The Scene Class. Main rendering happens here
 * @since 1.0.0-beta
 */
export default class Scene extends Render {
	/**
	 * @memberof Scene
	 * @description The key of the Scene, used to identify the Scene
	 * @type string
	 * @since 1.0.0-beta
	 */
	public readonly key: string;

	/**
	 * @memberof Scene
	 * @description The state of the Scene being visible, determines if the Scene.displayList, physicsList, update, and __tick, is being called/used
	 * in the game loop
	 * @type boolean
	 * @since 1.0.0-beta
	 */
	public visible: boolean;

	/**
	 * @memberof Scene
	 * @description Determines if the Scene is visible by default
	 * @type boolean
	 * @since 1.0.0-beta
	 */
	public readonly default: boolean;

	/**
	 * @memberof Scene
	 * @description The game instance the scene is added to
	 * @type Game
	 * @since 1.0.0-beta
	 */
	protected game: Game;

	/**
	 * @memberof Scene
	 * @description The current camera being updated
	 * @type Camera | undefined
	 * @since 1.0.0-beta
	 */
	public currentCamera: Camera | undefined;

	/**
	 * @memberof Scene
	 * @description The main camera of the scene
	 * @type Camera | undefined
	 * @since 1.0.0-beta
	 */
	public mainCamera: Camera | undefined;

	/**
	 * @memberof Scene
	 * @description An array of cameras that the scene holds
	 * @type Camera[]
	 * @since 1.0.0-beta
	 */
	public cameras: Camera[];

	/**
	 * @memberof Scene
	 * @description A DisplayList instance, holds and manages Renderables
	 * @type DisplayList
	 * @since 2.0.0
	 */
	public displayList: DisplayList;

	/**
	 * @memberof Scene
	 * @description A PhysicsList instance, holds and manages PhysicsBodies
	 * @type PhysicsList
	 * @since 2.0.0
	 */
	public physicsList: PhysicsList;

	/**
	 * @memberof Scene
	 * @description A Loader instance, used to load assets in Scene.preload method that you override
	 * @type Loader
	 * @since 2.0.0
	 */
	public loader: Loader;

	/**
	 * @memberof Scene
	 * @description A PhysicsServer instance, manages and updates all the physics for the Scene.PhysicsList. It is set to undefined if
	 * Game.config.physics.customTick is truthy
	 * @type PhysicsServer | undefined
	 * @since 2.0.0
	 */
	public physicsServer: PhysicsServer | undefined;

	/**
	 * @memberof Scene
	 * @description A property that is a function that gets called when the scene is switched to being visible
	 * @type () => void
	 * @since 2.1.0
	 */
	public onSceneActive: () => void;

	/**
	 * @memberof Scene
	 * @description A property that is a function that gets called when the scene is switched to not being visible
	 * @type () => void
	 * @since 2.1.0
	 */
	public onSceneInactive: () => void;

	// methods

	/**
	 * @memberof Scene
	 * @description Used to add GameObjects and more to the scene
	 * @since 1.0.0-beta
	 */
	public add: {
		color: (
			value: number | string | CanvasGradient | CanvasPattern,
			stroke?: number | string,
			strokeWidth?: number
		) => Color;
		gameobject: {
			misc: {
				canvasModulate: (
					x: number,
					y: number,
					w: number,
					h: number,
					color: Color
				) => CanvasModulate;
			};
			existing: <t extends Duck.Types.Texture.Type>(
				gameobject: GameObject<t>
			) => GameObject<t>;
			sprite: (
				x: number,
				y: number,
				w: number,
				h: number,
				textureKey: string,
				currentRow?: number,
				currentCol?: number
			) => Sprite;
			rect: (
				x: number,
				y: number,
				w: number,
				h: number,
				color: Color
			) => Rect;
			circle: (x: number, y: number, r: number, color: Color) => Circle;
			roundRect: (
				x: number,
				y: number,
				w: number,
				h: number,
				r: number,
				color: Color
			) => RoundRect;
		};
		misc: {
			area: (
				x: number,
				y: number,
				w: number,
				h: number,
				collisionFilter: PhysicsBody<Duck.Types.Texture.Type>[]
			) => Area;
		};
		ui: {
			text: (text: string, config: Duck.Types.UI.Text.Config) => Text;
			button: (
				shape: Duck.Types.UI.Button.Shape,
				x: number,
				y: number,
				w: number,
				h: number,
				r: number,
				color: Color,
				text: Text
			) => Button;
		};
		soundPlayer: (
			path: string,
			options?: Duck.Types.Sound.Config
		) => SoundPlayer;
		input: () => Input;
		camera: () => Camera;
		mainCamera: () => Camera;
		light: {
			staticLight: (
				x: number,
				y: number,
				r: number,
				color: Color,
				alpha: Duck.Types.Helper.AlphaRange
			) => StaticLight;
		};
		group: <t>(name: string, defaultValues?: t[]) => Group<t>;
		particle: (
			shape: Duck.Types.Collider.ShapeString,
			w: number,
			h: number,
			r: number,
			fillColor: string
		) => Particle;
		particleEmitter: (
			particle: Particle,
			rangeX: Duck.Types.ParticleEmitter.Range,
			rangeY: Duck.Types.ParticleEmitter.Range,
			amount: number,
			autoCreate?: boolean
		) => ParticleEmitter;
		cutscene: (
			config: Duck.Types.Cutscene.Config,
			instructions: Duck.Types.Cutscene.Instructions
		) => Cutscene;
		map: {
			tilemap: (
				origin: Duck.Types.Math.Vector2Like,
				tilelayers: TileLayer[]
			) => TileMap;
			tileset: (
				textureKey: string,
				tileW: number,
				tileH: number,
				rows: number,
				cols: number
			) => Tileset;
			tileLayer: (
				tileset: Tileset,
				map: number[][],
				zIndex?: number,
				visible?: boolean
			) => TileLayer;
		};
		effect: (
			rangeX: Duck.Types.ParticleEmitter.Range,
			rangeY: Duck.Types.ParticleEmitter.Range,
			particleEmitter: ParticleEmitter
		) => Effect;
		presetEffect: {
			explosionEffect: (
				rangeX: Duck.Types.ParticleEmitter.Range,
				rangeY: Duck.Types.ParticleEmitter.Range,
				particleAmount: number | undefined,
				speedRange: Duck.Types.ParticleEmitter.Range | undefined,
				maxAge: number | undefined,
				color: string | undefined
			) => ExplosionEffect;
			smokeEffect: (
				rangeX: Duck.Types.ParticleEmitter.Range,
				rangeY: Duck.Types.ParticleEmitter.Range,
				particleAmount: number | undefined,
				speedRangeX: Duck.Types.ParticleEmitter.Range | undefined,
				speedRangeY: Duck.Types.ParticleEmitter.Range | undefined,
				maxAge: number | undefined,
				color: '#2e2e2e' | undefined,
				interval: 50 | undefined
			) => SmokeEffect;
		};
	};

	/**
	 * @memberof Scene
	 * @description Misc tools, contains color, physics, and math related tools
	 * @since 1.0.0-beta
	 */
	public tools: {
		loader: typeof Loader;
		color: {
			random: () => Color;
			randomWithAlpha: (alpha?: Duck.Types.Helper.AlphaRange) => string;
			is: {
				hex: (str: string) => boolean;
				hsl: (str: string) => boolean;
				rgb: (str: string) => boolean;
			};
			convert: {
				rgb: {
					toHsl: (r: number, g: number, b: number) => string;
					toRgba: (
						color: string,
						alpha: Duck.Types.Helper.AlphaRange
					) => string;
				};
				rgba: {
					toHsla: (
						r: string | number,
						g: string | number,
						b: string | number,
						a: Duck.Types.Helper.AlphaRange
					) => string;
					toRgb: (rgba: string) => string;
				};
				hex: {
					toRgba: (
						hex: string,
						alpha: Duck.Types.Helper.AlphaRange
					) => string;
					toRgb: (hex: string) => string | null;
					toHsl: (hex: string) => string;
				};
			};
		};
		physics: {
			rectToRectIntersect: (
				rect: Rect | Sprite,
				rect2: Rect | Sprite
			) => boolean;
			circleToRectIntersect: (
				circle:
					| Circle
					| {
							position: { x: number; y: number };
							w: number;
							h: number;
							r: number;
					  },
				rect:
					| Rect
					| Sprite
					| {
							position: { x: number; y: number };
							w: number;
							h: number;
					  }
			) => boolean;
		};
		math: {
			createVector: (x?: number, y?: number) => Vector2;
			vector: typeof Vector2;
			clamp: (x: number, min: number, max: number) => number;
			lerp: (start: number, end: number, amount: number) => number;
			randomInt: (min: number, max: number) => number;
			randomFloat: (min: number, max: number, fixed?: number) => number;
		};
	};

	/**
	 * @constructor Scene
	 * @description Creates a Scene instance
	 * @param {string} key Key/Identifier or name of scene
	 * @param {Game} game Game instance
	 * @param {boolean} [visible=false] Is the scene visible, defaults to false
	 * @since 1.0.0-beta
	 */
	constructor(key: string, game: Game, visible?: boolean) {
		super();

		this.key = key;
		this.game = game;
		this.visible = visible || false;
		this.default = false;

		// set visible if key is same as defaultScene key

		if (this.game.stack.defaultScene === this.key) {
			this.default = true;
			this.visible = true;
		}

		// main camera
		this.currentCamera;

		this.mainCamera;
		this.cameras = [];

		this.displayList = new DisplayList(this.game);
		this.physicsList = new PhysicsList();

		this.loader = new Loader(this.game, this);

		if (this.game.config.physics?.enabled) {
			this.physicsServer = new PhysicsServer(this.game, this);
		}

		this.onSceneActive = () => {
			// On scene change to visible
		};

		this.onSceneInactive = () => {
			// On scene change to not visible
		};

		// methods

		this.add = {
			color: (
				value: number | string | CanvasGradient | CanvasPattern,
				stroke?: number | string,
				strokeWidth?: number
			) => {
				if (stroke) {
					return new Color(value, stroke, strokeWidth || 1);
				}

				return new Color(value);
			},
			gameobject: {
				misc: {
					canvasModulate: (
						x: number,
						y: number,
						w: number,
						h: number,
						color: Color
					) => {
						const myCanvasModulate = new CanvasModulate(
							x,
							y,
							w,
							h,
							color,
							this.game,
							this
						);
						this.displayList.add(myCanvasModulate);
						this.physicsList.add(myCanvasModulate);
						return myCanvasModulate;
					},
				},
				existing: <t extends Duck.Types.Texture.Type>(
					gameobject: GameObject<t>
				) => {
					this.displayList.add(gameobject);
					this.physicsList.add(gameobject);
					return gameobject;
				},
				sprite: (
					x: number,
					y: number,
					w: number,
					h: number,
					textureKey: string,
					currentRow?: number,
					currentCol?: number
				) => {
					const sprite = new Sprite(
						x,
						y,
						w,
						h,
						textureKey,
						this.game,
						this,
						currentRow,
						currentCol
					);
					this.displayList.add(sprite);
					this.physicsList.add(sprite);
					return sprite;
				},
				rect: (
					x: number,
					y: number,
					w: number,
					h: number,
					color: Color
				) => {
					const rect = new Rect(x, y, w, h, color, this.game, this);
					this.displayList.add(rect);
					this.physicsList.add(rect);
					return rect;
				},
				circle: (x: number, y: number, r: number, color: Color) => {
					const circle = new Circle(x, y, r, color, this.game, this);
					this.displayList.add(circle);
					this.physicsList.add(circle);
					return circle;
				},
				roundRect: (
					x: number,
					y: number,
					w: number,
					h: number,
					r: number,
					color: Color
				) => {
					const roundRect = new RoundRect(
						x,
						y,
						w,
						h,
						r,
						color,
						this.game,
						this
					);
					this.displayList.add(roundRect);
					this.physicsList.add(roundRect);
					return roundRect;
				},
			},
			misc: {
				area: (
					x: number,
					y: number,
					w: number,
					h: number,
					collisionFilter: PhysicsBody<Duck.Types.Texture.Type>[]
				) => {
					const myArea = new Area(
						x,
						y,
						w,
						h,
						collisionFilter,
						this.game,
						this
					);
					this.physicsList.add(myArea);
					return myArea;
				},
			},
			ui: {
				text: (text: string, config: Duck.Types.UI.Text.Config) => {
					const myText = new Text(text, config, this.game, this);
					this.displayList.add(myText);
					this.physicsList.add(myText);
					return myText;
				},
				button: (
					shape: Duck.Types.UI.Button.Shape,
					x: number,
					y: number,
					w: number,
					h: number,
					r: number,
					color: Color,
					text: Text
				) => {
					const myButton = new Button(
						shape,
						x,
						y,
						w,
						h,
						r,
						color,
						text,
						this.game,
						this
					);
					this.displayList.add(myButton);
					this.physicsList.add(myButton);
					return myButton;
				},
			},
			soundPlayer: (path: string, options?: Duck.Types.Sound.Config) => {
				return new SoundPlayer(path, options);
			},
			input: () => {
				return new Input(this.game, this);
			},
			camera: () => {
				const c = new Camera(this.game, this);
				this.cameras.push(c);
				return c;
			},
			mainCamera: () => {
				const c = new Camera(this.game, this);
				this.cameras.push(c);
				this.mainCamera = c;
				this.currentCamera = c;
				return c;
			},
			light: {
				staticLight: (
					x: number,
					y: number,
					r: number,
					color: Color,
					alpha: Duck.Types.Helper.AlphaRange
				) => {
					const myStaticLight = new StaticLight(
						x,
						y,
						r,
						color,
						alpha,
						this.game,
						this
					);
					this.displayList.add(myStaticLight);
					this.physicsList.add(myStaticLight);
					return myStaticLight;
				},
			},
			group: <t>(name: string, defaultValues?: t[]) => {
				return new Group<t>(name, this.game, defaultValues);
			},
			particle: (
				shape: Duck.Types.Collider.ShapeString,
				w: number,
				h: number,
				r: number,
				fillColor: string
			) => {
				const myParticle = new Particle(
					shape,
					w,
					h,
					r,
					fillColor,
					this.game,
					this
				);
				return myParticle;
			},
			particleEmitter: (
				particle: Particle,
				rangeX: Duck.Types.ParticleEmitter.Range,
				rangeY: Duck.Types.ParticleEmitter.Range,
				amount: number,
				autoCreate = true
			) => {
				return new ParticleEmitter(
					particle,
					rangeX,
					rangeY,
					amount,
					this.game,
					this,
					autoCreate
				);
			},
			cutscene: (
				config: Duck.Types.Cutscene.Config,
				instructions: Duck.Types.Cutscene.Instructions
			) => {
				return new Cutscene(config, instructions, this.game);
			},
			map: {
				tilemap: (
					origin: Duck.Types.Math.Vector2Like,
					tilelayers: TileLayer[]
				) => {
					const myTileMap = new TileMap(
						origin,
						tilelayers,
						this.game,
						this
					);
					this.displayList.add(myTileMap);
					return myTileMap;
				},
				tileset: (
					textureKey: string,
					tileW: number,
					tileH: number,
					rows: number,
					cols: number
				) => {
					return new Tileset(
						textureKey,
						tileW,
						tileH,
						rows,
						cols,
						this.game,
						this
					);
				},
				tileLayer: (
					tileset: Tileset,
					map: number[][],
					zIndex = 2,
					visible = true
				) => {
					return new TileLayer(
						tileset,
						map,
						this.game,
						this,
						zIndex,
						visible
					);
				},
			},
			effect: (
				rangeX: Duck.Types.ParticleEmitter.Range,
				rangeY: Duck.Types.ParticleEmitter.Range,
				particleEmitter: ParticleEmitter
			) => {
				const myEffect = new Effect(
					rangeX,
					rangeY,
					particleEmitter,
					this.game
				);
				this.displayList.add(myEffect);
				return myEffect;
			},
			presetEffect: {
				explosionEffect: (
					rangeX: Duck.Types.ParticleEmitter.Range,
					rangeY: Duck.Types.ParticleEmitter.Range,
					particleAmount = 50,
					speedRange = [1, 1],
					maxAge = 3,
					color = '#FFA500'
				) => {
					const myExplosionEffect = new ExplosionEffect(
						rangeX,
						rangeY,
						this.game,
						particleAmount,
						speedRange,
						maxAge,
						color,
						this
					);
					this.displayList.add(myExplosionEffect);
					return myExplosionEffect;
				},
				smokeEffect: (
					rangeX: Duck.Types.ParticleEmitter.Range,
					rangeY: Duck.Types.ParticleEmitter.Range,
					particleAmount = 50,
					speedRangeX = [-0.1, 0.4],
					speedRangeY = [-0.1, 0.4],
					maxAge = 20,
					color = '#2e2e2e',
					interval = 50
				) => {
					const mySmokeEffect = new SmokeEffect(
						rangeX,
						rangeY,
						this.game,
						particleAmount,
						speedRangeX,
						speedRangeY,
						maxAge,
						color,
						interval,
						this
					);
					this.displayList.add(mySmokeEffect);
					return mySmokeEffect;
				},
			},
		};

		this.tools = {
			loader: Loader,
			color: {
				random: () => {
					return new Color(randomColor());
				},
				randomWithAlpha: (alpha?: Duck.Types.Helper.AlphaRange) =>
					randomColorWithAlpha(alpha),
				is: {
					hex: isHex,
					hsl: isHSL,
					rgb: isRGB,
				},
				convert: {
					rgb: {
						toHsl: rgbToHSL,
						toRgba: rgbToRGBA,
					},
					rgba: {
						toHsla: rgbaToHSLA,
						toRgb: rgbaToRGB,
					},
					hex: {
						toRgba: hexToRGBA,
						toRgb: hexToRGB,
						toHsl: hexToHSL,
					},
				},
			},
			physics: {
				rectToRectIntersect: (
					rect: Rect | Sprite,
					rect2: Rect | Sprite
				) => {
					return rectToRectIntersect(rect, rect2);
				},
				circleToRectIntersect: (
					circle:
						| Circle
						| {
								position: { x: number; y: number };
								w: number;
								h: number;
								r: number;
						  },
					rect:
						| Rect
						| Sprite
						| {
								position: { x: number; y: number };
								w: number;
								h: number;
						  }
				) => {
					return circleToRectIntersect(circle, rect);
				},
			},
			math: {
				createVector: (x?: number, y?: number) => {
					return Vector2.CREATE(x, y);
				},
				vector: Vector2,
				clamp: clamp,
				lerp: lerp,
				randomInt: randomInt,
				randomFloat: randomFloat,
			},
		};
	}

	/**
	 * @memberof Scene
	 * @description Calls physics server __tick method if game.config.physics.enabled is true
	 * and game.config.physics.customTick is false
	 * *Do not call manually, this is called in GAME LOOP*
	 *
	 * @since 2.0.0
	 */
	public __tick() {
		if (!this.game.config.physics?.customTick) {
			this.physicsServer?.__tick();
		}
	}

	/**
	 * @memberof Scene
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
	 * @memberof Scene
	 * @description Switches the active camera to a passed camera
	 * @param {Camera} camera Camera to switch to
	 * @memberof 1.0.0-beta
	 */
	public switchCamera(camera: Camera) {
		const foundCamera = this.cameras.find((_camera) => _camera === camera);
		if (foundCamera) {
			this.currentCamera = foundCamera;
			if (this.game.config.debug) {
				new Debug.Log('Switched cameras.');
			}
		} else {
			new Debug.Error(
				'Cannot switch camera. Camera not found in the current scene.'
			);
		}
	}

	/**
	 * @memberof Scene
	 * @description Switches the active camera to the main camera
	 * @since 1.0.0-beta
	 */
	public switchToMainCamera() {
		this.currentCamera = this.mainCamera;
		if (this.game.config.debug) {
			new Debug.Log('Switched to main camera.');
		}
	}

	/**
	 * @memberof Scene
	 * @description Sets a camera as the main camera
	 * @param {Camera} camera Camera to set the main camera as
	 * @since 1.0.0-beta
	 */
	public setMainCamera(camera: Camera) {
		this.mainCamera = camera;
		if (this.game.config.debug) {
			new Debug.Log(`Set main camera to ${camera}.`);
		}
	}

	/**
	 * @memberof Scene
	 * @description Runs a function once no matter if it is in a loop or not
	 * @param {(...args: unknown[]) => unknown} func Function to run
	 * @param {boolean} [run] Determines if function is ran right when it is initialized
	 * @returns {Once}
	 * @since 1.0.0
	 */
	public once(func: (...args: unknown[]) => unknown, run?: boolean) {
		const one = new Once(func, run);
		return one;
	}

	/**
	 * @memberof Scene
	 * @description Allows a function to only be ran a max amount of times
	 * @param {(currentCount:number) => void} func Function to call
	 * @param {number} maxAmount Max amount of times to allow the function to be called
	 * @param {boolean} [run] Determines if function is ran right when it is initialized
	 * @returns {Amount}
	 * @since 1.1.0
	 */
	public runAmount(
		func: (currentCount: number) => void,
		maxAmount: number,
		run?: boolean
	) {
		const amount = new Amount(func, maxAmount, this.game, run);
		return amount;
	}

	/**
	 * @memberof Scene
	 * @description Creates and returns a Timer instance
	 * @param {number} ms Milliseconds, converted to seconds which is used to check if the target time is reached in Timer.count
	 * @param {(...args:unknown[])=>unknown} cb Callback to call every time the timer reaches its target
	 * @param {unknown[]} args Arguments to pass to the callback
	 * @param {number} repeat Amount of times to repeat, set to infinity to repeat forever
	 * @returns {Timer}
	 * @since 2.1.0
	 */
	public createTimer(
		ms: number,
		cb: (...args: unknown[]) => unknown,
		args: unknown[],
		repeat: number
	) {
		const timer = new Timer(ms, cb, args, repeat);
		return timer;
	}
}
