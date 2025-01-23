export enum Tags {
  /** 地板 */
  LAND = 10,
  /** 管道 */
  PIPE = 20,
  /** 管道中间的通道 */
  PIPE_MIDDLE = 30,
}

export enum Status {
  /** 准备 */
  READY,
  /** 进行中 */
  RUNNING,
  /** 游戏结束 */
  GAME_OVER,
}

export enum Medal {
  /** 白牌 */
  WHITE,
  /** 铜牌 */
  BRONZE,
  /** 银牌 */
  SILVER,
  /** 金牌 */
  GOLD,
}

export enum FlyAnimation {
  /** Level1 */
  Level1 = "Bird01_fly",
  /** Level2 */
  Level2 = "Bird02_fly",
  /** Level3 */
  Level3 = "Bird03_fly",
}

export enum Level {
  /** 一点五倍速 */
  LEVEL1 = "一点五倍速",
  /** 二倍速 */
  LEVEL2 = "二倍速",
  /** 三倍速 */
  LEVEL3 = "三倍速",
}
