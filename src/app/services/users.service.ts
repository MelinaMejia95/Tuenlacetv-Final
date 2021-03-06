import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppGlobals } from '../shared/app.global';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Users } from '../users/users'

@Injectable()
export class UsersService {

  constructor(private _http:Http, private _global: AppGlobals) {
    console.log('working')
   }

  getUsers(){
    const url = this._global.url + `/usuarios/bd/` + localStorage.getItem('db');
    let header = new Headers();
    header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
    console.log(header)
    let options = new RequestOptions({ headers: header });
    return this._http.get(url, options).map(response =>{
        return response.json();
    })
 }

 /**
    @return {Observable<Users[]>} 
   */

  getUsersFilter(): Observable<Users[]> {
    const url = this._global.url + `/usuarios/bd/` + localStorage.getItem('db');
      let header = new Headers();
      header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
      console.log(header)
      let options = new RequestOptions({ headers: header });
      return this._http.get(url, options).map(response =>{
          return response.json();
      })
   }

 updateUsers(content: object){
    console.log(content)
    const url = this._global.url + `/usuarios/` + content['id'];
    let header = new Headers();
    header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
    let options = new RequestOptions({ headers: header });
    return this._http.put(url, content, options).map(response => response.json());
 }
 
 deleteUsers(code: string){
    const url = this._global.url + `/usuarios/` + code;
    let header = new Headers();
    header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
    let options = new RequestOptions({ headers: header, body: { "db": localStorage.getItem('db')  } });
    return this._http.delete(url, options).map(response => response.json());
 }

 createUsers(content: object){
    console.log(content)
    const url = this._global.url + `/usuarios`;
    let header = new Headers();
    header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
    let options = new RequestOptions({ headers: header, body: content });
    return this._http.post(url, content, options).map(response => response.json());
 }

 changePassword(content: object){
    console.log(content)
    const url = this._global.url + `/usuarios/cambiar_password/`+ content['id'];
    let header = new Headers();
    header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
    let options = new RequestOptions({ headers: header, body: content });
    return this._http.post(url, content, options).map(response => response.json());
 }

 resetPassword(content: object){
  console.log(content)
  const url = this._global.url + `/usuarios/resetear_password/`+ content['id'];
  let header = new Headers();
  header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
  let options = new RequestOptions({ headers: header, body: content });
  return this._http.post(url, content, options).map(response => response.json());
}

}
