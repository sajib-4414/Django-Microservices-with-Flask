# Dockerfile
FROM python:3.9
ENV PYTHONUNBUFFERED 1
WORKDIR /srv
RUN pip install --upgrade pip
RUN pip install flask
COPY requirements.txt /srv/requirements.txt
#RUN apk update \
#    && apk add --virtual build-deps gcc python3-dev musl-dev \
#    && apk add --no-cache mariadb-dev
RUN pip install -r requirements.txt
COPY . /srv
ENV FLASK_APP=app


