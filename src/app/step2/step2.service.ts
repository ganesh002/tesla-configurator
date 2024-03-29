
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Step2Service {
  constructor(private http: HttpClient) { }

  getConfig(model: string) {
    return this.http.get(`/options/${model}`);
  }
}