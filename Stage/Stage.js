/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop1", "./Stage/costumes/backdrop1.svg", {
        x: 263.76351351351343,
        y: 190.18993993993993
      })
    ];

    this.sounds = [
      new Sound("bgm1", "./Stage/sounds/bgm1.wav"),
      new Sound("bgm2", "./Stage/sounds/bgm2.wav"),
      new Sound("bgm3", "./Stage/sounds/bgm3.mp3"),
      new Sound("bgm4", "./Stage/sounds/bgm4.mp3")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked3),
      new Trigger(Trigger.BROADCAST, { name: "reset" }, this.whenIReceiveReset),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked4),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked5),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked6),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked7)
    ];

    this.vars.yVel = -6;
    this.vars.game = 1;
    this.vars.normalspeed = -15;
    this.vars.score = 0;
    this.vars.timer = 108;
    this.vars.customspeed = 0;
    this.vars.gamespeed = 0;
  }

  *whenGreenFlagClicked() {
    this.vars.customspeed = 0;
    while (true) {
      this.vars.normalspeed = -15 - this.toNumber(this.vars.score) / 4;
      if (this.compare(this.vars.customspeed, this.vars.normalspeed) > 0) {
        this.vars.gamespeed = this.vars.customspeed;
      } else {
        this.vars.gamespeed = this.vars.normalspeed;
      }
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    while (true) {
      this.vars.timer = Math.ceil(this.timer);
      yield;
    }
  }

  *whenGreenFlagClicked3() {
    this.vars.score = 0;
  }

  *whenIReceiveReset() {
    this.vars.customspeed = 0;
  }

  *whenGreenFlagClicked4() {
    while (!(this.compare(this.vars.score, -1) > 0)) {
      yield;
    }
    while (!(this.compare(this.vars.score, 499) > 0)) {
      yield* this.playSoundUntilDone("bgm1");
      yield;
    }
  }

  *whenGreenFlagClicked5() {
    while (!(this.compare(this.vars.score, 499) > 0)) {
      yield;
    }
    while (!(this.compare(this.vars.score, 999) > 0)) {
      yield* this.playSoundUntilDone("bgm2");
      yield;
    }
  }

  *whenGreenFlagClicked6() {
    while (!(this.compare(this.vars.score, 999) > 0)) {
      yield;
    }
    while (!(this.compare(this.vars.score, 1000) < 0)) {
      yield* this.playSoundUntilDone("bgm3");
      yield;
    }
  }

  *whenGreenFlagClicked7() {
    while (true) {
      if (
        this.toNumber(this.vars.score) === 500 ||
        this.toNumber(this.vars.score) === 1000
      ) {
        this.stopAllSounds();
      }
      yield;
    }
  }
}
