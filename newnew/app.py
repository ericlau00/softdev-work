# Eric "Morty" Lau
# SoftDev1 pd1
# K12 -- Echo Echo Echo
# 2019-09-26

from flask import Flask, render_template, request, redirect, session, url_for
import csv, random
app = Flask(__name__)

team_name = "Plumbus"
roster = "Eric \"Morty\" Lau and Junhee Lee"

with open('occupations.csv') as csv_file:
    #code by Vishwaa, edited by kiran
    read = csv.reader(csv_file, delimiter = ",")
    dict = {}
    displayData = {}
    print(read)
    for row in read:
        if not (row[0] == "Job Class" or row[0] == "Total"):
            dict[row[0]] = float(row[1])
        displayData[row[0]] = row[1]

#WEIGHTED RANDOM CHOICE (mortiestRick)


# returns a weighted random element from a dictionary
def weightedRandFromDict(dictionary):
    keys = list(dictionary.keys())
    weights = list(dictionary.values())

    # return one(k=1) random job accounting for attached weights
    # the [0] is needed because random.choices returns a list
    return random.choices(keys,weights=weights,k=1)[0]


@app.route("/")
def root():
	return render_template("landing.html",
							team = team_name,
							names = roster)

@app.route("/occupy")
def jobs():
    job=weightedRandFromDict(dict)
    return render_template(
            "flaskStTemplate.html",
            dict=displayData,
            randomJob=job
            )

@app.route("/auth")
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
							method = request.method)

@app.route("/ocupy")
def misspell():
    return redirect(url_for("jobs"))

@app.route("/idunno")
def redir():
    return redirect("https://www.dailydot.com/wp-content/uploads/d42/e2/Screen20Shot202017-01-0320at204.52.2020PM.png")

if __name__ == "__main__":
	app.debug = True
	app.run()