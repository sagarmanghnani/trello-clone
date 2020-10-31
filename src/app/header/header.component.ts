import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateStatelistComponent } from '../create-statelist/create-statelist.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public dialog:MatDialog
  ) { }

  ngOnInit(): void {
  }


  createStateList(){
    let dialogRef = this.dialog.open(CreateStatelistComponent, {
      width:'250px'
    })
  }

}
