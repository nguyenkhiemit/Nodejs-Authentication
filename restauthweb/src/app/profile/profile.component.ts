import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import Any = jasmine.Any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  name: Any;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(
      params => {
        console.log("X123 = " + params["name"]);
        this.name = params["name"]
      }
    )
  }

  ngOnInit() {
  }

}
