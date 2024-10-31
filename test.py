from pymongo import MongoClient

db_uri = "mongodb://localhost:27017/Medrez"
client = MongoClient(db_uri)

db = client['Medrez']
print('MongoDB connected...')

users_collection = db['users']

def find_user(email, password):
    try:
        user = users_collection.find_one({"email": email, "password": password})
        if not user:
            print("User not found")
            return None

        print("User found:", user)
        return user
    except Exception as error:
        print("Error during user retrieval:", error)


email = 'admin@gmail.com'
password = '$2a$10$7bjOOneqrdUROl3qIA4t8eKFzYzQC8.LXj6ZGALe6q83H/rNUxKdG'
find_user(email, password)
