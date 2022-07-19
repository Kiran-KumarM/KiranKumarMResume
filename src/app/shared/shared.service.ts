import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';

export interface ResumeDetails {
  profile :ProfileDetails;
  experiences:ExperiencesDetails;
  // name: string;
  // GSTTIN: string;
  // AddressLine1: string;
  // AddressLine2: string;
  // PIN: string;
  // state: string;
}
export interface ProfileDetails {
  heading:string;
  quote:string;
  quoteSayer:string;
  aboutMe:string;
  details :{
    name:string;
    age:string;
    address:string
  }
}
export interface ExperiencesDetails {
  heading:string;
  quote:string;
  quoteSayer:string;
  education:EducationDetails[];
  carrers:CarrerDetails[];
}
export interface EducationDetails {
  instituteName:string;
  duration:string;
  courseName:string;
  courseResult:string;
  description:string;
  location:string;
  link?:string;
}
export interface CarrerDetails {
  companyName:string;
  duration:string;
  position:string;
  description:string;
  location:string;
  link?:{name:string;url:string;};
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  getResumeData(){
    let profileData:ProfileDetails={
      heading:'Profile',
      quote:'"You are very powerful, provided you know how powerful you are."',
      quoteSayer:'Yogi Bhajan',
      aboutMe:' I am an allround web developer. I am a senior programmer with good knowledge of front-end techniques. I love structure and order and I also stand for quality. I love spending time on fixing little details and optimizing web apps. Also I like working in a team, you\'ll learn faster and much more. As the saying goes: \'two heads are better than one.',
      details :{
        name:'Kiran Kumar M',
        age:'09/08/1997',
        address:'No.17C, Seethapathy 1st Street, Madhavaram, Chennai-600060,India.'
      }
    };
    let experiencesData={
      heading:'Experiences',
      quote:'"The only source of knowledge is experience.”',
      quoteSayer:'Albert Einstein',
      education:[{ 
        instituteName:'St.Joseph College of Engineering',
        duration:'May 2014 - May 2018',
        courseName:'Bachelor of Engineering - Electronics & Communication Engineering',
        courseResult:'7.89 CGPA',
        description:'This course provided with an overview of electronic devices, circuits, communication equipments like transmitter, receiver, integrated circuits (IC). It also provided me with basic electronics, analog and digital transmission & reception of data, voice and video (Example AM, FM, DTH), microprocessors, satellite communication, microwave engineering, antennae and wave progression. An introduction to using computer applications to solve engineering problems. Learning the rudiments of MATLAB and Excel in order to design and/or visualize systems.',
        location:'Chennai',
        link:''},
        { 
          instituteName:'St.Ann\'s Matriculation Higher Secondary School',
          duration:'May 2013 - Mar 2014',
          courseName:'Higher Secondary (HSC - 12th)',
          courseResult:'81.91%',
          description:'The education was majorly Computer science based where i learned basics computer programming, coding.',
          location:'Chennai',
          link:''},
          { 
            instituteName:'St.Ann\'s Matriculation Higher Secondary School',
            duration:'May 2011 - Mar 2012',
            courseName:'Matriculation (SSLC - 10th)',
            courseResult:'84.00%',
            description:'I enjoyed doing science, math, biology. I got my fundamental concepts clear which helped me improve my basics.',
            location:'Chennai',
            link:''}
      ],
      carrers:[{
        companyName:'Accenture',
        duration:'Jan 2019 - Current',
        position:'Fulltime - Application Development Senior Analyst',
        description:'Architected & Developed User Interface(UI) Rich Web Applications,and Web Service Applications using HTML,CSS in Angular Framework.\n Developed and designed UI for myDiagnostic, Living System platforms which is a one place, one platform approach for assessing an organization’s business, talent and- IT maturity.\n Architected and developed Angular applications for the backend development and front-end application using JavaScript, jQuery, d3.js and PostgreSQL for database.\n Mentored more than 6 team members, enabling them to achieve professional growth and personal goals.\n Involved in Training & Mentoring other programmers.\n Involved in software coding, testing and debugging.\n Participated in project planning, scheduling and execution of roadmap development.\n Responsible for supporting the project manager and other project resources during the course of the project lifecycle.\n Design and develop high-performance and scalable web application to interact with RESTful APIs.\n Architected and developed Python and Django for the backend development and front-end application using Bootstrap, JavaScript, chart.js, AJAX, CSS and Mongo dB for database.\n Develop robots using Automation Anywhere (for Oracle / SAP) and identifying and debugging the errors using Error Handlers.\n Hand on experience in Robotic Process Automation RPA with different platforms and successful implementation in Production environment.',
        location:'Chennai',
        link:{name:'Accenture',url:'https://www.accenture.com/in-en'}
      }]
      
    };




    let resumeData: ResumeDetails ={
      profile:profileData,
      experiences:experiencesData
    }
    return resumeData;
  }
}
