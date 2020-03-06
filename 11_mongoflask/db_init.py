# Eric "Morty" Lau
# SoftDev1 pd1
# K11 -- Ay Mon Go Git It From Yer Flask
# 2020-03-17

from pymongo import MongoClient
import json

client = MongoClient("localhost", 27017)
quiz = client['sitedata'].jeopardy
schools = client['sitedata'].grad_results

def insert_jeopardy():
    '''inserts contents of jeopardy.json into db.sitedata.jeopardy'''
    quiz.drop()
    file = open("jeopardy.json", "r")
    doc = json.load(file)
    for line in doc:
        quiz.insert_one(line)

def insert_grad_results():
    '''inserts contents of grad_results.json into db.sitedata.grad_results'''
    schools.drop()
    with open("grad_results.json", 'r') as datafile:
        data = json.loads(datafile.read())
    for record in data:
        schools.insert_one(record)

insert_jeopardy()
insert_grad_results()