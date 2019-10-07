#Eric "Morty" Lau
#SoftDev1 pd1
#K17 -- No Trouble
#2019-10-07

import sqlite3   #enable control of an sqlite database
import csv       #facilitate CSV I/O

DB_FILE="discobandit.db"
db = sqlite3.connect(DB_FILE) #open if file exists, otherwise create
c = db.cursor()             #facilitate db ops

command = "CREATE TABLE courses(code TEXT, mark INTEGER, id INTEGER);"
c.execute(command)

with open('courses.csv') as courses:
    reader = csv.DictReader(courses)
    for row in reader:

        code = "\"" + row['code'] + "\""
        mark = row['mark']
        id = row['id']

        command = "INSERT INTO courses VALUES(" + code + "," + mark + "," + id + ");"
        c.execute(command)

command = "CREATE TABLE students(name TEXT, age INTEGER, id INTEGER);"
c.execute(command)

with open('students.csv') as students:
    reader = csv.DictReader(students)
    for row in reader:

        name = "\"" + row['name'] + "\""
        age = row['age']
        id = row['id']

        command = "INSERT INTO students VALUES(" + name + "," + age + "," + id + ");"
        c.execute(command)

db.commit()
db.close()

