import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Step2Service } from './step2.service';
import { AppService } from '../app.service';

type iConfig = {
    id: number;
    description: string;
    range: number;
    speed: number;
    price: number;
}

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss'
})
export class Step2Component implements OnInit {

  @ViewChild('config') config!: ElementRef;

  range: number = 0;
  speed: number = 0;
  cost: number = 0;
  towHitch: boolean = false;
  yoke: boolean = false;

  selectedConfig: boolean = false;

  carConfig!: iConfig[];

  constructor(private service: Step2Service,
  private storageData: AppService) {}

  ngOnInit() {

    const model = localStorage.getItem('model')?? '';
    this.service.getConfig(model).subscribe((data: any) => {
      this.carConfig = data.configs;
      this.towHitch = data.towHitch;
      this.yoke = data.yoke;
    })
  }

  configChange() {

    const selConfig = this.config?.nativeElement?.value == 'Choose Config' ? '' : this.config.nativeElement.value;

    const selectedConfig = this.carConfig.filter((ele: iConfig) => ele.id == selConfig);
    
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

  hitchChnage(event: Event) {
    const hitch = event.target as HTMLInputElement;
    localStorage.setItem('towHitch', hitch.checked.toString());
  }

  yokeChnage(event: Event) {
    
    const yoke = event.target as HTMLInputElement;
    localStorage.setItem('yoke', yoke.checked.toString());
  }
}
