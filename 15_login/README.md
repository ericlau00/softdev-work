# K #15: Do I Know You?

Due **F 2019-10-04**, 08:00, EST.

Your (duo) job:

**Write a flask app** that uses session capabilities to allow a user to login and logout.


Specifications/Guidelines:

- Hardcode a single username/password combination.
- HTML form send​s​ data to Flask app.
- form target should check the credentials, and render either a welcome page or an error page.
- If login fails, then a message should explain what went wrong (bad password? bad username? bad juju?).
- Root route either
    - a) loads a login page, if there is no user logged in, or
    - b) loads a welcome page, if the user is logged in.
- Welcome page (for successful login) should have a logout button that goes to a separate route that will log the user out of the session.
- When a user logs in, a session should be established with the username stored.
- Name your main driver **app.py**
- File this under **15_login** in your workshop. (Both Devos.)

Protips:

- ***Simplicity is divine.***
- Diagnostic print statements are your friend.
    - Use them liberally.
    - When not in use, comment out rather than delete.
- Pay close attention to Flask console during development.
- Use your browser's developer console to gain a sense of cookie behavior (in general, start familiarizing yourself with this dev console…)
- Note anything notable. (in your notebook and in-line comments in your code)
- Use QAF liberally.