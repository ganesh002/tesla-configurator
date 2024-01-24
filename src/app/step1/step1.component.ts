import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Step1Service } from './step1.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss'
})

export class Step1Component implements OnInit{

  @ViewChild('model') model!: ElementRef;
  @ViewChild('color') color!: ElementRef;

  carModels: any;
  carColors: any;
  isVisibleColor: boolean = false;

  constructor(private service: Step1Service,
  private storageData: AppService) {}

  ngOnInit() {

    this.service.getModels().subscribe((data: any) => {
      this.carModels = data;
    })
  }

  modelChange() {

    let selModel = this.model?.nativeElement?.value == 'Choose Model' ? '' : this.model.nativeElement.value;

    let selectedModel = this.carModels.filter((ele: any) => ele.code == selModel);
    this.carColors = selectedModel[0].colors;
    this.isVisibleColor = selModel ? true : false;
  }

  colorChange() {
    let selModel = this.model?.nativeElement?.value == 'Choose Model' ? '' : this.model.nativeElement.value;
    let selColor = this.color?.nativeElement?.value == 'Choose Color' ? '' : this.color.nativeElement.value;

    let selectedColors = this.carColors.filter((ele: any) => ele.code == selColor);
    localStorage.setItem('model', selModel);
    localStorage.setItem('color', selectedColors[0].description);
    localStorage.setItem('colorPrice', selectedColors[0].price);
    
    this.storageData.renderImage(`../assets/img/${selModel}/${selectedColors[0].code}.jpg`)
  }

}
