import sqlite3
import sys

def get_column_names(db_name, table_name):
    try:
        # Connect to SQLite database
        conn = sqlite3.connect(db_name)
        cursor = conn.cursor()
        
        # Query to get table structure
        cursor.execute(f"PRAGMA table_info({table_name});")
        columns = cursor.fetchall()
        
        # Extract column names
        column_names = [column[1] for column in columns]  # column[1] is the column name
        
        print(f"Column names in table '{table_name}':")
        for name in column_names:
            print(name)
    
    except sqlite3.Error as e:
        print(f"Error: {e}")
    
    finally:
        if conn:
            conn.close()

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python get_column_names.py <database_name> <table_name>")
    else:
        db_name = sys.argv[1]
        table_name = sys.argv[2]
        get_column_names(db_name, table_name)
