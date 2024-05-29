import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-maintenance-area',
  templateUrl: './maintenance-area.component.html',
  styleUrls: ['./maintenance-area.component.css']
})
export class MaintenanceAreaComponent implements OnInit{
  users: User[] = [];
  filteredUsers: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data: User[]) => {
      this.users = data;
      this.filteredUsers = data;
    });
  }

  updateFilter(event: any): void {
    const val = event.target.value.toLowerCase();
    // Filtra los usuarios según la entrada de búsqueda
    this.filteredUsers = this.users.filter(user => {
      return (
        user.id.toString().includes(val) ||
        user.name.toLowerCase().includes(val) ||
        user.last_name.toLowerCase().includes(val) ||
        user.email.toLowerCase().includes(val) ||
        user.phone.toLowerCase().includes(val) 
        // user.role.name.toLowerCase().includes(val)
      );
    });
  }
}


