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

  showData!: Observable<chartTypeSetting>

  getDataSubscription!: Subscription

  myData = [
    ['London', 81,51],
    ['New York', 85,61],
    ['Paris', 22,27],
    ['Berlin', 34,24],
    ['Kairo', 19,16],
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

    this.stillReading = true;


    this.pigTradeService.getPigFiler$
    .subscribe(
      data => {


        this.chartData = {
          type: data.type,
          data:this.myData,
     //     data: data.data,
          chartColumns: data.chartColumns,
        };
        this.stillReading = false;
      }
    )
  }



  ngOnDestroy(): void {
    this.getDataSubscription.unsubscribe();
  }
}
