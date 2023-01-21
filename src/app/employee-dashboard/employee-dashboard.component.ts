import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent {

  formValue ! : FormGroup;
  EmployeeModelObj : EmployeeModel = new EmployeeModel();
  EmployeeData! : any;
  showAdd! : boolean;
  showUpdate! : boolean;
  constructor(private formbuilder: FormBuilder,
    private api: ApiService){}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName : [''],
      lastName : [''],
      email : [''],
      mobile : [''],
      salary : [''] 
    })
    this.getAllEmployee();
  }

  postEmployeeDetails(){
    this.EmployeeModelObj.firstName = this.formValue.value.firstName;
    this.EmployeeModelObj.lastName = this.formValue.value.lastName;
    this.EmployeeModelObj.email = this.formValue.value.email;
    this.EmployeeModelObj.mobile = this.formValue.value.mobile;
    this.EmployeeModelObj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.EmployeeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Employee Added Successfully!");
      let ref = document.getElementById('cancel')
      ref?.click()
      this.formValue.reset();
      this.getAllEmployee();
    },
    err=>{
      alert("Something went wrong!")
    })
  }
 getAllEmployee(){
  this.api.getEmployee()
  .subscribe(res=>{
    this.EmployeeData = res;
  })
 }
 deleteEmployee(row : any){
  this.api.deleteEmployee(row.id)
  .subscribe(res =>{
    alert("Employee Deleted Successfully!")
    this.getAllEmployee()
  })
 }
 onEdit(row : any){
   this.showAdd = false;
  this.showUpdate = true;
  this.EmployeeModelObj = row.id;
  this.formValue.controls['firstName'].setValue(row.firstName);
  this.formValue.controls['lastName'].setValue(row.lastName);
  this.formValue.controls['email'].setValue(row.email);
  this.formValue.controls['mobile'].setValue(row.mobile);
  this.formValue.controls['salary'].setValue(row.salary);
 }
 updateEmployeeDetails(){
  this.EmployeeModelObj.firstName = this.formValue.value.firstName;
  this.EmployeeModelObj.lastName = this.formValue.value.lastName;
  this.EmployeeModelObj.email = this.formValue.value.email;
  this.EmployeeModelObj.mobile = this.formValue.value.mobile;
  this.EmployeeModelObj.salary = this.formValue.value.salary;

  this.api.updateEmployee(this.EmployeeModelObj, this.EmployeeModelObj.id)
  .subscribe(res=>{
    alert("Updated Successfully!")
    let ref = document.getElementById('cancel')
    ref?.click()
    this.formValue.reset();
    this.getAllEmployee();
  })
 }
 clickAddEmployee(){
  this.formValue.reset();
  this.showAdd = true;
  this.showUpdate = false;
 }
}
