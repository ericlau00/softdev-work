#Team Full-RESTore | Kevin Li & Eric Lau
#SoftDev1 pd1
#K25 -- Getting more REST
#2019-11-14

from flask import Flask, render_template
import urllib.request
import json

app = Flask(__name__)

def get_data(link):
    url = urllib.request.urlopen(link)
    response = url.read()
    data = json.loads(response)
    return data 

@app.route("/")
def home():
    return render_template(
        "index.html",
        title = "3 REST APIs Demo")

@app.route("/countries")
def countries():
    data = get_data("https://restcountries.eu/rest/v2/name/united%20states%20of%20america")

    return render_template(
        "countries.html", 
        title = "Countries API Demo",
        flag=data[0]['flag'], 
        name=data[0]['name'],
        demonym=data[0]['demonym'])

@app.route("/rick")
def rick():
    data = get_data("https://rickandmortyapi.com/api/character/1")

    return render_template(
        "rick.html", 
        title = "Rick and Morty API Demo",
        avatar=data['image'], 
        name=data['name'],
        species=data['species'],
        gender=data['gender'])

@app.route("/met")
def met():
    data = get_data("https://collectionapi.metmuseum.org/public/collection/v1/objects/208218")

    return render_template(
        "met.html", 
        title = "Met Museum API Demo",
        image=data['primaryImage'], 
        name=data['objectName'],
        department=data['department'])

if __name__ == "__main__":
    app.debug = True
    app.run()
