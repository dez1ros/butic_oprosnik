from flask import Flask, render_template, request, redirect, session, flash, url_for
import sqlite3, os
from flask_login import LoginManager
from waitress import serve
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = 'C:\\Users\\user\\PycharmProjects\\butic\\test\\static\\img'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
conn = sqlite3.connect('database.db', check_same_thread=False)  # Создание файла базы данных, если его нет
cur = conn.cursor()
conn.commit()

cur.execute("""CREATE TABLE IF NOT EXISTS users(        
   login TEXT,
   password TEXT);
""")  # создание бд с логином и паролем админа

cur.execute("""CREATE TABLE IF NOT EXISTS photos(
   user TEXT,
   photo BLOB);
""")  # бд с фотками

if cur.execute("SELECT * FROM users").fetchone() is None:  # Добавляем логин и пароль администратора если его нет
    cur.execute("""INSERT INTO users(login, password) 
       VALUES('1', '1');""")
conn.commit()

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['SECRET_KEY'] = '8614b78a4b9c76bac8fdab1e5792ffb47ce9d66e'  # шифр сессии
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):  # проверка подходит ли нам выгруженный пользователем файл
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/')
def main():  # ну тут просто главная менюшка
    return render_template('main_first.html')


@app.route('/gallery')  # это галерея детских работ
def gallery():
    return '1233333'


@app.route('/checklist')  # опросник
def checklist():
    return '123'


@app.route('/admin', methods=['POST', 'GET'])  # вход в аккаут администратора
def adm_reg():
    if 'login' in session and session['login'] == 1:
        return redirect('/adm_panel')
    session.permanent = False
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


@app.route('/adm_panel', methods=['POST', 'GET'])  # админ панель
def adm_panel():
    global LAST_FILE
    if 'login' not in session:
        return redirect('/admin')
    if request.method == "POST":
        file = request.files['photo']
        # print(os.path.exists(UPLOAD_FOLDER + "\\" + file.filename))           проверка есть ли файл
        photos = cur.execute("SELECT photo FROM photos").fetchall()
        if file and allowed_file(file.filename):
            if photos:
                photos = photos[-1][0]
                print(photos, int(photos.split('.')[0]))
                cur.execute(f"""INSERT INTO photos(user, photo)
                           VALUES('{request.form['user']}', '{int(photos.split('.')[0]) + 1}.jpg');""")
                filename = secure_filename(f"{int(photos.split('.')[0]) + 1}.jpg")
            else:
                cur.execute(f"""INSERT INTO photos(user, photo)
                                           VALUES('{request.form['user']}', '{1}.jpg');""")
                filename = secure_filename(f"{1}.jpg")

            conn.commit()
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    names = cur.execute("SELECT user FROM photos").fetchall()
    photos = cur.execute("SELECT photo FROM photos").fetchall()
    print(names, photos)
    return render_template('adm_panel.html', names=names, photos=photos, len=len(names))


@app.route('/exit')
def ex():
    session.clear()
    return redirect('/')


@app.errorhandler(404)
def pageNotFound(error):  # это я так для теста добавил
    return '<h1>Такой нет страницы</h1>', 404


if __name__ == '__main__':  # ну и запуск сервера конечно же
    # serve(app, host="127.0.0.1", port=777)
    app.run(debug=True)
