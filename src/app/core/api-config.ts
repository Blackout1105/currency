import { environment } from '../../environments/environment';

export class ApiConfig {
  private static baseRestPath: string = environment.apiRestPath;
  private static baseRestPathOptional: string = environment.apiRestPathOptional; // temporarily

  public static filterOptionsPath: string = ApiConfig.baseRestPathOptional + 'v1/assets';

  public static exratePath(ids: string[]): string {
    return `${ApiConfig.baseRestPath}v1/exchangerate/${ids[0]}/${ids[1]}`;
  }

  public static exrateHistoryPath(ids: string[]): string {
    return `${ApiConfig.exratePath(ids)}/history`;
  }

}
