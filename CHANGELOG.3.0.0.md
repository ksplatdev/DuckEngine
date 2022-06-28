# 3.0.0 Changelog - 2022-06-28

This update improves and adds flexibility to rendering.

This update overhauls the physics system by adding a complete new SAT collision system with different shaped hitboxes and multiple adjustable
hitboxes for PhysicsBody.

This update overhauls the sound system by adding support for WebAudio and fallback to HTMLAudio.

This update improves the animation system by adding Tweens and more.

------------------------------------------------------------------------------------------------------

## Added

- New Classes
  - Added Color class to store and manage color info and strokes
- Scene
  - Add
    - Added color method to Scene.add

## Changed

- Misc
  - Changed startup message and version
- Rendering
  - Replaced all use of strings for colors with new Color class
- Scene
  - Tools
    - color.random now returns a Color instance and not a string

## Removed

## Deprecated

## Fixed

- Scene
  - Tools
    - Fixed chance of color.random returning invalid color

## FaQ
