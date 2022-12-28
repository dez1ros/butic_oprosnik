from flask import Flask, render_template, request, redirect, session
import sqlite3
from flask_login import LoginManager
from UserLogin import UserLogin
from waitress import serve

conn = sqlite3.connect('database.db', check_same_thread=False)  # Создание файла базы данных, если его нет
sql = conn.cursor()
conn.commit()

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['SECRET_KEY'] = '8614b78a4b9c76bac8fdab1e5792ffb47ce9d66e'  # шифр сессии

login_manager = LoginManager(app)


@login_manager.user_loader
def load_user():
    print('load+user')


@app.route('/')
def hello():
    return render_template('main_first.html')


@app.route('/gallery')
def gallery():
    return '1233333'


@app.route('/checklist')
def checklist():
    return '123'


@app.route('/admin')
def adm_reg():
    pass
    # session.permanent = False   # сохраняется ли при закрытии браузера
    # if 'visits' in session:
    #     session['visits'] = session.get('visits') + 1
    # else:
    #     session['visits'] = 1
    # return str(session['visits'])


@app.errorhandler(404)
def pageNotFound(error):
    return '<h1>Такой нет страницы</h1>', 404


if __name__ == '__main__':
    # serve(app, host="127.0.0.1", port=777)
    app.run(debug=True)
