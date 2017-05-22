import {Injectable} from "@angular/core";
import {Http,RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';

import {Headers} from "@angular/http";
@Injectable()
export class HTTPTestService {
  constructor(private _http: Http) {

  }
  getlogindata() {
    return this._http.get('assets/login.json')
      .map(res => res.json());
  }

}
