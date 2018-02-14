import { Component, OnInit } from '@angular/core';
import {RegisterService} from './register.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private registerService: RegisterService, private router: Router) { }

  ngOnInit() {
  }

  register(user) {
    this.registerService.register(user).subscribe(
      data => {
        if(data != null && data.success) {
          console.log(data);
          this.registerService.login(user).subscribe(
            data => {
              if(data != null && data.success) {
                this.registerService.getUser(data.token).subscribe(
                  data => {
                    if(data != null) {
                      console.log("Xdata user = " + data.name);
                      this.router.navigate(['profile'], {queryParams: {"name" : data.name}})
                    }
                  }
                )
              }
            }
          )
        } else {
          alert("Register failure \n " + data.msg);
        }
      }
    )
  }
}
