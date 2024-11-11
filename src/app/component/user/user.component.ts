import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { users } from '../../_model/user.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  userlist!: users[];
  displayColumns: string[] = [
    'username',
    'name',
    'email',
    'phone',
    'role',
    'status',
    'action',
  ];
  datasource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: UserService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadusers();
  }

  loadusers() {
    this.service.Getallusers().subscribe((item) => {
      this.userlist = item;
      this.datasource = new MatTableDataSource<users>(this.userlist);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    });
  }

  functionedit(code: string) {
    // if (this._permission.haveedit) {
    //   this.router.navigateByUrl('customer/edit/' + code);
    // } else {
    //   this.toastr.warning('You dont have permission to edit', 'warning');
    // }
  }
}
