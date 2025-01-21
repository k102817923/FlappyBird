import { _decorator, Component, instantiate, math, Prefab } from "cc";
const { ccclass, property } = _decorator;

@ccclass("PipeSpawner")
export class PipeSpawner extends Component {
  @property(Prefab)
  pipePrefab: Prefab = null;

  @property
  rate: number = 2;

  private timer: number = 1;

  start() {}

  update(deltaTime: number) {
    this.timer += deltaTime;
    if (this.timer > this.rate) {
      this.timer = 0;

      const pipeInstance = instantiate(this.pipePrefab);
      this.node.addChild(pipeInstance);

      const p = this.node.getWorldPosition();
      pipeInstance.setWorldPosition(p);

      const y = math.randomRangeInt(-100, 200);
      const pLocal = pipeInstance.getPosition();
      pipeInstance.setPosition(pLocal.x, y);
    }
  }
}
