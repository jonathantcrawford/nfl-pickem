import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {


  restfulData: any = {};

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getWeather()
    .subscribe((response: any) => {
      this.restfulData = response,
      console.log(response);
    });
  }

  getWeather() {
    return this.http.get('/weather');
  }

}
