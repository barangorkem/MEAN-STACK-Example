import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import {Employee} from '../shared/employee.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  selectedEmployee:Employee;
  
  employees:Employee[]
  constructor(private http:HttpClient) {
    
   }
   postEmployee(employee:Employee)
   {
     console.log(employee);
    return this.http.post("http://localhost:3000/employee",employee);
   }
   getEmployees()
   {
    return this.http.get("http://localhost:3000/employee");
   }
   getEmployee(id:String)
   {
    return this.http.get(`http://localhost:3000/employee/${id}`);
   }
   updateEmployee(employee:Employee)
   {
     return this.http.put(`http://localhost:3000/employee/${employee._id}`,employee);
   }
   deleteEmployee(id:String)
   {
     return this.http.delete(`http://localhost:3000/employee/${id}`);
   }
}
