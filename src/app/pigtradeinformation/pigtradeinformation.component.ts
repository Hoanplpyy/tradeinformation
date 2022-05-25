import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpgetService } from '../httpget.service';
import { pigData } from '../interface/pigdata.interface';
import { map, shareReplay, tap } from 'rxjs/operators'
import { Observable, Subscription } from 'rxjs';
import { ChartType } from 'angular-google-charts';
import { chartTypeSetting } from './chart.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


@Component({
  selector: 'app-pigtradeinformation',
  templateUrl: './pigtradeinformation.component.html',
  styleUrls: ['./pigtradeinformation.component.css']
})
export class PigtradeinformationComponent implements OnInit ,OnDestroy {

  pigUrl = "https://data.coa.gov.tw/Service/OpenData/FromM/AnimalTransData.aspx";

  pigData!: Observable<pigData[]>

  stillReading = true;

  chartWidth: number = 800;
  chartHeight: number = 450;

  startDate!: string;

  endDate!: string;

  targetMarket = '臺南安南';

  getDataSubscription!:Subscription

  myData = [
    ['London', 8136000],
    ['New York', 8538000],
    ['Paris', 2244000],
    ['Berlin', 3470000],
    ['Kairo', 19500000],
  ];

  chartData!: chartTypeSetting;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  myOptions = {
    title: 'Pig',
    hAxis: {
      title: 'Date'
      // , textStyle: {
      //   fontSize: 18 // or the number you want
      // }
    },
    vAxis: { title: 'Price(NTD/kg)' },
    legend: 'none',
    fontName: 'Times-Roman',
  };

  constructor(private http: HttpgetService) { }

  ngOnInit(): void {

    this.endDate = this.changeToTWFormate(new Date());

    this.startDate = this.setStartDate(new Date());

    this.http.getData(this.pigUrl).subscribe(
      data=>{
        console.log(data)
      }
    )


    // this.chartData = {
    //   type: ChartType.LineChart,
    //   data: this.myData,
    //   chartColumns: ['Date', 'Price'],
    //   width: this.chartWidth,
    //   height: this.chartHeight
    //  };
    // this.stillReading = false;

    // this.pigData = this.http.getData(this.pigUrl).pipe(
    //   map(data => {
    //     return data.map(subData => {
    //       let getSubData: pigData
    //       getSubData = {
    //         date: subData.交易日期,
    //         market: subData.市場名稱,
    //         averageUnit: subData['成交頭數-總數'],
    //         averageWeight: subData['成交頭數-平均重量'],
    //         averagePrice: subData['成交頭數-平均價格'],
    //         standard75UpUnit: subData['規格豬(75公斤以上)-頭數'],
    //         standard75UpWeight: subData['規格豬(75公斤以上)-平均重量'],
    //         standard75UpPrice: subData['規格豬(75公斤以上)-平均價格'],
    //         under75Unit: subData['75公斤以下-頭數'],
    //         under75Weight: subData['75公斤以下-平均重量'],
    //         under75Price: subData['75公斤以下-平均價格'],
    //         btw7595Unit: subData['75(含)-95(不含)-頭數'],
    //         btw7595Weight: subData['75(含)-95(不含)-平均重量'],
    //         btw7595Price: subData['75(含)-95(不含)-平均價格'],
    //         btw95115Unit: subData['95(含)-115(含)-頭數'],
    //         btw95115Weight: subData['95(含)-115(含)-平均重量'],
    //         btw95115Price: subData['95(含)-115(含)-平均價格'],
    //         btw115135Unit: subData['115(含)-135(不含)-頭數'],
    //         btw115135Weight: subData['115(含)-135(不含)-平均重量'],
    //         btw115135Price: subData['115(含)-135(不含)-平均價格'],
    //         btw135155Unit: subData['135(含)-155(不含)-頭數'],
    //         btw135155Weight: subData['135(含)-155(不含)-平均重量'],
    //         btw135155Price: subData['135(含)-155(不含)-平均價格'],
    //         up155Unit: subData['155公斤以上-頭數'],
    //         up155Weight: subData['155公斤以上-平均重量'],
    //         up155Price: subData['155公斤以上-平均價格'],
    //         disuseSexulUnit: subData['淘汰種豬-頭數'],
    //         disuseSexulWeight: subData['淘汰種豬-平均重量'],
    //         disuseSexulPrice: subData['淘汰種豬-平均價格'],
    //         otherPigUnit: subData['其他豬-頭數'],
    //         otherPigWeight: subData['其他豬-平均重量'],
    //         otherPigPrice: subData['其他豬-平均價格'],
    //         freezeUnit: subData['冷凍廠-頭數'],
    //         freezeWeight: subData['冷凍廠-平均重量'],
    //         freezePrice: subData['冷凍廠-平均價格'],
    //         totalNofreezeUnit: subData['成交總數(不含冷凍廠)-頭數'],
    //         totalNofreezeWeight: subData['成交總數(不含冷凍廠)-平均重量'],
    //         totalNofreezePrice: subData['成交總數(不含冷凍廠)-平均價格']
    //       }

    //       return getSubData
    //     })

    //   }),
    //   shareReplay()
    // )

    // this.dataChanged();



  }

  addEvent() {
    if (this.range.value.start !== null) {
      let date = new Date(this.range.value.start)
      this.startDate = this.changeToTWFormate(date)

    }

    if (this.range.value.end !== null) {
      let date = new Date(this.range.value.end)
      this.endDate = this.changeToTWFormate(date)

      this.dataChanged();
    }



  }

  // 以下處理日期

  // 輸入是 new Date格式，輸出是民國的string，ex: 1110513
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
  dataChanged() {
    this.stillReading = true;
    let pigDateAndPrice = this.pigData.pipe(
      map(data => {
        return data.filter(subData => {
          return subData.market === this.targetMarket && subData.date < (+this.endDate) && subData.date > (+this.startDate)
        })
      }),
      map(data => {
        return data.map(subData => {
          console.log(subData.date)
          return [subData.date.toString(), subData.averagePrice]
        })
      }),
      map(data => {
        return data.reverse()
      })
    )

    this.getDataSubscription=pigDateAndPrice.subscribe(
      data => {
        console.log(data)
        this.chartData = {
          type: ChartType.LineChart,
          data: data,
          chartColumns: ['Date', 'Price'],
          width: this.chartWidth,
          height: this.chartHeight
        };
        this.stillReading = false;
      }
    )
  }

  ngOnDestroy(): void {
    this.getDataSubscription.unsubscribe();
  }
}
