#Team preQL - Joseph Lee, Eric "Morty" Lau, and Yevgeniy Gorbachev 
#SoftDev1 pd1
#K18 -- Average
#2019-10-10

import sqlite3

DB_FILE='discobandit.db'

db = sqlite3.connect(DB_FILE)
c = db.cursor()

c.execute('''SELECT students.id, mark 
             FROM courses, students 
             WHERE students.id = courses.id;''')
grades_raw = c.fetchall()
print(grades_raw)

db.close()