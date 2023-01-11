import {Component, Injectable, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {AppComponent} from "../component/app.component";

@Component({
  selector: 'app-authorization-page',
  templateUrl: './authorization-page.component.html',
  styleUrls: ['./authorization-page.component.scss']
})
@Injectable({providedIn: 'root'})
export class AuthorizationPageComponent implements OnInit{

  enUrl = environment.api.url;
  token = ``;
  authenticated = false;
  userName: string = ``;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  profileForm = new FormGroup({
    login: new FormControl('i.simagin'),
    password: new FormControl('123456')
  });

  constructor(private http: HttpClient,
              private appComponent: AppComponent,) {
  }

  ngOnInit(): void {
    if (localStorage.getItem("token") != null) {
      // this.token = localStorage.getItem("token")!+`a`;
      this.token = localStorage.getItem("token")!;
      this.getInfo().subscribe(
        result => {
          this.authenticated = result.authenticated
          this.userName = result.name
          this.appComponent.userAuthorized = this.authenticated
        },
        error => {
          // this.errors = error;
          console.warn(error)
        },
        () => {
          // 'onCompleted' callback.
          // No errors, route to new page here
        }
      );
    }
  }

  onSubmit() {
    console.log(localStorage.getItem("token"))
    this.postAuthenticate().subscribe(value => {
      this.token = value.token;
      this.saveTokenInLocalStorage()
      this.getInfo().subscribe(value => {
        this.authenticated = value.authenticated
        this.userName = value.name
        this.appComponent.userAuthorized = this.authenticated
      })
    })
    console.log(localStorage.getItem("token"))
  }

  postAuthenticate(): Observable<any> {
    return this.http.post(`${this.enUrl}/login`, {
      "username": this.profileForm.value.login,
      "password": this.profileForm.value.password
    }, this.httpOptions)
  }

  getInfo(): Observable<any> {
    return this.http.get(`${this.enUrl}/info`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ` + this.token,
      })
    })
  }

  saveTokenInLocalStorage() {
    localStorage.setItem("token", this.token);
  }

}
