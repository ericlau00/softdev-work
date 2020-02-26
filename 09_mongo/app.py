from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.test_database

collection = db.test_collection

file = open('primer-dataset.json', 'r').read().split('\n')

