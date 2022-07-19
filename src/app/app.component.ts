import { Component,OnInit,AfterViewInit} from '@angular/core';
import { SharedService,ResumeDetails } from './shared/shared.service'
declare let $: any;
type InavItrms = Array<{id: number, divId: string ,name:string}>;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  resumeDetails!:ResumeDetails;
  selectedNav!:number | null;
  navArrays:InavItrms=[{id:0,divId:'profile',name:'PROFILE'},{id:1,divId:'experiences',name:'EXPERIENCES'},{id:2,divId:'abilities',name:'ABILITIES'},{id:3,divId:'contact',name:'CONTACT'}]
  intro:string='';
  toggelNav:boolean=false;
  ageInyears!:number;
 
  constructor(private appservice:SharedService){

  }
  ngOnInit(): void {
    this.resumeDetails=this.appservice.getResumeData();
    this.resumeDetails.profile.details.age=this.calculateAge(this.resumeDetails.profile.details.age)
    console.log(this.resumeDetails)
    this.applyIntoHeight();
    const navigationHeight = document.querySelector<HTMLElement>('.header')!.offsetHeight;
    document.documentElement.style.setProperty('--scroll-padding', navigationHeight - 1 + "px");
   // window.scrollTo(0, 0);
    
  }
  applyIntoHeight(){
    document.querySelectorAll<HTMLElement>('.intro')[0].style.height=window.innerHeight +'px';
  }

  ngAfterViewInit(){
    this.startTypingAnimation();
    let sectionOffsetTop:number[]=[];
    let buffer=window.innerHeight/2;
    for(let i=0;i<this.navArrays.length;i++){
      sectionOffsetTop.push(document.getElementById(this.navArrays[i].divId)!.offsetTop);
    }
    window.addEventListener('scroll',(event) => {
      let windowScrolloffset=window.pageYOffset;
      let windowScrolloffsetWithHeader=windowScrolloffset+85;
      if(windowScrolloffset !=0){
        document.querySelector('.header')!.classList.add("scrollchange");
      }
      else{
        document.querySelector('.header')!.classList.remove("scrollchange");
      }
      for(let j=0;j<sectionOffsetTop.length;j++){
        if(windowScrolloffsetWithHeader >= (sectionOffsetTop[j]-buffer) ){
          this.selectedNav=j;
        }
      }
      if(windowScrolloffsetWithHeader < (sectionOffsetTop[0]-buffer)){
        this.selectedNav=null;
      }

  });
  }
  calculateAge(myDOB:string) :string{
    var dob = new Date(myDOB);  
    //calculate day difference from current date in millisecond  
    let day_diff =(new Date().getTime())- dob.getTime();   
    day_diff /= (1000*60*60*24) //to day from ms  
    //convert the calculated difference in years format  
    return (day_diff/365).toFixed(1);
  }
  startTypingAnimation(){
    let message='Hi, I am Kiran,\na Web Developer';
    let i=0;
   let typingAnimation= setInterval(()=>{
      this.intro+=message[i];
      i++;
      if(i>=message.length){
        document.querySelector('.typewriter_cursor')?.remove();
        clearInterval(typingAnimation);
      }
    },60)
  }
  scrolltoMobile(el: string,id:number){
    document.querySelector<HTMLElement>('.nav_bar_content')!.style.transitionDuration='0s'
    this.toggelNav=false;
    this.scroll(el,id);
    setTimeout(() => {
      document.querySelector<HTMLElement>('.nav_bar_content')!.style.transitionDuration='.2s'
    }, 20);
  }
  scroll(el: string,id:number) {
    this.selectedNav=id;
    document.getElementById(el)!.scrollIntoView();
  }
  toggelNavbar(){
    this.toggelNav=!this.toggelNav;
  }

}
