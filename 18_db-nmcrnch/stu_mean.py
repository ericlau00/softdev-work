#Team preQL - Joseph Lee, Eric "Morty" Lau, and Yevgeniy Gorbachev 
#SoftDev1 pd1
#K18 -- Average
#2019-10-10

import sqlite3

DB_FILE='discobandit.db'

db = sqlite3.connect(DB_FILE)
c = db.cursor()

names = {}
grades = {}
averages = {}

data = c.execute(
    """
    SELECT students.id, students.name
    FROM students;
    """
)

for id, name in data:
    names[id] = name
    grades[id] = []

data = c.execute(
    """
    SELECT students.id, mark
    FROM courses, students
    WHERE courses.id = students.id;
    """
)

for id, mark in data:
    grades[id].append(mark)

def average(grades):
    length = len(grades)
    sum = 0
    for grade in grades:
        sum += grade
    return sum / length

for id in grades.keys():
    averages[id] = average(grades[id])

for id in names.keys():
    print(f'name: {names[id]}', f'id: {id}', f'average: {averages[id]}', sep=" // ")
db.close()