import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  empForm !: FormGroup;

  education : string[] = [
    'Metric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate'
  ]

  constructor
    (
    private formbuilder : FormBuilder,
    private api : ApiService,
    private dialog : MatDialogRef<AddEditComponent>
    
    ) {
    this.empForm = this.formbuilder.group({
      firstName : '',
      lastName : '',
      email : '',
      dob : '',
      gender : '',
      education : '',
      company : '',
      experience : '',
      salary : '' 
    })
   }

  ngOnInit(): void {
  }

  onFormSubmit(){
    if(this.empForm.valid)
    {
      console.log(this.empForm.value);
      this.api.addEmployee(this.empForm.value).subscribe({
        next:(val:any)=>{
          /* 成功增加資料後關閉彈跳視窗 */ 
          this.dialog.close();
          /* 成功增加資料後關閉彈跳視窗 */ 
          this.empForm.reset();
        },
        error:(err:any)=>{
          console.log(err)
        }
      })
    }
  }

}
