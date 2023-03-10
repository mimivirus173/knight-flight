/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Scorecounter extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("1", "./Scorecounter/costumes/1.svg", { x: 2.5, y: 3.5 }),
      new Costume("2", "./Scorecounter/costumes/2.svg", { x: 2.5, y: 3.5 }),
      new Costume("3", "./Scorecounter/costumes/3.svg", { x: 2.5, y: 3.5 }),
      new Costume("4", "./Scorecounter/costumes/4.svg", { x: 3, y: 3.5 }),
      new Costume("5", "./Scorecounter/costumes/5.svg", { x: 2.5, y: 3.5 }),
      new Costume("6", "./Scorecounter/costumes/6.svg", { x: 2.5, y: 3.5 }),
      new Costume("7", "./Scorecounter/costumes/7.svg", { x: 3, y: 3.5 }),
      new Costume("8", "./Scorecounter/costumes/8.svg", { x: 2.5, y: 3.5 }),
      new Costume("9", "./Scorecounter/costumes/9.svg", { x: 2.5, y: 3.5 }),
      new Costume("0", "./Scorecounter/costumes/0.svg", { x: 2.5, y: 3.5 })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone)
    ];

    this.vars.scoredigits = 11;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.vars.scoredigits = 1;
    for (let i = 0; i < 10; i++) {
      this.createClone();
      this.vars.scoredigits++;
      yield;
    }
  }

  *startAsClone() {
    this.moveAhead();
    this.visible = true;
    while (true) {
      this.goto(-230 + this.toNumber(this.vars.scoredigits) * 19, 150);
      if (
        this.compare(
          this.toString(this.stage.vars.score).length,
          this.vars.scoredigits
        ) < 0
      ) {
        this.visible = false;
      } else {
        this.visible = true;
        this.costume = this.letterOf(
          this.stage.vars.score,
          this.vars.scoredigits - 1
        );
      }
      yield;
    }
  }
}
