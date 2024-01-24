
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Step1Service {
  constructor(private http: HttpClient) { }

  getModels() {
    return this.http.get('/models');
  }
}