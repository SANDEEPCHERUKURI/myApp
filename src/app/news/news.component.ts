import {Component, OnInit, ViewChild} from '@angular/core';
import {Popup} from 'ng2-opd-popup';
import {HTTPService} from "./http-test.service";
import {DATATestService} from "../data-test.service"
/*
 import {wrapProgram} from "tslint";
 import {ActivatedRoute} from "@angular/router";
 */
import {Router,NavigationExtras} from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
/*
 import {validate} from "codelyzer/walkerFactory/walkerFn";
 import { LoginComponent } from '../login/login.component';
 */
/*import {DATATestService} from "../data-test.service"*/
/*import {error} from "util";*/
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers:[HTTPService]
})
export class NewsComponent implements OnInit{
 // @Input() name: string;
  public date = new Date();
  public tit:string="";
  public com_com="";
  public post:string="";
  //public User_name;
  public userDate= new Date();
  public data;
  public news;
  public com;
  public com_title;
  public comment1;
  public  ki;
  public login;
  public c;
  //public f_user;
  constructor(public _httpService: HTTPService,private Routes:Router,public LocalStorage:LocalStorageService, public dataservice:DATATestService) {

    this._httpService.getNewsdata()
      .subscribe(data => this.data = data,
        error => alert(error),
        () => console.log(this.data)
      );
    this._httpService.getcommdata()
      .subscribe(com => this.com = com,
        error => alert(error),
        () => console.log("Finished2"));
    this._httpService.getlogindata()
      .subscribe(login=>this.login=login,
      error=>alert(error),
        ()=> console.log("Finished3"));
    this.c =  this.LocalStorage.get("id");
  }
  ngOnInit(){
    // this.route.queryParams.subscribe(params => {
    //   this.User_name = params["user_name"];
    // });

  }
  @ViewChild('popup1') popup1: Popup;
  @ViewChild('popup2') popup2: Popup;
  @ViewChild('popup3') popup3: Popup;
  @ViewChild('popup4') popup4:Popup;
  validate(){
    //alert(this.f_user);
    for(let u=0;u<this.login.length;u++){
      if(this.login[u].name===this.c){
        return true;
      }
    }
  }
  addPost=()=>{
    let n=false;
    n=this.validate();
  // alert(n);
    if(this.tit!=="" && this.post!=="" && n){
      let obj={
        title: this.tit,
        post:this.post,
        postBy:this.c,
        poston:this.userDate,
        likes:[{
          likeby:"",
          likeon:"",
        }]
      };
      let obj1={
        title:this.tit,
        comment:[{
          comtext:"",
          comby:"",
          comon:"",
        }]
      };
      this.com.push(obj1);
      this.data.push(obj);
      this.clear();
      this.popup1.hide();
    }
    else{
      this.showPopup4();
    }

  }

  clear=()=>{
    this.tit="";
    //alert(this.tit);
    this.post="";
    // (<HTMLInputElement>document.getElementById("tit")).value="";
    // (<HTMLInputElement>document.getElementById("post")).value="";

  }

  showPopup1(){
    this.popup1.options = {
      cancleBtnClass: "btn btn-default",
      confirmBtnClass: "btn btn-mbe-attack ",
      color: "#60B95D",
      header: "My New Post.......",
      widthProsentage:50,
      animation: "bounceInDown",
      confirmBtnContent: "Post!",
      cancleBtnContent:"cancel"
    };
    this.popup1.show(this.popup1.options);
  }

  showPopup4(){
    this.popup4.options = {
      cancleBtnClass: "btn btn-default",  // This Method is to show th pop for add the new post
      confirmBtnClass: "btn btn-default",
      color: "#60B95D",
      header: "Error",
      widthProsentage:35,
      animation: "bounceIn"};
    this.popup4.show(this.popup4.options);
  }
  logout(){
    this.LocalStorage.clearAll();
    this.Routes.navigate(['/login']);

  }
  viewpost=(post_title)=>{
    this.dataservice.setNewsData(post_title,this.data,this.com);
    this.Routes.navigate(['/viewpost'])
  }

}
