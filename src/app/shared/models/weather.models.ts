export interface weatherObject {
    name: string,
    feels_like: number,
    feels_like_imp: number,
    humidity: number,
    visibility: number,
    pressure: number,
    temp: number,
    temp_max: number,
    temp_min: number,
    temp_imp: number,
    temp_max_imp: number,
    temp_min_imp: number,
    weather: string,
    weather_description: string,
    sunrise: Date,
    sunset: Date,
    icon: string,
  }
  
  // interface units 
  
  export enum UnitString {
    METRIC = "°C",  
    IMPERIAL = "°F",
  }

  export enum Units {
    METRIC = "metric",
    IMPERIAL = "imperial",
  }

  export interface UnitObject {
    name: Units,
    display_string: UnitString,
  }

  export class UnitTypes {
    static readonly metric  = new UnitTypes(Units.METRIC, UnitString.METRIC);
    static readonly imperial = new UnitTypes(Units.IMPERIAL, UnitString.IMPERIAL);
  
    private constructor(private readonly key: string, public readonly value: any) {
    }
  
    toString() {
      return this.key;
    }
  }