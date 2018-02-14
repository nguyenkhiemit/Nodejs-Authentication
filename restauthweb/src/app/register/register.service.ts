import {Http, Headers} from "@angular/http";
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map';

@Injectable()
export class RegisterService {

  constructor(private http: Http) {

  }

  register(user) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8000/signup', JSON.stringify(user), {headers}).map(res => res.json());
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
