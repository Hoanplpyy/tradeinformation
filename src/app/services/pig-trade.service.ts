import { pigData } from './../interface/pigdata.interface';
import { EventEmitter, Injectable } from '@angular/core';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { HttpgetService } from './httpget.service';
import { map } from 'rxjs/operators';
import { ChartType } from 'angular-google-charts';
import { chartTypeSetting } from '../pigtradeinformation/chart.interface';

@Injectable({
  providedIn: 'root'
})
export class PigTradeService {

  // dataChange = new EventEmitter<{ date: string, averagePrice: string }[]>();

  constructor(private httpGet: HttpgetService) { }

  getPigFiler$ = new Subject<chartTypeSetting>();

  getPigData$ = new Observable<pigData[]>();

  getMultiple!: string[][];

  getMultipleColumn=['Date']

  getAllPigData() {
    this.getPigData$ = this.httpGet.getPigDataHttp();
  }

  setPigData(marketName: string[], startDay: Date, endDay: Date) {

    let marketsObs$=of(marketName)

    let startDate = this.changeToTWFormate(startDay)//1110627
    let endDate = this.changeToTWFormate(endDay)//1110528

    this.getMultipleColumn=[...marketName]


    this.getPigData$.pipe(  //這個取得的是該市場的所有資料


      // map(data => {
      //   return data.filter(subData => {
      //     return subData.market === marketName   //符合所選取的market
      //   })
      // }),
      // map(data => {
      //   return data.filter(subData => {
      //     return subData.date < (+endDate) && subData.date > (+startDate)
      //   })
      // }),
      // map(data => {
      //   return data.map(subData => {
      //     return [subData.date.toString(), subData.averagePrice]
      //   })
      // }),
      // map(data => {
      //   return data.reverse()
      // })
    ).subscribe(
      data => {
        // // this.getMultiple=[...data];
        // let setData: chartTypeSetting = {
        //   type: ChartType.LineChart,
        //   data: data,
        //   chartColumns: ['Date', 'PriceA', 'PriceB'],
        // }
        // this.getPigFiler$.next(setData)
        // // this.dataChange.emit(data)
      }
    )
  }

  // 以下處理日期

  // 輸入是 new Date()格式，輸出是民國的string，ex: 1110513
  changeToTWFormate(getDateData: Date) {
    let year = this.setFrontZero(getDateData.getFullYear() - 1911);
    let month = this.setFrontZero(getDateData.getMonth() + 1);
    let date = this.setFrontZero(getDateData.getDate());
    return year.toString() + month.toString() + date.toString()
  }

  setFrontZero(setData: number) {
    let str = "" + setData;
    let pad = "00";
    return pad.substring(0, pad.length - str.length) + str;
  }

  setStartDate(startDate: Date) {
    let year = this.setFrontZero(startDate.getFullYear() - 1911);
    let month = this.setFrontZero(startDate.getMonth());
    let date = this.setFrontZero(startDate.getDate());
    return year.toString() + month.toString() + date.toString()
  }
}
