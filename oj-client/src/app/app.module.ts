import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import {routing} from"./app.routes";
import{AuthService} from "./services/auth.service";
import{DataService} from "./services/data.service";
import {CollaborationService} from "./services/collaboration.service";
import {InputService} from "./services/input.service";
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NewProblemComponent } from './components/new-problem/new-problem.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EditorComponent } from './components/editor/editor.component';
import { SearchPipe } from './pipes/search.pipe';
@NgModule({
  declarations: [
    AppComponent,
    ProblemListComponent,
    ProblemDetailComponent,
    NewProblemComponent,
    NavbarComponent,
    EditorComponent,

    SearchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgSelectModule,
    ReactiveFormsModule,
    routing
  ],                                                
  providers: [{
  	provide:"data",
  	useClass:DataService
//template style
  },{
    provide:"auth",
    useClass:AuthService
//template style
  },
  {
    provide:"input",
    useClass:InputService
//template style
  },{
    provide:"collaboration",
    useClass: CollaborationService
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
