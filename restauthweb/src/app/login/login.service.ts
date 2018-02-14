
import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  constructor(private http: Http) {

  }

  login(user) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8000/authenticate', JSON.stringify(user), {headers}).map(res => res.json());
  }

  getUser(accessToken) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', accessToken);
    return this.http.get('http://localhost:8000/memberinfo', {headers}).map(res => res.json())
  }

}
