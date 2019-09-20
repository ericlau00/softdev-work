from flask import Flask, render_template
import csv
import random
#FILE IMPORT, CSV PARSE (goldfish)
with open('occupations.csv') as csv_file:
    #code by Vishwaa, edited by kiran
    read = csv.reader(csv_file, delimiter = ",")
    dict = {}
    l = 0
    for row in read:
        # print row
        if l == 0:
            # skip header row
            l = l + 1
        else:
            dict[row[0]] = float(row[1]) / 100

#WEIGHTED RANDOM CHOICE (mortiestRick)


# returns a weighted random element from a dictionary
def weightedRandFromDict(dictionary):
    keys = list(dictionary.keys())
    weights = list(dictionary.values())

    # return one(k=1) random job accounting for attached weights
    # the [0] is needed because random.choices returns a list
    return random.choices(keys,weights=weights,k=1)[0]

#Flask app/route stuff
app = Flask(__name__)


@app.route("/")
def hi():
    return "moustache"

@app.route("/occupyflaskst")
