import { _decorator, Component } from "cc";
const { ccclass, property } = _decorator;

@ccclass("GameManager")
export class GameManager extends Component {
  private static instance: GameManager = null;

  public static getInstance(): GameManager {
    return this.instance;
  }

  @property
  moveSpeed: number = 100;

  start() {
    GameManager.instance = this;
  }

  update(deltaTime: number) {}
}
