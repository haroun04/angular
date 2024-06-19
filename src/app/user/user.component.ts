import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User | undefined;
  selectedFile: File | null = null;

  constructor(private userService: UserService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getUserByToken();
  }

  getUserByToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.userService.getUserByToken(token).subscribe(
        (user: User) => {
          this.user = user;
        },
        (error) => {
          console.error('Error al obtener el usuario:', error);
        }
      );
    } else {
      console.error('No se encontró el token en el localStorage');
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  updateUser(): void {
    if (this.user) {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);

        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        this.http.patch('http://localhost:8080/api/user/me/profile-picture', formData, { headers })
          .subscribe(
            (response: any) => {
              this.getUserByToken();
              console.log('Imagen de perfil actualizada:', response);
              if (this.user) {
                this.user.profilePicture = response.profilePictureUrl;
              }
            },
            (error) => {
              console.error('Error al actualizar la imagen de perfil:', error);
            }
          );
      } else {
        this.userService.updateUserInfo(this.user).subscribe(
          (updatedUser: User) => {
            console.log('Usuario actualizado:', updatedUser);
            this.user = updatedUser;
          },
          (error) => {
            console.error('Error al actualizar el usuario:', error);
          }
        );
      }
    } else {
      console.error('No hay información de usuario para actualizar');
    }
  }
}
