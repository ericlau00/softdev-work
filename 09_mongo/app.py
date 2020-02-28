from pymongo import MongoClient
from bson.json_util import loads

client = MongoClient('localhost', 27017)
db = client.test_database

restaurants = db.restaurants

def insert_data(file):
	file = open(file, 'r').read().split('\n')
	items = [loads(item) for item in file]
	restaurants.insert_many(items)

# insert_data('primer-dataset.json')

def search_borough(borough):
	query = restaurants.find({'borough': borough})
	return [restaurant for restaurant in query]

print(search_borough('Brooklyn')[:5])

def search_zipcode(zipcode):
	query = restaurants.find({'address.zipcode': zipcode})
	return [restaurant for restaurant in query]

print(search_zipcode('11221')[:5])

def search_zipcode_grade(zipcode, grade):
	query = restaurants.find({
		'address.zipcode': zipcode,
		'grades': {'$elemMatch': {'grade': grade} }
		 })
	return [restaurant for restaurant in query]

print(search_zipcode_grade('11221', 'B')[:5])

def search_zipcode_score(zipcode, score):
	query = restaurants.find({
		'address.zipcode': zipcode,
		'grades': {'$elemMatch' : {'score' : {'$lt' : score}}}
	})
	return [restaurant for restaurant in query]

print(search_zipcode_score('11221', 20)[:5])