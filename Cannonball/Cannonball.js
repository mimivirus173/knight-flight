/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Cannonball extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("New Piskel-1", "./Cannonball/costumes/New Piskel-1.png", {
        x: 150,
        y: 150
      })
    ];

    this.sounds = [
      new Sound("Bonk", "./Cannonball/sounds/Bonk.wav"),
      new Sound("KABOOM", "./Cannonball/sounds/KABOOM.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.BROADCAST, { name: "reset" }, this.whenIReceiveReset),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(Trigger.CLONE_START, this.startAsClone3)
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *startAsClone() {
    yield* this.startSound("KABOOM");
    while (true) {
      if (this.toNumber(this.stage.vars.game) === 1) {
        this.moveAhead(3);
        this.size = 25;
        this.goto(this.sprites["Cannon"].x, this.sprites["Cannon"].y);
        this.direction = this.radToScratch(
          Math.atan2(
            this.sprites["Dragon"].y - this.y,
            this.sprites["Dragon"].x - this.x
          )
        );
        this.visible = true;
        for (let i = 0; i < 30; i++) {
          this.move(15 + this.toNumber(this.stage.vars.score) / 100);
          yield;
        }
        this.deleteThisClone();
      }
      yield;
    }
  }

  *whenIReceiveReset() {
    this.stage.vars.game = 0;
    this.deleteThisClone();
  }

  *startAsClone2() {
    while (true) {
      if (this.touching(this.sprites["Dragonhitbox"].andClones())) {
        this.broadcast("reset");
      }
      yield;
    }
  }

  *startAsClone3() {
    while (true) {
      while (!this.touching(this.sprites["Dragonhitbox"].andClones())) {
        yield;
      }
      yield* this.startSound("Bonk");
      yield;
    }
  }
}
