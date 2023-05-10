import { Component,OnInit , ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditComponent } from './add-edit/add-edit.component';
import { ApiService } from './service/api.service';
import { SnackbarService } from './service/snackbar.service';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email','dob','gender','education','company','experience','salary','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(public dialog: MatDialog, private api : ApiService, private snackbar : SnackbarService) {}

  ngOnInit(): void {
    this.getEmpolyeeList()
  }

  /* 開啟增加資料視窗 */
  openAddEditDialog(){
   const dialogRef =  this.dialog.open(AddEditComponent);
   dialogRef.afterClosed().subscribe({
    next:(val:any)=>{
      console.log('reply',val);
      if(val)
      {
        this.getEmpolyeeList();
      }
    }
   })
  }

  /* 取得所有資料 */
  getEmpolyeeList(){
    this.api.getEmployee().subscribe({
      next:(val:any)=>{
        this.dataSource = new MatTableDataSource(val);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /* 刪除特定資料 */
  deleteEmployee(id:number){
    this.api.deleteEmployee(id).subscribe({
      next:(val:any)=>{
        this.snackbar.openSnackBar('Delete successfully','Done');
        this.getEmpolyeeList();
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  /* 開啟編輯資料視窗 */
  openOnEditDialog(data:any){
    const dialogRef =  this.dialog.open(AddEditComponent,
      {
        data:data
      });
      
      dialogRef.afterClosed().subscribe({
        next:(val:any)=>{
          console.log('reply',val);
          if(val)
          {
            this.getEmpolyeeList();
          }
        }
       })
   }
}
