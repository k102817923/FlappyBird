import {
  _decorator,
  Animation,
  AudioClip,
  Collider2D,
  Component,
  Contact2DType,
  Input,
  input,
  IPhysics2DContact,
  RigidBody2D,
  Vec2,
} from "cc";
import { FlyAnimation, Level, Status, Tags } from "./Enum";
import { GameManager } from "./GameManager";
import { AudioMgr } from "./AudioMgr";
import { GameData } from "./GameData";
import { PipeSpawner } from "./PipeSpawner";
const { ccclass, property } = _decorator;

@ccclass("Bird")
export class Bird extends Component {
  @property(AudioClip)
  private clickAudio: AudioClip = null;

  private rigiBody2D: RigidBody2D = null;

  private status: Status;

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

  protected start(): void {}

  protected update(deltaTime: number): void {
    if (this.status !== Status.RUNNING) return;

    this.node.angle--;
    if (this.node.angle > 60) this.node.angle = 60;
    if (this.node.angle < -60) this.node.angle = -60;
  }

  private onTouchStart() {
    if (this.status !== Status.RUNNING) return;

    // 让小鸟向上飞
    this.rigiBody2D.linearVelocity = new Vec2(0, 5);
    // 控制小鸟的角度
    this.node.angle = 30;
    // 循环播放点击声音
    AudioMgr.inst.playOneShot(this.clickAudio);
  }

  private onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    if (otherCollider.tag !== Tags.PIPE_MIDDLE) {
      GameManager.getInstance().transitionToGameOver();
    }
  }

  private onEndContact(
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

  public updateAnimation() {
    const currentScore = GameData.getScore();
    if (currentScore <= 10) return;

    const animationMapping = [
      {
        threshold: 20,
        animation: FlyAnimation.Level1,
        moveSpeed: 150,
        rate: 2,
        level: Level.LEVEL1,
      },
      {
        threshold: 30,
        animation: FlyAnimation.Level2,
        moveSpeed: 200,
        rate: 1,
        level: Level.LEVEL2,
      },
      {
        threshold: Infinity,
        animation: FlyAnimation.Level3,
        moveSpeed: 250,
        rate: 0.8,
        level: Level.LEVEL3,
      },
    ];

    const item = animationMapping.find(
      ({ threshold }) => currentScore < threshold
    );

    const animation = this.getComponent(Animation);

    // 获取组件中的所有动画剪辑
    const clips = animation.clips;

    // 查找想要设置为默认剪辑的动画
    const targetClip = clips.find((i) => i.name === item.animation);

    // 设置默认剪辑
    animation.defaultClip = targetClip;

    // 播放默认剪辑
    animation.play(targetClip.name);

    // 更新地图的移动速度和生成管道的速度
    GameManager.getInstance().updateMoveSpeed(item.moveSpeed);
    PipeSpawner.getInstance().updateRate(item.rate);

    GameManager.getInstance().updateLevelLabel(item.level);
  }
}
