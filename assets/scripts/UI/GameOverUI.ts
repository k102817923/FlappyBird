import { _decorator, Component, director, Label, Node } from "cc";
import { Medal } from "../Enum";
import { GameData } from "../GameData";
const { ccclass, property } = _decorator;

@ccclass("GameOverUI")
export class GameOverUI extends Component {
  @property(Label)
  private currentScoreLabel: Label = null;

  @property(Label)
  private bestScoreLabel: Label = null;

  @property(Node)
  private isNew: Node = null;

  @property([Node])
  private medalArray: Node[] = [];

  private medal: Node = null;

  protected start(): void {}

  protected update(deltaTime: number): void {}

  public show(currentScore: number, bestScore: number) {
    this.node.active = true;
    this.currentScoreLabel.string = currentScore.toString();
    this.bestScoreLabel.string = bestScore.toString();
    this.isNew.active = currentScore > bestScore;

    const medalMapping = [
      { threshold: 10, medal: Medal.WHITE },
      { threshold: 50, medal: Medal.BRONZE },
      { threshold: 100, medal: Medal.SILVER },
      { threshold: Infinity, medal: Medal.GOLD },
    ];

    const item = medalMapping.find(({ threshold }) => currentScore < threshold);
    this.medal = this.medalArray[item!.medal];
    this.medal.active = true;
  }

  public hide() {
    this.node.active = false;
  }

  public onPlayButtonClick() {
    // 重新加载场景，游戏重启
    director.loadScene(director.getScene().name);
    GameData.resetScore();
  }
}
