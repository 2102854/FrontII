export interface Auth {
    result: string,
    message: string 
}

export interface Auth_Geolocation {
    ip: string,
    city: string, 
    region: string,
    region_code: string,
    country_name: string,
    country_code: string,
    latitude: string,
    longitude: string,
    flag: string,
    carrier_name: string,
    carriet_type: string,
    time_zone: string,
    threat_is_proxy:boolean,
    threat_is_tor:boolean
}