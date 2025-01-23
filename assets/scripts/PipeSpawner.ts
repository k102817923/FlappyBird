import { _decorator, Component, instantiate, math, Prefab } from "cc";
import { Status } from "./Enum";
import { Pipe } from "./Pipe";
const { ccclass, property } = _decorator;

@ccclass("PipeSpawner")
export class PipeSpawner extends Component {
  private static instance: PipeSpawner = null;

  public static getInstance(): PipeSpawner {
    return this.instance;
  }

  @property(Prefab)
  private pipePrefab: Prefab = null;

  private rate = 3;

  private timer = 1;

  private status: Status;

  protected onLoad(): void {
    PipeSpawner.instance = this;
  }

  protected start(): void {}

  protected update(deltaTime: number): void {
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

  public updateRate(rate: number) {
    if (this.rate === rate) return;

    this.rate = rate;

    const childrens = this.node.children;
    for (let i = 0; i < childrens.length; i++) {
      const pipe = childrens[i].getComponent(Pipe);
      if (pipe) pipe.node.active = false;
    }
  }
}
