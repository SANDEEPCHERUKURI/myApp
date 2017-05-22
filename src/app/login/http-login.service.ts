import {Injectable} from "@angular/core";
import {Http,RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';
//import {Observable} from 'rxjs/Rx';

import {Headers} from "@angular/http";
@Injectable()
export class HTTPTestService {
  public url: "http://www.mocky.io/v2/591d46e1110000940882518d";
  public name=[1,2,4,5,6,7];
  public getList:any=this.name;
  constructor(private _http: Http) {

  }

  getjsondata() {
    return this._http.get('assets/login.json')
      .map(res => res.json());
  }
  getUserListMethod=()=> {
    const headers = new Headers();
    headers.append('Content-Type:','application/json;utf-8');

    var findU = [ {
      "name":"happy",
      "passord":"Happy@511"
    }]; // problem area. assuming findU isn't passed through

   return this._http.post('assets/login.json',findU,headers)
      .subscribe(()=>{},error=>console.log(error),
        ()=>alert(findU));
  } //END - getUserListMethod

}
