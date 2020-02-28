# Eric "Morty" Lau and Raymond Lee
# SoftDev pd1
# K09 -- Yummy Mongo Py
# 2020-02-28

from pymongo import MongoClient
from bson.json_util import loads
from pprint import pprint

client = MongoClient('localhost', 27017)
db = client.test_database

restaurants = db.restaurants

restaurants.drop()

def insert_data(file):
	file = open(file, 'r').read().split('\n')
	items = [loads(item) for item in file]
	restaurants.insert_many(items)

insert_data('primer-dataset.json')

# search all restaurants in in a given borough
def search_borough(borough):
    query = restaurants.find({'borough': borough})
    return [restaurant for restaurant in query]

pprint(search_borough("Brooklyn")[:5])

# search all restaurants in a given zipcode
def search_zipcode(zipcode):
    query = restaurants.find({'address.zipcode': zipcode})
    return [restaurant for restaurant in query]

pprint(search_zipcode("11221")[:5])

# search all restaurants in a given zipcode and has a given grade
def search_zipcode_grade(zipcode, grade):
    query = restaurants.find(
        {'address.zipcode': zipcode, 'grades.grade': grade}
    )
    return [restaurant for restaurant in query]

pprint(search_zipcode_grade("11221", "B")[:5])

# search all restaurants in a given zipcode with a score below a given threshold
def search_zipcode_score(zipcode, score):
    query = restaurants.find(
        {
            'address.zipcode': zipcode,
            'grades.score': {'$lt': score},
        }
    )
    return [restaurant for restaurant in query]

pprint(search_zipcode_score("11221", 20)[:5])

# search all restaurants within an x/y offset of the coordinates (73, 40) and a given date
def search_coords_date(offset):
    xlower = -1 * 73 - offset
    xupper = -1 * 73 + offset
    ylower = 40 - offset
    yupper = 40 + offset
    query = restaurants.find(
        {
            'address.coord.0': {'$gte' : xlower, '$lte' : xupper},
            'address.coord.1': {'$gte' : ylower, '$lte' : yupper}
        }
    )
    return [restaurant for restaurant in query]

pprint(search_coords_date(1)[:5])