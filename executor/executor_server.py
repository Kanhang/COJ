import executor_utils as eu
import json
from flask import jsonify	
from flask import Flask
from flask import request
app= Flask(__name__)



@app.route	("/")
def hello():
	return "Hello World!"
@app.route("/build_and_run",methods=["POST"])
def build_and_run():
	print "Got called: %s " %(request.data)
	print type(request.data)
	data = json.loads(request.data)
	print data	
	if "code" not in data or "lang" not in data:
		return "you should provide 	both 'code 'and 'lang'"
	code =data['code']
	lang= data['lang']
	print "API got called with code: %s in %s" %(code,lang)
	result = eu.build_and_run(code,lang)
	return jsonify(result)																																																																								


if __name__ =="__main__":
	eu.load_image()
	app.run(debug=True,threaded=True)