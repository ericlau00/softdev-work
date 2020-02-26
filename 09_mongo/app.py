from pymongo import MongoClient
import json

client = MongoClient('localhost', 27017)
db = client.test_database

collection = db.test_collection

file = open('primer-dataset.json', 'r').read().split('\n')

items = list()

for item in file:
	items.append(json.loads(item.replace('$', '')))

result = collection.insert_many(items)

# print(file[0], file[1])
print(result.inserted_ids)

print(collection.count_documents({}))
