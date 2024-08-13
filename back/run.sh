#!/bin/bash
python manage.py makemigrations
python manage.py migrate
python manage.py flush --no-input
python manage.py seed_data

daphne -e ssl:2000:privateKey=ssl/key.pem:certKey=ssl/crt.pem core.asgi:application