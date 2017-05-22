import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
@Injectable()
export class HTTPService {
  constructor (private _http:Http){

  }
  getNewsdata(){
    return this._http.get('assets/news.json')
      .map(res=>res.json());
  }
  getcommdata(){
    return this._http.get('assets/comments.json')
      .map(res=>res.json());
  }
  getlogindata() {
    return this._http.get('assets/login.json')
      .map(res => res.json());
  }
}
