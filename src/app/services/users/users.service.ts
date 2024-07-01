import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private logedUser = new ReplaySubject<any>(1);
  user$ = this.logedUser.asObservable();

  constructor(private http:HttpClient,  private router:Router) { }
  getUser(datos: any){
    return this.http.post(`${environment.appUrl}api/User/Login`, datos)
  }
  insertPerson(datos:any){
    return this.http.post(`${environment.appUrl}api/User/Insert`, datos)
  }
  setUser(user:any){
    localStorage.setItem(environment.userKey,JSON.stringify(user));
    this.logedUser.next(user);
    this.user$.subscribe({
      next: (response:any) => {  }
    })
  }
  logout(){
    localStorage.removeItem(environment.userKey);
    this.logedUser.next(null);
    this.router .navigateByUrl('/');
  }
  getLoginInfo(){
    const key = localStorage.getItem(environment.userKey)
    if(key){
      const user:any = JSON.parse(key);
      return user;
    }else{
      return ''
    }
  }
}
