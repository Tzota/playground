export class TzotaLogger {
  public info(...data: unknown[]): void {
    console.log('[info] ', ...data);
  }
}
