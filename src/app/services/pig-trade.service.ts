import { pigData } from './../interface/pigdata.interface';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpgetService } from './httpget.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PigTradeService {

  dataChange = new EventEmitter<{ date: string, averagePrice: string }[]>();

  constructor(private httpGet: HttpgetService) { }

  source$ = new Subject<string[][]>()

  getPigFiler$ = new BehaviorSubject([{ date: '', averagePrice: '' }]);
  pigDataOK!: Observable<string[][]>

  setPigData(marketName: string, startDay: Date, endDay: Date, topDays?: number) {

    let startDate = this.changeToTWFormate(startDay)//1110627
    let endDate = this.changeToTWFormate(endDay)//1110528

    this.httpGet.getPigDataHttp(marketName, topDays).pipe(
      map(data => {
        return data.filter(subData => {

          return subData.date < (+endDate) && subData.date > (+startDate)
        })
      }),
      map(data => {
        return data.map(subData => {
          return { date: subData.date.toString(), averagePrice: subData.averagePrice }
        })
      }),
      map(data => {
        return data.reverse()

      })
    ).subscribe(
      data => {
        this.getPigFiler$.next( data.reverse())
       // this.dataChange.emit(data)
      }
    )


    //這個取得的是該市場的所有資料


    // let getRawPigData = this.httpGet.getPigDataHttp(marketName, topDays) //這個取得的是該市場的所有資料
    // this.pigDataOK = this.dataChanged(getRawPigData, startDay, endDate)

  }

  getPigData() {
    return this.pigDataOK
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

  //處理資料
  dataChanged(pigRawData: pigData[], startDay: string, endDate: string) {


    // this.getDataSubscription=pigDateAndPrice.subscribe(
    //   data => {
    //     console.log(data)
    //     this.chartData = {
    //       type: ChartType.LineChart,
    //       data: data,
    //       chartColumns: ['Date', 'Price'],
    //       width: this.chartWidth,
    //       height: this.chartHeight
    //     };
    //     this.stillReading = false;
    //   }
    // )
  }

}
