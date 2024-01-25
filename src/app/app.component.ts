import {Component, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe, CommonModule, JsonPipe} from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'tesla-configurator';

  imgPath:string = '';
  subscription1!: Subscription;
  subscription2!: Subscription;
  isDisabledStep2: boolean = true;
  isDisabledStep3: boolean = true;

  constructor(private storageData: AppService) {}

  ngOnInit() {
    this.subscription1 = this.storageData.imgSource.subscribe(src => {
      this.isDisabledStep2 = src!='' ? false : true;
      this.imgPath = src
    })

    this.subscription2 = this.storageData.step3enable.subscribe(status => this.isDisabledStep3 = status)
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }

}
