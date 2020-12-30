import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

  customers: any;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.getCustomersList();
  }

  getCustomersList() {
    this.customerService.getCustomersList();
 
  }

  deleteCustomers() {
    this.customerService.deleteAll();
  }

}
