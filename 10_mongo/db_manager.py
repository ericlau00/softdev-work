# Amanda Zheng, Eric "Morty" Lau (alez_trebek)
# SoftDev1 pd1
# K10 -- Import/Export Bank
# 2020-03-04

'''
name: 200,000+ Jeopardy! Questions JSON
description: a JSON file containing 216,930 Jeopardy questions, answers, and their category, air-date, and other data.
hyperlink: https://drive.google.com/file/d/0BwT5wj_P7BKXb2hfM3d2RHU1ckE/view?usp=sharing
import mechanism:
Manually remove a lot of the data in the JSON file because there is too much data!
Open the file and use json.load which can read from the file to create a list of dictionaries.
For every dictionary in the list, insert that dictionary into the database.
'''

from pymongo import MongoClient
import json

client = MongoClient("localhost", 27017)
quiz = client.alez_trebek.quiz
quiz.drop()
file = open("alez_trebek.json", "r")
doc = json.load(file)
for line in doc:
    quiz.insert_one(line)


def findTopic(q):
    return quiz.find({"question": q}, {"category": 1, "_id": 0})


def questionWorth(q):
    return quiz.find({"question": q}, {"value": 1, "_id": 0})


def price(p):
    p = "$"+str(p)
    return quiz.find({"value": p}, {"question": 1, "_id": 0})


def category(c):
    return quiz.find({"category": c}, {"question": 1, "_id": 0})


def answer(q):
    return quiz.find({"question": q}, {"answer": 1, "_id": 0})


def doubleJeopardy():
    return quiz.find({"round": "Double Jeopardy!"}, {"question": 1, "_id": 0})


print("\nPrinting category of the question: William Pereira ercted his Transmaerica \"Pyramid\" in this city\n")

for result in findTopic("'William Pereira erected his Transamerica \"Pyramid\" in this city'"):
    if(result["category"] == ""):
        print("No Questions Found")
    else:
        print(result["category"].strip("'"))

print("\nPrinting all questions of a category\n")
for result in category("HISTORY"):
    if (result["question"] == ""):
        print("No Questions Found")
    else:
        print(result["question"].strip("'"))


print("\nPrinting how much a question is worth: It can be a place to leave your puppy when you take a trip, or a carrier for him that fits under an airplane seat\n")

for result in questionWorth("'It can be a place to leave your puppy when you take a trip, or a carrier for him that fits under an airplane seat'"):
    if (result["value"] == ""):
        print("No Questions Found")
    else:
        print(result["value"].strip("'"))

print("\nPrinting questions worth $600\n")

for result in price(600):
    if(result["question"] == ""):
        print("No Questions Found")
    else:
        print(result["question"].strip("'"))

print("\nPrinting answer to a Jeopardy Question: Africa's lowest temperature was 11 degrees below zero in 1935 at Ifrane, just south of Fez in this country\n")
for result in answer("Africa's lowest temperature was 11 degrees below zero in 1935 at Ifrane, just south of Fez in this country"):
    if(result["answer"] == ""):
        print("No Questions Found")
    else:
        print(result["answer"].strip("'"))

print("\nPrinting Double Jeopardy Questions\n")
for result in doubleJeopardy():
    print(result["question"].strip("'"))
