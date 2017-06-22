from flask import render_template, request, jsonify
from . import main
from ..models import NewsItem
from ..models import User
from .item import Item

type_dict = {'news': '新闻', 'sports': '体育', 'ent': '娱乐', 'economy': "财经", 'war': '军事', 'car': '汽车', 'tech': '科技',
             'mobile': '手机', 'digit': '数码', 'lady': '女性', 'edu': '教育', 'health': '健康', 'tour': '旅游', 'child': '亲子',
             'home': '家居', 'house': '房产'}


@main.route('/')
def index():
    return render_template('index.html')


@main.app_errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


@main.errorhandler(500)
def internal_server_error(e):
    return render_template('500.html'), 500


@main.route('/get_new', methods=['GET'])
def get_new():
    data = []

    # print(email);


    for entry in NewsItem.objects.order_by("-news_date")[0:10]:
        item = Item(entry.news_date, entry.news_title, entry.news_source, entry.news_content, entry.news_key,
                    entry.news_type, entry.news_image, entry.news_digest)
        news_item = convert_to_dict(item)
        data.append(news_item)

    return jsonify(state=True, data=data)


@main.route('/recommend', methods=['GET'])
def recommend():
    email = request.args['email']
    hobby = User.objects(user_email=email)[0].user_hobby

    if hobby == []:
        return jsonify(state=True, data=[])

    data = []

    count = 0;
    index = 0;

    while True:
        for type in hobby:
            for entry in NewsItem.objects(news_type=type_dict[type]).order_by("-news_date")[index:index + 1]:
                item = Item(entry.news_date, entry.news_title, entry.news_source, entry.news_content, entry.news_key,
                            entry.news_type, entry.news_image, entry.news_digest)
                news_item = convert_to_dict(item)
                data.append(news_item)
                count += 1
            if count >= 10:
                break
        if count >= 10:
            break
        index += 1

    return jsonify(state=True, data=data)


@main.route('/update', methods=['POST'])
def update():
    email = request.form['email']
    hobby=[]

    if request.form['hobby'] != '[]':
        hobby = request.form['hobby'][2:-2].split('\",\"')

    User.objects(user_email=email).update_one(user_hobby=hobby)

    user = User.objects(user_email=email)

    item = user[0]

    userInfo = {}

    userInfo['nickname'] = item.user_nickname
    userInfo['email'] = item.user_email
    userInfo['hobby'] = item.user_hobby


    return jsonify(state=True, userInfo=userInfo)


@main.route('/verify', methods=['GET'])
def verify():
    email = request.args['email']
    password = request.args['password']

    user = User.objects(user_email=email)

    if user.count() == 0:
        return jsonify(state=False, errormsg="不存在该用户名")

    item = user[0]

    userInfo = {}

    if item.user_password == password:
        userInfo['nickname'] = item.user_nickname
        userInfo['email'] = item.user_email
        userInfo['hobby'] = item.user_hobby
        return jsonify(state=True, userInfo=userInfo)
    else:
        return jsonify(state=False, errormsg="密码错误")


@main.route('/register', methods=['POST'])
def register():
    user = User()
    user.user_nickname = request.form['nickname']
    user.user_phone = request.form['phone']
    user.user_password = request.form['password']
    user.user_email = request.form['email']
    user.user_hobby = []
    user.save()
    return jsonify(state='true')


@main.route('/get_list', methods=['GET'])
def getNews():
    type = request.args['type']
    page = int(request.args['page'])

    news_type = type_dict[type]

    data = []

    page_beign = 20 * (page - 1)

    page_end = 20 * page

    for entry in NewsItem.objects(news_type=news_type)[page_beign:page_end]:
        item = Item(entry.news_date, entry.news_title, entry.news_source, entry.news_content, entry.news_key,
                    entry.news_type, entry.news_image, entry.news_digest)
        news_item = convert_to_dict(item)
        data.append(news_item)

    return jsonify(status='success', data=data)


def convert_to_dict(obj):
    dict = {}
    dict.update(obj.__dict__)
    return dict
