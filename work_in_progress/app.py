# Eric "Morty" Lau
# SoftDev1 pd1
# K12 -- Echo Echo Echo
# 2019-09-26

from flask import Flask, render_template, request
from utl import solon

app = Flask(__name__)

team_name = "Solon"
roster = "Eric \"Morty\" Lau and Raymond Lee"

@app.route("/")
def root():
	return render_template("landing.html",
							team = team_name,
							names = roster,
							util = solon.hello(),
							)

@app.route("/auth", methods=["GET"])
def auth():
	print("this is the app name", app, end="\n")
	print("this is the request", request, end="\n")
	print("this is the request headers", request.headers)
	print("this is the request method", request.method, end="\n")
	print("this is the request args", request.args, end="\n")
	print("this is the request form", request.form, end="\n")
	return render_template("response.html",
							team = team_name,
							names = roster,
							username = request.args['username'],
							# username = request.form['username'],
							method = request.method)

if __name__ == "__main__":
	app.debug = True
	app.run()
