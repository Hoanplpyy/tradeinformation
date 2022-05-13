import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GoogleChartsConfig } from "angular-google-charts";
import { ReplaySubject } from "rxjs";
import { Observable } from "rxjs/internal/Observable";

import { take } from "rxjs/operators";

@Injectable()
export class GoogleChartsConfigService {
  private configSubject = new ReplaySubject<GoogleChartsConfig>(1);
  readonly config$ = this.configSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadLazyConfigValues(): void {
    this.http.post('https://special.config.api.com/getchartsconfig', {})
      .pipe(take(1))
      .subscribe(config => this.configSubject.next(config));
  }
}

// Factory function that provides the config$ observable from your GoogleChartsConfigService
export function googleChartsConfigFactory(configService: GoogleChartsConfigService): Observable<GoogleChartsConfig> {
  return configService.config$;
}