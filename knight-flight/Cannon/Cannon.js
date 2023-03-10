/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Cannon extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("cannon", "./Cannon/costumes/cannon.svg", {
        x: 17.555472322161677,
        y: 43.75554980058334
      })
    ];

    this.sounds = [new Sound("pop", "./Cannon/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked3)
    ];
  }

  *whenGreenFlagClicked() {
    this.moveAhead();
    this.goto(300, 300);
    this.visible = false;
    while (true) {
      if (
        this.toNumber(this.stage.vars.game) === 1 &&
        this.toNumber(this.stage.vars.score) === 10
      ) {
        this.visible = true;
        yield* this.glide(1, 235, 170);
      } else {
        this.goto(300, 300);
        this.visible = false;
      }
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    while (true) {
      this.direction = this.radToScratch(
        Math.atan2(
          this.sprites["Dragon"].y - this.y,
          this.sprites["Dragon"].x - this.x
        )
      );
      yield;
    }
  }

  *whenGreenFlagClicked3() {
    while (true) {
      if (
        this.toNumber(this.stage.vars.game) === 1 &&
        this.toNumber(this.stage.vars.score) === 10
      ) {
        while (true) {
          yield* this.wait(this.random(3, 15));
          this.sprites["Cannonball"].createClone();
          yield;
        }
      }
      yield;
    }
  }
}
