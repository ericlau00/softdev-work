#Team preQL - Joseph Lee, Eric "Morty" Lau, and Yevgeniy Gorbachev 
#SoftDev1 pd1
#K18 -- Average
#2019-10-10

import sqlite3

DB_FILE='discobandit.db'

db = sqlite3.connect(DB_FILE)
c = db.cursor()

data = c.execute('''
    SELECT students.id, students.name
    FROM students; ''')

#the key is the student's id
#the value is a array which houses the name, number of classes, and sum of grades 
dictionary = {id: [name, 0, 0] for id, name in data}

data = c.execute('''
    SELECT students.id, mark
    FROM courses, students
    WHERE courses.id = students.id;''')

for id, mark in data:
    grades[id][0] += 1 #number of classes is incremented
    grades[id][1] += mark #sum of grades is incremented

c.execute('CREATE TABLE IF NOT EXISTS stu_avg (id INTEGER PRIMARY_KEY, gpa REAL);')

for id in dictionary.keys():

    name = dictionary[id][0]
    gpa = dictionary[id][2] / dictionary[id][1]

    c.execute(f'INSERT INTO stu_avg (id, gpa) VALUES ({id}, {gpa});')
    
    print(f'name: {name}', f'id: {id}', f'average: {gpa}', sep=" // ")

db.commit()
db.close()