import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { pigdataTW } from './interface/pigdataTW.interface'


@Injectable({
  providedIn: 'root'
})
export class HttpgetService {

  constructor(private http: HttpClient) { }

  getData(dataUrl: string) {

    let dateString = ["1080625", "1080626", "1080627"];
    let params = new HttpParams();
    params=params.append('TransDate',dateString.join(','));
    return this.http.get(dataUrl, {
      params: {

        MarketName: "臺南安南",
      }
    });
    // return this.http.get<pigdataTW[]>(dataUrl);
  }
}
