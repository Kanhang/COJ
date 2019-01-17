var express =require("express");
var problemService= require("../services/problemService");
var router= express.Router();
var bodyParser= require("body-parser");
var jsonParser= bodyParser.json();
//this i s a router, not to write business logic but to function as a router
var node_rest_client=require('node-rest-client').Client;
var rest_client= new node_rest_client();
EXECUTOR_SERVER_URL="http://127.0.0.1:5000/build_and_run"
rest_client.registerMethod('build_and_run',EXECUTOR_SERVER_URL,'POST');
	

router.get("/problems",function(req,res){
	problemService.getProblems()
				.then(problems=>res.json(problems));

});
router.get("/problems/:id",function(req,res){
		var id =req.params.id;
		problemService.getProblem(+id)
			.then(problem=>res.json(problem));

});
router.post("/problems",jsonParser,function(req,res){
	problemService.addProblem(req.body)
			.then(function(problem){
				res.json(problem);
			},function (error){
				console.log(error.stack);//to print the error
				res.status(400).send("problem name already exists");
			}); //req.body is json file through jsonparser      
});	
router.post("/build_and_run",jsonParser,function(req,res){
	const userCode= req.body.user_code;	
	const lang= req.body.lang;
	console.log(lang+";"+userCode);
	//res.json({});
	rest_client.methods.build_and_run({	
		data:{code:userCode,lang:lang},	
		headers:{"Content-Type":"application/json"}
	},(data,response)=>{	
		console.log("Received response from execution server: ");
		 //data={build : 'zoijofajf', run: 'joadisjfoiajf'}
		 console.log('fsafafas');
		console.log(data['run']);
		const text= `Build output: ${data['build']}
		Execute output:${data['run']}`;
		data['text']=text;
		res.json(data);	
	});
})
module.exports=router;	