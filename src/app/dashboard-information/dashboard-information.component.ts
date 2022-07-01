import { from, fromEvent, interval, Observable, of, Subject, Subscription } from 'rxjs';
import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PigTradeService } from '../services/pig-trade.service';
import { marketNameArray } from '../model/dashboard/marketName.model';
import { throttleTime, switchMap, delay, debounceTime, map, take } from 'rxjs/operators';
import { selectedItem } from '../model/dashboard/selected.interface';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox/checkbox';



@Component({
  selector: 'app-dashboard-information',
  templateUrl: './dashboard-information.component.html',
  styleUrls: ['./dashboard-information.component.css']
})
export class DashboardInformationComponent implements OnInit, AfterViewInit {


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

  setCheckedArray: number[] = [0]

  marketTest = [
    {
      name: 'testA',
      trigger: false
    }
  ]

  @ViewChild('btnClick', { read: ElementRef }) checkATest!: ElementRef<HTMLButtonElement>

  @ViewChildren('btnCheck', { read: ElementRef }) check!: QueryList<ElementRef>

  sourceB$ = new Observable<ElementRef<any>>();

  sourceA$ = new Observable<QueryList<ElementRef<any>>>();

  private subscriptions = new Subscription();

  private subs = new Subscription();

  waiting: boolean = false;

  constructor(private pigTradeService: PigTradeService, private fb: FormBuilder) { }

  ngAfterViewInit(): void {

    // this.subscriptions.add(
    //   fromEvent(this.checkATest.nativeElement, 'click').pipe(
    //     throttleTime(3000)
    //   ).subscribe((e: any) => {
    //     this.subs.unsubscribe();
    //     setTimeout(()=> this.listenToClick(this.checkATest));
    //     console.log(`BUTTON: Now is good time to do something`);

    //     this.waiting = true;
    //     setTimeout(()=> this.waiting = false, 3000);
    //   })
    // );




    //  this.sourceA$ = fromEvent(this.checkATest.nativeElement, 'click')
    //  .pipe(
    //   debounceTime(2000),
    //   switchMap(()=>{
    //     return of(1)
    //   })
    //  )
    //  this.sourceA$.subscribe(
    //   data=>{
    //     console.log(data)
    //   }
    //  )

    // I generate mat-checkbox with ngFor loop. And I use queryList to get the state of these elements.
    // I would like to wait for two seconds while users check multiple checkbox.
    // this.sourceA$=of(this.check)
    // this.sourceA$.pipe(
    //   debounceTime(2000),
    //   map(data=>{
    //    return data.forEach(
    //       (element: ElementRef<HTMLButtonElement>, index) => {
    //        return fromEvent(element.nativeElement, 'click').pipe(
    //           debounceTime(2000)
    //         )
    //       }
    //     )
    //   })
    // ).subscribe(
    //   data=>
    //   console.log(data)
    // )

    this.check.changes.pipe(
      take(1)
    ).subscribe(
      data=>{
        console.log(data)
      }
    )

    // this.check.forEach(
    //   (element: ElementRef<HTMLButtonElement>, index) => {
    //     fromEvent(element.nativeElement, 'click').pipe(
    //       debounceTime(2000)
    //     ).subscribe(
    //       data => {
    //         //  this.subs[index].unsubscribe()
    //         console.log(data)
    //       }
    //     )
    //   }
    // )



  }

  private listenToClick(button: ElementRef) {
    this.subs = fromEvent(button.nativeElement, 'click')
      .subscribe(res => console.log(`BUTTON : You have to wait for 3 secs`));
  }

  ngOnInit(): void {


    const today = new Date();
    // const month = today.getMonth();
    // const year = today.getFullYear();
    // const day = today.getDate();
    // const start = today.getDate() - 14;

    // let startDay = new Date(year, month, start)
    // let endDay = new Date(year, month, day)
    // this.range = new FormGroup({
    //   startDate: new FormControl(startDay),
    //   endDate: new FormControl(endDay),
    // });

    // this.pigTradeService.getAllPigData()

    // this.pigTradeService.setPigData(this.marketArray[0].market, startDay, endDay)

  }
  addEvent() {

  }
  setCheck() {
    this.sourceB$.subscribe(
      data => {
        console.log(data)
      }
    )

    // let dSub=this.marketGroup.valueChanges.pipe(
    //   delay(2000),
    //   switchMap((data:selectedItem)=>{

    //     return  of(data)
    //   })
    // ).subscribe(
    //   data=>{
    //     console.log(data)
    //     dSub.unsubscribe()
    //   }
    // )
    // let sourceA$ = fromEvent(document.querySelector('#checked')!, 'click').pipe(
    //   map(data => {
    //     return data.type
    //   })
    // )

    // let sourceB$ = of(this.marketArray)

    // let getCheckData$ = of(this.marketArray).pipe(
    //   delay(2000),
    //   map(data => {
    //     return data.filter(
    //       subData => {
    //         return subData.trigger === true
    //       }
    //     )
    //   }
    //   )
    // )
  }


  onClick() {


    // this.sourceA$.subscribe(
    //   data => {
    //     console.log(data)
    //   }
    // )

  }


}
