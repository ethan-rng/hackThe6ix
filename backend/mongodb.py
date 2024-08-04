# lib/mongodb.py

from pymongo import MongoClient, server_api
import os
from dotenv import load_dotenv

# Load environment variables from .env.local
load_dotenv('.env.local')

uri = os.getenv('MONGO_URI')
print(uri)
if not uri:
    raise ValueError('Please add your Mongo URI to .env.local')

DATABASE_NAME = 'hackthe6ix'

class MongoDBClient:
    _client = None

    @classmethod
    def get_client(cls):
        if cls._client is None:
            # Fetch the URI again to ensure it is used in the client creation
            uri = os.getenv('MONGO_URI')
            if not uri:
                raise ValueError('Please set the MONGO_URI environment variable')

            # Create the MongoDB client with ServerApi instance
            cls._client = MongoClient(
                uri,
                server_api=server_api.ServerApi(version='1', strict=True, deprecation_errors=True)
            )
        return cls._client

def get_db():
    client = MongoDBClient.get_client()
    return client[DATABASE_NAME]