from pymongo import MongoClient
from bson.json_util import loads

client = MongoClient('localhost', 27017)
db = client.test_database

restaurants = db.restaurants

#file = open('primer-dataset.json', 'r').read().split('\n')

#items = [loads(item) for item in file]

#result = restaurants.insert_many(items)

def search_borough(borough):
	query = restaurants.find({'borough': borough})
	return [restaurant for restaurant in query]
	#result = list()
	#for restaurant in query:
	#	result.append(restaurant)
	#return result

#res = search_borough('Brooklyn')
#print(res)
#print(len(search_borough('Brooklyn')))
#print(search_borough('Brooklyn')[:5])

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
