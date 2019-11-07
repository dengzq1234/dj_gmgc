#!/usr/bin/python
## CPCantalapiedra 2019

import sys
from pymongo import MongoClient

### globals

client = None
gmgcdb = None
sprotdb = None
metadb = None

### functions

def connectdb(MONGO_HOST, MONGO_PORT):
        '''
        Creates a MongoClient and 
        connects to the gmgc and sprot databases
        '''

        global client, gmgcdb, sprotdb, metadb
        if not client:
                client = MongoClient(MONGO_HOST, MONGO_PORT)
                gmgcdb = client.gmgc
                sprotdb = client.sprot
                metadb = client.meta

        return

def gmgcdb_clusters_find_one(query):
        '''
        '''
        
        global client
        gmgc_clusters = client.gmgc_clusters

        members = gmgc_clusters.members.find_one(query) # in members collection
        paths = gmgc_clusters.paths.find_one(query) # in paths collection
        suffixes = gmgc_clusters.suffixes.find_one(query) # in suffixes collection

        results = [members, paths, suffixes]

        return results

def gmgcdb_unigenes_find_one(query):
        '''
        '''
        global client
        gmgc_unigenes = client.gmgc_unigenes
        return gmgc_unigenes.clusters.find_one(query)

## END
