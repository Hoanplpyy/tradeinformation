import { pigData } from './../interface/pigdata.interface';
import { EventEmitter, Injectable } from '@angular/core';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { HttpgetService } from './httpget.service';
import { combineLatestWith, map, take, tap } from 'rxjs/operators';
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

  getMultipleColumn = ['Date']

  getAllPigData() {
    this.getPigData$ = this.httpGet.getPigDataHttp();
  }

  setPigData(marketName: string[], startDay: Date, endDay: Date, dayRange: number) {
    console.log(marketName)
    let marketsObs$ = of(marketName)

    let startDate = this.changeToTWFormate(startDay)//1110627
    let endDate = this.changeToTWFormate(endDay)//1110528
    let tempMarket = marketName
    let getMarketArray = ['date', ...tempMarket]

    let aftDateFilter$ = this.getPigData$.pipe(  //這個取得的是該市場，時間範圍內的所有資料
      combineLatestWith(marketsObs$),
      map(([pigData, market]) => {
        return market.map(subMarket => {
          return pigData.filter((subPigData) => {
            return subPigData.market === subMarket
          })
        })
      }),
      map(data => {
        return data.map(subData => {
          return subData.filter(filterData => {
            return filterData.date < (+endDate) && filterData.date > (+startDate)
          })
        })
      })
    )


    let getDateArray$ = aftDateFilter$.pipe(   //取得最長的日期範圍
      map(data => {
        let longestLength = 0;
        let index = 0;
        for (let i = 0; i < data.length; i++) {
          if (data[i].length > longestLength) {
            longestLength = data[i].length;
            index = i;
          }
        }
        return data[index].map(
          subData => {
            return subData.date.toString()
          }
        )
      })
    )

    let getPriceAndDateArray$ = aftDateFilter$.pipe(  //取得市場的時間和平均價格
      map(data => {
        return data.map(subData => {
          return subData.map(ssData => {
            return { date: ssData.date.toString(), price: ssData.averagePrice }
          })
        })
      })
    )

    let getPriceArray$ = getDateArray$.pipe(           //時間範圍和市場價格比對，回傳單一市場資料
      combineLatestWith(getPriceAndDateArray$),
      map(([date, price]) => {                    //price[i][j] ==> i代表有幾個市場，j代表該市場總共有幾天的資料
        for (let i = 0; i < price.length; i++) {  //每一筆資料都跑，判斷哪一筆日期是有缺少的
          if (price[i].length < date.length && price[i].length!==0) {    //如果比日期的筆數少
            //先把該資料的date取出來
            let getPriceDate = price[i].map(priceDate => {
              return priceDate.date
            })
            for (let j = 0; j < date.length; j++) {    //判斷是少哪一天
              if (!getPriceDate.includes(date[j])) {     //當沒有包含的時候
                price[i].splice(j, 0, { date: date[j], price: 'undefined' })
              }
            }
          }else if(price[i].length===0){
            price.splice(i,1)
            getMarketArray.splice(i+1,1)
          }
        }

        return price
      }),
      map(price => {
        return price.map(subPrice => {
          return subPrice.map(ssPrice => {
            return ssPrice.price
          })
        })
      })
    )

    getDateArray$.pipe(
      combineLatestWith(getPriceArray$),
      map(([date, price]) => {
        let allArray: (string | number)[][] = [];
        for (let i = 0; i < date.length; i++) {
          let subArray = [date[i]];
          for (let j = 0; j < price.length; j++) {
            subArray.push(price[j][i])
          }
          allArray.push(subArray)
        }
        return allArray
      })
    ).subscribe(
      data => {
        let setData: chartTypeSetting = {
          type: ChartType.LineChart,
          data: data,
          chartColumns: getMarketArray
        }
        this.getPigFiler$.next(setData)
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
