import mysql.connector

print("🔍 Starting MySQL connection test...")

try:
    db = mysql.connector.connect(
        host="localhost",
        port=3306,   # or 3307 if XAMPP uses that
        user="root",
        password="", # or your phpMyAdmin password
        database="pharma"
    )
    if db.is_connected():
        print("✅ Connected successfully to MySQL!")
    else:
        print("❌ Connection failed, but no error was raised.")
except mysql.connector.Error as err:
    print("❌ Error:", err)