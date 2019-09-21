# Eric "Morty" Lau
# SoftDev1 pd1
# K9 -- ’Tis Not a Race -- But You Will Go Faster
# 2019-09-21   

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

