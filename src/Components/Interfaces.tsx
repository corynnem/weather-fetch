interface ICoords {
    latitude: number,
    longitude: number
}

export interface IPosition {
    coords: ICoords
}



export interface ICity {
    name: string,
    description: string,
    wind_speed: number,
    main: string,
    feels_like: number,
    weather: [],
}


export interface IState{
    key: string, 
    baseURL: string,
    weather: ICity,
    searched: boolean,
    farenheight: boolean
}



export interface IResults{
    current: ICity
}
