import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("MoveBg")
export class MoveBg extends Component {
  @property(Node)
  bg1ToMove: Node = null;

  @property(Node)
  bg2ToMove: Node = null;

  @property
  moveSpeed: number = 100;

  @property
  windowsWidth: number = 730;

  @property
  bg2Position: number = 725;

  start() {}

  update(deltaTime: number) {
    const moveDistance = this.moveSpeed * deltaTime;

    // 移动背景图1
    this.bg1ToMove.setPosition(
      this.bg1ToMove.position.x - moveDistance,
      this.bg1ToMove.position.y
    );

    // 移动背景图2
    this.bg2ToMove.setPosition(
      this.bg2ToMove.position.x - moveDistance,
      this.bg2ToMove.position.y
    );

    // 判断背景图1是否移出屏幕
    if (this.bg1ToMove.position.x <= -this.windowsWidth) {
      // 将背景图1移到背景图2的右侧
      this.bg1ToMove.setPosition(
        this.bg2ToMove.position.x + this.bg2Position,
        this.bg1ToMove.position.y
      );
    }

    // 判断背景图2是否移出屏幕
    if (this.bg2ToMove.position.x <= -this.windowsWidth) {
      // 将背景图2移到背景图1的右侧
      this.bg2ToMove.setPosition(
        this.bg1ToMove.position.x + this.bg2Position,
        this.bg2ToMove.position.y
      );
    }
  }
}
