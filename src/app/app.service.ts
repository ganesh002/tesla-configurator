import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class AppService {

  imgSource = new BehaviorSubject('');
  step3enable = new BehaviorSubject(true);

  constructor() { }

  renderImage(path: string) {
    this.imgSource.next(path)
  }

  enableStep3(status: boolean) {
    this.step3enable.next(status)
  }

}