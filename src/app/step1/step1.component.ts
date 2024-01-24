import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Step1Service } from './step1.service';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss'
})

export class Step1Component {

  @ViewChild('model') model!: ElementRef;
  @ViewChild('color') color!: ElementRef;

  @Output() stepOneChanged = new EventEmitter();

  carModels: any;
  carColors: any;
  isVisibleColor: boolean = false;
  renderImgPath: string = '';

  constructor(private service: Step1Service) {}

  ngOnInit() {

    this.service.getModels().subscribe((data: any) => {
      console.log(data);
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
    
    this.stepOneChanged.emit({model:selModel, color: selColor});

    this.renderImgPath = `../assets/img/${selModel}/${selectedColors[0].code}.jpg`
  }

}
