import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '../../../environments/environment';
import {IUser} from '../../models/user.interface';


@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }

  public getUserByEmail(email: string): Observable<IUser> {
    const params: HttpParams = new HttpParams().set('email', email);

    return this.http.get(`${environment.apiUrl}/users`, {params: params})
      .pipe(
        map((user: IUser[]) => user[0] ? user[0] : null)
      );
  }

  public createNewUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${environment.apiUrl}/users`, user);
  }
}
