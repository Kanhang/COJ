import { Component, OnInit,Inject} from '@angular/core';
import{Router} from '@angular/router';
import{FormControl} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	title="COJ";
	username=""; 
	searchBox: FormControl= new FormControl();
	subscription :Subscription;
  constructor(@Inject('auth') private auth,@Inject('input') private input,private router:Router) {
    auth.handleAuthentication(); }
	profile: any;

  ngOnInit() {
 if (this.auth.isAuthenticated()){
	if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } 
    else {
      this.auth.getProfile((err, profile) => {	
        this.profile = profile;
        this.username=this.profile.nickname;	
      });
    }};
    this.subscription= this.searchBox.valueChanges
    								.debounceTime(200)      //200ms refresh time
    								  .subscribe(
    								  	term=>{
    								  		this.input.changeInput(term);
    								  	}
    								  );
  }
  ngOnDestory(){
  	this.subscription.unsubscribe;
  }
  searchProblem():void{
  	this.router.navigate(['/problems']);
  }
  login():void{
  	this.auth.login()
  				.then(profile=>this.username=profile.nickname)
  				.catch(
  					err=>console.log(err));
  				
  	// this.username=this.auth.getProfile((err,profile)=>{
  	// 	this.username=this.profile.nickname;
  	// })
  }
  logout():void
  {	
  	this.auth.logout();
  }
}
