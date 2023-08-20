import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CvService } from '../services/cv.service';
import { ApiService } from '../services/api.service';
import { AlertService } from '../../app/services/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cv-form',
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.scss'],
  encapsulation: ViewEncapsulation.None, //iconların görünmesi için izolasyon devre dışı
})
export class CvFormComponent implements OnInit {
  index!: number;
  cv: any = {};
  selectedCountry: any = null;
  countries: any[] = [];
  cities: any[] = [];
  isNewCV: boolean = true;

  uploadedImage: string | null = null;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private cvService: CvService,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) {}

  formControls: any = {
    uploadedImage: [''],
    name: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
    ],
    surname: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
    ],
    title: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
    ],
    birthDate: ['', Validators.required],
    country: ['', Validators.required],
    city: [''],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    education: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
    ],
    experience: [
      '',
      Validators.compose([Validators.required, Validators.maxLength(50)]),
    ],
    skills: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
    ],
    description: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
    ],
  };

  cvForm: FormGroup = this.formBuilder.group(this.formControls);


  getFormControlName(name: string) {
    return this.cvForm.get(name);
  }

  getFormControlSurname(name: string) {
    return this.cvForm.get(name);
  }

  getFormControlTitle(title: string) {
    return this.cvForm.get(title);
  }

  getFormControlBirthday(birthDate: string) {
    return this.cvForm.get(birthDate);
  }

  getFormControlCountry(country: string) {
    return this.cvForm.get(country);
  }

  getFormControlEmail(email: string) {
    return this.cvForm.get(email);
  }

  getFormControlEducation(education: string) {
    return this.cvForm.get(education);
  }

  getFormControlSkills(skills: string) {
    return this.cvForm.get(skills);
  }

  getFormControlExperience(experience: string) {
    return this.cvForm.get(experience);
  }

  getFormControlDescription(description: string) {
    return this.cvForm.get(description);
  }

  ngOnInit(): void {

    this.apiService.postCountryData({}).subscribe((response) => {
      this.countries = response;
      if (this.isNewCV) {
        this.cvForm.get('country')?.setValue('Türkiye');
        this.apiService
          .postCityData(this.cvForm.get('country')?.value)
          .subscribe((response) => {
            this.cities = response;
          });
      }
    });


    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('index');
      if (idParam !== null) {
        this.index = +idParam;
        this.loadCV();
        this.isNewCV = false; 
      } else {
        this.selectedCountry = this.countries;
        this.uploadedImage="https://placehold.co/200x200";
      }

     
    });
 

  }


  onCountrySelected(): void {
    this.loadCitiesForSelectedCountry();
  }


  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
       
      
        var uploadedImage = e.target?.result as string;
        this.uploadedImage = uploadedImage
        this.cvForm.get('uploadedImage')?.setValue(uploadedImage); 
      };
      reader.readAsDataURL(file);
    }
  }

  openFileInput(): void {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  }

  loadCitiesForSelectedCountry(): void {
    if (this.selectedCountry) {
      this.apiService
        .postCityData({ countryId: this.selectedCountry })
        .subscribe({
          next: (data) => {
            this.cities = data;
          },
          error: (error) => {
            console.error('Hata! Şehir verileri çekilemedi:', error);
          },
        });
    }
  }

  loadCV(): void {
    this.cv = this.cvService.getCVById(this.index);
   this.uploadedImage= this.cv.uploadedImage;
    if (this.cv) {
      this.cvForm.patchValue({
        uploadedImage: this.cv.uploadedImage,
        name: this.cv.name,
        surname: this.cv.surname,
        title: this.cv.title,
        birthDate: this.cv.birthDate,
        country: this.cv.country,
        city: this.cv.city,
        email: this.cv.email,
        education: this.cv.education,
        experience: this.cv.experience,
        skills: this.cv.skills,
        description: this.cv.description,
      });
    }
  }

  saveCV() {
    const cv = {
      uploadedImage: this.cvForm.get('uploadedImage')?.value,
      name: this.cvForm.get('name')?.value,
      surname: this.cvForm.get('surname')?.value,
      title: this.cvForm.get('title')?.value,
      birthDate: this.cvForm.get('birthDate')?.value,
      country: this.cvForm.get('country')?.value,
      city: this.cvForm.get('city')?.value,
      email: this.cvForm.get('email')?.value,
      education: this.cvForm.get('education')?.value,
      experience: this.cvForm.get('experience')?.value,
      skills: this.cvForm.get('skills')?.value,
      description: this.cvForm.get('description')?.value,
    };

    localStorage.removeItem('uploadedImage');
    this.cvService.saveCV(cv);
    this.alertService.showAlert('success', 'CV kaydedildi!');
    this.router.navigate(['/cvs']);
  }

  updateCV(): void {
    const updatedCV = {
      uploadedImage: this.uploadedImage,
      name: this.cvForm.get('name')?.value,
      surname: this.cvForm.get('surname')?.value,
      title: this.cvForm.get('title')?.value,
      birthDate: this.cvForm.get('birthDate')?.value,
      country: this.cvForm.get('country')?.value,
      city: this.cvForm.get('city')?.value,
      email: this.cvForm.get('email')?.value,
      education: this.cvForm.get('education')?.value,
      experience: this.cvForm.get('experience')?.value,
      skills: this.cvForm.get('skills')?.value,
      description: this.cvForm.get('description')?.value,
    };
    
    this.cvService.updateCV(this.index, updatedCV);
    this.alertService.showAlert('success', 'CV güncellendi!');
    this.router.navigate(['/cvs']);
  }

  downloadPDF() {
    const formData = {
      uploadedImage: this.cvForm.get('uploadedImage')?.value,
      name: this.cvForm.get('name')?.value,
      surname: this.cvForm.get('surname')?.value,
      title: this.cvForm.get('title')?.value,
      birthDate: this.cvForm.get('birthDate')?.value,
      country: this.cvForm.get('country')?.value,
      city: this.cvForm.get('city')?.value,
      email: this.cvForm.get('email')?.value,
      education: this.cvForm.get('education')?.value,
      experience: this.cvForm.get('experience')?.value,
      skills: this.cvForm.get('skills')?.value,
      description: this.cvForm.get('description')?.value,
    };
    const fileName = `${this.cv.name}_${this.cv.surname}_cv.pdf`;

    if (formData.uploadedImage !== null) {
      this.cvService.generatePDFFromFormData(
        formData,
        fileName,
        formData.uploadedImage
      );
    } else {
      this.cvService.generatePDFFromFormData(formData, fileName, '');
    }
  }
}
