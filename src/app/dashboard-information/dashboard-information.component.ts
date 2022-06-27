import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PigTradeService } from '../services/pig-trade.service';

@Component({
  selector: 'app-dashboard-information',
  templateUrl: './dashboard-information.component.html',
  styleUrls: ['./dashboard-information.component.css']
})
export class DashboardInformationComponent implements OnInit {


  range = this.fb.group({
    startDate: [''],
    endDate: [''],
  })

  marketName: string = '新北市'



  constructor(private pigTradeService: PigTradeService, private fb: FormBuilder) { }

  ngOnInit(): void {

    let endDay = new Date();
    let changeDay = 30; // 設定要往前或往後幾天

    let setDay = new Date();
    let startDay = new Date(setDay.setDate(setDay.getDate() - changeDay));
    this.pigTradeService.setPigData(this.marketName, startDay, endDay)


  }
  addEvent() {
    if (this.range.value.endDate !== null) {

      this.pigTradeService.setPigData(this.marketName, this.range.value.startDate, this.range.value.endDate)
    }
  }
}
