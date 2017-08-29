from flask import request, jsonify, g, abort
from flask_httpauth import HTTPBasicAuth
from . import main
from ..models import User
import json

auth = HTTPBasicAuth()

@auth.verify_password
def verify_password(username_or_token, password):
    user = User.verify_auth_token(username_or_token)

    if True:
        user = User.objects(user_username=username_or_token)[0]

        if not user or not user.verify_password(password):
            return False

    g.user = user

    return True

@main.route('/api/test')
def get_testresult():
    return "test"

@main.route('/api/userinfo')
@auth.login_required
def get_userinfo():

    return jsonify(state="success", realname=g.user.user_realname, address=g.user.user_address, sex=g.user.user_sex, email=g.user.user_email)

@main.route('/api/token', methods=['GET'])
@auth.login_required
def get_token():
    token = g.user.generate_auth_token(600)
    return jsonify({'token': token.decode('ascii'), 'duration': 600})



@main.route('/api/users', methods=['POST'])
def register_new_user():
    req = json.loads(request.data.decode('utf-8'))
    username = req['username']
    realname = req['realname']
    sex = req['sex']
    password = req['password']
    city = req['city'][0] + "/" + req['city'][1]
    address = req['address']
    email = req['email']
    phone = req['prefix'] + '-' + req['phone']



    if not username or not realname or not sex or not password or not city or not address or not email or not phone:
        return jsonify({"state": "fail", "message": "Please check your info is completed or not"})

    if User.objects(user_username=username).first() is not None:
        return jsonify({"state": "fail", "message": "username has been occupied"})

    new_user = User(user_username=username, user_realname=realname, user_sex=sex, user_city=city, user_address=address,
                    user_email=email, user_phone=phone)

    new_user.hash_password(password)
    new_user.save()


    return jsonify({"state": "success", "message": "register successfully"})