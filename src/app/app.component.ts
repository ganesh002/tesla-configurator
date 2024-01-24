import {Component} from '@angular/core';
import {AsyncPipe, CommonModule, JsonPipe} from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: 'app.component.html',
})
export class AppComponent {
  name = 'Angular';


  stepOneChanged(event: any) {

    console.log(event);
    
  }

}
