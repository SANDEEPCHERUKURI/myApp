import { Component, OnInit } from '@angular/core';
import {HTTPTestService} from "./http-login.service"
import {Router,NavigationExtras} from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import {TranslateService} from '@ngx-translate/core';
//import {Routes} from  "./app.router";
//import {RouterModule} from '@angular/router'
//import {componentFactoryName} from "@angular/compiler";

//import {DATATestService} from "../data-test.service";
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[ HTTPTestService ]
})
export class LoginComponent{
  //private Routes:any;
  private errMsg1: string;
  private userListReceived=[];
  public login;
  public userPassword;
  public userName;
 // private  user_name:DATATestService
  constructor(public _httpService:HTTPTestService,private Routes:Router,public localStorageService: LocalStorageService,private translate:TranslateService) {
    this._httpService.getlogindata()
      .subscribe(login => this.login = login,
        error => alert(error),
        () => console.log("Finished")
      );

    translate.addLangs(['en']);
    translate.setDefaultLang('en');
    translate.use('en');

  }
//   const routes =[
//     path= 'news',
//   componente = news
// ]

  valid(){
    let flag=0;
    //alert("valid()")
    this.userName;
    this.userPassword;
    for(let i =0;i<this.login.length;i++){
      if((this.login[i].name==this.userName) && (this.login[i].passord==this.userPassword)){
        flag=0;
        let navigationExtras: NavigationExtras = {
          queryParams: {
            "user_name": this.userName
          }
        };
       // this.user_name.username(user_name);
        this.localStorageService.set("id",this.userName);
          this.Routes.navigate(['/news']);
          break;
      }
      else {
        flag=1;
      }

    }
    if(flag===1){
      alert("Invalid Input");
      location.reload();
    }
  }

}
