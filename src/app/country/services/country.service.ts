import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { map, Observable, catchError, throwError, delay, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mapper/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  searchByCapital( query: string ): Observable<Country[]> {
    const queryLowerCase = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${ queryLowerCase }`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp) ),
        catchError((error) => {
          return throwError(
            () => new Error(`No se pudo obtener paises con la capital ${query}`)
          )
        })
      )
  }

  searchByCountry( query: string ): Observable<Country[]> {
    const queryLowerCase = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${ queryLowerCase }`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp) ),
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
}
