import { Component,OnInit,AfterViewInit} from '@angular/core';
import { SharedService,ResumeDetails,AbilitiesSubDetails } from './shared/shared.service'
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
  glpystar=[1,2,3,4,5]
 
  constructor(private appservice:SharedService){

    this.resumeDetails=this.appservice.getResumeData();
    this.resumeDetails.profile.details.age=this.calculateAge(this.resumeDetails.profile.details.age);
    this.resumeDetails.abilities.skills=this.arrayChunks(this.resumeDetails.abilities.skills);
    this.resumeDetails.abilities.languages=this.arrayChunks(this.resumeDetails.abilities.languages);
    this.resumeDetails.abilities.tools=this.arrayChunks(this.resumeDetails.abilities.tools);
  }
  ngOnInit(): void {
   // this.applyIntoHeight();
    const navigationHeight = document.querySelector<HTMLElement>('.header')!.offsetHeight;
    document.documentElement.style.setProperty('--scroll-padding', navigationHeight - 1 + "px");

    
  }
  // applyIntoHeight(){
  //   document.querySelectorAll<HTMLElement>('.intro')[0].style.height=window.innerHeight +'px';
  // }

  ngAfterViewInit(){
    let sectionOffsetTop:number[]=[];
    let buffer=window.innerHeight/2;
    const profileElement= <HTMLElement>document.querySelector('#profile');
    const profilewrapper= (<HTMLElement>document.querySelector('.profile_wrapper'));
    this.animateDiv(profileElement,profilewrapper)
    for(let i=0;i<this.navArrays.length;i++){
      sectionOffsetTop.push(document.getElementById(this.navArrays[i].divId)!.offsetTop);
    }
    window.addEventListener('scroll',(event) => {
      let windowScrolloffset=window.pageYOffset;
      let windowScrolloffsetWithHeader=windowScrolloffset+85;
      this.animateDiv(profileElement,profilewrapper)
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
  ngAfterViewChecked(){
    setTimeout(() => {
      let element=document.querySelector('.short_intro')
      element!.classList.add("animation");
    }, 800);

  }
  animateDiv(profileElement:HTMLElement,profilewrapper:HTMLElement){
    let profiletop=profileElement.getBoundingClientRect().top;
    let profilewrappertop=profilewrapper.getBoundingClientRect().top;
    if(!(profileElement!.className.includes('animation')) &&  (window.innerHeight/1.6) >profiletop ){
      profileElement!.classList.add("animation"); 
    }
    else if(!(profilewrapper!.className.includes('animate')) &&  (window.innerHeight/1.8) >profilewrappertop ){
      profilewrapper!.classList.add("animate"); 
    }
    console.log(profiletop,profilewrappertop)
  }
  arrayChunks(inputArray:any):AbilitiesSubDetails[][]{
    let cheunkcdata=[];
    cheunkcdata.push(inputArray.slice(0,Math.ceil(inputArray.length/2)))
    cheunkcdata.push(inputArray.slice(Math.ceil(inputArray.length/2)))
    return cheunkcdata;
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
    let message='Hello, I am Kiran Kumar,\na Web Developer';
    this.intro=message;
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
