import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pigdataTW } from './interface/pigdataTW.interface'


@Injectable({
  providedIn: 'root'
})
export class HttpgetService {

  constructor(private http: HttpClient) { }

  getData(dataUrl: string) {
    return this.http.get<pigdataTW[]>(dataUrl);
  }
}
