# Eric "Morty" Lau
# SoftDev1 pd1
# K8 -- Lemme Flask You Sump’n
# 2019-09-19

from flask import Flask
app = Flask(__name__)

@app.route("/") #at http://127.0.0.1:5000/
def hello_world():
    print(__name__) #in terminal
    return """
    tengo problemas
    No hablo queso! <br>
    <a href=\"/partytime\">I want to party</a> <br> 
    <a href=\"/sleeptime\">I want to sleep</a>"""

@app.route("/partytime") #at http://127.0.0.1:5000/partytime
def party_time():
    print(__name__)
    return "it is a party time yes <a href=\"../\">go home</a>"

@app.route("/sleeptime") #at http://127.0.0.1:5000/sleeptime
def sleep_time():
    print(__name__)
    return "it is a time for a sleep yea yea <a href=\"../\">go home</a>"

if __name__  == "__main__":
    app.debug = True # shows changes after reload 
    # app.debug = False this doesnt show changes after reload
    app.run() # necessary!