import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor(private menuController: MenuController) {}

  openMenu() {
    this.menuController.open('first'); // Abre el menú lateral
  }

  openPage(page: string) {
    // Lógica para navegar a otras páginas, si es necesario
    console.log('Navigating to: ', page);
    this.menuController.close(); // Cierra el menú después de seleccionar una opción
  }
}
