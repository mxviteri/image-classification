FROM python:3.6-slim-stretch

RUN apt update
RUN apt install -y python3-dev gcc

ADD requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY app.py app.py

# RUN python app/server.py
# RUN flask run

EXPOSE 8080

ENTRYPOINT ["flask"]

CMD ["run"]