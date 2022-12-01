from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from oauth2client.tools import argparser

API_KEY = "AIzaSyAZABN0yDzeEEWDh46_YP6MwGblcUwF_Ik"

def VideoRecommendation(query):
    with build('youtube', 'v3', developerKey=API_KEY) as youtube:
        search_result = youtube.search().list(q=query, order = "relevance", part = "snippet", maxResults=10).execute()
    recommends = []
    while len(recommends) < 2:
        for item in search_result['items']:
            if item['id']['kind'] == 'youtube#video':
                recommends.append({'title':item['snippet']['title'], 'url':f'https://www.youtube.com/watch?v={item["id"]["videoId"]}'})
    return recommends

def ConceptRecommendation(query):
    with build('customsearch', 'v1', developerKey=API_KEY) as custom_engine:
        search_result = custom_engine.cse().list(q=query, cx = "058d40f7775d94c0a", num=3).execute()
    recommends = []
    for item in search_result['items']:
        recommends.append({'title':item['title'], 'link':item['link']})
    return recommends

def GetRecommendation(query):
    result = {}
    result['video'] = VideoRecommendation(query)
    result['concept'] = ConceptRecommendation(query)
    return result
