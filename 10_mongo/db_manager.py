# Amanda Zheng, Eric "Morty" Lau
# SoftDev1 pd1
# K10 -- Import/Export Bank
# 2020-03-04

'''
name: 200,000+ Jeopardy! Questions JSON
description: a JSON file containing 216,930 Jeopardy questions, answers, and other data.
hyperlink: https://drive.google.com/file/d/0BwT5wj_P7BKXb2hfM3d2RHU1ckE/view?usp=sharing
import mechanism:
'''

from bson.json_util import loads
from pymongo import MongoClient

client = MongoClient("localhost", 27017)
quiz = client.jeopardy.quiz


def insertData(filename):
    file = open(filename, "r")
    doc = file.readlines()
    for line in doc:
        print(line)
        # quiz.insert_one(loads(line))


def findTopic(q):
    return quiz.find({"question": q}, {"category": 1, "_id": 0})


def questionWorth(q):
    return quiz.find({"question": q}, {"value": 1, "_id": 0})


def price(p):
    p = f"${p}"
    return quiz.find({"value": p}, {"question": 1, "_id": 0})


def category(c):
    return quiz.find({"category": c}, {"question": 1, "_id": 0})


def answer(q):
    return quiz.find({"question": f"'{q}'"}, {"answer": 1, "_id": 0})


def doubleJeopardy():
    return quiz.find({"round": "Double Jeopardy!"}, {"question": 1, "_id": 0})


print("\nInserting data\n")

insertData("teamname.json")

# print("\nPrinting category of a question\n")

# for result in findTopic("'William Pereira erected his Transamerica \"Pyramid\" in this city'"):
#     if(result["category"] == ""):
#         print("No Questions Found")
#     else:
#         print(result["category"])

# print("\nPrinting all questions of a category\n")
# for result in category("HISTORY"):
#     if (result["question"] == ""):
#         print("No Questions Found")
#     else:
#         print(result["question"])


# print("\nPrinting how much a question is worth\n")

# for result in questionWorth("'It can be a place to leave your puppy when you take a trip, or a carrier for him that fits under an airplane seat'"):
#     if (result["value"] == ""):
#         print("No Questions Found")
#     else:
#         print(result["value"])

# print("\nPrinting results for Price\n")

# for result in price(600):
#     if(result["question"] == ""):
#         print("No Questions Found")
#     else:
#         print(result["question"])

# print("\nPrinting answer to a Jeopardy Question\n")
# for result in answer("Africa's lowest temperature was 11 degrees below zero in 1935 at Ifrane, just south of Fez in this country"):
#     if(result["answer"] == ""):
#         print("No Questions Found")
#     else:
#         print(result["answer"])

# print("\nPrinting Double Jeopardy Questions\n")
# for result in doubleJeopardy():
#     print(result["question"])
