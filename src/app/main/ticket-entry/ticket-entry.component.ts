import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PrintApiService } from 'src/app/services/printapi.service';
import { SharedService } from 'src/app/services/shared.service';
import print from 'print-js';
@Component({
  selector: 'app-ticket-entry',
  templateUrl: './ticket-entry.component.html',
  styleUrls: ['./ticket-entry.component.scss']
})
export class TicketEntryComponent implements OnInit {
  ticketItemsList : any = [];
  ticketForm:any;
  isEdit:boolean=false;
  selectedIndex:any;
  isSubmit:boolean=false;
  alert:boolean = false;
  alertData:any={};
   selectedDesign:number = 1;
  constructor(private printService:PrintApiService,private sharedService:SharedService) { }
  
  ngOnInit(): void {
    let tempArr:any = localStorage.getItem('ticketData');
    let ticketData = JSON.parse(tempArr);
    if(ticketData){
      this.ticketItemsList = ticketData;
    }
    this.ticketFormInit();
  }
  ticketFormInit(){
    this.ticketForm = new FormGroup({
      itemName: new FormControl('', Validators.required),
      description: new FormControl(''),
      mrp: new FormControl('', [Validators.required]),
      sellingPrice: new FormControl('', [Validators.required]),
      savePrice: new FormControl('')
    });
  }
  editFun(ticketItem:any,i:any){
    this.isEdit=true;
    this.selectedIndex = i;
    this.ticketForm.patchValue(ticketItem)
  }
  deleteFun(i:any){
    this.ticketItemsList.splice(i,1);
    localStorage.setItem('ticketData',JSON.stringify(this.ticketItemsList));
  } 
  ticketItemSave(){
    this.isSubmit = true;
    if(this.ticketForm?.status?.toLowerCase()=='valid'){
     if(this.isEdit){
        this.ticketItemsList[this.selectedIndex] = this.ticketForm.value;
        localStorage.setItem('ticketData',JSON.stringify(this.ticketItemsList));
     }else{
        this.ticketItemsList.push(this.ticketForm.value);
        localStorage.setItem('ticketData',JSON.stringify(this.ticketItemsList));
     } 
      this.resetForm();
    }else{
      this.activateAlert('W',"Please Enter Missing Details",5000);
    }   
  }
  resetForm(){
    this.ticketForm.reset();
    this.isEdit = false;
    this.selectedIndex = null;
    this.isSubmit = false;
    setTimeout(() => {
      const el = document.querySelector(`[formControlName="itemName"]`) as HTMLElement;
      el?.focus();
    });
  }
  clearAll(){
    this.ticketItemsList = [];
     localStorage.setItem('ticketData',JSON.stringify(this.ticketItemsList));
  }
  validateFunc(field:any){
     return this.isSubmit && this.ticketForm.controls[field].status === 'INVALID';
  }

   activateAlert(type:any,message:any,timeOut:any=5000){
    this.alert = true;
    this.alertData.alertType = type;
    this.alertData.message = message;
    this.alertData.timeOut = timeOut;
    this.alertReset();
  }
  alertReset(){
    setTimeout(() => {
      this.alert = false;
      this.alertData = {}
    }, this.alertData.timeOut);
  }
  printFun(type:any=''){
    let apiData = {
      designId: this.selectedDesign,
      ticketData:this.ticketItemsList
    }  
    this.printService.ticketPrint(apiData).subscribe((res:any) => {
          this.sharedService?.hideLoader();
          if(res?.status?.toLowerCase()=='success'){
            
            if(type=='download'){
                const base64 = res?.pdfData;
                const linkSource = `data:application/pdf;base64,${base64}`;
                const downloadLink = document.createElement("a");
                downloadLink.href = linkSource;
                downloadLink.download = "tickets.pdf";
                downloadLink.click();
            }else{
                print({ printable: res?.pdfData, type: 'pdf', base64: true });
            }
          }else{
             this.activateAlert('W',res?.message,5000); 
          }
        }); 
  }
}
