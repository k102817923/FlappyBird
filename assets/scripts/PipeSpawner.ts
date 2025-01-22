import { _decorator, Component, instantiate, math, Prefab } from "cc";
import { Status } from "./Enum";
import { Pipe } from "./Pipe";
const { ccclass, property } = _decorator;

@ccclass("PipeSpawner")
export class PipeSpawner extends Component {
  @property(Prefab)
  pipePrefab: Prefab = null;

  @property
  rate: number = 2;

  private timer: number = 1;

  private status: Status = Status.READY;

  start() {}

  update(deltaTime: number) {
    if (this.status !== Status.RUNNING) return;

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

  public updateStatus(status: Status) {
    this.status = status;

    if (status === Status.GAME_OVER) {
      const childrens = this.node.children;
      for (let i = 0; i < childrens.length; i++) {
        const pipe = childrens[i].getComponent(Pipe);
        if (pipe) pipe.enabled = false;
      }
    }
  }
}
