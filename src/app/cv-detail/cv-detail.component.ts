
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cv-detail',
  templateUrl: './cv-detail.component.html',
  styleUrls: ['./cv-detail.component.scss']
}) 

export class CvDetailComponent implements OnInit {
  cv: any | null = null;
  
  constructor(private route: ActivatedRoute, private router: Router) {}
  
  ngOnInit() {
    const cvIndex = this.route.snapshot.paramMap.get('index');
    if (cvIndex !== null) {
      this.loadCVDetails(Number(cvIndex));
    } else {
      this.router.navigate(['/cvs']); // CV indexi bulunamazsa
    }
  }
  
  loadCVDetails(index: number) {
    const key = `userCV${index}`;
    const cvData = JSON.parse(localStorage.getItem(key) || '');
    this.cv = cvData;
  }
  
  goBack() {
    this.router.navigate(['/cvs']); 
  }
}

