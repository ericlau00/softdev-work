# Eric Lau, Yaru Luo -- YikEs
# SoftDev2 pd1
# K18 -- Come Up For Air
# 2020-04-21

from flask import Flask, request, render_template
import os

app = Flask(__name__)
csv_file = os.path.dirname(os.path.abspath(__file__)) + '/static/csv/scrubbed.csv'


@app.route("/")
def root():
    return render_template(
        "index.html"
    )


@app.route("/data")
def data():
    return open(csv_file).read()


if __name__ == "__main__":
    app.debug = True
    app.run()
