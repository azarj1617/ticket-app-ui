import { Injectable } from '@angular/core';
import { RestService } from './rest-service.service';

@Injectable({
  providedIn: 'root'
})
export class PrintApiService {

  constructor(private restService: RestService) {}

  printPdf(data: any) {
    return this.restService.postMethod(`ticket-print?designId=${data.design}`, data.formData);
  }
  ticketPrint(data:any){
    return this.restService.postMethod(`ticket-print-data`, data);
  }
}
