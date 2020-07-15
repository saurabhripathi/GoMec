import { Component, OnInit } from '@angular/core';
import { ServiceService } from './service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  lengthTracker: number;
  page: number;
  constructor(private readonly serviceService:ServiceService ){

  }

  title = 'interview';
  count = [{name:"asd"},{name:"asd"},{name:"asd"}]
  List :any =[]

  scrollDistance='1'

  ngOnInit(): void {
    this.serviceService.collegeList().subscribe((response)=>{
      this.page = 1
      this.lengthTracker = response.colleges.length

      if(response.colleges.length>=10)
      {
        this.List=response.colleges.slice(0,10)

      }
      else{
        const length = response.colleges.length
        this.List=response.colleges.slice(0,length)

      }


    })
    
  }
  onScrollDown(){
    if(this.lengthTracker>=10 && this.List.length<50){
      this.serviceService.collegeList().subscribe((response)=>{
     
        const List=response.colleges.slice(10*this.page,(this.page+1)*(10))
        this.List = this.List.concat(List)
        this.page = this.page+ 1
        
        console.log(response)
  
      })

    }
    

    
  }
} 
