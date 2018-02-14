import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoginService} from "./login.service";
import {NavigationExtras, Router} from "@angular/router";
import Any = jasmine.Any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<Any>();

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  login(user) {
    this.loginService.login(user).subscribe(
      data => {
        if(data != null && data.success) {
          this.loginService.getUser(data.token).subscribe(
            data => {
              this.messageEvent.emit(data);
              this.router.navigate(['profile'], {queryParams: {"name" : data.name}})
            }
          )
        }
      }
    )
  }
}
