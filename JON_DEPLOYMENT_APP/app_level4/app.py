from flask import Flask, render_template, redirect, request, jsonify
from modelHelper import ModelHelper
from sqlHelper import SQLHelper
import json

# Create an instance of Flask
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

modelHelper = ModelHelper()
sqlHelper = SQLHelper()

# Route to render index.html template using data from Mongo
@app.route("/")
def home():
    # Return template and data
    return render_template("index.html")

@app.route("/about_us")
def about_us():
    # Return template and data
    return render_template("about_us.html")

@app.route("/sql_table")
def sql_table():
    # Return template and data
    return render_template("sql_page.html")

@app.route("/sql_graphs")
def sql_graphs():
    # Return template and data
    return render_template("sql_graphs.html")

@app.route("/tableau")
def tableau():
    # Return template and data
    return render_template("tableau2.html")

@app.route("/makePredictions", methods=["POST"])
def make_predictions():
    content = request.json["data"]
    print(content)

    # parse
    sex_flag = int(content["sex_flag"])
    age = float(content["age"])
    fare = float(content["fare"])
    familySize = int(content["familySize"])
    p_class = int(content["p_class"])
    embarked = content["embarked"]

    preds = modelHelper.makePredictions(sex_flag, age, fare, familySize, p_class, embarked)
    return(jsonify({"ok": True, "prediction": str(preds)}))

@app.route("/getSQL", methods=["POST"])
def get_sql():
    content = request.json["data"]
    print(content)

    # parse
    sex_flag = content["sex_flag"]
    min_age = float(content["min_age"])
    max_age = float(content["max_age"])
    df = sqlHelper.getDataFromDatabase(sex_flag, min_age, max_age)
    return(jsonify(json.loads(df.to_json(orient="records"))))

#############################################################

@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate, public, max-age=0"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    return r

#main
if __name__ == "__main__":
    app.run(debug=True)
