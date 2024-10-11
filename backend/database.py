import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

load_dotenv()

MONGO_URI = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("MONGODB_DBNAME")

client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]

prompts_collection = db["prompts"]
