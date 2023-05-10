import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../service/snackbar.service';
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
    private snackbar : SnackbarService,
    private dialog : MatDialogRef<AddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
    
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
    if(this.data)
    {
      this.empForm.patchValue(this.data)
    }    
  }

  onFormSubmit(){
    if(this.empForm.valid)
    {
      if(this.data)
      {
        this.api.updateEmployee(this.data.id,this.empForm.value).subscribe({
          next:(val:any)=>{
            this.snackbar.openSnackBar('Edit Successfully');
            /* 成功編輯資料後關閉彈跳視窗 */ 
            this.dialog.close(true);
            /* 成功增加資料後關閉彈跳視窗 */ 
            this.empForm.reset();
          },
          error:(err:any)=>{
            console.log(err)
          }
        })
      }
      else
      {
        this.api.addEmployee(this.empForm.value).subscribe({
          next:(val:any)=>{
            this.snackbar.openSnackBar('Add Successfully');
            /* 成功增加資料後關閉彈跳視窗 */ 
            this.dialog.close(true);
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

}
