import sqlite3
import sys

def fetch_records(db_name, table_name):
    try:
        # Connect to SQLite database
        conn = sqlite3.connect(db_name)
        cursor = conn.cursor()
        
        # Query to fetch all records from the specified table
        cursor.execute(f"SELECT * FROM {table_name};")
        records = cursor.fetchall()
        
        print(f"Records from table '{table_name}':")
        for record in records:
            print(record)
    
    except sqlite3.Error as e:
        print(f"Error: {e}")
    
    finally:
        if conn:
            conn.close()

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python fetch_records.py <database_name> <table_name>")
    else:
        db_name = sys.argv[1]
        table_name = sys.argv[2]
        fetch_records(db_name, table_name)
