from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Connect to MySQL (XAMPP)
db = mysql.connector.connect(
    host="localhost",
    port=3306,
    user="root",        # default XAMPP user
    password="",        # default XAMPP has no password
    database="pharma"
)
cursor = db.cursor(dictionary=True)

# Get all inventory
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