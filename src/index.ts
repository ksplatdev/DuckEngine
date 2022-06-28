/* eslint-disable @typescript-eslint/ban-types */
// import

import CameraClass from './core/camera/camera';
import GameClass from './core/game';
import SceneClass from './core/scene';
import TextClass from './core/gameobjects/ui/text';
import StaticLightClass from './core/lights/staticLight';
import ColliderClass from './core/physics/models/collider';
import GameObjectClass from './core/gameobjects/gameObject';
import CutsceneClass from './core/cutscene/cutscene';
import CircleClass from './core/gameobjects/circle';
import RectClass from './core/gameobjects/rect';
import RoundRectClass from './core/gameobjects/roundrect';
import SpriteClass from './core/gameobjects/sprite';
import GroupClass from './core/group/group';
import InputClass from './core/input/input';
import LoaderClass from './core/loader/loader';
import TileMapClass from './core/map/tilemap';
import ParticleClass from './core/gameobjects/particles/particle';
import ParticleEmitterClass from './core/gameobjects/particles/particleEmitter';
import SoundPlayerClass from './core/sound/soundPlayer';
import OnceClass from './base/once';
import RenderClass from './base/render';
import ButtonClass from './core/gameobjects/ui/button';
import EffectClass from './core/effect/effect';
import ExplosionEffectClass from './core/effect/preset/explosion';
import SmokeEffectClass from './core/effect/preset/smoke';
import Vector2Class from './core/math/vector2';
import DisplayListClass from './core/models/displayList';
import CanvasModulateClass from './core/gameobjects/misc/canvasModulate';
import MapClass from './core/map/map';
import AmountClass from './base/amount';
import TextureClass from './core/texture/texture';
import PhysicsServerClass from './core/physics/server/physicsServer';
import PhysicsBodyClass from './core/physics/physicsBody';
import HitboxClass from './core/physics/models/hitbox';
import KeyboardInputClass from './core/input/keyboardInput';
import MouseInputClass from './core/input/mouseInput';
import KeyClass from './core/input/models/key';
import MouseClass from './core/input/models/mouse';
import CacheManagerClass from './core/storage/cacheManager';
import AreaClass from './core/physics/models/area';
import PhysicsListClass from './core/models/physicsList';
import PluginManagerClass from './core/misc/pluginManager';
import AnimationClass from './core/animation/animation';
import AnimationFrameClass from './core/animation/animationFrame';
import AnimationManagerClass from './core/animation/animationManager';
import AnimationStateClass from './core/animation/animationState';
import StateMachineClass from './core/animation/stateMachine';
import ColorClass from './core/renderer/models/color';

// main

// spec
/**
 * @namespace Duck
 * @description All Types, Type Classes, Classes, Layers, and Configurations are stored here.
 * @since 1.0.0-beta
 */
export namespace Duck {
	/**
	 * @memberof Duck
	 * @description Returns a HTMLCanvasElement and CanvasRenderingContext2D, finds a canvas, if none exist,
	 * it creates and appends one
	 * @returns {{canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D}}
	 */
	export const AutoCanvas = () => {
		let canvas: HTMLCanvasElement = document.querySelector(
			'canvas'
		) as HTMLCanvasElement;

		let ctx: CanvasRenderingContext2D = canvas.getContext(
			'2d'
		) as CanvasRenderingContext2D;

		// check if canvas exists on document
		if (document.querySelector('canvas')) {
			canvas = document.querySelector('canvas') as HTMLCanvasElement;
			ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		} else {
			canvas = document.createElement('canvas') as HTMLCanvasElement;
			document.body.appendChild(canvas);
			ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		}

		return {
			canvas,
			ctx,
		};
	};

	/**
	 * @namespace Duck.Classes
	 * @memberof Duck
	 * @description All classes are stored here so that it can be extended.
	 * @since 2.0.0
	 */
	export namespace Classes {
		export const Game = GameClass;
		export const Scene = SceneClass;

		export namespace GameObjects {
			export const GameObject = GameObjectClass;
			export const Circle = CircleClass;
			export const Rect = RectClass;
			export const RoundRect = RoundRectClass;
			export const Sprite = SpriteClass;

			export namespace Particles {
				export const Particle = ParticleClass;
				export const ParticleEmitter = ParticleEmitterClass;
			}
			export namespace UI {
				export const Button = ButtonClass;
				export const Text = TextClass;
			}

			export namespace Misc {
				export const CanvasModulate = CanvasModulateClass;
			}
		}

		export namespace Effects {
			export const Effect = EffectClass;

			export namespace Presets {
				export const ExplosionEffect = ExplosionEffectClass;
				export const SmokeEffect = SmokeEffectClass;
			}
		}

		export namespace Misc {
			export const Loader = LoaderClass;
			export const Group = GroupClass;
			export const Cutscene = CutsceneClass;
			export const CacheManager = CacheManagerClass;
			export const PluginManager = PluginManagerClass;
		}

		export namespace Base {
			export const Amount = AmountClass;
			export const Once = OnceClass;
			export const Render = RenderClass;
		}

		export namespace Sound {
			export const SoundPlayer = SoundPlayerClass;
		}

		export namespace Cameras {
			export const Camera = CameraClass;
		}

		export namespace Physics {
			export const Collider = ColliderClass;
			export const PhysicsServer = PhysicsServerClass;
			export const PhysicsBody = PhysicsBodyClass;
			export namespace Models {
				export const Hitbox = HitboxClass;
				export const Area = AreaClass;
			}
		}

		export namespace Models {
			export const DisplayList = DisplayListClass;
			export const PhysicsList = PhysicsListClass;
			export const Texture = TextureClass;
			export const Color = ColorClass;
		}

		export namespace Map {
			export const Map = MapClass;
			export const TileMap = TileMapClass;
		}

		export namespace Math {
			export const Vector2 = Vector2Class;
		}

		export namespace Lights {
			export const StaticLight = StaticLightClass;
		}

		export namespace Input {
			export const Input = InputClass;
			export const KeyboardInput = KeyboardInputClass;
			export const MouseInput = MouseInputClass;
			export namespace Models {
				export const Key = KeyClass;
				export const Mouse = MouseClass;
			}
		}

		export namespace Animation {
			export const Animation = AnimationClass;
			export const AnimationFrame = AnimationFrameClass;
			export const AnimationManager = AnimationManagerClass;
			export const AnimationState = AnimationStateClass;
			export const StateMachine = StateMachineClass;
		}
	}

	/**
	 * @namespace Duck.TypeClasses
	 * @memberof Duck
	 * @description All type classes are stored here so that it can be referenced.
	 * @since 2.0.0
	 */
	export namespace TypeClasses {
		export type Game = GameClass;
		export type Scene = SceneClass;

		export namespace GameObjects {
			export type GameObject<t extends Duck.Types.Texture.Type> =
				GameObjectClass<t>;
			export type Circle = CircleClass;
			export type Rect = RectClass;
			export type RoundRect = RoundRectClass;
			export type Sprite = SpriteClass;

			export namespace Particles {
				export type Particle = ParticleClass;
				export type ParticleEmitter = ParticleEmitterClass;
			}
			export namespace UI {
				export type Button = ButtonClass;
				export type Text = TextClass;
			}

			export namespace Misc {
				export type CanvasModulate = CanvasModulateClass;
			}
		}

		export namespace Effects {
			export type Effect = EffectClass;

			export namespace Presets {
				export type ExplosionEffect = ExplosionEffectClass;
				export type SmokeEffect = SmokeEffectClass;
			}
		}

		export namespace Misc {
			export type Loader = LoaderClass;
			export type Group<t> = GroupClass<t>;
			export type Cutscene = CutsceneClass;
			export type CacheManager = CacheManagerClass;
			export type PluginManager = PluginManagerClass;
		}

		export namespace Base {
			export type Amount = AmountClass;
			export type Once = OnceClass;
			export type Render = RenderClass;
		}

		export namespace Sound {
			export type SoundPlayer = SoundPlayerClass;
		}

		export namespace Cameras {
			export type Camera = CameraClass;
		}

		export namespace Physics {
			export type Collider = ColliderClass;
			export type PhysicsServer = PhysicsServerClass;
			export type PhysicsBody<t extends Duck.Types.Texture.Type> =
				PhysicsBodyClass<t>;
			export namespace Models {
				export type Hitbox = HitboxClass;
				export type Area = AreaClass;
			}
		}

		export namespace Models {
			export type DisplayList = DisplayListClass;
			export type PhysicsList = PhysicsListClass;
			export type Texture<t extends Duck.Types.Texture.Type> =
				TextureClass<t>;
			export type Color = ColorClass;
		}

		export namespace Map {
			export type Map = MapClass;
			export type TileMap = TileMapClass;
		}

		export namespace Math {
			export type Vector2 = Vector2Class;
		}

		export namespace Lights {
			export type StaticLight = StaticLightClass;
		}

		export namespace Input {
			export type Input = InputClass;
			export type KeyboardInput = KeyboardInputClass;
			export type MouseInput = MouseInputClass;
			export namespace Models {
				export type Key = KeyClass;
				export type Mouse = MouseClass;
			}
		}

		export namespace Animation {
			export type Animation = AnimationClass;
			export type AnimationFrame = AnimationFrameClass;
			export type AnimationManager = AnimationManagerClass;
			export type AnimationState = AnimationStateClass;
			export type StateMachine = StateMachineClass;
		}
	}

	/**
	 * @namespace Duck.Layers
	 * @memberof Duck
	 * @description All rendering zIndexes are stored here.
	 * @since 2.0.0
	 */
	export namespace Layers {
		export namespace Rendering {
			export const zIndex = {
				canvasModulate: 1,
				gameobject: 2,
				particle: 3,
				button: 4,
				text: 5,
				graphicDebug: 6,
				fades: 7,
			};
		}
	}

	/**
	 * @namespace Duck.Types
	 * @memberof Duck
	 * @description All Class configs and types for that class are stored here. All types are here.
	 * @since 2.0.0
	 */
	export namespace Types {
		export type GameObject<textureType extends Duck.Types.Texture.Type> =
			GameObjectClass<textureType>;

		export type PhysicsProcessMember =
			PhysicsBodyClass<Duck.Types.Texture.Type>;

		export interface Renderable {
			readonly id: string;
			zIndex: number;
			visible: boolean;
			game: GameClass;
			_draw(): void;
			culled: boolean;
		}

		export namespace Game {
			export interface Config {
				/**
				 * @memberof Duck.Types.Game.Config
				 * @description Canvas element to render to or return value from Duck.AutoCanvas()
				 * @type HTMLCanvasElement | { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D; }
				 * @since 1.0.0-beta
				 */
				canvas:
					| HTMLCanvasElement
					| {
							canvas: HTMLCanvasElement;
							ctx: CanvasRenderingContext2D;
					  };

				/**
				 * @memberof Duck.Types.Game.Config
				 * @description Key of scene that is defaulted to be visible
				 * @type string
				 * @since 1.0.0-beta
				 */
				defaultScene: string;

				/**
				 * @memberof Duck.Types.Game.Config
				 * @description Rounds pixels from floats to integers, affects gameobjects (excluding particles)
				 * @type boolean
				 * @default false
				 * @since 2.0.0
				 */
				roundPixels?: boolean;

				/**
				 * @memberof Duck.Types.Game.Config
				 * @description Determines if window.focus is called on load or not
				 * @type boolean
				 * @default false
				 * @since 2.0.0
				 */
				focus?: boolean;

				/**
				 * @memberof Duck.Types.Game.Config
				 * @description Determines if window.blur is called on load or not
				 * @type boolean
				 * @default false
				 * @since 2.0.0
				 */
				blur?: boolean;

				/**
				 * @memberof Duck.Types.Game.Config
				 * @description Determines if rendering renderable objects is paused if tab is not focused, uses window.onblur and window.onfocus
				 * @type boolean
				 * @default false
				 * @since 2.0.0
				 */
				pauseRenderingOnBlur?: boolean;

				/**
				 * @memberof Duck.Types.Game.Config
				 * @description Physics Options
				 * @since 2.0.0
				 */
				physics?: {
					enabled: boolean;
					gravity?: Duck.Types.Math.Vector2Like;
					customTick?: boolean;
					debug?: boolean;
				};

				/**
				 * @memberof Duck.Types.Game.Config
				 * @description Function to call when rendering is paused, rendering pauses when this.stop is called or
				 * if pauseRenderingOnBlur is true and the window.blur event was fired
				 * @type (reason: 'windowBlur' | 'gameStop' | 'gameConfigBlur') => void
				 * @since 2.0.0
				 */
				onPauseRendering?: (
					reason: 'windowBlur' | 'gameStop' | 'gameConfigBlur'
				) => void;

				/**
				 * @memberof Duck.Types.Game.Config
				 * @description Function to call when rendering is resumed/started, rendering resumes/starts when this.start is called or
				 * if the window.focus event was fired
				 * @type (reason: 'windowFocus' | 'gameStart' | 'gameConfigFocus') => void
				 * @since 2.0.0
				 */
				onResumeRendering?: (
					reason: 'windowFocus' | 'gameStart' | 'gameConfigFocus'
				) => void;

				/**
				 * @memberof Duck.Types.Game.Config
				 * @description Scale of the canvas, the size of the canvas
				 * @type Duck.Types.Math.Vector2Like
				 * @since 2.1.0
				 */
				scale?: Duck.Types.Math.Vector2Like;

				/**
				 * @memberof Duck.Types.Game.Config
				 * @description Determines if DuckEngine logs out events that are occurring
				 * @type boolean
				 * @default false
				 * @since 1.0.0-beta
				 */
				debug?: boolean;

				/**
				 * @memberof Duck.Types.Game.Config
				 * @description Determines if DuckEngine silences/prevents pauseRenderingOnBlur, onPauseRendering, and onResumeRendering configurations
				 * @default false
				 * @type boolean
				 * @since 2.0.0
				 */
				debugRendering?: boolean;

				/**
				 * @memberof Duck.Types.Game.Config
				 * @description Custom splash screen options, shows while the game is starting/loading, default img: https://i.ibb.co/bdN4CCN/Logo-Splash.png
				 * default extraDuration: 500
				 * @type { img: string | 'default'; extraDuration?: number; }
				 * @since 2.0.0
				 */
				splashScreen?: {
					img?: string | 'default';
					extraDuration?: number;
				};

				/**
				 * @memberof Duck.Types.Game.Config
				 * @description CSS background color of the canvas (hint: to fill a scene with a background color, use scene.add.misc.canvasModulate)
				 * @type string
				 * @default undefined
				 * @since 1.0.0-beta
				 */
				background?: string;

				/**
				 * @memberof Duck.Types.Game.Config
				 * @description Determines if the canvas is scaled down to the window size if the window size is smaller than the canvas
				 * @type boolean
				 * @default false
				 * @since 1.0.0
				 */
				smartScale?: boolean;

				/**
				 * @memberof Duck.Types.Game.Config
				 * @description Uses the device pixel ratio to scale the canvas accordingly
				 * @default false
				 * @type boolean
				 * @since 1.0.0
				 */
				dprScale?: boolean;

				/**
				 * @memberof Duck.Types.Game.Config
				 * @description How often, in milliseconds, the RendererPipeline calls its pool method, affects how long it takes for a scene
				 * or renderable to change its visibility as both are controlled and updated by the RendererPipeline
				 * @default 1000
				 * @type number
				 * @since 2.1.0
				 */
				poolingInterval?: number;
			}

			export interface Stack {
				scenes: SceneClass[];
				defaultScene: string;
			}

			export interface Plugin {
				func: (...args: unknown[]) => unknown;
				args: unknown[];
				name: string;
			}
		}

		export namespace RendererPipeline {
			export interface PoolStackItem {
				scene: SceneClass;
				/**
				 * @memberof Duck.Types.Game.PoolStackItem
				 * @description An array of renderables that are visible and depth sorted
				 * @type Duck.Types.Renderable[]
				 * @since 2.1.0
				 */
				renderables: Duck.Types.Renderable[];
			}
		}

		export namespace Misc {
			export interface Scale {
				width?: number;
				height?: number;
			}
		}

		export namespace Collider {
			export type ShapeString =
				| 'rect'
				| 'circle'
				| 'roundrect'
				| 'sprite';

			export type CollisionResponseType =
				| 'none'
				| 'top'
				| 'left'
				| 'right'
				| 'bottom';
		}

		export namespace Sound {
			export interface Sprite {
				startSeconds: number;
				endSeconds: number;
				key: string;
			}

			export interface Config {
				autoplay?: boolean;
				volume?: number;
				sprites?: Sprite[];
				loop?: boolean;
			}
		}
		export namespace GamepadInput {
			export type MappingType = 'Xbox' | 'Playstation';
			export type Mapping =
				| typeof XboxMapping
				| typeof PlaystationMapping;

			export enum XboxMapping {
				A = 0,
				B = 1,
				X = 2,
				Y = 3,
				LB = 4,
				RB = 5,
				LT = 6,
				RT = 7,
				SHOW_ADDRESS_BAR = 8,
				SHOW_MENU = 9,
				LEFT_STICK_PRESS = 10,
				RIGHT_STICK_PRESS = 11,
				D_PAD_UP = 12,
				D_PAD_DOWN = 13,
				D_PAD_LEFT = 14,
				D_PAD_RIGHT = 15,
				LOGO = 16,
			}

			export enum PlaystationMapping {
				X = 0,
				CIRCLE = 1,
				SQUARE = 2,
				TRIANGLE = 3,
				L1 = 4,
				R1 = 5,
				L2 = 6,
				R2 = 7,
				SHARE = 8,
				OPTIONS = 9,
				LEFT_STICK_PRESS = 10,
				RIGHT_STICK_PRESS = 11,
				D_PAD_UP = 12,
				D_PAD_DOWN = 13,
				D_PAD_LEFT = 14,
				D_PAD_RIGHT = 15,
				LOGO = 16,
			}
		}

		export namespace UI {
			export namespace Text {
				export interface Config {
					x: number;
					y: number;
					method: 'draw' | 'stroke' | 'draw-stroke';
					styles: {
						fontCSS: string;
						strokeWidth?: number;
						strokeColor?: string;
						fillColor?: string;
						maxWidth?: number;
					};
				}
			}

			export namespace Button {
				export type Shape = 'rect' | 'roundrect' | 'sprite';

				export type ListenerType = 'CLICK' | 'HOVER' | 'NOTHOVER';

				export interface ListenerReturn {
					x: number;
					y: number;
					type: ListenerType;
				}

				export type ListenerFunc = (e: ListenerReturn) => void;

				export interface Listener {
					type: ListenerType;
					func: ListenerFunc;
				}
			}
		}

		export namespace Group {
			export type Filter =
				| 'gameobject'
				| 'lights'
				| 'ui'
				| 'physics'
				| 'cameras';

			export type ListenerType = 'ADD' | 'REMOVE';

			export interface Listener {
				func: (item: unknown) => unknown;
				type: ListenerType;
			}
		}

		export namespace ParticleEmitter {
			export type Range = Helper.FixedLengthArray<[number, number]>;
			export interface Offloaders {
				maxAmount: () => void;
				maxAge: () => void;
				maxBounds: () => void;
			}
		}

		export namespace Cutscene {
			export type OnListenerType = 'END' | 'START' | 'NEXT';

			export interface OnListener {
				type: OnListenerType;
				func: Function;
			}

			export type StepType =
				| 'MOVE'
				| 'DRAW'
				| 'FUNC'
				| 'CAMERA_ZOOM'
				| 'CAMERA_FOV'
				| 'CAMERA_MOVE'
				| 'CAMERA_SHAKE'
				| 'CAMERA_START_FOLLOW'
				| 'CAMERA_STOP_FOLLOW';

			export interface Step {
				type: StepType;
				affect?: GameObject<Duck.Types.Texture.Type> | CameraClass;
				moveTo?: {
					x?: number;
					y?: number;
				};
				func?: Function;
				cameraValue?: number;
				cameraIntervalMS?: number;
				cameraTimeMS?: number;
				sleepValue?: number;
				cameraFollow?: GameObject<Duck.Types.Texture.Type>;
				cameraFollowLerpX?: number;
				cameraFollowLerpY?: number;
			}
			export interface Instructions {
				init: {
					mainObjectPos: {
						x: number;
						y: number;
					};
					otherObjectPos: {
						x: number;
						y: number;
					}[];
					cameraSettings?: {
						FOV: number;
						follow?: GameObject<Duck.Types.Texture.Type>;
						zoom: number;
						pos?: {
							x: number;
							y: number;
						};
						followLerpX: number;
						followLerpY: number;
					};
					otherCameraSettings?: {
						FOV: number;
						follow?: GameObject<Duck.Types.Texture.Type>;
						zoom: number;
						pos?: {
							x: number;
							y: number;
						};
						followLerpX: number;
						followLerpY: number;
					}[];
				};
				steps: Step[];
			}

			export interface Config {
				mainCamera: CameraClass;
				otherCameras?: CameraClass[];
				otherObjects?: GameObject<Duck.Types.Texture.Type>[];
				mainObject: GameObject<Duck.Types.Texture.Type>;
			}
		}

		export namespace Tilemap {
			export type Map = number[][];
			export interface Atlas {
				[key: number]: HTMLImageElement | string;
			}
		}

		export namespace ParticleContainer {
			export interface Bounds {
				position: {
					x: number;
					y: number;
				};
				w: number;
				h: number;
			}

			export interface Physics {
				bounciness: number;
			}
		}

		export namespace Loader {
			export type StackItemType =
				| 'texture'
				| 'json'
				| 'font'
				| 'html'
				| 'xml'
				| 'audio';

			export interface StackItem<t> {
				type: StackItemType;
				value: t;
				key: string;
			}

			export interface TextureStackItem<t> extends StackItem<t> {
				dataType: Duck.Types.Texture.DataType;
			}
		}

		export namespace Texture {
			export type Type = 'image' | 'color' | 'either';

			export type DataType = 'sheet' | 'base' | 'atlas';
		}

		export namespace PhysicsBody {
			export type Type = RigidBody | StaticBody | KinematicBody;

			export interface Config {
				type: Type;
			}

			export interface AttachedBody {
				body: PhysicsBodyClass<Duck.Types.Texture.Type>;
				offset: Vector2Class;
			}

			/**
			 * @memberof Duck.Types.PhysicsBody.KinematicBody
			 * @description A type of PhysicsBody that can be moved and can be effected by gravity and friction.
			 * @since 2.0.0
			 */
			export type KinematicBody = 'KinematicBody';

			/**
			 * @memberof Duck.Types.PhysicsBody.KinematicBody
			 * @description A type of PhysicsBody that cannot be moved but can be effected by gravity and friction.
			 * @since 2.0.0
			 */
			export type RigidBody = 'RigidBody';

			/**
			 * @memberof Duck.Types.PhysicsBody.KinematicBody
			 * @description A type of PhysicsBody that cannot be moved and cannot be effected by gravity and friction.
			 * @since 2.0.0
			 */
			export type StaticBody = 'StaticBody';
		}

		export namespace Animation {
			export interface Config {
				/**
				 * @memberof Duck.Types.Animation.Config
				 * @description Key / Name of Animation
				 * @type string
				 * @since 2.0.0
				 */
				key: string;

				/**
				 * @memberof Duck.Types.Animation.Config
				 * @description Frames of the Animation, objects that are later converted to AnimationFrame
				 * @type Duck.Types.Animation.FrameBase[]
				 * @since 2.0.0
				 */
				frames: FrameBase[];

				/**
				 * @memberof Duck.Types.Animation.Config
				 * @description The frame rate of the animation
				 * @type number
				 * @since 2.0.0
				 */
				frameRate: number;

				/**
				 * @memberof Duck.Types.Animation.Config
				 * @description Determines the amount of times the Animation loops, optional -> defaults: 1
				 * @type number
				 * @since 2.0.0
				 */
				repeat?: number;

				/**
				 * @memberof Duck.Types.Animation.Config
				 * @description Determines if the animation plays in the opposite direction of its current direction and switches on end, like a yoyo
				 * optional -> defaults: false
				 * @type boolean
				 * @since 2.0.0
				 */
				yoyo?: boolean;

				/**
				 * @memberof Duck.Types.Animation.Config
				 * @description The amount of milliseconds that is waited for before playing the animation, optional -> defaults: 0
				 * @type number
				 * @since 2.0.0
				 */
				delay?: number;

				/**
				 * @memberof Duck.Types.Animation.Config
				 * @description Determines if the Animation timers count by the Game.deltaTime, set to true if used in the Scene.update method, and false
				 * otherwise, optional -> defaults: false
				 * @type boolean
				 * @since 2.0.0
				 */
				useDelta?: boolean;
			}

			export interface FrameBase {
				col: number;
				row: number;
			}
		}

		export namespace StateMachine {
			export interface ConnectionBase {
				from: ConnectionBaseValue;
				to: ConnectionBaseValue;
				connType: 'one' | 'loop';
			}

			export interface ConnectionBaseValue {
				key: string;
				vector: Vector2Class;
				autoAdvance?: boolean;
			}

			export interface Config {
				defaultState: string;
				connections: ConnectionBase[];
			}
		}

		export namespace KeyboardInput {
			export interface KeyBase {
				keyCode: number;
				descriptor: string;
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				keyDown?: (e: KeyboardEvent) => any;
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				keyUp?: (e: KeyboardEvent) => any;
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				keyJustPressed?: (e: KeyboardEvent) => any;
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				keyState?: (e: KeyboardEvent, state: boolean) => any;
			}
		}

		export namespace MouseInput {
			export interface MouseBase {
				button: 0 | 1 | 2 | 3 | 4;
				descriptor: string;
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				mouseDown?: (e: MouseEvent) => any;
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				mouseUp?: (e: MouseEvent) => any;
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				mouseMove?: (e: MouseEvent) => any;
			}
		}

		export namespace Camera {
			export interface CullingOptions {
				/**
				 * @memberof Duck.Types.Camera.CullingOptions
				 * @description Determines if the visibility of the renderable is preserved, renderable's culled property will only be modified instead
				 * of the visibility property, this keeps hidden renderables hidden and visible renderables based on the culled property
				 * @default true
				 * @type boolean
				 * @since 2.1.0
				 */
				preserveVisibility?: boolean;

				/**
				 * @memberof Duck.Types.Camera.CullingOptions
				 * @description Determines if the enabled property of PhysicsBodies will be modified base on if the renderable is culled
				 * @default true
				 * @type boolean
				 * @since 2.1.0
				 */
				modifyPhysicsEnable?: boolean;
			}
		}

		export namespace TextureAtlas {
			export interface FrameData {
				key: string;
				x: number;
				y: number;
				w: number;
				h: number;
			}

			export interface JSONSchema {
				name: string;
				data: FrameData[];
			}
		}

		export namespace Math {
			export interface Vector2Like {
				x: number;
				y: number;
			}

			export interface Vector2LikeOptional {
				x?: number;
				y?: number;
			}

			export interface BoundsLike extends Vector2Like {
				w: number;
				h: number;
			}
		}

		export namespace Helper {
			type ArrayLengthMutationKeys =
				| 'splice'
				| 'push'
				| 'pop'
				| 'shift'
				| 'unshift'
				| number;
			type ArrayItems<T extends Array<unknown>> = T extends Array<
				infer TItems
			>
				? TItems
				: never;
			export type FixedLengthArray<T extends unknown[]> = Pick<
				T,
				Exclude<keyof T, ArrayLengthMutationKeys>
			> & { [Symbol.iterator]: () => IterableIterator<ArrayItems<T>> };

			//#region Long Type
			export type AlphaRange =
				| 0
				| 0.01
				| 0.02
				| 0.03
				| 0.04
				| 0.05
				| 0.06
				| 0.07
				| 0.08
				| 0.09
				| 0.1
				| 0.11
				| 0.12
				| 0.13
				| 0.14
				| 0.15
				| 0.16
				| 0.17
				| 0.18
				| 0.19
				| 0.2
				| 0.21
				| 0.22
				| 0.23
				| 0.24
				| 0.25
				| 0.26
				| 0.27
				| 0.28
				| 0.29
				| 0.3
				| 0.31
				| 0.32
				| 0.33
				| 0.34
				| 0.35
				| 0.36
				| 0.37
				| 0.38
				| 0.39
				| 0.4
				| 0.41
				| 0.42
				| 0.43
				| 0.44
				| 0.45
				| 0.46
				| 0.47
				| 0.48
				| 0.49
				| 0.5
				| 0.51
				| 0.52
				| 0.53
				| 0.54
				| 0.55
				| 0.56
				| 0.57
				| 0.58
				| 0.59
				| 0.6
				| 0.61
				| 0.62
				| 0.63
				| 0.64
				| 0.65
				| 0.66
				| 0.67
				| 0.68
				| 0.69
				| 0.7
				| 0.71
				| 0.72
				| 0.73
				| 0.74
				| 0.75
				| 0.76
				| 0.77
				| 0.78
				| 0.79
				| 0.8
				| 0.81
				| 0.82
				| 0.83
				| 0.84
				| 0.85
				| 0.86
				| 0.87
				| 0.88
				| 0.89
				| 0.9
				| 0.91
				| 0.92
				| 0.93
				| 0.94
				| 0.95
				| 0.96
				| 0.97
				| 0.98
				| 0.99
				| 1;
			//#endregion Long Type
		}
	}
}

// export

/**
 * @namespace
 * @property {Game} game Game Class
 * @property {Scene} scene Scene Class
 * @description Main Export of DuckEngine
 * @since 1.0.0-beta
 */
const DuckEngine = {
	Game: GameClass,
	Scene: SceneClass,
};

export default DuckEngine;
