import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
  id:number;
  user:User = new User();
  constructor(private userService:UserService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.userService.getUserById(this.id).subscribe(data => {
      this.user = data;
      console.log(data);
    },error =>console.log(error));
}

goToListPage(){
  this.router.navigate(['/list-users']);
}

onSubmit() {
  this.userService.updateUser(this.user).subscribe(data => {
    console.log("Usuario actualizado correctamente:", data);
    this.goToListPage();
  },error => console.log(error));
}

}
