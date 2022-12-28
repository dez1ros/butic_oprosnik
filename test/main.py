from flask import Flask, render_template, request, redirect, session, flash
import sqlite3, os
from flask_login import LoginManager
from waitress import serve

conn = sqlite3.connect('database.db', check_same_thread=False)  # Создание файла базы данных, если его нет
cur = conn.cursor()
conn.commit()

cur.execute("""CREATE TABLE IF NOT EXISTS users(
   login TEXT,
   password TEXT);
""")
cur.execute("""CREATE TABLE IF NOT EXISTS photos(
   user TEXT,
   photo BLOB);
""")

cur.execute("""INSERT INTO users(login, password) 
   VALUES('1', '1');""")
conn.commit()

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['SECRET_KEY'] = '8614b78a4b9c76bac8fdab1e5792ffb47ce9d66e'  # шифр сессии

login_manager = LoginManager(app)


def convert_to_binary_data(filename):
    with open(filename, 'rb') as file:
        blob_data = file.read()
    return blob_data


@app.route('/')
def main():
    return render_template('main_first.html')


@app.route('/gallery')
def gallery():
    return '1233333'


@app.route('/checklist')
def checklist():
    return '123'


@app.route('/admin', methods=['POST', 'GET'])
def adm_reg():
    if request.method == 'GET':
        return render_template('adm_reg.html')
    else:
        p = cur.execute(f"SELECT password FROM users WHERE login='{request.form['login']}'").fetchone()
        if p and p[0] == request.form['psw']:
            session['login'] = 1
            return redirect('/adm_panel')
        else:
            flash('Не верный логин или пароль')
            return render_template('adm_reg.html')


@app.route('/adm_panel', methods=['POST', 'GET'])
def adm_panel():
    if request.method == 'GET':
        return render_template('adm_panel.html')
    else:
        cur.execute(
            f"""INSERT INTO photos(user, photo) VALUES({request.form['user']}, {convert_to_binary_data(request.form['photo'])};""")


@app.errorhandler(404)
def pageNotFound(error):
    return '<h1>Такой нет страницы</h1>', 404


if __name__ == '__main__':
    # serve(app, host="127.0.0.1", port=777)
    app.run(debug=True)
