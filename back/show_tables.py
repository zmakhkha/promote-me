import sqlite3
import sys

def show_tables(db_name):
    try:
        # Connect to SQLite database
        conn = sqlite3.connect(db_name)
        cursor = conn.cursor()
        
        # Query to get the table names
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()
        
        print("Tables in the database:")
        for table in tables:
            print(table[0])
    
    except sqlite3.Error as e:
        print(f"Error: {e}")
    
    finally:
        if conn:
            conn.close()

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python show_tables.py <database_name>")
    else:
        db_name = sys.argv[1]
        show_tables(db_name)
