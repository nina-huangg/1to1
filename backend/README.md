# 1to1

- To activate virtual environment: `pipenv shell`
- To install a package: `pipenv install <package>`

# test DB

To create a dummy database for testing or demonstration purposes, run the following commands
after ensuring migrations are made and any existing database is deleted.

```
python manage.py shell
import demo_db
exit()
```

Note that we do not have to run `populate_db()` as python runs functions when they are imported.
