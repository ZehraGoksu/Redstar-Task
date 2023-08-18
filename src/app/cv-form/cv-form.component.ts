import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CvService } from '../services/cv.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cv-form',
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.scss'],
  encapsulation: ViewEncapsulation.None, //iconların görünmesi için izolasyon devre dışı
})
export class CvFormComponent implements OnInit {
  index!: number;
  cv: any = {};
  selectedCountry: any = {};
  countries: any[] = [];
  cities: any[] = [];

  name: string = '';
  surname: string = '';
  title: string = '';
  birthDate: Date = new Date();
  country: string = '';
  city: string = '';
  email: string = '';
  education: string = '';
  experience: string = '';
  skills: string = '';
  description: string = '';

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private cvService: CvService
  ) {}

  ngOnInit(): void {
    
    this.apiService.postCountryData({}).subscribe((response) => {
      this.countries = response;
    });

    this.apiService.postCityData({}).subscribe((response) => {
      this.cities = response;
    });
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('index');
      if (idParam !== null) {
        this.index = +idParam;
        this.loadCV();
      } else {
        this.cv = {};
        this.selectedCountry = this.countries[203];
      }
      // State verisini kontrol et
      const cvToEdit = history.state;
      if (cvToEdit) {
        this.cv = cvToEdit;
        this.name = cvToEdit.name;
        this.surname = cvToEdit.surname;
        this.title = cvToEdit.title;
        this.birthDate = cvToEdit.birthDate;
        this.country = cvToEdit.country;
        this.city = cvToEdit.city;
        this.email = cvToEdit.email;
        this.education = cvToEdit.education;
        this.experience = cvToEdit.experience;
        this.skills = cvToEdit.skills;
        this.description = cvToEdit.description;
      }
    });
  }

  loadCV(): void {
    this.cv = this.cvService.getCVById(this.index);
    if (this.cv) {
      this.name = this.cv.name;
      this.surname = this.cv.surname;
      this.title = this.cv.title;
      this.birthDate = this.cv.birthDate;
      this.country = this.cv.country;
      this.city = this.cv.city;
      this.email = this.cv.email;
      this.education = this.cv.education;
      this.experience = this.cv.experience;
      this.skills = this.cv.skills;
      this.description = this.cv.description;
    }
  }

  saveCV() {
    const cv = {
      name: this.name,
      surname: this.surname,
      title: this.title,
      birthDate: this.birthDate,
      country: this.country,
      city: this.city,
      email: this.email,
      education: this.education,
      experience: this.experience,
      skills: this.skills,
      description: this.description,
    };

    this.cvService.saveCV(cv);
    alert('CV kaydedildi!');
  }

  updateCV(): void {
    this.cvService.updateCV(this.index, this.cv); 
  }

  downloadPDF() {
    const formData = {
      name: this.name,
      surname: this.surname,
      title: this.title,
      birthDate: this.birthDate,
      country: this.country,
      city: this.city,
      email: this.email,
      education: this.education,
      experience: this.experience,
      skills: this.skills,
      description: this.description,
    };
    const fileName = 'cv.pdf';

    this.cvService.generatePDFFromFormData(formData, fileName);
  }
}
