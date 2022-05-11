import { Component, OnInit } from '@angular/core';
import { HttpgetService } from '../httpget.service';
import { pigdata } from '../interface/pigdata.interface';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { ChartType } from 'angular-google-charts';


@Component({
  selector: 'app-pigtradeinformation',
  templateUrl: './pigtradeinformation.component.html',
  styleUrls: ['./pigtradeinformation.component.css']
})
export class PigtradeinformationComponent implements OnInit {

  pigUrl = "https://data.coa.gov.tw/Service/OpenData/FromM/AnimalTransData.aspx";

  pigData!: Observable<pigdata[]>

  chartData = {
    type: ChartType.LineChart,
    data: [
      ["",]
    ],
    chartColumns: ['Books', 'Sell'],
    width: 500,
    height: 400
  };
  constructor(private http: HttpgetService) { }

  ngOnInit(): void {
    this.pigData = this.http.getData(this.pigUrl).pipe(
      map(data => {
        return data.map(subdata => {
          let getSubData: pigdata
          getSubData = {
            date: subdata.交易日期,
            market: subdata.市場名稱,
            averageUnit: subdata['成交頭數-總數'],
            averageWeight: subdata['成交頭數-平均重量'],
            averagePrice: subdata['成交頭數-平均價格'],
            standard75UpUnit: subdata['規格豬(75公斤以上)-頭數'],
            standard75UpWeight: subdata['規格豬(75公斤以上)-平均重量'],
            standard75UpPrice: subdata['規格豬(75公斤以上)-平均價格'],
            under75Unit: subdata['75公斤以下-頭數'],
            under75Weight: subdata['75公斤以下-平均重量'],
            under75Price: subdata['75公斤以下-平均價格'],
            btw7595Unit: subdata['75(含)-95(不含)-頭數'],
            btw7595Weight: subdata['75(含)-95(不含)-平均重量'],
            btw7595Price: subdata['75(含)-95(不含)-平均價格'],
            btw95115Unit: subdata['95(含)-115(含)-頭數'],
            btw95115Weight: subdata['95(含)-115(含)-平均重量'],
            btw95115Price: subdata['95(含)-115(含)-平均價格'],
            btw115135Unit: subdata['115(含)-135(不含)-頭數'],
            btw115135Weight: subdata['115(含)-135(不含)-平均重量'],
            btw115135Price: subdata['115(含)-135(不含)-平均價格'],
            btw135155Unit: subdata['135(含)-155(不含)-頭數'],
            btw135155Weight: subdata['135(含)-155(不含)-平均重量'],
            btw135155Price: subdata['135(含)-155(不含)-平均價格'],
            up155Unit: subdata['155公斤以上-頭數'],
            up155Weight: subdata['155公斤以上-平均重量'],
            up155Price: subdata['155公斤以上-平均價格'],
            disuseSexulUnit: subdata['淘汰種豬-頭數'],
            disuseSexulWeight: subdata['淘汰種豬-平均重量'],
            disuseSexulPrice: subdata['淘汰種豬-平均價格'],
            otherPigUnit: subdata['其他豬-頭數'],
            otherPigWeight: subdata['其他豬-平均重量'],
            otherPigPrice: subdata['其他豬-平均價格'],
            freezeUnit: subdata['冷凍廠-頭數'],
            freezeWeight: subdata['冷凍廠-平均重量'],
            freezePrice: subdata['冷凍廠-平均價格'],
            totalNofreezeUnit: subdata['成交總數(不含冷凍廠)-頭數'],
            totalNofreezeWeight: subdata['成交總數(不含冷凍廠)-平均重量'],
            totalNofreezePrice: subdata['成交總數(不含冷凍廠)-平均價格']
          }
          return getSubData
        })
      })
    )

    let pigDateAndPrice=this.pigData.pipe(
      map(data=>{
        return data.filter(subdata=>{
          return subdata.date>1110208 && subdata.date<1110308
        })
      }),
      map(data=>{
        return data.map(subdata=>{
          return [subdata.date.toString(),subdata.averagePrice]
        })
      })
    )

    pigDateAndPrice.subscribe(
      data=>{
        this.chartData = {
          type: ChartType.LineChart,
          data: data,
          chartColumns: ['Date','Price'],
          width: 500,
          height: 500
        };
      }
    )
  }

}
