var mongoose= require("mongoose");
var ProblemSchema=mongoose.Schema({
id:Number,
name:String,
desc:String,
difficulty:String


});//template language

var problemModel=mongoose.model("ProblemModel",ProblemSchema);

module.exports=problemModel;//template language