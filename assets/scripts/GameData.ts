export class GameData {
  private static score: number = 0;

  public static addScore(score = 1) {
    this.score += score;
  }

  public static getScore() {
    return this.score;
  }
}
