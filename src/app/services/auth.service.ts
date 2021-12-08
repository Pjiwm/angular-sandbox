import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router, UrlSegment } from '@angular/router'
import { map, Observable, of } from 'rxjs'
import { User } from '../models/user'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = 'https://mykanjilist-backend.herokuapp.com/api'
  constructor(private http: HttpClient, private router: Router) {

  }

  register(user: User) {
    console.log(user)
    return this.http
      .post<any>(`${this.baseUrl}/register`, user)
      .subscribe((res) => {
        if (res.token) {
          this.setSession(res)
          this.router.navigate(['/'])
        } else {
          //  TODO error handling in auth register
        }
      })
  }

  login(email: string, password: string) {
    this.http
      .post<any>(`${this.baseUrl}/login`, { email: email, password: password })
      .subscribe((res) => {
        if (res.token) {
          this.setSession(res)
          this.router.navigate(['/'])
        } else {
          // TODO error handling in auth login
        }
      })
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user_name')
    localStorage.removeItem('user_id')
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null
  }

  isLoggedOut() {
    return !this.isLoggedIn()
  }

  private setSession(res: any) {
    localStorage.setItem('token', res.token)
    localStorage.setItem('user_name', res.userName)
    localStorage.setItem('user_id', res._id)
    localStorage.setItem('user_email', res.email)
    localStorage.setItem('user_password', res.password)
  }

  getUser(): Observable<User> {
    const user: User = {
      userName: localStorage.getItem('user_name') || "",
      email: localStorage.getItem('user_email') || "",
      id: localStorage.getItem('user_id') || "0",
      password: localStorage.getItem('user_password') || ""
    }
    return of(user)
  }

  public getToken(): string {
    return localStorage.getItem('token') || "";
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting 
    // whether or not the token is expired
    return token.length > 1;
  }

  // TODO getuserbyID
  // getUserById(id: string): Observable<User> {
  //   this.http
  //   .post<any>(`${this.baseUrl}/login`, { email: email, password: password })
  //   .subscribe((res) => {
  //     if (res.token) {
  //       this.setSession(res)
  //       this.router.navigate(['/'])
  //     } else {
  //     }
  //   })
  // }
}
