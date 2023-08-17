import { Component, OnInit } from '@angular/core'; 

@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html',
  styleUrls: ['./cv-list.component.scss']
})
export class CvListComponent implements OnInit {
  cvs: any[] = [];
  
  constructor() {}
  
  ngOnInit() {
    this.loadCVs();
  }
  
  loadCVs() {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('userCV')) {
        const cvData = JSON.parse(localStorage.getItem(key) || '');
        this.cvs.push(cvData);
      }
    }
  }
}
