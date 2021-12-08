import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiConfig } from '../api-config';
import { environment } from '../../../environments/environment';
import { IAssetApi } from '../models/assets/asset-api.interface';
import { IAsset } from '../models/assets/asset.interface';
import { IFilterOption } from '../models/filter-option/filter-option.interface';


@Injectable({
  providedIn: 'root'
})
export class CurrencyCardListService {

  private assetsList: string[] = ['USD', 'EUR', 'BTC', 'ETH'];

  constructor(
    private http: HttpClient,
  ) {
  }

  getFilterOptions(): Observable<IFilterOption[]> {
    const params: { [param: string]: string | string[] } = {
      apiKey: environment.apiKey,
      filter_asset_id: this.assetsList.join(','),
    };
    return this.http.get(ApiConfig.filterOptionsPath, {params}).pipe(
      map((assets: IAssetApi[]): IFilterOption[] => this.prepareFilterOptions(assets))
    );
  }

  private prepareFilterOptions(assets: IAssetApi[]): IFilterOption[] {
    const cryptoAssets: IAsset[] = [];
    const currencyAssets: IAsset[] = [];
    assets.forEach((asset: IAssetApi) => {
      const assetArray: IAsset[] = !!asset.type_is_crypto ? cryptoAssets : currencyAssets;
      const readyAsset: IAsset = {
        id: asset.asset_id,
        name: asset.name,
        isCrypto: !!asset.type_is_crypto,
        dateStart: asset.data_trade_start,
      };
      assetArray.push(readyAsset);
    });
    const options: IFilterOption[] = [];
    cryptoAssets.forEach((cryptoAsset: IAsset) => {
      currencyAssets.forEach((currencyAsset: IAsset) => {
        const option: IFilterOption = {
          label: cryptoAsset.name + ' / ' + currencyAsset.name,
          value: {
            dateStart: cryptoAsset.dateStart,
            optionId: btoa(JSON.stringify([cryptoAsset.id, currencyAsset.id])),
            ids: [cryptoAsset.id, currencyAsset.id],
          }
        };
        options.push(option);
      });
    });
    return options;
  }
}
