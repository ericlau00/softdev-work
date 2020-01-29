#Team preQL - Joseph Lee, Eric "Morty" Lau, and Yevgeniy Gorbachev 
#SoftDev1 pd1
#K18 -- Average
#2019-10-10

import sqlite3   #enable control of an sqlite database
import csv       #facilitate CSV I/O

DB_FILE="discobandit.db"

db = sqlite3.connect(DB_FILE) #open if file exists, otherwise create
c = db.cursor()               #facilitate db ops

#==========================================================

def to_table(data):
    table = data[6:-4]
    with open(data,'r') as file:
        reader = csv.DictReader(file)
        headers = reader.fieldnames
        c.execute(f'CREATE TABLE IF NOT EXISTS {table} ({headers[0]} TEXT, {headers[1]} INTEGER, {headers[2]} INTEGER PRIMARY_KEY);')
        for row in reader:
            c.execute(f'INSERT INTO {table} VALUES (\'{row.get(headers[0])}\', {row.get(headers[1])}, {row.get(headers[2])});')

to_table("./csv/courses.csv")
to_table("./csv/students.csv")

#==========================================================

db.commit() #save changes
db.close()  #close database