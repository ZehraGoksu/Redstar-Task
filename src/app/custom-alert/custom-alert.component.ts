import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html'
  //styleUrls: ['./custom-alert.component.css']
})
export class CustomAlertComponent implements OnInit {
  type: string = 'info';
  message: string = '';

  constructor(public bsModalRef: BsModalRef) {}
  
  ngOnInit(): void {}
}
