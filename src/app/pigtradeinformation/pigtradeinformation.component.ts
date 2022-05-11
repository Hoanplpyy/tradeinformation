import { Component, OnInit } from '@angular/core';
import { HttpgetService } from '../httpget.service';
import { pigData } from '../interface/pigdata.interface';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { ChartType } from 'angular-google-charts';
import { chartTypeSetting } from './chart.interface';


@Component({
  selector: 'app-pigtradeinformation',
  templateUrl: './pigtradeinformation.component.html',
  styleUrls: ['./pigtradeinformation.component.css']
})
export class PigtradeinformationComponent implements OnInit {

  pigUrl = "https://data.coa.gov.tw/Service/OpenData/FromM/AnimalTransData.aspx";

  pigData!: Observable<pigData[]>

  stillReading = true;

  chartData : chartTypeSetting = {
    type: ChartType.LineChart,
    data: [],
    chartColumns: [''],
    width: 0,
    height: 0
  };
  constructor(private http: HttpgetService) { }

  ngOnInit(): void {
    this.pigData = this.http.getData(this.pigUrl).pipe(
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
            disuseSexulUnit: subData['淘汰種豬-頭數'],
            disuseSexulWeight: subData['淘汰種豬-平均重量'],
            disuseSexulPrice: subData['淘汰種豬-平均價格'],
            otherPigUnit: subData['其他豬-頭數'],
            otherPigWeight: subData['其他豬-平均重量'],
            otherPigPrice: subData['其他豬-平均價格'],
            freezeUnit: subData['冷凍廠-頭數'],
            freezeWeight: subData['冷凍廠-平均重量'],
            freezePrice: subData['冷凍廠-平均價格'],
            totalNofreezeUnit: subData['成交總數(不含冷凍廠)-頭數'],
            totalNofreezeWeight: subData['成交總數(不含冷凍廠)-平均重量'],
            totalNofreezePrice: subData['成交總數(不含冷凍廠)-平均價格']
          }
          return getSubData
        })
      })
    )

    let pigDateAndPrice = this.pigData.pipe(
      map(data => {
        return data.filter(subData => {
          return subData.date < 1110408 && subData.date > 1110308
        })
      }),
      map(data => {
        return data.map(subData => {
          return [subData.date.toString(), subData.averagePrice]
        })
      })
    )

    pigDateAndPrice.subscribe(
      data => {
        this.chartData = {
          type: ChartType.LineChart,
          data: data,
          chartColumns: ['Date', 'Price'],
          width: 900,
          height: 450
        };
        this.stillReading = false;
      }
    )
  }

}
