# installing python interpreter
sudo apt update
sudo apt install -y python3 python3-pip python3-venv 

# activating virtual environment
python3 -m venv venv
source venv/bin/activate

# installing django
pip install django
pip install djangorestframework
pip install djangorestframework-simplejwt

#move to correct folder 
#cd backend

# run migrations
python 1to1/backend/manage.py makemigrations
python 1to1/backend/manage.py migrate
