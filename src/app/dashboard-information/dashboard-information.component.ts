import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard-information',
  templateUrl: './dashboard-information.component.html',
  styleUrls: ['./dashboard-information.component.css']
})
export class DashboardInformationComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });


  startDate!: string;

  endDate!: string;

  targetMarket = '臺南安南';

  constructor() { }

  ngOnInit(): void {
  }

  addEvent() {
    if (this.range.value.start !== null) {
      let date = new Date(this.range.value.start)
      this.startDate = this.changeToTWFormate(date)

    }

    if (this.range.value.end !== null) {
      let date = new Date(this.range.value.end)
      this.endDate = this.changeToTWFormate(date)

      // this.dataChanged();
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
  // dataChanged() {
  //   this.stillReading = true;
  //   let pigDateAndPrice = this.pigData.pipe(
  //     map(data => {
  //       return data.filter(subData => {
  //         return subData.market === this.targetMarket && subData.date < (+this.endDate) && subData.date > (+this.startDate)
  //       })
  //     }),
  //     map(data => {
  //       return data.map(subData => {
  //         console.log(subData.date)
  //         return [subData.date.toString(), subData.averagePrice]
  //       })
  //     }),
  //     map(data => {
  //       return data.reverse()
  //     })
  //   )

  //   this.getDataSubscription=pigDateAndPrice.subscribe(
  //     data => {
  //       console.log(data)
  //       this.chartData = {
  //         type: ChartType.LineChart,
  //         data: data,
  //         chartColumns: ['Date', 'Price'],
  //         width: this.chartWidth,
  //         height: this.chartHeight
  //       };
  //       this.stillReading = false;
  //     }
  //   )
  // }

}
