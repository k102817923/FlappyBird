import { _decorator, Component, Input, input, Node } from "cc";
import { GameManager } from "../GameManager";
const { ccclass, property } = _decorator;

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
}
