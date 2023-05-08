import { Component,OnInit , ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditComponent } from './add-edit/add-edit.component';
import { ApiService } from './service/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

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


  constructor(public dialog: MatDialog, private api : ApiService) {}

  ngOnInit(): void {
    this.getEmpolyeeList()
  }
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

  deleteEmployee(id:number){
    this.api.deleteEmployee(id).subscribe({
      next:(val:any)=>{
        // this.dataSource = new MatTableDataSource(val);
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
        alert('delete successfully');
        this.getEmpolyeeList();
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }
}
