import { _decorator, Component, Label, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("GameOverUI")
export class GameOverUI extends Component {
  @property(Label)
  currentScoreLabel: Label = null;

  @property(Label)
  bestScoreLabel: Label = null;

  @property(Node)
  isNew: Node = null;

  start() {}

  update(deltaTime: number) {}

  public show(currentScore: number, bestScore: number) {
    this.node.active = true;
    this.currentScoreLabel.string = currentScore.toString();
    this.bestScoreLabel.string = bestScore.toString();
    this.isNew.active = currentScore > bestScore;
  }

  public hide() {
    this.node.active = false;
  }
}
