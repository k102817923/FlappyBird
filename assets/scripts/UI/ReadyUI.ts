import { _decorator, Component, Input, input, Node } from "cc";
import { GameManager } from "../GameManager";
const { ccclass } = _decorator;

@ccclass("ReadyUI")
export class ReadyUI extends Component {
  protected onLoad(): void {
    input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
  }

  protected onDestroy(): void {}

  start() {}

  update(deltaTime: number) {}

  onTouchStart() {
    GameManager.getInstance().transitionToRunning();
  }

  public show() {
    this.node.active = true;
  }

  public hide() {
    this.node.active = false;
  }
}
