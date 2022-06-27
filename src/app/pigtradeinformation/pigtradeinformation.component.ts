import { PigTradeService } from './../services/pig-trade.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpgetService } from '../services/httpget.service';
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
export class PigtradeinformationComponent implements OnInit, OnDestroy {



  pigData!: Observable<pigData[]>

  stillReading = false;

  marketName = '新北市'



  getDataSubscription!: Subscription

  myData = [
    ['London', 8136000],
    ['New York', 8538000],
    ['Paris', 2244000],
    ['Berlin', 3470000],
    ['Kairo', 19500000],
  ];

  chartData!: chartTypeSetting;

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

  constructor(private http: HttpgetService, private pigTradeService: PigTradeService) { }

  ngOnInit(): void {

    // this.pigTradeService.dataChange.subscribe(
    //   data=>{
    //     console.log(data)
    //   }
    // )


    this.pigTradeService.getPigFiler$.subscribe(
      data => {
        console.log(data)
      }
    )



    this.stillReading = false;
    this.chartData = {
      type: ChartType.LineChart,
      data: this.myData,
      chartColumns: ['Date', 'Price'],
    };




    // this.getDataSubscription = this.http.getData(this.marketName, 20).subscribe(data => {
    //   console.log(data)
    // })
    //   data => {
    // this.stillReading = true;

    // this.http.getData().subscribe(
    //   data => {

    //     this.stillReading = false;
    //     this.chartData = {
    //       type: ChartType.LineChart,
    //       data: data,
    //       chartColumns: ['Date', 'Price'],
    //     };
    //   }
    // )



  }



  ngOnDestroy(): void {
    this.getDataSubscription.unsubscribe();
  }
}
