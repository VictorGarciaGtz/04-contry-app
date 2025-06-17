import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mapper/country.mapper';
import { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<string, Country[]>();

  searchByCapital( query: string ): Observable<Country[]> {
    const queryLowerCase = query.toLowerCase();

    if( this.queryCacheCapital.has(query) ) {
      return of( this.queryCacheCapital.get(query) ?? [] );
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${ queryLowerCase }`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp) ),
        tap( (countries) => this.queryCacheCapital.set(query, countries) ),
        catchError((error) => {
          return throwError(
            () => new Error(`No se pudo obtener paises con la capital ${query}`)
          )
        })
      )
  }

  searchByCountry( query: string ): Observable<Country[]> {
    const queryLowerCase = query.toLowerCase();

    if( this.queryCacheCountry.has(query) ){
      return of( this.queryCacheCountry.get(query) ?? [] );
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${ queryLowerCase }`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp) ),
        tap((countries) => this.queryCacheCountry.set(query, countries)),
        delay(3000),
        catchError((error) => {
          return throwError(
            () => new Error(`No se pudo obtener paises con ${query}`)
          )
        })
      )
  }

  searchByAlphaCode( code: string ) {

    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${ code }`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp) ),
        map( countries => countries.at(0)),
        catchError((error) => {
          return throwError(
            () => new Error(`No se pudo obtener el país con este código ${code}`)
          )
        })
      )
  }

  searchByRegion( region: Region ): Observable<Country[]> {

    if( this.queryCacheRegion.has(region) ){
      return of( this.queryCacheRegion.get(region) ?? [] );
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${ region }`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp) ),
        tap((countries) => this.queryCacheRegion.set(region, countries)),
        catchError((error) => {
          return throwError(
            () => new Error(`No se pudo obtener paises con la region ${region}`)
          )
        })
      )
  }
}
