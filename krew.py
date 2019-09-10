import random 

KREWES = {
	'orpheus': ['Emily', 'Kevin'],
	'rex': ['William', 'Joseph'],
	'endymion': ['Grace', 'Nahi']
}

random_int = random.randrange(len(KREWES.keys()))
random_team = KREWES[KREWES.keys()[random_int]]
random_member = random_team[random.randrange(len(random_team))] 

print(random_member)