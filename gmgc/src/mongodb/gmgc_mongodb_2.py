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

def gmgcdb_clusters_find(query):
	'''
	'''
	global gmgcdb
	return gmgcdb.clusters.find(query)

def gmgcdb_clusters_find_one(query):
	'''
	'''
	global gmgcdb
	return gmgcdb.clusters.find_one(query)

def gmgcdb_unigenes_find(query):
	'''
	'''
	global gmgcdb
	return gmgcdb.unigenes.find(query)

def gmgcdb_unigenes_find_one(query):
	'''
	'''
	global gmgcdb
	return gmgcdb.unigenes.find_one(query)

def gmgcdb_samples_a_find(query):
	'''
	'''
	global gmgcdb
	return gmgcdb.samples_a.find(query)

def gmgcdb_samples_a_find_one(query):
	'''
	'''
	global gmgcdb
	return gmgcdb.samples_a.find_one(query)

def gmgcdb_samples_b_find(query):
	'''
	'''
	global gmgcdb
	return gmgcdb.samples_b.find(query)

def gmgcdb_samples_b_find_one(query):
	'''
	'''
	global gmgcdb
	return gmgcdb.samples_b.find_one(query)

def sprotdb_ft_find(query):
	'''
	'''
	global sprotdb
	return sprotdb.ft.find(query)

def sprotdb_ft_find_one(query):
	'''
	'''
	global sprotdb
	return sprotdb.ft.find_one(query)

def metadb_find(query):
	'''
	'''
	global metadb
	return metadb.gmgc.find(query)

def metadb_find_one(query):
	'''
	'''
	global metadb
	return metadb.gmgc.find_one(query)

## END
