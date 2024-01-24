import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Step2Service } from './step2.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss'
})
export class Step2Component {

  @ViewChild('config') config!: ElementRef;

  range: number = 0;
  speed: number = 0;
  cost: number = 0;
  towHitch: boolean = false;
  yoke: boolean = false;

  selectedConfig: boolean = false;

  carConfig: any = []

  constructor(private service: Step2Service,
    private storageData: AppService) {}

  ngOnInit() {

    let model = localStorage.getItem('model')?? '';
    this.service.getConfig(model).subscribe((data: any) => {
      this.carConfig = data.configs;
      this.towHitch = data.towHitch;
      this.yoke = data.yoke;
    })
  }

  configChange() {

    let selConfig = this.config?.nativeElement?.value == 'Choose Config' ? '' : this.config.nativeElement.value;

    let selectedConfig = this.carConfig.filter((ele: any) => ele.id == selConfig);
    
    this.range = selectedConfig[0].range;
    this.speed = selectedConfig[0].speed;
    this.cost = selectedConfig[0].price;

    this.selectedConfig =  selConfig ? true : false;

    localStorage.setItem('config', selectedConfig[0].description);
    localStorage.setItem('range', this.range.toString());
    localStorage.setItem('speed', this.speed.toString());
    localStorage.setItem('cost', this.cost.toString());
    localStorage.setItem('yoke', this.yoke.toString());
    localStorage.setItem('towHitch', this.towHitch.toString());

    this.storageData.enableStep3(false);
  }

  hitchChnage(event: any) {
    localStorage.setItem('towHitch', event.target.checked.toString());
  }

  yokeChnage(event: any) {
    localStorage.setItem('yoke', event.target.checked.toString());
  }
}
