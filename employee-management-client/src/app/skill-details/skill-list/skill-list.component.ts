import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ISkill } from '../ISkill';
import { SkillFormComponent } from '../skill-form/skill-form.component';
import { SkillService } from '../skill.service';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.scss']
})
export class SkillListComponent implements OnInit {

  listData!: MatTableDataSource<any>;
  displayedColumns: string[] = ['skillId', 'skillName', 'actions'];
  rowdata: ISkill[] = []

  constructor(private service: SkillService,
    private dialog: MatDialog) {

  }
  ngOnInit() {
    this.service.getSkillData().subscribe(
      list => {
        console.log(list)
        this.rowdata = list
        this.listData = new MatTableDataSource(this.rowdata);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      }
    );
  }


  dataSource!: MatTableDataSource<SkillFormComponent>;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;


  @ViewChild(MatSort, { static: true })
  sort!: MatSort;

  @Input() set projects(value: SkillFormComponent[]) {
    this.dataSource = new MatTableDataSource(value);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  searchKey!: string;

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(SkillFormComponent, dialogConfig);
  }

  onEdit(row: any) {
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(SkillFormComponent, dialogConfig);
  }

}