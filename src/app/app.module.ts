import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule, MatDialog} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';


import { CreateStateListComponent } from './create-state-list/create-state-list.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CreateStatelistComponent } from './create-statelist/create-statelist.component';
import { FormsModule } from '@angular/forms';
import { StatelistComponent } from './statelist/statelist.component';
import { HomeComponent } from './home/home.component';
import { ShowBoardComponent } from './show-board/show-board.component';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from 'src/environments/environment';
import { CreateTaskComponent } from './create-task/create-task.component';
import {MatSelectModule} from '@angular/material/select'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CreateStateListComponent,
    CreateStatelistComponent,
    StatelistComponent,
    HomeComponent,
    ShowBoardComponent,
    CreateTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatSnackBarModule,
    MatDividerModule,
    MatCardModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatSelectModule
  ],
  providers: [
    HttpClient,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
