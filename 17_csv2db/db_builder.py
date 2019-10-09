#Team Maz Hatters - Joseph Lee and Eric Lau
#SoftDev1 pd1
#K17 -- No Trouble
#2019-10-10

import sqlite3   #enable control of an sqlite database
import csv       #facilitate CSV I/O

DB_FILE="discobandit.db"

db = sqlite3.connect(DB_FILE) #open if file exists, otherwise create
c = db.cursor()               #facilitate db ops

#==========================================================

def to_table(data):
    table = data[:-4]
    with open(data,'r',newline='') as file:
        reader = csv.DictReader(file)
        headers = reader.fieldnames
        c.execute('CREATE TABLE '+table+' ('+headers[0]+' text, '+headers[1]+' numeric, '+headers[2]+' numeric);')
        for row in reader:
            c.execute('INSERT INTO '+table+' VALUES (\''+row.get(headers[0])+'\', '+row.get(headers[1])+', '+row.get(headers[2])+');')

to_table('courses.csv')
to_table('students.csv')

#==========================================================

db.commit() #save changes
db.close()  #close database