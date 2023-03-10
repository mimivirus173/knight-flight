/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Dragonhitbox extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Dragonhitbox/costumes/costume1.svg", {
        x: 38.921052631579016,
        y: 17.078947368421012
      })
    ];

    this.sounds = [new Sound("pop", "./Dragonhitbox/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    while (true) {
      this.effects.ghost = 100;
      this.goto(this.sprites["Dragon"].x, this.sprites["Dragon"].y);
      yield;
    }
  }
}
