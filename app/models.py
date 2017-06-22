import datetime
from manage import db

class NewsItem(db.Document):
    news_date = db.DateTimeField(default=datetime.datetime.now, required=True)
    news_title = db.StringField(required=True)
    news_source = db.StringField(required=True)
    news_content = db.StringField(required=True)
    news_key = db.StringField(required=True)
    news_type = db.StringField(required=True)
    news_image = db.StringField(required=True)
    news_digest = db.StringField(required=True)

    meta = {
        'collection': 'news_data',
        'ordering': ['-create_at'],
        'strict': False,
    }

class User(db.Document):
    user_nickname = db.StringField(max_length=20, required=True)
    user_email = db.StringField(max_length=20, required=True)
    user_phone = db.StringField(max_length=20, required=True)
    user_password = db.StringField(max_length=20, required=True)
    user_hobby = db.ListField(db.StringField(max_length=10, required=True))


