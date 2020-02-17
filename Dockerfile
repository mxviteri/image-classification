FROM python:3.6-slim-stretch

RUN apt update
RUN apt install -y python3-dev gcc
RUN apt install unzip

ADD requirements.txt requirements.txt
RUN pip install -r requirements.txt

WORKDIR /app
COPY . /app
RUN unzip export.pkl.zip

ENTRYPOINT ["python"]

CMD ["app.py"]