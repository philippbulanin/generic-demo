import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {Entity} from "../types/entites.enum";
import {Token} from "../types/token.type";

@Injectable({
  providedIn: 'root'
})
export class MainHttpService {
  private readonly baseUrl = 'https://hys-fe-course-api.vercel.app';

  constructor(
    private http: HttpClient
  ) {
  }

  public getData<T>(entityName: Entity): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/${entityName}`);
  }

  public login(username: string, password: string): Observable<string> {
    return this.http
      .post<Token>(`${this.baseUrl}/auth/login`, {
        username,
        password
      })
      .pipe(
        map((resp: Token): string => `Bearer ${resp.access_token}`),
        tap((token: string): void => {
          window.localStorage.setItem('token', token);
        })
      );
  }
}
