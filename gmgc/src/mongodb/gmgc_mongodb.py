#!/usr/bin/python
## CPCantalapiedra 2019

import sys
from pymongo import MongoClient

### globals

client = None

### functions

def connectdb(MONGO_HOST, MONGO_PORT):
        '''
        Creates a MongoClient and 
        connects to the gmgc and sprot databases
        '''
        
        global client
        if not client:
                client = MongoClient(MONGO_HOST, MONGO_PORT)

        return

def gmgcdb_clusters_find_one(query):
        '''
        '''
        
        global client
        gmgc_clusters = client.gmgc_clusters
        return gmgc_clusters.members.find_one(query)

def gmgcdb_unigenes_find_one(query):
        '''
        '''
        global client
        gmgc_unigenes = client.gmgc_unigenes
        return gmgc_unigenes.clusters.find_one(query)

## END
