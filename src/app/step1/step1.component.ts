import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Step1Service } from './step1.service';
import { AppService } from '../app.service';

type iColors = {
  code: string;
  description: string;
  price: number;
}

type iModel = {
  code: string;
  description: string;
  colors: [];
}

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss'
})

export class Step1Component implements OnInit {

  @ViewChild('model') model!: ElementRef;
  @ViewChild('color') color!: ElementRef;

  carModels!: iModel[];
  carColors!: iColors[];
  isVisibleColor: boolean = false;

  constructor(private service: Step1Service,
    private storageData: AppService) { }

  ngOnInit() {

    this.service.getModels().subscribe(data => {
      this.carModels = <iModel[]>data;
    })

    this.clearStorage();
  }

  modelChange() {

    const selModel = this.model?.nativeElement?.value == 'Choose Model' ? '' : this.model.nativeElement.value;

    const selectedModel = this.carModels.filter((ele: iModel) => ele.code == selModel);
    this.carColors = selectedModel[0].colors;
    this.isVisibleColor = selModel ? true : false;
  }

  colorChange() {
    const selModel = this.model?.nativeElement?.value == 'Choose Model' ? '' : this.model.nativeElement.value;
    const selColor = this.color?.nativeElement?.value == 'Choose Color' ? '' : this.color.nativeElement.value;

    const selectedColors = this.carColors.filter((ele: iColors) => ele.code == selColor);
    localStorage.setItem('model', selModel);
    localStorage.setItem('color', selectedColors[0].description);
    localStorage.setItem('colorPrice', selectedColors[0].price.toString());

    this.storageData.renderImage(`../assets/img/${selModel}/${selectedColors[0].code}.jpg`)
  }


  clearStorage() {
    localStorage.setItem('model', '');
    localStorage.setItem('color', '');
    localStorage.setItem('colorPrice', '');
    localStorage.setItem('config', '');
    localStorage.setItem('range', '');
    localStorage.setItem('speed', '');
    localStorage.setItem('cost', '');
    localStorage.setItem('yoke', '');
    localStorage.setItem('towHitch', '');
  }

}
