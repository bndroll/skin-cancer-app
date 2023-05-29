FROM python:3.9-slim-buster
WORKDIR /app
COPY model-service/requirements.txt ./requirements.txt
RUN pip3 install -r requirements.txt
COPY model-service/. ./
EXPOSE 5000
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]
