import * as WeatherActions from './weather.actions';

export interface WeatherState {
  data: WeatherResponseData;
  error: any;
  status: 'pending' | 'success' | 'error';
}

const initialWeatherState: WeatherState = {
  data: {
    city: '',
    country: '',
    time: '',
    temp: '',
    feels_like: '',
    sunset: new Date(),
    sunrise: new Date(),
    wind: '',
    min: '',
    max: '',
    description: '',
  },
  error: null,
  status: 'pending',
};

export interface WeatherResponseData {
  city: string;
  country: string;
  time: string;
  temp: string;
  feels_like: string;
  sunset: Date;
  sunrise: Date;
  wind: string;
  min: string;
  max: string;
  description: string;
}

export interface ForecastState {
  data: ForecastResponseData;
  error: any;
  loading: boolean;
}

const initialForecastState: ForecastState = {
  data: {
    days: [],
  },
  error: null,
  loading: false,
};

export interface ForecastResponseData {
  days: any;
}

function unixToTime(timeInUnix: number) {
  return new Date(timeInUnix * 1000);
}

export function weatherReducer(
  state: WeatherState = initialWeatherState,
  action: WeatherActions.WeatherActions
): WeatherState {
  switch (action.type) {
    case WeatherActions.FETCH_WEATHER: {
      return {
        ...state,
        error: null,
        status: 'pending',
      };
    }
    case WeatherActions.FETCH_WEATHER_SUCCESS: {
      const data = {
        city: action.payload.name,
        country: action.payload.sys.country,
        time: action.payload.dt,
        temp: action.payload.main.temp,
        feels_like: action.payload.main.feels_like,
        sunset: unixToTime(action.payload.sys.sunset),
        sunrise: unixToTime(action.payload.sys.sunrise),
        wind: action.payload.wind.speed,
        min: action.payload.main.temp_min,
        max: action.payload.main.temp_max,
        description: action.payload.weather[0].description,
      };
      return {
        ...state,
        error: null,
        status: 'success',
        data: data,
      };
    }
    case WeatherActions.FETCH_WEATHER_FAIL: {
      return {
        ...state,
        error: action.payload,
        status: 'error',
        data: {
          city: '',
          country: '',
          time: '',
          temp: '',
          feels_like: '',
          sunset: new Date(),
          sunrise: new Date(),
          wind: '',
          min: '',
          max: '',
          description: '',
        },
      };
    }
    default:
      return state;
  }
}

export function forecastReducer(
  state: ForecastState = initialForecastState,
  action: WeatherActions.WeatherActions
): ForecastState {
  switch (action.type) {
    case WeatherActions.FORECAST_WEATHER: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case WeatherActions.FORECAST_WEATHER_SUCCESS: {
      const data = {
        days: action.payload.list,
      };
      return {
        ...state,
        error: null,
        loading: false,
        data: data,
      };
    }
    case WeatherActions.FORECAST_WEATHER_FAIL: {
      return {
        ...state,
        error: action.payload,
        loading: false,
        data: {
          days: [],
        },
      };
    }
    default:
      return state;
  }
}
