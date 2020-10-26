# Simple Online Exam Taking Application developed in
      Django Rest Framework
      MySQL
      React
      Git
      
# Requirements:
    Python version >= 3.8
    Python Virtualenv
    Django version >= 3.1 (Django will installed using virtualenv)
    MySQL
    Nodejs version >= 8.0
    
# Installation
    Clone the repository
    Run command python -m virtualenv env
    On Windows run .\env\Scripts\activate. On Unix based OS run source env/bin/activate
    Run pip install -r requirements.txt to install the packages
    Make a online-exam file & copy the contents of online-exam/.env.example to online-exam/.env. Modify online-exam/.env as necessary
    Now you need to migrate the database by "python manage.py migrate".
    Create a superuser by "python manage.py createsuperuser".
    For build react app go to "frontend" directory, then run "npm run-script build".
    Run python manage.py runserver to run the server.
