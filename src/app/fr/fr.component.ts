import { Component, OnInit } from '@angular/core';
import { FrService } from '../fr.service';  
import { Fr } from '../fr';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fr',
  templateUrl: './fr.component.html',
  styleUrls: ['./fr.component.css']
})
export class FrComponent implements OnInit {
  favoriteRestaurants: Fr[] = [];
  user: any = { frs: [] };  

  constructor(private frService: FrService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getUserByToken();
  }

  getUserByToken(): void {
    if (typeof localStorage !== undefined && localStorage.getItem('token') !== null) {
      const token: string = localStorage.getItem('token') as string;
      this.frService.getUserByToken(token).subscribe(
        (user: User) => {
          this.user = user;
          console.log(user);
        },
        (error) => {
          console.error('Error al obtener el usuario:', error);
        }
      );
    } else {
      console.error('No se encontró el token en el localStorage');
    }
  }



  deleteBooking(id: number): void {
    this.http.delete(`http://localhost:8080/api/favorite-restaurants/${id}`)
        .subscribe(
            () => {
                console.log('Reserva eliminada exitosamente');
                this.getUserByToken();
            },
            error => {
                console.error('Error al eliminar la reserva:', error);
            }
        );
  }
}
