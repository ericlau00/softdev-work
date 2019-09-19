from flask import Flask
app = Flask(__name__)

@app.route("/")
def hi():
	return "moustache"

@app.route("/my_foist_template")
def temp():
	coll = [0,1,1,2,3,5,8]
	return """
<!DOCTYPE html>
<html>
	<head>
</head>
	<body>
	{% for i in coll %}
		{{i}}
		<br/>
	{% endfor %}
	</body>
</html>
		"""
if __name__ == "__main__":
	app.debug = True
	app.run()

