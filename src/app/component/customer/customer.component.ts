import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../_service/customer.service';
import { customer } from '../../_model/customer.model';
import { MatTableDataSource } from '@angular/material/table';
import { menupermission } from '../../_model/user.model';
import { UserService } from '../../_service/user.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [MaterialModule, RouterLink, CommonModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent implements OnInit {
  customerlist!: customer[];
  displayColumns: string[] = [
    'code',
    'name',
    'email',
    'phone',
    'creditlimit',
    'status',
    'action',
  ];
  datasource: any;

  _permission: menupermission = {
    code: '',
    name: '',
    haveadd: false,
    havedelete: false,
    haveedit: false,
    haveview: false,
  };
  _haveadd: any;

  _response: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: CustomerService,
    private userservice: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.Setaccess();
    this.loadcustomer();
  }

  Setaccess() {
    let role = localStorage.getItem('userrole') as string;
    this.userservice.Getmenupermission(role, 'customer').subscribe((item) => {
      this._permission = item;
      this._haveadd = this._permission.haveadd;
    });
  }

  loadcustomer() {
    this.service.Getall().subscribe((item) => {
      this.customerlist = item;
      this.datasource = new MatTableDataSource<customer>(this.customerlist);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    });
  }

  functionedit(code: string) {
    if (this._permission.haveedit) {
      this.router.navigateByUrl('customer/edit/' + code);
    } else {
      this.toastr.warning('You dont have permission to edit', 'warning');
    }
  }

  functiondelete(code: string) {
    if (this._permission.havedelete) {
      if (confirm('Are you sure to delete this record?')) {
        this.service.Deletecustomer(code).subscribe((item) => {
          this._response = item;
          if (this._response.result === 'pass') {
            this.toastr.success('Deleted successfully', 'Success');
            this.loadcustomer();
          } else {
            this.toastr.error('Due to:' + this._response.message, 'Failed');
          }
        });
      } else {
        this.toastr.warning('You dont have permission to delete', 'warning');
      }
    }
  }
}
