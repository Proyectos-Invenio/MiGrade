import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { CarouselModule } from 'primeng/carousel';

interface ClassSchedule {
  name: string;
  time: string;
  type: 'math' | 'science';
}

interface PerformanceData {
  approved: number;
  inDanger: number;
  failed: number;
}

interface CarouselImage {
  url: string;
  alt: string;
  message: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ChartModule, CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  // Datos del gráfico
  chartData: any;
  chartOptions: any;

  // Datos del usuario
  userName = 'Emilio';
  subject = 'Ciencias - Matemática';
  motivationalQuote = 'Los grandes esfuerzos traen grandes recompensas.';

  constructor() {
    this.initializeChart();
  }

  // Datos del calendario
  currentMonth = 'Septiembre 2025';
  currentDate = 21;

  // Datos de rendimiento
  performanceData: PerformanceData = {
    approved: 75.9,
    inDanger: 7.7,
    failed: 16.4,
  };

  // Clases del día
  todayClasses: ClassSchedule[] = [
    {
      name: 'Matemática',
      time: '7:00 am - 8:30 am',
      type: 'math',
    },
    {
      name: 'Ciencias',
      time: '8:45 am - 9:30 am',
      type: 'science',
    },
    {
      name: 'Ciencias',
      time: '12:20 md - 1:05 pm',
      type: 'science',
    },
  ];

  // Carrusel de imágenes de anuncios
  currentImageIndex = 0;
  announcementImages: CarouselImage[] = [
    {
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=300&fit=crop',
      alt: 'Actividades deportivas',
      message: '',
    },
    {
      url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=300&fit=crop',
      alt: 'Estudiantes en clase',
      message: '',
    },
    {
      url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=300&fit=crop',
      alt: 'Biblioteca escolar',
      message: '',
    },
    {
      url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=300&fit=crop',
      alt: 'Laboratorio de ciencias',
      message: '',
    },
  ];

  // Métodos para navegación del calendario
  previousMonth(): void {
    console.log('Mes anterior');
    // Implementar lógica de navegación
  }

  nextMonth(): void {
    console.log('Mes siguiente');
    // Implementar lógica de navegación
  }

  // Métodos para navegación del gráfico
  previousChart(): void {
    console.log('Gráfico anterior');
    // Implementar lógica de navegación
  }

  nextChart(): void {
    console.log('Gráfico siguiente');
    // Implementar lógica de navegación
  }

  // Métodos para navegación del carrusel
  previousImage(): void {
    this.currentImageIndex =
      this.currentImageIndex > 0 ? this.currentImageIndex - 1 : this.announcementImages.length - 1;
  }

  nextImage(): void {
    this.currentImageIndex =
      this.currentImageIndex < this.announcementImages.length - 1 ? this.currentImageIndex + 1 : 0;
  }

  goToImage(index: number): void {
    this.currentImageIndex = index;
  }

  // Inicializar el gráfico de PrimeNG
  initializeChart(): void {
    this.chartData = {
      labels: ['Aprobados', 'En Peligro', 'Reprobados'],
      datasets: [
        {
          data: [
            this.performanceData.approved,
            this.performanceData.inDanger,
            this.performanceData.failed,
          ],
          backgroundColor: ['#4ade80', '#fbbf24', '#ef4444'],
          borderWidth: 0,
        },
      ],
    };

    this.chartOptions = {
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    };
  }
}
