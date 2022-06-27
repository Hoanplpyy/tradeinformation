import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { pigDataTW } from '../interface/pigdataTW.interface'
import { shareReplay } from 'rxjs/internal/operators/shareReplay';
import { map } from 'rxjs/operators';
import { pigData } from '../interface/pigdata.interface';
import { Observable } from 'rxjs';
import { PigTradeService } from './pig-trade.service';


@Injectable({
  providedIn: 'root'
})
export class HttpgetService {

  pigUrl = "https://data.coa.gov.tw/Service/OpenData/FromM/AnimalTransData.aspx";

  constructor(private http: HttpClient) { }

  getPigDataHttp(marketName: string, topData?: number) {

    let getUrl = this.pigUrl;
    if (topData) {
      getUrl = this.pigUrl + '?$top=' + topData.toString()
    }
    let searchParams = new HttpParams();

    searchParams = searchParams.append('MarketName', marketName);

    return this.http.get<pigDataTW[]>(getUrl, {
      params: searchParams
    }).pipe(
      map(data => {
        return data.map(subData => {
          let getSubData: pigData
          getSubData = {
            date: subData.交易日期,
            market: subData.市場名稱,
            averageUnit: subData['成交頭數-總數'],
            averageWeight: subData['成交頭數-平均重量'],
            averagePrice: subData['成交頭數-平均價格'],
            standard75UpUnit: subData['規格豬(75公斤以上)-頭數'],
            standard75UpWeight: subData['規格豬(75公斤以上)-平均重量'],
            standard75UpPrice: subData['規格豬(75公斤以上)-平均價格'],
            under75Unit: subData['75公斤以下-頭數'],
            under75Weight: subData['75公斤以下-平均重量'],
            under75Price: subData['75公斤以下-平均價格'],
            btw7595Unit: subData['75(含)-95(不含)-頭數'],
            btw7595Weight: subData['75(含)-95(不含)-平均重量'],
            btw7595Price: subData['75(含)-95(不含)-平均價格'],
            btw95115Unit: subData['95(含)-115(含)-頭數'],
            btw95115Weight: subData['95(含)-115(含)-平均重量'],
            btw95115Price: subData['95(含)-115(含)-平均價格'],
            btw115135Unit: subData['115(含)-135(不含)-頭數'],
            btw115135Weight: subData['115(含)-135(不含)-平均重量'],
            btw115135Price: subData['115(含)-135(不含)-平均價格'],
            btw135155Unit: subData['135(含)-155(不含)-頭數'],
            btw135155Weight: subData['135(含)-155(不含)-平均重量'],
            btw135155Price: subData['135(含)-155(不含)-平均價格'],
            up155Unit: subData['155公斤以上-頭數'],
            up155Weight: subData['155公斤以上-平均重量'],
            up155Price: subData['155公斤以上-平均價格'],
            disuseSexualUnit: subData['淘汰種豬-頭數'],
            disuseSexualWeight: subData['淘汰種豬-平均重量'],
            disuseSexualPrice: subData['淘汰種豬-平均價格'],
            otherPigUnit: subData['其他豬-頭數'],
            otherPigWeight: subData['其他豬-平均重量'],
            otherPigPrice: subData['其他豬-平均價格'],
            freezeUnit: subData['冷凍廠-頭數'],
            freezeWeight: subData['冷凍廠-平均重量'],
            freezePrice: subData['冷凍廠-平均價格'],
            totalNoFreezeUnit: subData['成交總數(不含冷凍廠)-頭數'],
            totalNoFreezeWeight: subData['成交總數(不含冷凍廠)-平均重量'],
            totalNoFreezePrice: subData['成交總數(不含冷凍廠)-平均價格']
          }
          return getSubData
        })

      }),
      shareReplay()
    );
  }
}
