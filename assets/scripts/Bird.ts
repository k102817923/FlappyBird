import {
  _decorator,
  Animation,
  Collider2D,
  Component,
  Contact2DType,
  Input,
  input,
  IPhysics2DContact,
  RigidBody2D,
  Vec2,
} from "cc";
import { Status, Tags } from "./Enum";
import { GameManager } from "./GameManager";
const { ccclass } = _decorator;

@ccclass("Bird")
export class Bird extends Component {
  private rigiBody2D: RigidBody2D = null;

  private status: Status = Status.READY;

  protected onLoad(): void {
    input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);

    // 注册单个碰撞体的回调函数
    let collider = this.getComponent(Collider2D);
    if (collider) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
      collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
    }

    // 获取刚体组件
    this.rigiBody2D = this.getComponent(RigidBody2D);
  }

  protected onDestroy(): void {
    input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);

    // 取消单个碰撞体的回调函数
    let collider = this.getComponent(Collider2D);
    if (collider) {
      collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
      collider.off(Contact2DType.END_CONTACT, this.onEndContact, this);
    }
  }

  start() {}

  update(deltaTime: number) {
    if (this.status !== Status.RUNNING) return;

    this.node.angle--;
    if (this.node.angle > 60) this.node.angle = 60;
    if (this.node.angle < -60) this.node.angle = -60;
  }

  onTouchStart() {
    if (this.status !== Status.RUNNING) return;

    // 让小鸟向上飞
    this.rigiBody2D.linearVelocity = new Vec2(0, 5);
    // 控制小鸟的角度
    this.node.angle = 30;
  }

  onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    if (otherCollider.tag !== Tags.PIPE_MIDDLE) {
      GameManager.getInstance().transitionToGameOver();
    }
  }

  onEndContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    if (otherCollider.tag === Tags.PIPE_MIDDLE) {
      GameManager.getInstance().addScore();
    }
  }

  public updateStatus(status: Status) {
    this.status = status;
    this.getComponent(Animation).enabled = status === Status.RUNNING;
    if (status !== Status.GAME_OVER) {
      this.rigiBody2D.enabled = status === Status.RUNNING;
    }
  }
}
