# K #17: No Trouble

Due **R 2019-10-10**, 08:00, EST.

*Behold! A care package awaits you in the notes-n-code repo. (You will need it for this…)*

Your (duo) MISSION: Read data from CSV files, and create a database whose table structure mimics that of the CSV files.

(In the care package you will find a CSV file of students and their IDs, and another linking said IDs to the students' current grades in some courses. If you desire more lulz, you may use your own more expansive CSVs.)


TASK the Foist: Familiarize yourself with Python's [CSV module](https://www.google.com/url?q=https://docs.python.org/3/library/csv.html&sa=D&ust=1573597798949000), specifically its DictReader() method, as it will greatly expedite your work going forward. (If you are already familiar, do your crew a solid and share protips/insights on the QAF.)

TASK the Second: Read through the db_builder skeleton, and talk it over with your ducky and co-driver BEFORE you begin making it your own…


TASK the Toid: Flesh out skeletal db_builder.py, which will

- create a new SQLite database
- utilize csv.DictReader() to read each provided CSV file
- create a table for each
- populate each table

<u>Guidelines+Protips</u>:

- ***Simplicity is divine.***
- Note anything notable. (in your notebook and in-line comments in your code).
- Use QAF liberally.
- Use the sqlite shell to test out SQL commands before baking them into your Python script
- It may be helpful during development to delete your db file between runs.
- File this under **17_csv2db** in your workshop. (Both Devos.)