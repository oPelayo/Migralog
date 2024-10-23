import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent {

  users:User[];

  constructor(private userService: UserService, private router:Router) {}
  
  ngOnInit(): void {
    this.getAllUsers();
  }

  updateUser(id:number){
    this.router.navigate(['update-user', id]);
  }

  deleteUser(id:number){
    this.userService.deleteUser(id).subscribe(data => {
      console.log("User deleted :  ", data);
      this.getAllUsers();
    });
  }

  private getAllUsers(){
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }
}