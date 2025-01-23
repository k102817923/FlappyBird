import { _decorator, AudioClip, Component, Label, Node } from "cc";
import { Bird } from "./Bird";
import { Level, Status } from "./Enum";
import { Move } from "./Move";
import { PipeSpawner } from "./PipeSpawner";
import { ReadyUI } from "./UI/ReadyUI";
import { GameData } from "./GameData";
import { GameOverUI } from "./UI/GameOverUI";
import { AudioMgr } from "./AudioMgr";
const { ccclass, property } = _decorator;

@ccclass("GameManager")
export class GameManager extends Component {
  private static instance: GameManager = null;

  public static getInstance(): GameManager {
    return this.instance;
  }

  @property(Bird)
  private bird: Bird = null;

  @property(Move)
  private bg: Move = null;

  @property(Move)
  private land: Move = null;

  @property(PipeSpawner)
  private pipeSpawner: PipeSpawner = null;

  @property(ReadyUI)
  private readyUI: ReadyUI = null;

  @property(Node)
  private runningUI: Node = null;

  @property(Label)
  private scoreLabel: Label = null;

  @property(Label)
  private levelLabel: Label = null;

  @property(GameOverUI)
  private gameOverUI: GameOverUI = null;

  @property(AudioClip)
  private bgAudio: AudioClip = null;

  @property(AudioClip)
  private gameOverAudio: AudioClip = null;

  private status: Status;

  public moveSpeed = 100;

  protected onLoad(): void {
    GameManager.instance = this;
  }

  protected start(): void {
    this.transitionToReady();
    // 循环播放背景声音
    AudioMgr.inst.play(this.bgAudio, 0.5);
  }

  protected update(deltaTime: number): void {}

  private transitionToReady() {
    if (this.status === Status.READY) return;

    this.status = Status.READY;
    this.bird.updateStatus(Status.READY);
    this.bg.updateStatus(Status.READY);
    this.land.updateStatus(Status.READY);
    this.pipeSpawner.updateStatus(Status.READY);

    this.readyUI.show();
    this.runningUI.active = false;
    this.gameOverUI.hide();
  }

  public transitionToRunning() {
    if (this.status === Status.RUNNING) return;

    this.status = Status.RUNNING;
    this.bird.updateStatus(Status.RUNNING);
    this.bg.updateStatus(Status.RUNNING);
    this.land.updateStatus(Status.RUNNING);
    this.pipeSpawner.updateStatus(Status.RUNNING);

    this.readyUI.hide();
    this.runningUI.active = true;
    this.gameOverUI.hide();
  }

  public transitionToGameOver() {
    if (this.status === Status.GAME_OVER) return;

    this.status = Status.GAME_OVER;
    this.bird.updateStatus(Status.GAME_OVER);
    this.bg.updateStatus(Status.GAME_OVER);
    this.land.updateStatus(Status.GAME_OVER);
    this.pipeSpawner.updateStatus(Status.GAME_OVER);

    this.readyUI.hide();
    this.runningUI.active = false;
    this.gameOverUI.show(GameData.getScore(), GameData.getBestScore());
    GameData.setBestScore();

    // 停止背景音乐，播放游戏结束音效
    AudioMgr.inst.stop();
    AudioMgr.inst.playOneShot(this.gameOverAudio);
  }

  public addScore(score = 1) {
    if (this.status !== Status.RUNNING) return;
    GameData.addScore(score);
    this.scoreLabel.string = GameData.getScore().toString();
    this.bird.updateAnimation();
  }

  public updateMoveSpeed(moveSpeed: number) {
    this.moveSpeed = moveSpeed;
  }

  public updateLevelLabel(level: Level) {
    if (this.levelLabel.string === level) return;

    // 显示 levelLabel，更新其内容
    this.levelLabel.string = level;
    this.levelLabel.node.active = true;

    // 隐藏 scoreLabel
    this.scoreLabel.node.active = false;

    // 两秒后隐藏 levelLabel 并恢复显示 scoreLabel
    this.scheduleOnce(() => {
      this.levelLabel.node.active = false;
      this.scoreLabel.node.active = true;
    }, 2);
  }
}
