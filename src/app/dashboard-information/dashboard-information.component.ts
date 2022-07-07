import { selectedItem } from './../model/dashboard/selected.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PigTradeService } from '../services/pig-trade.service';
import { marketNameArray } from '../model/dashboard/marketName.model';
import { debounceTime, filter, map } from 'rxjs/operators';



@Component({
  selector: 'app-dashboard-information',
  templateUrl: './dashboard-information.component.html',
  styleUrls: ['./dashboard-information.component.css']
})
export class DashboardInformationComponent implements OnInit {


  range = this.fb.group({
    startDate: new FormControl(new Date()),
    endDate: new FormControl(new Date()),
  })

  marketGroup = this.fb.group({
    newTaipei: true,
    yilan: false,
    taoyuan: false,
    hsinchu: false,
    miaoli: false,
    taichung: false,
    taichungAnn: false,
    changhua: false,
    nantou: false,
    yunlin: false,
    chiayiCity: false,
    chiayi: false,
    tainanAnn: false,
    tainan: false,
    kaohsiung: false,
    kaohsiungK: false,
    kaohsiungF: false,
    kaohsiungC: false,
    pingtung: false,
    taitung: false,
    hualien: false,
    penghu: false,
  })

  marketArray = marketNameArray;


  constructor(private pigTradeService: PigTradeService, private fb: FormBuilder) { }


  ngOnInit(): void {


    this.marketGroup.valueChanges.pipe(
      debounceTime(2000),
      map((selected:selectedItem)=>{
          return Object.keys(selected).filter(
          key=>{
            return selected[key]===true
          }
        )
      }),
    )
    .subscribe(
      (markets) => {
        console.log(markets)
      }
    )


      let markets:string[]=this.marketGroup.value;
      console.log(markets)
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const day = today.getDate();
    const start = today.getDate() - 14;

    let startDay = new Date(year, month, start)
    let endDay = new Date(year, month, day)
    this.range = new FormGroup({
      startDate: new FormControl(startDay),
      endDate: new FormControl(endDay),
    });

    this.pigTradeService.getAllPigData()

    this.pigTradeService.setPigData(markets, startDay, endDay)

  }

  addEvent() {

  }


}
