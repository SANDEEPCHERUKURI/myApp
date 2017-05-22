import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map';
@Injectable()
export class DATATestService{
  public data;
  public post_title;
  public comment_data;
  constructor(){

  }
  setNewsData(post_name,newsData:any,comData:any){
    this.data=newsData;
    this.post_title=post_name;
    this.comment_data=comData;
  }
  getNewsData(){
    return this.data;
  }
  getPostName(){
    return this.post_title;
  }
  getCommentData(){
    return this.comment_data;
  }

}
