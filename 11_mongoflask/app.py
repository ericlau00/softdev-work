from flask import Flask, render_template, request
import flask
from os import urandom
# from utils.mongo import query


app = Flask(__name__)
app.secret_key = urandom(32)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/results', methods = ['GET', 'POST'])
def results():
    if request.method == 'GET':
        return flask.redirect(flask.url_for('index'))
    elif request.method == 'POST':
        data = [request.form['search-parameter'], request.form['value']]
        # data = query(
            # {request.form['search-parameter']:request.form['value']},
            # { '\# Dropped Out':1, '_id':0 }
        # )
        return render_template('results.html', data=data)

if __name__ == '__main__':
    app.debug = True
    app.run()
