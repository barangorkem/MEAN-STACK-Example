import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../shared/employee.service';
import {  NgForm } from '@angular/forms';
import { Employee } from '../shared/employee.model';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService:EmployeeService) { }

  ngOnInit() {
    this.resetForm();
    this.employeeService.getEmployees().subscribe((data:Employee[])=>{
      console.log(data);
      this.employeeService.employees=data;
    })
  }
  resetForm(form?:NgForm)
  {
    if(form!=null)
    form.resetForm();
    this.employeeService.selectedEmployee={
      _id:"",
      name:"",
      position:"",
      office:"",
      salary:null
    }
  }
  onSubmit(form:NgForm)
  {
    console.log(form.value);
    if(form.value._id=='')
    {
      this.employeeService.postEmployee(form.value).subscribe((res)=>{
        console.log(res);
        this.employeeService.getEmployees().subscribe((data:Employee[])=>{
          this.employeeService.employees=data;
        });
        this.resetForm(form);
        
      })
    }
    else
    {
   
      console.log(form.value);
      this.employeeService.updateEmployee(form.value).subscribe((data)=>{
        this.employeeService.getEmployees().subscribe((x:Employee[])=>{
          this.employeeService.employees=x;
          this.resetForm(form);
        })
      });
    }
    
  }
  editEmployee(id:String)
  {
    this.employeeService.getEmployee(id).subscribe((data:Employee)=>{
      this.employeeService.selectedEmployee=data;
    })
  }
  deleteEmployee(id:String)
  {
    console.log("delete employee");
    this.employeeService.deleteEmployee(id).subscribe((data)=>{
      this.employeeService.getEmployees().subscribe((x:Employee[])=>{
        this.employeeService.employees=x;
      })
    })
  }
}
