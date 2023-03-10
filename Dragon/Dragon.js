/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Dragon extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("n1", "./Dragon/costumes/n1.svg", { x: 74, y: 56.5 }),
      new Costume("n2", "./Dragon/costumes/n2.svg", {
        x: 74.00000000000003,
        y: 46.5
      }),
      new Costume("n3", "./Dragon/costumes/n3.svg", {
        x: 74.00000000000003,
        y: 46.5
      }),
      new Costume("n4", "./Dragon/costumes/n4.svg", {
        x: 73.99999999999997,
        y: 46.5
      }),
      new Costume("n5", "./Dragon/costumes/n5.svg", { x: 74, y: 46.5 }),
      new Costume("n6", "./Dragon/costumes/n6.svg", {
        x: 73.99999999999997,
        y: 46.5
      }),
      new Costume("n7", "./Dragon/costumes/n7.svg", { x: 74, y: 46.5 }),
      new Costume("n8", "./Dragon/costumes/n8.svg", {
        x: 73.99999999999997,
        y: 52.5
      }),
      new Costume("n9", "./Dragon/costumes/n9.svg", {
        x: 74.00000000000003,
        y: 62.5
      }),
      new Costume("n10", "./Dragon/costumes/n10.svg", {
        x: 74.00000000000003,
        y: 56.5
      }),
      new Costume("o1", "./Dragon/costumes/o1.png", { x: 100, y: 100 }),
      new Costume("o2", "./Dragon/costumes/o2.png", { x: 100, y: 100 }),
      new Costume("o3", "./Dragon/costumes/o3.png", { x: 100, y: 100 }),
      new Costume("o4", "./Dragon/costumes/o4.png", { x: 100, y: 100 }),
      new Costume("o5", "./Dragon/costumes/o5.png", { x: 100, y: 100 }),
      new Costume("o6", "./Dragon/costumes/o6.png", { x: 100, y: 100 }),
      new Costume("o7", "./Dragon/costumes/o7.png", { x: 100, y: 100 }),
      new Costume("o8", "./Dragon/costumes/o8.png", { x: 100, y: 100 }),
      new Costume("o9", "./Dragon/costumes/o9.png", { x: 100, y: 100 })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked3),
      new Trigger(Trigger.BROADCAST, { name: "reset" }, this.whenIReceiveReset),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked4),
      new Trigger(
        Trigger.KEY_PRESSED,
        { key: "space" },
        this.whenKeySpacePressed
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked5),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked6),
      new Trigger(Trigger.KEY_PRESSED, { key: "n" }, this.whenKeyNPressed),
      new Trigger(Trigger.KEY_PRESSED, { key: "o" }, this.whenKeyOPressed),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked7),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked8)
    ];

    this.vars.dragon = 0;
  }

  *whenGreenFlagClicked() {
    this.size = 50;
    this.goto(-120, 0);
    while (true) {
      if (this.toNumber(this.stage.vars.game) === 1) {
        while (true) {
          if (this.keyPressed("space")) {
            this.stage.vars.yVel += 1.5;
          } else {
            if (this.compare(this.stage.vars.yVel, -7) > 0) {
              this.stage.vars.yVel -= 1.5;
            }
            if (this.touching("edge")) {
              this.stage.vars.yVel = 0;
            }
          }
          this.y += this.toNumber(this.stage.vars.yVel);
          yield;
        }
      }
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    while (true) {
      if (this.touching("edge")) {
        this.stage.vars.yVel = -0.5 * this.toNumber(this.stage.vars.yVel);
        this.y += this.toNumber(this.stage.vars.yVel);
        if (this.touching("edge")) {
          this.y += this.toNumber(this.stage.vars.yVel);
        }
        if (
          this.compare(this.stage.vars.yVel, 0) > 0 &&
          this.keyPressed("space")
        ) {
          this.stage.vars.yVel = 5;
        }
      }
      yield;
    }
  }

  *whenGreenFlagClicked3() {
    this.vars.dragon = 0;
    while (true) {
      if (this.toNumber(this.vars.dragon) === 0) {
        yield* this.wait(0.01);
        this.costume = "n1";
        yield* this.wait(0.01);
        this.costume = "n2";
        yield* this.wait(0.01);
        this.costume = "n3";
        yield* this.wait(0.01);
        this.costume = "n4";
        yield* this.wait(0.01);
        this.costume = "n5";
        yield* this.wait(0.01);
        this.costume = "n6";
        yield* this.wait(0.01);
        this.costume = "n7";
        yield* this.wait(0.01);
        this.costume = "n8";
        yield* this.wait(0.01);
        this.costume = "n9";
        yield* this.wait(0.01);
        this.costume = "n10";
      }
      yield;
    }
  }

  *whenIReceiveReset() {
    this.stage.vars.game = 0;
    this.stage.vars.score = 0;
    this.stage.vars.normalspeed = -20;
    this.goto(-120, 0);
  }

  *whenGreenFlagClicked4() {
    this.stage.vars.game = 0;
    this.stage.vars.yVel = 0;
    this.stage.vars.score = 0;
  }

  *whenKeySpacePressed() {
    this.stage.vars.game = 1;
    return;
  }

  *whenGreenFlagClicked5() {
    while (!(this.toNumber(this.stage.vars.score) === 10000)) {
      yield;
    }
    yield* this.sayAndWait("How did you get here?", 3);
  }

  *whenGreenFlagClicked6() {
    while (true) {
      if (this.toNumber(this.vars.dragon) === 0) {
        this.size = 50;
      } else {
        this.size = 100;
      }
      yield;
    }
  }

  *whenKeyNPressed() {
    this.vars.dragon = 0;
  }

  *whenKeyOPressed() {
    this.vars.dragon = 1;
  }

  *whenGreenFlagClicked7() {
    while (true) {
      if (this.toNumber(this.vars.dragon) === 1) {
        yield* this.wait(0.01);
        this.costume = "o1";
        yield* this.wait(0.01);
        this.costume = "o2";
        yield* this.wait(0.01);
        this.costume = "o3";
        yield* this.wait(0.01);
        this.costume = "o4";
        yield* this.wait(0.01);
        this.costume = "o5";
        yield* this.wait(0.01);
        this.costume = "o6";
        yield* this.wait(0.01);
        this.costume = "o7";
        yield* this.wait(0.01);
        this.costume = "o8";
        yield* this.wait(0.01);
        this.costume = "o9";
      }
      yield;
    }
  }

  *whenGreenFlagClicked8() {
    while (!(this.toNumber(this.stage.vars.score) === 1000)) {
      yield;
    }
    yield* this.sayAndWait("Suffer", 3);
  }
}
