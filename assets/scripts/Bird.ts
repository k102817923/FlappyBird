import {
  _decorator,
  Collider2D,
  Component,
  Contact2DType,
  Input,
  input,
  IPhysics2DContact,
  RigidBody2D,
  Vec2,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("Bird")
export class Bird extends Component {
  @property
  rotateSpeed: number = 1;

  private rigiBody2D: RigidBody2D = null;

  protected onLoad(): void {
    input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);

    // 注册单个碰撞体的回调函数
    let collider = this.getComponent(Collider2D);
    if (collider) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
      collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
    }
  }

  protected onDestroy(): void {
    input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
  }

  onTouchStart() {
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
    console.log(otherCollider.tag);
  }

  onEndContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {}

  start() {
    this.rigiBody2D = this.getComponent(RigidBody2D);
  }

  update(deltaTime: number) {
    this.node.angle--;
    if (this.node.angle < -60) this.node.angle = -60;
  }
}
