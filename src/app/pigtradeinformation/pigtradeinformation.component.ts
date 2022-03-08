import { Component, OnInit } from '@angular/core';
import { HttpgetService } from '../httpget.service';
import { pigdata } from '../interface/pigdata.interface';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-pigtradeinformation',
  templateUrl: './pigtradeinformation.component.html',
  styleUrls: ['./pigtradeinformation.component.css']
})
export class PigtradeinformationComponent implements OnInit {

  pigUrl = "https://data.coa.gov.tw/Service/OpenData/FromM/AnimalTransData.aspx";

  pigData!: pigdata[]

  constructor(private http: HttpgetService) { }

  ngOnInit(): void {
    this.http.getData(this.pigUrl).subscribe(
      data => {
       // this.pigData = data
      }
    )
  }

}
