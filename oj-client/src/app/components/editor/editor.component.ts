import { Component, OnInit ,Inject} from '@angular/core';
import {CollaborationService} from '../../services/collaboration.service';
import {ActivatedRoute,Params} from'@angular/router';

declare var ace: any;
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
	editor:any;
	languages: string[]=['Java','Python'];
	language: string ='Java';
	sessionId: string;
  output: string;   
	defaultContent={
  'Java':`public class Example{
    public static void main(String []args){
      //Type your code here
    }
  }`,
  
  'Python':`class Solution:
  def example():
  	# Write your Python code here`
};

  constructor(@Inject('collaboration') private collaboration,
  		private route:ActivatedRoute,@Inject('data') private data,) {

   }

  ngOnInit() {
  	this.route.params
  		.subscribe(params=>{
  			this.sessionId=params['id'];
  			this.initEditor();
  		});}

  initEditor(){	
  	this.editor=ace.edit('editor');
  	this.editor.setTheme('ace/theme/eclipse');
  	this.resetEditor();
	this.editor.$blockScrolling=Infinity;
	console.log(this.collaboration);
	this.collaboration.init(this.editor,this.sessionId);
	document.getElementsByTagName('textarea')[0].focus();
	this.editor.lastAppliedChange=null;
	this.editor.on('change',(e)=>{
		console.log('editor changes:' +JSON.stringify(e));
		if (this.editor.lastAppliedChange!=e){
			this.collaboration.change(JSON.stringify(e));
			
		}
	})
		this.editor.getSession().getSelection().on("changeCursor",()=>{
			let cursor= this.editor.getSession().getSelection().getCursor();
			this.collaboration.cursorMove(JSON.stringify(cursor));
		});
		this.collaboration.restoreBuffer();
  }
  change(delta: string):void{
  	this.collaboration.emit("change",delta);
  }
  cursorMove(cursor :Object): void{
  	this.collaboration.emit("cursorMove",cursor);
  }
  setLanguage(language: string):       void{
  	this.language= language;
  	  
  	this.resetEditor();
  }
  resetEditor():void{
  	this.editor.setValue(this.defaultContent[this.language]);
  	this.output='';
    if (this.language == 'C++'){
  	this.editor.getSession().setMode('ace/mode/c_cpp');
  	}
  		else{
  	this.editor.getSession().setMode('ace/mode/'+ this.language.toLowerCase());
  }
  }
  submit():void{
  	let userCode= this.editor.getValue();
  	console.log(userCode);
    let data={
      user_code:userCode,
      lang: this.language.toLowerCase()};
    this.data.buildAndRun(data)
            .then(res=>this.output=res.text);
  }
}
