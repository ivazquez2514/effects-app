import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent implements OnInit {

  users: User[] = [];

  constructor(
    private service: UserService
  ) { }

  ngOnInit() {

    this.service.getUsers()
      .subscribe( users => {
        console.log(users);
        this.users = users;
      });

  }

}
