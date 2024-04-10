# 1to1

- To activate virtual environment: `pipenv shell`
- To install a package: `pipenv install <package>`

- clean.ps1 is a Windows powershell equivalent of the given makefile

To create a prepoulated database, first either run `clean.ps1` or `make` to remove any existing database.

Then run:

```
python manage.py makemigrations
python manage.py migrate
python manage.py shell
```

Then in the shell run:

```
import demo_db
exit()
```
