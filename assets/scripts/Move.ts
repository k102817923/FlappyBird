import { _decorator, Component, Node } from "cc";
import { GameManager } from "./GameManager";
import { Status } from "./Enum";
const { ccclass, property } = _decorator;

@ccclass("Move")
export class Move extends Component {
  @property(Node)
  target1ToMove: Node = null;

  @property(Node)
  target2ToMove: Node = null;

  @property
  windowsWidth: number = 730;

  @property
  bg2Position: number = 728;

  private moveSpeed: number;

  private status: Status = Status.READY;

  start() {
    this.moveSpeed = GameManager.getInstance().moveSpeed;
  }

  update(deltaTime: number) {
    if (this.status !== Status.RUNNING) return;

    const moveDistance = this.moveSpeed * deltaTime;

    // 移动背景图1
    this.target1ToMove.setPosition(
      this.target1ToMove.position.x - moveDistance,
      this.target1ToMove.position.y
    );

    // 移动背景图2
    this.target2ToMove.setPosition(
      this.target2ToMove.position.x - moveDistance,
      this.target2ToMove.position.y
    );

    // 判断背景图1是否移出屏幕
    if (this.target1ToMove.position.x <= -this.windowsWidth) {
      // 将背景图1移到背景图2的右侧
      this.target1ToMove.setPosition(
        this.target2ToMove.position.x + this.bg2Position,
        this.target1ToMove.position.y
      );
    }

    // 判断背景图2是否移出屏幕
    if (this.target2ToMove.position.x <= -this.windowsWidth) {
      // 将背景图2移到背景图1的右侧
      this.target2ToMove.setPosition(
        this.target1ToMove.position.x + this.bg2Position,
        this.target2ToMove.position.y
      );
    }
  }

  public updateStatus(status: Status) {
    this.status = status;
  }
}
