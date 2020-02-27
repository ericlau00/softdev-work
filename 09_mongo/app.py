from pymongo import MongoClient
from bson.json_util import loads

client = MongoClient('localhost', 27017)
db = client.test_database

restaurants = db.restaurants

file = open('primer-dataset.json', 'r').read().split('\n')

items = list()

for item in file[:2]:
	items.append(loads(item))

result = restaurants.insert_many(items)

def search_borough(borough):
	query = restaurants.find({'borough': borough})
	for restaurant in query:
		print(restaurant['name'], restaurant['borough'])
	return query 

search_borough('Brooklyn')

def search_zipcode(zipcode):
	query = restaurants.find({'address.zipcode': zipcode})
	for restaurant in query:
		print(restaurant['name'], restaurant['address']['zipcode'])
	return query 

search_zipcode('11221')
