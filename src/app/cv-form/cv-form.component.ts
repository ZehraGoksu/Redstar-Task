import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cv-form',
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.scss']
})  

export class CvFormComponent {
  name: string = '';
  surname: string = '';
  year: string =''; 
  birthDate: Date = new Date();
  placeOfBirth:string = '';
  skills: string = '';
  description: string = '';
  responseData: any;

  
  constructor(private apiService: ApiService) {
    this.loadCV();
  }


   ngOnInit(): void {
    this.apiService.getSomeData().subscribe({
      next :(data) => {
        this.responseData = data;
      },
      error:(error) => {
        console.error('Bir hata oluştu.', error);
      }
  });
  }

  saveCV() {
    const cv = {
      name: this.name,
      surname: this.surname,
      year: this.year,
      birthDate:this.birthDate,
      placeOfBirth:this.placeOfBirth,
      skills: this.skills,
      description: this.description
    };
    
    // CV bilgilerini JSON formatında localStorage'a kaydetme
    localStorage.setItem('userCV', JSON.stringify(cv));
    
    alert('CV kaydedildi!');
  }
  
  loadCV() {
    const storedCV = localStorage.getItem('userCV');
    if (storedCV) {
      const cvData = JSON.parse(storedCV);
      this.name = cvData.name;
      this.surname = cvData.surname;
      this.year = cvData.year;
      this.birthDate = cvData.birthDate;
      this.placeOfBirth = cvData.placeOfBirth;
      this.skills = cvData.skills;
      this.description = cvData.description;
    }
  }
}
