import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantComponent } from './restaurant/restaurant.component'; // Asegúrate de importar el componente

const routes: Routes = [
  { path: 'restaurantes', component: RestaurantComponent } // Define la ruta para el componente RestaurantComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
