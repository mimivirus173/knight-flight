/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Pillardown extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("pillar", "./Pillardown/costumes/pillar.svg", {
        x: 67,
        y: 13.999999999999972
      })
    ];

    this.sounds = [
      new Sound("point", "./Pillardown/sounds/point.wav"),
      new Sound("HEHE BOI", "./Pillardown/sounds/HEHE BOI.wav"),
      new Sound("point2", "./Pillardown/sounds/point2.wav"),
      new Sound("shawty", "./Pillardown/sounds/shawty.wav"),
      new Sound("sicko bamba", "./Pillardown/sounds/sicko bamba.wav"),
      new Sound("bwaa", "./Pillardown/sounds/bwaa.wav"),
      new Sound("Bonk", "./Pillardown/sounds/Bonk.wav"),
      new Sound(
        "YO MAMA - THEME SONG",
        "./Pillardown/sounds/YO MAMA - THEME SONG.wav"
      )
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(Trigger.BROADCAST, { name: "reset" }, this.whenIReceiveReset),
      new Trigger(Trigger.CLONE_START, this.startAsClone3)
    ];
  }

  *whenGreenFlagClicked() {
    while (true) {
      if (this.toNumber(this.stage.vars.game) === 1) {
        while (true) {
          this.visible = false;
          while (true) {
            this.createClone();
            yield* this.wait(1.5);
            yield;
          }
          yield;
        }
      }
      yield;
    }
  }

  *startAsClone() {
    this.size = 250;
    this.moveAhead(2);
    this.direction = 0;
    while (true) {
      if (this.toNumber(this.stage.vars.game) === 1) {
        this.visible = true;
        this.goto(267, this.random(-230, -250));
        while (!(this.compare(this.x, -230) < 0)) {
          this.x += -15 - this.toNumber(this.stage.vars.score) / 100;
          if (this.touching(this.sprites["Dragonhitbox"].andClones())) {
            this.broadcast("reset");
          }
          yield;
        }
        this.deleteThisClone();
      } else {
        this.deleteThisClone();
      }
      yield;
    }
  }

  *startAsClone2() {
    while (!(this.compare(this.x, -120) < 0)) {
      yield;
    }
    this.stage.vars.score++;
    if (!(this.toNumber(this.stage.vars.score) === 69)) {
      yield* this.startSound("point");
    } else {
      yield* this.startSound("HEHE BOI");
    }
    if (!(this.toNumber(this.stage.vars.score) === 500)) {
      yield* this.startSound("point");
    } else {
      yield* this.startSound("point2");
    }
  }

  *whenIReceiveReset() {
    this.stage.vars.game = 0;
    this.deleteThisClone();
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
