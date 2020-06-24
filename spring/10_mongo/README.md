# K10: Import/Export Bank

Due **W 2020-03-04**, 08:00 EST

Estimated time required: <=90 min

- With your new buddy, assess last work. Refactor/robustify/tune as necessary.
- Find a dataset of interest ([start here](https://github.com/jdorfman/awesome-json-datasets)) and save its .json file in your work repo.
- Write a new python script to…
  - Create a new mongo database on a server to which you have access. Use your team name as its name.
  - Import your JSON dataset into your new database.
  - Reproduce query functionality from last work, adapted to fit your data.
- Include a block comment at the top of your script explaining your dataset. Include
  - name of dataset and description of its contents
  - hyperlink to where raw data is hosted
  - brief summary of your import mechanism

**PROTIPs:**

- Test each query in a mongo shell before baking into your python code.
- *Teamwork makes the dreamwork. So does a good docstring, and modular design.*

Save to workshop under `10_mongo`.
