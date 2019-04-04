import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

const apiUrl = 'http://localhost:8080/indicadores/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public httpClient: HttpClient, public http: Http) { }

    login2(credentials) {
        console.log('Entrou no login...');
        return new Promise((resolve, reject) => {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            console.log('Credenciais: ' + credentials);
            this.http.post(apiUrl + 'security_check', JSON.stringify(credentials), { headers: headers })
                .subscribe(res => {
                    console.log('resposta do servidor: ' + res.json);
                    resolve(res.json());
                }, (err) => {
                    console.log('erro do servidor: ' + err);
                    reject(err);
                });
        });
    }

     login (data): Observable<any> {
    return this.httpClient.post<any>(apiUrl + 'security_check', data)
      .pipe(
        tap(_ => this.log('login')),
        catchError(this.handleError('login', []))
      );
  }


    logout() {
    return new Promise((resolve, reject) => {
        const headers = new Headers();
        headers.append('X-Auth-Token', localStorage.getItem('token'));

        this.http.post(apiUrl + 'logout', {}, {headers: headers})
          .subscribe(res => {
            localStorage.clear();
          }, (err) => {
            reject(err);
          });
    });
  }

   private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} falhou: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }

}
