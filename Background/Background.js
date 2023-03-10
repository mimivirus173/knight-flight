/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Background extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("day", "./Background/costumes/day.svg", { x: 75, y: 75 }),
      new Costume("night", "./Background/costumes/night.svg", { x: 75, y: 75 })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2)
    ];
  }

  *whenGreenFlagClicked() {
    this.goto(0, 0);
    this.visible = true;
    this.moveBehind();
    for (let i = 0; i < 93; i++) {
      this.x -= 10;
      yield;
    }
    this.visible = false;
    this.deleteThisClone();
  }

  *whenGreenFlagClicked2() {
    this.costume = "day";
    while (true) {
      this.createClone();
      yield* this.wait(1.5);
      yield;
    }
  }

  *startAsClone() {
    this.goto(470, 0);
    this.visible = true;
    this.moveBehind();
    for (let i = 0; i < 93; i++) {
      this.x -= 10;
      yield;
    }
    this.visible = false;
    this.deleteThisClone();
  }

  *startAsClone2() {
    this.costume = "day";
    while (!(this.compare(this.stage.vars.score, 19) > 0)) {
      yield;
    }
    this.costumeNumber++;
    while (!(this.compare(this.stage.vars.score, 29) > 0)) {
      yield;
    }
    this.costumeNumber++;
    while (!(this.compare(this.stage.vars.score, 39) > 0)) {
      yield;
    }
    this.costumeNumber++;
  }
}
