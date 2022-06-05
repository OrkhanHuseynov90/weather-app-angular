import { ActionReducerMap } from '@ngrx/store';
import * as fromWeather from '../weather/store/weather.reducer';

export interface WeatherAppState {
  weather: fromWeather.WeatherState;
  forecast: fromWeather.ForecastState;
}

export const appReducer: ActionReducerMap<WeatherAppState, any> = {
  weather: fromWeather.weatherReducer,
  forecast: fromWeather.forecastReducer,
};
