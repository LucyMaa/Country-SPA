import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1'

  constructor(private http: HttpClient) { }

  private getCountriesRequest(url:string):Observable<Country[]>{
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(error => of([])),
        delay(2000),
      );
  }

  searchCountryByAlphaCode(code: string): Observable<Country|null> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${code}`)
      .pipe(
        map(countries => countries.length > 0 ? countries[0]: null),
        catchError(error => of(null))
      );
  }

  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url);
  }

  searchCountry(term: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/name/${term}`)
      .pipe(
        catchError(error => of([]))
      );
  }

  searchRegion(region: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/region/${region}`)
      .pipe(
        catchError(error => of([]))
      );
  }

}
