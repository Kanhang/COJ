import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';

(window as any).global =  window;

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: 'cC7d_3MgNE4uJzm4O8gYP_s9cgAPq4t7',
    domain: 'kanhang.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:3000//',
    scope: 'openid profile'
  });

  constructor(public router: Router) {

  }

  public login():Promise<object>{
  	 this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
      } else if (err) {   
      console.log(err);
      }

    });
  
  	  this.auth0.authorize();
 
  	return new Promise((resolve,reject)=>{ 
  	
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('Access Token must exist to fetch profile');
  }

  const self = this;
  this.auth0.client.userInfo(accessToken, (err, profile) => {
   if(err){
   		console.log("fail");
   	reject(err);
   }
   else{
   	localStorage.setItem('profile',JSON.stringify(profile));
   	console.log("success");
   	resolve(profile); } });
});
  }
public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/problems']);
      } else if (err) {
        this.router.navigate(['//']);
        console.log(err);
      }

    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    console.log("logout");
    this.router.navigate(['//']);
  }
userProfile: any;

//...
public getProfile(cb): void {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('Access Token must exist to fetch profile');
  }

  const self = this;
  this.auth0.client.userInfo(accessToken, (err, profile) => {
    if (profile) {
      self.userProfile = profile;
    }
    cb(err, profile);
  });
}
//...

  	
  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime(	) < expiresAt;
  }

}