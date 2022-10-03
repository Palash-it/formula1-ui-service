export interface RouteProps {
    children: any;
    isAuthenticated: boolean;
}

export enum REQUEST_METHOD_TYPES {
    "POST" = "post",
    "GET" = "get"
}

export interface ApiBaseResponse {
    series: string;
    url: string;
    limit: number;
    offset: number;
    total: number;
}
export interface Season {
    season: string;
    url: string;
}

export interface SeasonFinalStandings{
    position: number;
    driverGivenName: string;
    driverFamilyName: string;
    constructorName: string;
    constructorNationality: string;
    points: number;
}

export interface Races {
    round: number;
    raceUrl: string;
    raceName: string;
    circuitId: string;
    circuitName: string;
    circuitUrl: string;
    locality: string;
    country: string;
    date: string;
    time: string;
}

export interface RaceQualifyTime {
    driverGivenName: string;
    driverFamilyName: string;
    q1: string;
    q2: string;
    q3: string;
}

export interface RaceResult {
    driverGivenName: string;
    driverFamilyName: string;
    position: string;
    time: string;
    status: string;
    points: number;
    fastestLapRank: number;
}