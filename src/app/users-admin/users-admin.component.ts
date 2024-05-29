import { Component } from '@angular/core';
import { UsersAdminService } from '../users-admin.service';
import { UsersAdmin } from '../users-admin';
@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrl: './users-admin.component.css'
})
export class UsersAdminComponent {
  users: UsersAdmin[] = [];
  constructor(private UsersAdminService: UsersAdminService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

    
  getAllUsers(): void {
    this.UsersAdminService.getAllUsers().subscribe(users => {
      this.users = users;

    });
  }

  deleteUser(userId: number): void {
    if (confirm('¿Estas seguro que quieres eliminar a este usuario?')) {
      this.UsersAdminService.deleteUser(userId).subscribe(
        () => {
          this.users = this.users.filter(users => users.id !== userId);
        },
        (error) => {
          console.error('Error en la eliminacion del usuario:', error);
        }
      );
    }
}
}
