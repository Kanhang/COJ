import { Injectable } from '@angular/core';
import {Problem} from "../models/problem.model"
import {PROBLEMS} from "../mock-problems"
import {Http,Response,Headers,RequestOptions} from '@angular/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';


@Injectable({
  providedIn: 'root'
})
export class DataService {
	private problemsSource= new BehaviorSubject<Problem[]>([]);
	//problems : Problem[]=PROBLEMS;
  constructor(private http:Http) { }

  getProblems(): Observable<Problem[]>{
  	//return this.problems;
  	console.log("getting problems");
  	this.http.get("api/v1/problems")  //return observable
  		.toPromise()
  		.then((res:Response)=>{
  			this.problemsSource.next(res.json());
  		})
  		.catch(this.handleError);
	return	this.problemsSource.asObservable();
  }
  getProblem(id: number):Promise<Problem>{
  	//return this.problems.find((problem)=>problem.id ===id);
  	  	console.log("getting  a problem");
  	return this.http.get(`api/v1/problems/${id}`)
  			.toPromise()
  			.then((res:Response)=>res.json())
  			.catch(this.handleError);
}
  addProblem (problem:Problem):Promise<Problem>
  {
// problem.id =this.problems.length+1;
// this.problems.push(problem);
		let headers= new Headers({'Content-type':'application/json'});
	let options = new RequestOptions({headers: headers});
		return this.http.post('/api/v1/problems',problem,options)
			.toPromise()
			.then((res:Response)=>{
				this.getProblems();
				return res.json();

			})
			.catch(this.handleError);
  }
buildAndRun(data): Promise<Object>{
 let headers= new Headers({'Content-type':'application/json'});
  let options = new RequestOptions({headers: headers});
    return this.http.post('/api/v1/build_and_run',data,options)
      .toPromise()
      .then((res:Response)=>{
        this.getProblems();
        return res.json();

      })
      .catch(this.handleError);  
}
  private handleError(error:any): Promise<any>{
  	console.error("An error occurred",error);
  	return Promise.reject(error.body ||error);
  }
}
