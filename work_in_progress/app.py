from flask import Flask, render_template, request 

app = Flask(__name__)

@app.route("/")
def root():
	return render_template("home.html")

@app.route("/auth")
def auth():
	print(app)
	print(request)
	return "hello"

if __name__ == "__main__":
	app.debug = True 
	app.run()
