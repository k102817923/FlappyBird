import { _decorator, Component, Label, Node } from "cc";
import { Bird } from "./Bird";
import { Status } from "./Enum";
import { Move } from "./Move";
import { PipeSpawner } from "./PipeSpawner";
import { ReadyUI } from "./UI/ReadyUI";
import { GameData } from "./GameData";
import { GameOverUI } from "./UI/GameOverUI";
const { ccclass, property } = _decorator;

@ccclass("GameManager")
export class GameManager extends Component {
  private static instance: GameManager = null;

  public static getInstance(): GameManager {
    return this.instance;
  }

  @property
  moveSpeed: number = 100;

  @property(Bird)
  bird: Bird = null;

  @property(Move)
  bg: Move = null;

  @property(Move)
  land: Move = null;

  @property(PipeSpawner)
  pipeSpawner: PipeSpawner = null;

  @property(ReadyUI)
  readyUI: ReadyUI = null;

  @property(Node)
  runningUI: Node = null;

  @property(Label)
  scoreLabel: Label = null;

  @property(GameOverUI)
  gameOverUI: GameOverUI = null;

  status: Status;

  start() {
    GameManager.instance = this;
    this.transitionToReady();
  }

  update(deltaTime: number) {}

  transitionToReady() {
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

  transitionToRunning() {
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

  transitionToGameOver() {
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
  }

  addScore(score = 1) {
    GameData.addScore(score);
    this.scoreLabel.string = GameData.getScore().toString();
  }
}
