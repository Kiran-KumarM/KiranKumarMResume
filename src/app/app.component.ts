import { Component,OnInit,AfterViewInit} from '@angular/core';
declare let $: any;
type InavItrms = Array<{id: number, divId: string ,name:string}>;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  selectedNav!:number | null;
  navArrays:InavItrms=[{id:0,divId:'profile',name:'PROFILE'},{id:1,divId:'experiences',name:'EXPERIENCES'},{id:2,divId:'abilities',name:'ABILITIES'},{id:3,divId:'contact',name:'CONTACT'}]
  intro:string='';
  toggelNav:boolean=false;
  ageInyears!:number;
  constructor(){

  }
  ngOnInit(): void {
    this.applyIntoHeight();
    this.calculateAge();
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
  calculateAge(){
    var dob = new Date("09/08/1997");  
    //calculate month difference from current date in time  
    var month_diff = Date.now() - dob.getTime();     
    //convert the calculated difference in date format  
    var age_dt = new Date(month_diff);       
    //extract year from date      
    var year = age_dt.getUTCFullYear();  
    //now calculate the age of the user  
    this.ageInyears= Math.abs(year - 1970);  
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
