import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as WeatherActions from './weather.actions';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable()
export class WeatherEffects {
  @Effect()
  currentWeatherData = this.actions$.pipe(
    ofType(WeatherActions.FETCH_WEATHER),
    switchMap((weatherData: WeatherActions.fetchWeather) => {
      return this.http
        .get(
          'https://api.openweathermap.org/data/2.5/weather?units=metric&q=' +
            weatherData.payload.city +
            ',' +
            weatherData.payload.country +
            '&appid=67426d96ac9ad5a78a59ce268d062f38'
        )
        .pipe(
          map((response) => {
            return new WeatherActions.fetchWeatherSuccess(response);
          }),
          catchError((error) => {
            return of(new WeatherActions.fetchWeatherFail(error.error.message));
          })
        );
      //https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    })
  );

  @Effect()
  forecastData = this.actions$.pipe(
    ofType(WeatherActions.FETCH_WEATHER),
    switchMap((forecastData: WeatherActions.forecastWeather) => {
      return this.http
        .get(
          'https://api.openweathermap.org/data/2.5/forecast?units=metric&q=' +
            forecastData.payload.city +
            ',' +
            forecastData.payload.country +
            '&appid=67426d96ac9ad5a78a59ce268d062f38'
        )
        .pipe(
          map((response) => {
            return new WeatherActions.forecastWeatherSuccess(response);
          }),
          catchError((error) => {
            return of(
              new WeatherActions.forecastWeatherFail(error.error.message)
            );
          })
        );
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
