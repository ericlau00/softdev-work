# Eric "Morty" Lau
# SoftDev1 pd1
# K11 -- Ay Mon Go Git It From Yer Flask
# 2020-03-17

from pymongo import MongoClient
import json

client = MongoClient("localhost", 27017)
quiz = client['jeopardy'].collection
schools = client['schools'].collection

def insert_jeopardy():
    '''inserts contents of jeopardy.json into db.schools.collection'''
    quiz.drop()
    file = open("jeopardy.json", "r")
    doc = json.load(file)
    for line in doc:
        quiz.insert_one(line)

def insert_schools():
    '''inserts contents of grad_results.json into db.schools.collection'''
    from bson.json_util import loads as bson_loads

    with open("grad_results.json", 'r') as datafile:
        data = json.loads(datafile.read())
    schools.drop()
    for record in data:
        # data is a dict - must be re-strung, then inserted as bson
        result = schools.insert_one(bson_loads(json.dumps(record)))

insert_jeopardy()
insert_schools()