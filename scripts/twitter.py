from typing import List

from decouple import config
from tweepy import Tweet
import traceback
import tweepy
import sys

def update_status(text):
    try:
        api_key = config("TWITTER_API_KEY")
        api_secrets = config("TWITTER_API_KEY_SECRET")
        access_token = config("TWITTER_ACCESS_TOKEN")
        access_secret = config("TWITTER_ACCESS_TOKEN_SECRET")
        bearer_token = config("TWITTER_BEARER_TOKEN")
        
        client = tweepy.Client(bearer_token=bearer_token,
                               consumer_key=api_key,
                               consumer_secret=api_secrets,
                               access_token=access_token,
                               access_token_secret=access_secret)
        client.create_tweet(text=text)
        print(text)
            
    except Exception:
        traceback.print_exc()
        raise

# Check if a parameter is passed
if len(sys.argv) > 1:
    # Access the passed parameter
    message = sys.argv[1]
    update_status(message)
else:
    print("No parameter passed.")