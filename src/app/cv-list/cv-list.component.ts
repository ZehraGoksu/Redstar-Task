import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CvService } from '../services/cv.service';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html',
  styleUrls: ['./cv-list.component.scss'],
  encapsulation: ViewEncapsulation.None, //iconların görünmesi için izolasyon devre dışı
})
export class CvListComponent implements OnInit {
  cvs: any[] = [];
  filteredCVs: any[] = [];

  constructor(private cvService: CvService, private router: Router,private alertService:AlertService) {}

  ngOnInit() {
    this.loadCV();
  }

  loadCV() {
    this.cvs = this.cvService.getCVs();
    this.filteredCVs = [...this.cvs];
  }

  editCV(index: number) {
    this.router.navigate(['/edit-cv', index]);
  }
  
  search(keyword: string) {
    if (!keyword) {
      this.filteredCVs = [...this.cvs]; // Kelime yoksa tüm CVs
      return;
    }

    this.filteredCVs = this.cvs.filter(
      (cv) =>
        cv.name.toLowerCase().includes(keyword.toLowerCase()) ||
        cv.surname.toLowerCase().includes(keyword.toLowerCase()) ||
        cv.description.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  confirmDelete(index: number) {
    const isConfirmed = confirm("Bu CV'yi silmek istediğinize emin misiniz?");
    if (isConfirmed) {
      this.cvService.deleteCV(index);
      this.loadCV();
      this.alertService.showAlert('success', "CV'niz başarılı bir şekilde silindi!"); 
    }
  }
  
  downloadPDF(cv: any) {
    const formData = {
      name: cv.name,
      surname: cv.surname,
      title: cv.title,
      birthDate: cv.birthDate,
      country: cv.country,
      city: cv.city,
      email: cv.email,
      education: cv.education,
      experience: cv.experience,
      skills: cv.skills,
      description: cv.description,
    };
    const fileName = `${cv.name}_${cv.surname}_cv.pdf`;

    this.cvService.generatePDFFromFormData(formData, fileName);
  }
}
