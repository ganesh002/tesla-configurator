import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss'
})
export class Step3Component implements OnInit {

  config: null | string = '';
  configPrice: null | string = '';
  range: null | string = '';
  speed: null | string = '';
  color: null | string = '';
  colorPrice: null | string = '';
  towHitch: null | string = '';
  towHitchPrice: number = 1000;
  yoke: null | string = '';
  yokePrice: number = 1000;
  total: number = 0;

  ngOnInit() {
    this.config = localStorage.getItem('config');
    this.configPrice = localStorage.getItem('cost');

  this.range = localStorage.getItem('range');
  this.speed = localStorage.getItem('speed');
  this.color = localStorage.getItem('color');
  this.colorPrice = localStorage.getItem('colorPrice');
  this.towHitch = localStorage.getItem('towHitch');
  this.yoke = localStorage.getItem('yoke');

  this.total += this.configPrice ? parseInt(this.configPrice)  : 0;
  this.total += this.colorPrice ? parseInt(this.colorPrice)  : 0;
  this.total += this.towHitch=='true' ? this.towHitchPrice : 0;
  this.total += this.yoke == 'true' ? this.yokePrice : 0;
  }

}
