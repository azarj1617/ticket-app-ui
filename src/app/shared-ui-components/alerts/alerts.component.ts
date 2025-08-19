import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.sass']
})
export class AlertsComponent implements OnInit {
  @Input() alertData:any;
  @Input() isAlert:boolean=false;
  alertType:any='alert-warning';
  constructor() { }

  ngOnInit(): void {
   
  }
  ngOnChanges(changes:any){
    console.log(changes);    
      setTimeout(()=>{this.isAlert=false},(this.alertData?.timeOut)?this.alertData?.timeOut:5000);
    if(this.alertData?.alertType?.toLowerCase()=='w'){
       this.alertType='alert-warning';
    }else if(this.alertData?.alertType?.toLowerCase()=='s'){
      this.alertType='alert-success';
    }else if(this.alertData?.alertType?.toLowerCase()=='i'){
      this.alertType='alert-primary';
    }else if(this.alertData?.alertType?.toLowerCase()=='d'){
      this.alertType='alert-danger';
    }
    var myAlert = document.getElementById('myAlert') as HTMLElement;
    myAlert?.addEventListener('closed.bs.alert', ()=> {
      console.log('closed');      
    })
  }

}
