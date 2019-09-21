from flask import Flask, render_template 
app = Flask(__name__)

@app.route("/")
def hi():
	return "moustache"

@app.route("/my_foist_template")
def temp():
	coll = [0,1,1,2,3,5,8]
	return render_template(
		"seed.html",
		collection = coll,
		foo="this is a title"
	)

if __name__ == "__main__":
	app.debug = True
	app.run()

