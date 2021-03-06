# v2.1.0 Changelog - 2021-11-23

This update increases performance and decreases memory usage and GC calls by creating a new CanvasRenderer and RendererPipeline.

This update starts the overhaul of the UI *(previously Interactive)* system with new features and fixes.

This update adds new features to textures by using cache and more new texture classes.

*Most changes and additions are included in this changelog, however, some ***may*** be missing.*
*(Found something missing? [Contribute!](README.md#developers-guide))*

------------------------------------------------------------------------------------------------------

## Added

- SoundPlayer
  - Added loop to config
  - Added loop and stop method
- Core
  - Renderer
    - Added new CanvasRenderer and RendererPipeline
  - Made Game loop more efficient by looping only through visible scenes and already pooled visible renderables use RendererPipeline
    - This makes GC calls less often
  - DisplayManager
    - Added new class DisplayManages, Manages the scale of the canvas
- Game
  - Added condition where deltaTimeArray must have more than 99 items before rendering to prevent delta time speed up on game start
  - Events
    - Added SYNC_CACHE event
- Scene
  - Added onSceneActive and onSceneInactive methods that are called when visible is set to true and false
  - Added createTimer method that returns a new Timer instance
  - Added setVisible method to set the visibility of the scene and it immediately updates it by pooling the RendererPipeline
- GameObject
  - Added setVisible method to set the visibility of the scene and it immediately updates it by pooling the RendererPipeline
- Events
  - Added Renderer Events
  - Added Display Events
- ParticleEmitter
  - Added autoCreate option to constructor
- Textures
  - Added new TextureBase class
  - Added new TextureSheet class to store info about spritesheets
  - Added new TextureAtlas class which creates and loads Texture classes into Scene.loader.textureStack (previously called imageStack) that are clipped from the main texture
- Loader
  - Added CacheManager support for faster loading
  - Added loadTextureSheet method to create and load a spritesheet
  - Added loadTextureAtlas method which loads and creates a TextureAtlas class
- CacheManager
  - Added support for fallback to memory-cache for all methods that use localStorage, does not interfer with syncValues
- UI
  - Added new UI class
- Camera
  - Added optional options (Duck.Types.Camera.CullingOptions) to cull and autoCull methods
- Group
  - Added physics filter can now also filter hitboxes and PhysicsBodies
  - Added method at to return an item or undefined at a specified index
- Keyboard Input & Key
  - Added state argument to keyState callback
- Types
  - Added new Renderable type (replaces old renderable type)
    - Added new prop culled
- Misc
  - Added wiki-pages folder
  - Added new layer "fades" to Duck.Layers.Rendering.zIndex
  - Added new wiki page, [Getting Started](https://github.com/ksplatdev/DuckEngine/wiki/Getting-Started)
  - Added checkout script for developers

## Changed

- ParticleEmitter
  - Made create and createOne methods public
- Core
  - Changed how rendering is handled (new CanvasRenderer and RendererPipeline)
  - All renderables now implement the new Renderable interface
  - Renderables only render if both the visible and culled properties are true
- Game
  - Loading always has a delay for pooling of RendererPipeline: (config.splashScreen.extraDuration || 0) + (config.poolingInterval || 1000)
  - oldWidth and oldHeight properties are now public instead of protected
  - New DisplayManager now handles scaling
  - Changed config.scale to be Duck.Types.Math.Vector2Like instead of Duck.Types.Misc.Scale
- StaticLight
  - Blend mode is now lighten instead of lighter
- Gameobjects/interactive is now Gameobjects/ui in the file structure and type classes and classes
- UI
  - All previous uis *(previously called Interactive)* now extend the new UI class
- File Structure
  - Move src/core/models/texture.ts to src/core/texture
- Camera
  - Changed how renderable's visible and enabled properties are effected by cull and autoCull methods
    - Ex: If a renderable's visible property is false, it will stay false even though it's culled property is true
    - Renderables only render if both the visible and culled properties are true
  - Made fieldOfView and distance (zoom) properties public
- Loader
  - Changed imageStack property to textureStack, an array of StackItem with TextureBase classes
- Group
  - Change group filter interactive to ui
  - Changed type generic to any making groups allow a group of anything
- Helpers
  - Colors
    - getValuesRGB now returns numbers instead of strings

## Removed

- Game
  - Removed ctx property which is now replaced by Game.renderer.ctx
  - Removed fullscreen and unfullscreen methods, replaced by Game.displayManager.fullscreen and unfullscreen
  - Removed scaleToWindow and resetScale methods, replaced by Game.displayManager.scaleToWindow and resetScale
  - Events
    - Removed fullscreen and unfullscreen events, replaces by DisplayEvents
- Types
  - Removed **type** Duck.Types.Renderable which has been replaced with Duck.Types.Renderable **interface** that is now implemented into classes

## Deprecated

- Render
  - Deprecated onChange method

## Fixed

- SoundPlayer
  - Fixed all types in config to true types
- Game.scaleToWindow always debugs without config setting
- Fixed effects showing the particles before emitting
- Fixed ParticleEmitter particles showing before emitting
- Fixed EventEmitter not applying args correctly to callbacks
- Fixed PhysicsServer also applying gravity which was incorrect
- Fixed ParticleEmitter.setRange not updated existing particle positions based on new ranges
- Fixed Effect following not setting the ranges correctly
- Fixed JSDoc Comments "@returns"
- Fixed group filter method not correctly filtering
- Fixed camera cull and autoCull not preserving the renderable's falsy visibility if set (new feature)
- Fixed delta time speed up on game start for the first second by adding a condition to check if the array is populated before rendering

## FaQ

Q: Any major changes in version 2.1.0?
> To find all major core changes and additions, look into [Added](#added) and [Changed](#changed) -> Core sub-lists

Q: What is a Texture Atlas?
> A TextureAtlas is a new class added in 2.1.0. This class parses a passed JSON file and creates and clips images from the passed texture into
> Texture classes which are then pushed onto the Scene.loader.textureStack array for later use. This helps load multiple textures from one image.
> [Wiki Article](https://en.wikipedia.org/wiki/Texture_atlas)
