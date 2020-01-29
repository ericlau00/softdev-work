#Team preQL - Joseph Lee, Eric "Morty" Lau, and Yevgeniy Gorbachev 
#SoftDev1 pd1
#K18 -- Average
#2019-10-10

import sqlite3

DB_FILE='discobandit.db'

db = sqlite3.connect(DB_FILE)
c = db.cursor()

def add_course(course,mark,id):
    c.execute(f'INSERT INTO courses VALUES (\'{course}\',{mark},{id});')

def average():
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
        dictionary[id][1] += 1 #number of classes is incremented
        dictionary[id][2] += mark #sum of grades is incremented

    c.execute('DROP TABLE IF EXISTS stu_avg;')
    c.execute('CREATE TABLE IF NOT EXISTS stu_avg (id INTEGER PRIMARY_KEY, gpa REAL);')

    for id in sorted(dictionary.keys()):
        name = dictionary[id][0]
        gpa = dictionary[id][2] / dictionary[id][1]

        c.execute(f'INSERT INTO stu_avg (id, gpa) VALUES ({id}, {gpa});')
        print(f'id: {id}', f'name: {name}', f'average: {gpa}', sep=" // ")

print("BEFORE ADDING COURSE")
average()

add_course('Rollerblading',90,4)

print("\nAFTER ADDING COURSE")
average()

db.commit()
db.close()