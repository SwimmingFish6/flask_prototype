import datetime
import manage
from manage import app
from manage import db
from passlib.apps import custom_app_context as pwd_context
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer, SignatureExpired, BadSignature


class User(db.Document):
    user_username = db.StringField(max_length=20, required=True)
    user_realname = db.StringField(max_length=20, required=True)
    user_birthday = db.DateTimeField(default=datetime.datetime.now, required=True)
    user_email = db.StringField(max_length=20, required=True)
    user_phone = db.StringField(max_length=20, required=True)
    user_password_hash = db.StringField(max_length=200, required=True)
    user_city = db.StringField(max_length=40, required=True)
    user_address = db.StringField(max_length=50, required=True)
    user_sex = db.StringField(max_length=6, required=True)

    def hash_password(self, password):
        self.user_password_hash = pwd_context.encrypt(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.user_password_hash)

    def generate_auth_token(self, expiration=600):
        s = Serializer(app.config['SECRET_KEY'], expires_in=expiration)
        return s.dumps({"id": str(self.id)})

    @staticmethod
    def verify_auth_token(token):
        s = Serializer(app.config['SECRET_KEY'])
        try:
            data = s.loads(token)
        except SignatureExpired:
            return None  # valid token, but expired
        except BadSignature:
            return None  # invalid token
        user = User.query.get(data['id'])
        return user