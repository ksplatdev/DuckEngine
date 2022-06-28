// import duckengine and duck for types
import DuckEngine, { Duck } from '../../dist';

export default class MainScene extends DuckEngine.Scene {
	public myRect!: Duck.TypeClasses.GameObjects.GameObject<'color'>;
	public myCircle!: Duck.TypeClasses.GameObjects.GameObject<'color'>;
	public gameObjects!: Duck.TypeClasses.Misc.Group<
		Duck.TypeClasses.GameObjects.GameObject<'color'>
	>;

	public myCamera!: Duck.TypeClasses.Cameras.Camera;

	public myParticle!: Duck.TypeClasses.GameObjects.Particles.Particle;
	public myParticleEmitter!: Duck.TypeClasses.GameObjects.Particles.ParticleEmitter;

	public myInput!: Duck.TypeClasses.Input.KeyboardInput;
	private mySpeed = 250;

	constructor(game: Duck.TypeClasses.Game) {
		super('main', game);
	}

	public create() {
		// gameobjects
		this.myRect = this.add.gameobject.rect(
			0,
			0,
			15,
			15,
			this.add.color('#ffffff')
		);
		this.myCircle = this.add.gameobject.circle(
			50,
			50,
			10,
			this.add.color('#ffffff')
		);

		this.gameObjects = this.add.group<
			Duck.TypeClasses.GameObjects.GameObject<Duck.Types.Texture.Type>
		>('gameObjects', [this.myRect, this.myCircle]);

		// colliders and hitboxes
		this.myRect.physics.addHitbox();
		this.myCircle.physics.addHitbox();

		this.myRect.physics.addCollider([this.myCircle]);

		// camera
		this.myCamera = this.add.mainCamera();
		this.myCamera.setFOV(1.1);
		this.myCamera.setFOVSmooth(50, 0.1, this.myCamera.defaultFOV);
		this.myCamera.startFollow(this.myRect, 0.1, 0.1);

		// particles
		this.myParticle = this.add.particle(
			'circle',
			0,
			0,
			5,
			this.tools.color.randomWithAlpha(0.5)
		);
		this.myParticleEmitter = this.add.particleEmitter(
			this.myParticle,
			[0, 10],
			[0, 10],
			50
		);

		this.myParticleEmitter.emit();
		this.myParticleEmitter.keepEmitting(100, 100);
		this.myParticleEmitter.float([-200, 200], [-100, -300]);

		// input
		this.myInput = this.add.input().createKeyboardInput();

		this.myInput.addKeys([
			{
				keyCode: 87, // w
				descriptor: 'W',
			},
			{
				keyCode: 83, // s
				descriptor: 'S',
			},
			{
				keyCode: 65, // a
				descriptor: 'A',
			},
			{
				keyCode: 68, // d
				descriptor: 'D',
			},
			{
				keyCode: 16, // shift
				descriptor: 'SPRINT',
				keyDown: () => {
					this.mySpeed = 350;
				},
				keyUp: () => {
					this.mySpeed = 250;
				},
			},
		]);
	}

	public update() {
		if (this.myInput.inputs.W.state) {
			this.myRect.setVelocity('y', -this.mySpeed);
		}
		if (this.myInput.inputs.S.state) {
			this.myRect.setVelocity('y', this.mySpeed);
		}
		if (this.myInput.inputs.A.state) {
			this.myRect.setVelocity('x', -this.mySpeed);
		}
		if (this.myInput.inputs.D.state) {
			this.myRect.setVelocity('x', this.mySpeed);
		}

		// offload particles
		this.myParticleEmitter.offloadBounds({
			x: 0,
			y: 0,
			w: this.game.canvas.width,
			h: this.game.canvas.height,
		});
		this.myParticleEmitter.offloadMaxAge(10);
		this.myParticleEmitter.offloadMaxAmount(100);

		if (this.myRect.isCollidingGroup([this.myCircle])) {
			this.myRect.setFillColor('#ff0000');
		} else {
			this.myRect.setFillColor('#2185d1');
		}
	}
}
