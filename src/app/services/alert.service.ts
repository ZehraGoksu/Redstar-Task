import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CustomAlertComponent } from '../../app/custom-alert/custom-alert.component'

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  bsModalRef: BsModalRef | undefined;

  constructor(private modalService: BsModalService) {}

  showAlert(type: string, message: string): void {
    const initialState = {
      type: type,
      message: message
    };

    this.bsModalRef = this.modalService.show(CustomAlertComponent, { initialState });

    setTimeout(() => {
      this.bsModalRef?.hide();
    }, 5000);
  }
}
