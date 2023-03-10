import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Dragon from "./Dragon/Dragon.js";
import Background from "./Background/Background.js";
import Pillarup from "./Pillarup/Pillarup.js";
import Pillardown from "./Pillardown/Pillardown.js";
import Cannon from "./Cannon/Cannon.js";
import Cannonball from "./Cannonball/Cannonball.js";
import Shadowball from "./Shadowball/Shadowball.js";
import Scorecounter from "./Scorecounter/Scorecounter.js";
import Dragonhitbox from "./Dragonhitbox/Dragonhitbox.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Dragon: new Dragon({
    x: -120,
    y: -51,
    direction: 90,
    costumeNumber: 3,
    size: 50,
    visible: true,
    layerOrder: 8
  }),
  Background: new Background({
    x: -465,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 320,
    visible: false,
    layerOrder: 1
  }),
  Pillarup: new Pillarup({
    x: 111,
    y: 142,
    direction: 0,
    costumeNumber: 1,
    size: 250,
    visible: false,
    layerOrder: 3
  }),
  Pillardown: new Pillardown({
    x: -205.20999999999995,
    y: -239,
    direction: 0,
    costumeNumber: 1,
    size: 250,
    visible: false,
    layerOrder: 7
  }),
  Cannon: new Cannon({
    x: 300,
    y: 253,
    direction: -125.35660821120945,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 9
  }),
  Cannonball: new Cannonball({
    x: -35,
    y: 37,
    direction: 90,
    costumeNumber: 1,
    size: 50,
    visible: false,
    layerOrder: 4
  }),
  Shadowball: new Shadowball({
    x: 58.3553390593274,
    y: 187,
    direction: 0,
    costumeNumber: 1,
    size: 75,
    visible: false,
    layerOrder: 2
  }),
  Scorecounter: new Scorecounter({
    x: 225,
    y: 0,
    direction: 90,
    costumeNumber: 10,
    size: 400,
    visible: false,
    layerOrder: 5
  }),
  Dragonhitbox: new Dragonhitbox({
    x: -120,
    y: -51,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 6
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
