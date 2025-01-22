export class GameData {
  private static score: number = 0;

  private static readonly BEST_SCORE = "Best_Score";

  public static addScore(score = 1) {
    this.score += score;
  }

  public static getScore() {
    return this.score;
  }

  public static getBestScore() {
    let bestScore: string | number = localStorage.getItem(this.BEST_SCORE);
    bestScore = bestScore ? parseInt(bestScore) : 0;
    return bestScore;
  }

  public static setBestScore() {
    if (this.getScore() > this.getBestScore()) {
      localStorage.setItem(this.BEST_SCORE, this.getScore().toString());
    }
  }
}
