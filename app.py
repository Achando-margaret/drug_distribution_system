from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


db = mysql.connector.connect(
    host="localhost",
    port=3306,
    user="root",       
    password="",        
    database="pharma"
)
cursor = db.cursor(dictionary=True)


@app.route("/inventory", methods=["GET"])
def get_inventory():
    cursor.execute("SELECT * FROM drugs")
    result = cursor.fetchall()
    return jsonify(result)

# Add new drug
@app.route("/inventory", methods=["POST"])
def add_drug():
    data = request.json
    sql = "INSERT INTO drugs (name, quantity, expiry_date, batch_number, supplier) VALUES (%s, %s, %s, %s, %s)"
    values = (data["name"], data["quantity"], data["expiry_date"], data.get("batch_number"), data.get("supplier"))
    cursor.execute(sql, values)
    db.commit()
    return jsonify({"message": "Drug added successfully!"})
@app.route("/")
def home():
    return "Flask is Running"

if __name__ == "__main__":
    app.run(debug=True, port=5000)    
from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
import bcrypt

app = Flask(__name__)

# MySQL config
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'pharma_db'
mysql = MySQL(app)

# Register hospital
@app.route('/register_hospital', methods=['POST'])
def register_hospital():
    data = request.json
    cursor = mysql.connection.cursor()
    hashed_pw = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    cursor.execute("""INSERT INTO hospitals 
        (name, location, contact_person, email, phone, password, status) 
        VALUES (%s, %s, %s, %s, %s, %s, %s)""",
        (data['name'], data['location'], data['contact_person'], 
         data['email'], data['phone'], hashed_pw, "Pending"))
    mysql.connection.commit()
    cursor.close()
    return jsonify({"success": True, "message": "Hospital registered successfully!"})

# Hospital login
@app.route('/hospital_login', methods=['POST'])
def hospital_login():
    data = request.json
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM hospitals WHERE email=%s", (data['email'],))
    hospital = cursor.fetchone()
    cursor.close()

    if hospital and bcrypt.checkpw(data['password'].encode('utf-8'), hospital[6].encode('utf-8')):
        return jsonify({"success": True, "hospital": {
            "id": hospital[0],
            "name": hospital[1],
            "status": hospital[7]
        }})
    else:
        return jsonify({"success": False, "message": "Invalid credentials"})

# List all hospitals
@app.route('/hospitals', methods=['GET'])
def get_hospitals():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT id, name, location, contact_person, email, phone, status FROM hospitals")
    hospitals = cursor.fetchall()
    cursor.close()
    return jsonify([{
        "id": h[0], "name": h[1], "location": h[2],
        "contact_person": h[3], "email": h[4],
        "phone": h[5], "status": h[6]
    } for h in hospitals])

# Approve hospital
@app.route('/approve_hospital/<int:id>', methods=['PUT'])
def approve_hospital(id):
    cursor = mysql.connection.cursor()
    cursor.execute("UPDATE hospitals SET status=%s WHERE id=%s", ("Approved", id))
    mysql.connection.commit()
    cursor.close()
    return jsonify({"success": True, "message": "Hospital approved"})