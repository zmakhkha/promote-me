import sqlite3
import sys

def read_data_from_file(file_path):
    data = []
    try:
        with open(file_path, 'r') as file:
            for line in file:
                # Strip leading/trailing whitespace and split by comma
                values = line.strip().split(',')
                if len(values) == 15:
                    data.append(tuple(values))
                else:
                    print(f"Skipping malformed line: {line}")
    except FileNotFoundError:
        print(f"File not found: {file_path}")
    except Exception as e:
        print(f"Error reading file: {e}")
    return data

def insert_data(db_name, table_name, data):
    try:
        # Connect to SQLite database
        conn = sqlite3.connect(db_name)
        cursor = conn.cursor()
        
        # Prepare the SQL insert statement
        placeholders = ", ".join(["?" for _ in range(len(data[0]))])
        sql = f"INSERT INTO {table_name} (password, last_login, username, email, firstName, lastName, country, gender, image, is_active, is_staff, is_superuser, dateOfBirth, score, aboutMe) VALUES ({placeholders})"
        
        # Insert each record into the database
        cursor.executemany(sql, data)
        conn.commit()
        print("Data inserted successfully.")
    
    except sqlite3.Error as e:
        print(f"Error: {e}")
    
    finally:
        if conn:
            conn.close()

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python insert_data.py <database_name> <table_name> <data_file>")
    else:
        db_name = sys.argv[1]
        table_name = sys.argv[2]
        data_file = sys.argv[3]
        
        # Read data from file
        data = read_data_from_file(data_file)
        
        # Insert data into database
        insert_data(db_name, table_name, data)
