import { _decorator, Component } from "cc";
import { GameManager } from "./GameManager";
const { ccclass } = _decorator;

@ccclass("Pipe")
export class Pipe extends Component {
  private moveSpeed: number;

  protected start(): void {
    this.moveSpeed = GameManager.getInstance().moveSpeed;
  }

  protected update(deltaTime: number): void {
    this.node.setPosition(
      this.node.position.x - this.moveSpeed * deltaTime,
      this.node.position.y
    );

    // 销毁管道超出屏幕左边界
    if (this.node.position.x < -900) this.node.destroy();
  }
}
