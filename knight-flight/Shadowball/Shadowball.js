/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Shadowball extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("1", "./Shadowball/costumes/1.png", { x: 150, y: 150 }),
      new Costume("2", "./Shadowball/costumes/2.png", { x: 150, y: 150 }),
      new Costume("3", "./Shadowball/costumes/3.png", { x: 150, y: 150 }),
      new Costume("4", "./Shadowball/costumes/4.png", { x: 150, y: 150 }),
      new Costume("5", "./Shadowball/costumes/5.png", { x: 150, y: 150 }),
      new Costume("6", "./Shadowball/costumes/6.png", { x: 150, y: 150 }),
      new Costume("7", "./Shadowball/costumes/7.png", { x: 150, y: 150 }),
      new Costume("8", "./Shadowball/costumes/8.png", { x: 150, y: 150 }),
      new Costume("9", "./Shadowball/costumes/9.png", { x: 150, y: 150 })
    ];

    this.sounds = [
      new Sound("pop", "./Shadowball/sounds/pop.wav"),
      new Sound("shadowrealm", "./Shadowball/sounds/shadowrealm.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(Trigger.CLONE_START, this.startAsClone3),
      new Trigger(Trigger.BROADCAST, { name: "reset" }, this.whenIReceiveReset),
      new Trigger(Trigger.CLONE_START, this.startAsClone4),
      new Trigger(Trigger.CLONE_START, this.startAsClone5)
    ];
  }

  *whenGreenFlagClicked() {
    while (true) {
      if (
        this.toNumber(this.stage.vars.game) === 1 &&
        this.compare(this.stage.vars.score, 4) > 0
      ) {
        while (true) {
          this.visible = false;
          while (true) {
            this.createClone();
            yield* this.wait(5);
            yield;
          }
          yield;
        }
      }
      yield;
    }
  }

  *startAsClone() {
    this.size = 75;
    this.moveBehind(1);
    this.direction = 0;
    while (true) {
      if (
        this.toNumber(this.stage.vars.game) === 1 &&
        this.compare(this.stage.vars.score, 4) > 0
      ) {
        this.visible = true;
        this.goto(267, 0);
        for (let i = 0; i < 25; i++) {
          this.x += -15 - this.toNumber(this.stage.vars.score) / 100;
          if (this.touching(this.sprites["Dragon"].andClones())) {
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
    while (true) {
      yield* this.wait(0.1);
      this.costumeNumber++;
      yield;
    }
  }

  *startAsClone3() {
    while (true) {
      this.direction = 0;
      for (let i = 0; i < 10; i++) {
        this.move(15);
        yield;
      }
      yield* this.wait(0.1);
      this.direction = 180;
      for (let i = 0; i < 10; i++) {
        this.move(15);
        yield;
      }
      yield* this.wait(0.1);
      yield;
    }
  }

  *whenIReceiveReset() {
    this.stage.vars.game = 0;
    this.deleteThisClone();
  }

  *startAsClone4() {
    while (true) {
      if (this.touching(this.sprites["Dragonhitbox"].andClones())) {
        this.broadcast("reset");
      }
      yield;
    }
  }

  *startAsClone5() {
    while (true) {
      while (!this.touching(this.sprites["Dragonhitbox"].andClones())) {
        yield;
      }
      yield* this.startSound("shadowrealm");
      yield;
    }
  }
}
