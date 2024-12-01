export class Randomize {
  public get(top = 100): number {
    return Math.floor(Math.random() * top);
  }
}
