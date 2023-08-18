import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';

@Injectable({
  providedIn: 'root',
})
export class CvService {
  constructor() {}

  saveCV(cv: any): void {
    const storedCVs = JSON.parse(localStorage.getItem('userCVs') || '[]');
    storedCVs.push(cv);
    localStorage.setItem('userCVs', JSON.stringify(storedCVs));
  }

  updateCV(index: number, updatedCV: any): void {
    const storedCVs = JSON.parse(localStorage.getItem('userCVs') || '[]');

    if (index >= 0 && index < storedCVs.length) {
      storedCVs[index] = updatedCV;
      localStorage.setItem('userCVs', JSON.stringify(storedCVs));
    }
  }

  deleteCV(index: number): void {
    const storedCVs = JSON.parse(localStorage.getItem('userCVs') || '[]');

    if (index >= 0 && index < storedCVs.length) {
      storedCVs.splice(index, 1);
      localStorage.setItem('userCVs', JSON.stringify(storedCVs));
    }
  }

  getCVs(): any[] {
    return JSON.parse(localStorage.getItem('userCVs') || '[]');
  }

  getCVById(id: number): any {
    const storedCVs = JSON.parse(localStorage.getItem('userCVs') || '[]');
    return storedCVs.find((cv: any) => cv.id === id);
  }

  generatePDFFromFormData(formData: any, fileName: string): void {
    const pdf = new jsPDF();

    pdf.text(`Ad: ${formData.name}`, 10, 10);
    pdf.text(`Soyad: ${formData.surname}`, 10, 20);
    pdf.text(`Unvan: ${formData.title}`, 10, 30);
    pdf.text(`Dogum Tarihi: ${formData.birthDate}`, 10, 40);
    pdf.text(`Ulke: ${formData.country}`, 10, 50);
    pdf.text(`Sehir: ${formData.city}`, 10, 60);
    pdf.text(`E-posta: ${formData.email}`, 10, 70);
    pdf.text(`Egitim: ${formData.education}`, 10, 80);
    pdf.text(`Deneyimler: ${formData.experience}`, 10, 90);
    pdf.text(`Yetenekler: ${formData.skills}`, 10, 100);
    pdf.text(`Açıklama: ${formData.description}`, 10, 110);

    pdf.save(fileName); // PDF'i indirme
  }
}
