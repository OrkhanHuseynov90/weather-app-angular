import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as WeatherActions from './store/weather.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  weatherSearchForm: FormGroup;
  weatherData: any;
  forecastData: any;
  setOfDays: Set<string> = new Set();
  mapOfTemps: Map<string, string> = new Map();
  asc: boolean = true;

  constructor(private store: Store<fromApp.WeatherAppState>) {
    this.weatherSearchForm = new FormGroup({
      city: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.store.select('weather').subscribe((weatherData) => {
      if (typeof weatherData !== undefined) {
        this.weatherData = weatherData;
      }
    });
    this.store.select('forecast').subscribe((forecastData) => {
      this.forecastData = forecastData;
      for (const item of forecastData.data.days) {
        this.setOfDays.add(item.dt_txt.split(' ')[0]);
        this.mapOfTemps.set(item.dt_txt, item.main.temp);
      }
    });
  }

  onFetch() {
    let city = this.weatherSearchForm.get('city')?.value;
    const cityInput = city.split(',');

    this.store.dispatch(
      new WeatherActions.fetchWeather({
        city: cityInput[0],
        country: cityInput[1],
      })
    );
    this.store.dispatch(
      new WeatherActions.forecastWeather({
        city: cityInput[0],
        country: cityInput[1],
      })
    );
    this.weatherSearchForm.reset();
  }

  unixToDate(timestamp: number) {
    if (!timestamp) {
      return '';
    }
    return new Date(timestamp * 1000);
  }

  stringToDate(str: string) {
    return str.split('-').reverse().join('-');
  }

  mapToTemp(input: string, str: string) {
    return this.mapOfTemps.get(input + ' ' + str);
  }

  sort() {
    const getCellValue = (tr: any, idx: number) => {
      return tr.children[idx].textContent;
    };

    const comparer = (idx: number, asc: any) => (a: any, b: any) =>
      ((v1, v2) =>
        v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2)
          ? v1 - v2
          : v1.toString().localeCompare(v2))(
        getCellValue(asc ? a : b, idx),
        getCellValue(asc ? b : a, idx)
      );

    const table = document.getElementById('table') as HTMLTableElement;
    Array.from(table.querySelectorAll('tr.lh-lg'))
      .sort(comparer(0, (this.asc = !this.asc)))
      .forEach((tr) => {
        tr.className = 'lh-lg';
        table.tBodies[0].appendChild(tr);
      });
  }
}
