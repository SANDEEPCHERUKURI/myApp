import { Component, OnInit,ViewChild } from '@angular/core';
import {Popup} from 'ng2-opd-popup';
import {MainService} from "../main.server";
import { LocalStorageService } from 'angular-2-local-storage';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {count} from "rxjs/operator/count";
@Component({
  selector: 'app-viewcomment',
  templateUrl: './viewcomment.component.html',
  styleUrls: ['./viewcomment.component.css']
})
export class ViewcommentComponent implements OnInit {
public newsData;
public showmore:string;
public commentsShow=[];
public commentcout:any=0;
public viewPoston;
public date=new Date();
public postTitle;
public commentData;
public viewPostcontect;
public viewPostBy;
public vComments=[];
public addComment=false;
public l:boolean=false;
public username;
public commentText:string=null;
public post_likes=[];
public total_likes:number=0;
public counter:any=0;
public  viewcontent=[];
// Geting the data from single istance from the server
  constructor(public dataservice: MainService,public LocalStorage:LocalStorageService, private Routes:Router,public translate:TranslateService) {
    this.newsData=dataservice.getNewsData();  //this is for to get all the post data
    console.log(this.newsData);                         // from the main server
    this.postTitle=dataservice.getPostName();   // Post name from mail server
    console.log(this.postTitle);
    this.commentData=dataservice.getCommentData(); // getting all the comment data for every post
    console.log(this.commentData);
    translate.addLangs(['en']);
    translate.setDefaultLang('en');
    translate.use('en');
    this.username=this.LocalStorage.get("id"); // loacal storage that stores ID
    if(this.username==null){
      this.Routes.navigate(['/login']);
    }
  }
  @ViewChild('popup4') popup4:Popup;

  ngOnInit() {
    for(let v in this.newsData){
      if(this.newsData[v].title==this.postTitle){
        this.viewPostcontect=this.newsData[v].post;
        this.viewPostBy=this.newsData[v].postBy;
        this.viewPoston=this.newsData[v].poston;
        for(let like in this.newsData[v].likes){
          let likeby= this.newsData[v].likes[like].likeby;
          let likeon=this.newsData[v].likes[like].likeon;

            let likeObj={
              likeby:likeby,
              likeon:likeon
            };
            if(likeon!=null){
              this.post_likes.push(likeObj);
              this.total_likes=this.total_likes+1;
            }


        }
      }

    }
    for(let comList in this.commentData){
      if(this.commentData[comList].title==this.postTitle){
        for(let useCom in this.commentData[comList].comment) {
          let comby = this.commentData[comList].comment[useCom].comby;
          let comon = this.commentData[comList].comment[useCom].comon;
          let comtxt = this.commentData[comList].comment[useCom].comtext;
          let commentObject = {
            comby: comby,
            comon: comon,
            comtxt: comtxt
          };
          if(comtxt!=null){
            this.vComments.push(commentObject);
            console.log(this.vComments);
          }

        }
      }
    }
  //  this.showaddedComments();
    this.viewComments(0)

  }
  showcomment=()=>{
    if(this.addComment){
      this.addComment=false;
    }                        // this method shows the commentr input field visible
    else{
      this.addComment=true;
    }
  }
  commentAdd=()=>{
   // alert(this.commentText);
    if(this.commentText!==null){ // this method is used to add a comment for paticular post
      let addCom={
        comby:this.username,
        comon:this.date,
        comtxt:this.commentText
      };
      this.vComments.push(addCom);
    }
    this.showcomment();
    this.commentText=null;
  };
  addLike=()=>{   // this method is used to add Likes for a particular post
    if(this.l){
      this.total_likes=this.total_likes-1;
      this.l=false;
      let count=0;
      for(let lik in this.post_likes){
        count=count+1;

        if(this.post_likes[lik].likeby==this.username){
         this.post_likes.splice((count-1),1);
        }
      }
    }
    else{
      this.total_likes=this.total_likes+1;
      this.l=true;
      let newlike={
        likeby:this.username,
        likeon:this.date
      };
      this.post_likes.push(newlike);
    }
  }
  showPopup4=()=>{
    this.popup4.options = {
      cancleBtnClass: "btn btn-default",
      confirmBtnClass: "btn btn-default",
      color: "#60B95D",
      header: "Like for this Post",   // this method is used to show the popup for likes by whom.
      widthProsentage:35,
      cancleBtnContent:"Cancel",
      animation: "bounceIn"};
    this.popup4.show(this.popup4.options);
  }
  logout=()=>{
    this.LocalStorage.clearAll();  // this method is for to navigate to login page
    this.Routes.navigate(['/login']); // if he clicks logout button
  }
  // showaddedComments(){
  //
  //   for(let i=this.counter;i<this.vComments.length;i++)
  //   {
  //     this.viewcontent.push(this.vComments[i]);
  //     if(i==this.counter) break;
  //   }
  //   if(this.vComments.length!=0){
  //   this.showmore="View More";
  //     this.counter=this.counter+1;
  //   }
  //   else {
  //     this.showmore="View Less";
  //   }
  //
  // }
  public count:number=0;
  viewComments=(x:number)=> {
    if (x == 0) {
      if(this.commentcout == this.vComments.length){
        this.commentcout=0;
        this.count=0;
        this.commentsShow=[];
      }
      for (let i = this.commentcout; i < this.vComments.length; i++) {
        let k = this.vComments[i];
        this.commentsShow.push(k);
        this.count = this.count + 1;
        if (this.count == 1) {
          this.commentcout = 1;
          break;
        }
        if (this.count == this.vComments.length) {
          this.commentcout = this.count;
          break;
        }
      }
    }
    else{
      this.commentsShow=[];
        let k =this.vComments[0];
        this.commentsShow.push(k);
        this.count=0;
      this.viewComments(0);
    }
  }
  close=()=>{
    this.popup4.hide();
  }

}
