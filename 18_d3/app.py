# Eric Lau, Yaru Luo -- YikEs
# SoftDev2 pd1
# K18 -- Come Up For Air
# 2020-04-21

from flask import Flask, request, render_template

app = Flask(__name__)


@app.route("/")
def root():
    return render_template(
        "index.html"
    )


if __name__ == "__main__":
    app.debug = True
    app.run()
