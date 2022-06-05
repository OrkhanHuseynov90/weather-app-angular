import { Action } from '@ngrx/store';

export const FETCH_WEATHER = 'FETCH_WEATHER';
export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export const FETCH_WEATHER_FAIL = 'FETCH_WEATHER_FAIL';

export const FORECAST_WEATHER = 'FORECAST_WEATHER';
export const FORECAST_WEATHER_SUCCESS = 'FORECAST_WEATHER_SUCCESS';
export const FORECAST_WEATHER_FAIL = 'FORECAST_WEATHER_FAIL';

export class fetchWeather implements Action {
  readonly type = FETCH_WEATHER;
  constructor(public payload: { city: string; country?: string }) {}
}

export class fetchWeatherSuccess implements Action {
  readonly type = FETCH_WEATHER_SUCCESS;
  constructor(public payload: any) {}
}

export class fetchWeatherFail implements Action {
  readonly type = FETCH_WEATHER_FAIL;
  constructor(public payload: any) {}
}

export class forecastWeather implements Action {
  readonly type = FORECAST_WEATHER;
  constructor(public payload: { city: string; country?: string }) {}
}

export class forecastWeatherSuccess implements Action {
  readonly type = FORECAST_WEATHER_SUCCESS;
  constructor(public payload: any) {}
}

export class forecastWeatherFail implements Action {
  readonly type = FORECAST_WEATHER_FAIL;
  constructor(public payload: any) {}
}

export type WeatherActions =
  | fetchWeather
  | fetchWeatherSuccess
  | fetchWeatherFail
  | forecastWeather
  | forecastWeatherSuccess
  | forecastWeatherFail;
