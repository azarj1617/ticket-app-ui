import { Component, OnInit } from '@angular/core';
import { PrintApiService } from 'src/app/services/printapi.service';
import print from 'print-js';
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-print-form',
  templateUrl: './print-form.component.html',
  styleUrls: ['./print-form.component.scss']
})
export class PrintFormComponent implements OnInit {
  uploadFile:any;
  formData:any;
  alert:boolean = false;
  alertData:any={};
  constructor(private printService:PrintApiService,private sharedService:SharedService) { }

  ngOnInit(): void {
  }

  fileUploadFun(eve:any){
    let isXls = eve?.target?.files[0]?.name?.split(".")[1]=='xls' || eve?.target?.files[0]?.name?.split(".")[1]=='xlsx';
    console.log(isXls);    
    if(!isXls){
      this.alert = true;
      this.activateAlert('W',"Please Upload xls or xlsx file only",5000);  
      this.uploadFile = null;
      (document.getElementById("printDataFile") as HTMLInputElement).value = ""; 
      return;
    }   
    this.uploadFile = eve?.target?.files[0];
    this.formData = new FormData();
    this.formData.append("file", this.uploadFile);
    this.alert = true;
    this.activateAlert('S',"File Successfully Uploaded",5000); 
  }

  submitFun(type:any){
    if (!this.uploadFile) {
      console.log("No file selected!");
      return;
    }
    this.sharedService?.showLoader();
    this.printService.printPdf(this.formData).subscribe((res:any) => {
      this.sharedService?.hideLoader();
      if(res?.status?.toLowerCase()=='success'){
        
        if(type=='download'){
            const base64 = res?.pdfData;
            const linkSource = `data:application/pdf;base64,${base64}`;
            const downloadLink = document.createElement("a");
            downloadLink.href = linkSource;
            downloadLink.download = "tickets.pdf";
            downloadLink.click();
            this.resetFun();
        }else{
            print({ printable: res?.pdfData, type: 'pdf', base64: true });
        }
      }else{
         this.activateAlert('W',res?.message,5000); 
      }
    });
  }
  resetFun(){
      this.uploadFile = null;
      (document.getElementById("printDataFile") as HTMLInputElement).value = "";
      this.alertData.timeOut = 1;
      this.alertReset();
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
}
