import {Component, OnInit, ViewChild} from '@angular/core';
import {Popup} from 'ng2-opd-popup';
import {HTTPService} from "./http-test.service";
import {MainService} from "../main.server";
import {TranslateService} from '@ngx-translate/core';
import {Router,NavigationExtras} from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers:[HTTPService]
})
export class NewsComponent implements OnInit{
  public date = new Date();
  public tit:string="";
  public post:string="";
  public userDate= new Date();
  public data;
  public news;
  public com;
  public login;
  public c;
  //public f_user;
  constructor(public _httpService: HTTPService,private Routes:Router,public LocalStorage:LocalStorageService, public dataservice:MainService,public translate:TranslateService) {

    this._httpService.getNewsdata()
      .subscribe(data => this.data = data,
        error => alert(error),               // Getting all the news(Post)data
        () => console.log(this.data)              // from service
      );
    this._httpService.getcommdata()
      .subscribe(com => this.com = com,     // Getting all the comment data for all the news(Post)
        error => alert(error),                            // from service
        () => console.log("Finished2"));
    this._httpService.getlogindata()    // Getting all the login data from service
      .subscribe(login=>this.login=login,
      error=>alert(error),
        ()=> console.log("Finished3"));
    translate.addLangs(['en']);
    translate.setDefaultLang('en');
    translate.use('en');
    this.c =  this.LocalStorage.get("id"); // by using local storage I strored id as username
    if(this.c==null){
      this.Routes.navigate(['/login'])

    }

  }
  ngOnInit(){
    // this.route.queryParams.subscribe(params => {
    //   this.User_name = params["user_name"];
    // });

  }
  @ViewChild('popup1') popup1: Popup;
  @ViewChild('popup2') popup2: Popup; // @viewchild is imported from the @angular and also in
  @ViewChild('popup3') popup3: Popup;                        // pop -opd
  @ViewChild('popup4') popup4:Popup;
  validate(){
    //alert(this.f_user);
    for(let u=0;u<this.login.length;u++){
      if(this.login[u].name===this.c){
        return true;
      }
    }
  }
  // this method is used for adding the new post in the array of objects
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
          likeby:null,
          likeon:null,
        }]
      };
      let obj1={
        title:this.tit,
        comment:[{
          comtext:null,
          comby:null,
          comon:null,
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
    this.tit=""; // clear when after closing the popup
    //alert(this.tit);
    this.post="";
    // (<HTMLInputElement>document.getElementById("tit")).value="";
    // (<HTMLInputElement>document.getElementById("post")).value="";

  }

  showPopup1=()=>{
    this.popup1.options = {
      cancleBtnClass: "btn btn-default",
      confirmBtnClass: "btn btn-mbe-attack ",
      color: "#60B95D",
      header: "My New Post.......", // this method is for the pop up for creating a new
      widthProsentage:50,                 // news feed(POST)
      animation: "bounceInDown",
      confirmBtnContent: "Post!",
      cancleBtnContent:"cancel"
    };
    this.popup1.show(this.popup1.options);
  }
// its is default methods for popup-opt pluging options & properties
  showPopup4=()=>{
    this.popup4.options = {
      cancleBtnClass: "btn btn-default",  // This Method is to show th pop for add the new post
      confirmBtnClass: "btn btn-default",
      color: "#60B95D",
      header: "Error",
      widthProsentage:35,
      animation: "bounceIn"};
    this.popup4.show(this.popup4.options);
  }
  // logout button for newsfeed post
  logout=()=>{
    this.LocalStorage.clearAll(); // it clears all the local storage date
    this.Routes.navigate(['/login']);

  }
  // by clicking view-post button it navigates to new page called /viewpost
  viewpost=(post_title)=>{
    this.dataservice.setNewsData(post_title,this.data,this.com);
    this.Routes.navigate(['/viewpost'])
  }
  closepop(){
    this.popup4.hide();
  }

}
