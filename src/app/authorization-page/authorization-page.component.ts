import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Component({
  selector: 'app-authorization-page',
  templateUrl: './authorization-page.component.html',
  styleUrls: ['./authorization-page.component.scss']
})
export class AuthorizationPageComponent {

  enUrl = environment.api.url;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {
  }

  profileForm = new FormGroup ({
    login: new FormControl('i.simagin'),
    password: new FormControl('123456')
  });

  onSubmit() {
    this.postAuthenticate().subscribe(value => {
      return console.log(value);
    })
  }

  postAuthenticate(): Observable<any> {
    return this.http.post(`${this.enUrl}/login`, {
      "username": this.profileForm.value.login,
      "password": this.profileForm.value.password
    }, this.httpOptions)
  }


}
