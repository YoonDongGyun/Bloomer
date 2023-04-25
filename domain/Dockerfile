FROM python:3.7.9
WORKDIR /usr/src/app

## Install packages
COPY requirements.txt ./
RUN pip install -r requirements.txt
RUN pip install gluonnlp pandas tqdm
RUN pip install pymysql
RUN pip install Django==3.2.18
RUN pip install scikit-learn
RUN pip install openpyxl
# copy all file 
COPY . .

## Copy KoBERTall src files
COPY ./KoBERT/kobert/ /usr/local/lib/python3.7/site-packages/kobert
COPY ./emotions/music_vector.csv /usr/src/app/emotions
COPY ./emotions/tag_list.xlsx /usr/src/app/emotions
COPY ./emotions/tag_music.xlsx /usr/src/app/emotions
## Run the application on the port 8000
EXPOSE 8000

# gunicorn 배포 명령어
# CMD ["gunicorn", "--bind", "허용하는 IP:열어줄 포트", "project.wsgi:application"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]