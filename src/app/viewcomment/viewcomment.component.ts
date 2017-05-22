import { Component, OnInit,ViewChild } from '@angular/core';
import {Popup} from 'ng2-opd-popup';
import {DATATestService} from "../data-test.service";
import { LocalStorageService } from 'angular-2-local-storage';
import {Router} from '@angular/router';
import {count} from "rxjs/operator/count";

@Component({
  selector: 'app-viewcomment',
  templateUrl: './viewcomment.component.html',
  styleUrls: ['./viewcomment.component.css']
})
export class ViewcommentComponent implements OnInit {
public newsData;
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
public commentText:string;
public post_likes=[];
public total_likes:number=0;
  constructor(public dataservice: DATATestService,public LocalStorage:LocalStorageService, private Routes:Router) {
    this.newsData=dataservice.getNewsData();
    console.log(this.newsData);
    this.postTitle=dataservice.getPostName();
    console.log(this.postTitle);
    this.commentData=dataservice.getCommentData();
    console.log(this.commentData);
    this.username=this.LocalStorage.get("id");
    //alert(this.username);
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
          this.post_likes.push(likeObj);
            this.total_likes=this.total_likes+1;

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
          this.vComments.push(commentObject);
          console.log(this.vComments);
        }
      }
    }
  }
  showcomment=()=>{
    if(this.addComment){
      this.addComment=false;
    }
    else{
      this.addComment=true;
    }
  }
  commentAdd(){
    alert(this.commentText);
    if(this.commentText!==null){
      let cAdd={
        comby:this.username,
        comon:this.date,
        comtxt:this.commentText
      }
      this.vComments.push(cAdd);
    }
    this.showcomment();
  }
  addLike(){
    if(this.l){
      this.total_likes=this.total_likes-1;
      this.l=false;
      let count=0
      for(let lik in this.post_likes){
       // alert("lik"+lik);
        count=count+1
        if(this.post_likes[lik].likeby==this.username){
         this.post_likes.splice(count,1);
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
  showPopup4(){
    this.popup4.options = {
      cancleBtnClass: "btn btn-default",
      confirmBtnClass: "btn btn-default",
      color: "#60B95D",
      header: "Like for this Post",
      widthProsentage:35,
      animation: "bounceIn"};
    this.popup4.show(this.popup4.options);
  }
  logout(){
    this.LocalStorage.clearAll();
    this.Routes.navigate(['/login']);
  }

}
