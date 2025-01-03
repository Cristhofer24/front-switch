import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [],
  templateUrl: './time.component.html',
  styleUrl: './time.component.scss'
})
export class TimeComponent implements OnInit , OnDestroy {
  startTime: number = 0; // Hora en que el temporizador comenzó
  currentTime: number = 0; // Tiempo actual en milisegundos
  elapsedTime: number = 0; // Tiempo transcurrido desde que comenzó
  timer: any = null; // Variable que mantiene la referencia al temporizador
  displayTime: string = "00:00:00"; // Variable para mostrar el tiempo en formato hh:mm:ss

  ngOnInit() {
    this.startTime = Date.now(); // Guardamos el tiempo en que el componente se inicializa (inicio de la sesión)
    this.startTimer(); // Iniciamos el temporizador
  }

  ngOnDestroy() {
    // Detenemos el temporizador cuando el componente es destruido (evita que el temporizador siga corriendo)
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  // Iniciar el temporizador
  startTimer() {
    this.timer = setInterval(() => {
      this.currentTime = Date.now(); // Obtenemos el tiempo actual
      this.elapsedTime = this.currentTime - this.startTime; // Calculamos el tiempo transcurrido
      this.updateDisplay(); // Actualizamos el formato de visualización
    }, 1000); // Actualizamos cada segundo
  }

  // Método para actualizar el formato del tiempo (horas:minutos:segundos)
  updateDisplay() {
    const hours = Math.floor(this.elapsedTime / 3600000); // Calculamos las horas (1 hora = 3600000 milisegundos)
    const minutes = Math.floor((this.elapsedTime % 3600000) / 60000); // Calculamos los minutos
    const seconds = Math.floor((this.elapsedTime % 60000) / 1000); // Calculamos los segundos

    // Actualizamos la variable displayTime con el formato adecuado (hh:mm:ss)
    this.displayTime = `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
  }

  // Método auxiliar para agregar un cero en los números de un solo dígito (como 01 en lugar de 1)
  padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

}
