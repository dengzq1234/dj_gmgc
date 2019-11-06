#!/usr/bin/python
## CPCantalapiedra 2019

import sys
import json

from . import gmgc_mongodb
        
#
def init(config_fn):
        # DB connection                                                                                                                                                                                    

        MONGO_HOST, MONGO_PORT = load_mongo_config(config_fn)

        sys.stderr.write("gmgc_queries: connecting to db...\n")

        gmgc_mongodb.connectdb(MONGO_HOST, MONGO_PORT)

        sys.stderr.write("gmgc_queries: connected\n")
        
        return

#
def load_mongo_config(config_fn):
	host = None
	port = None

	with open(config_fn, 'r') as mongo_config:
                config_data = json.load(mongo_config)
                if "MONGO_HOST" in config_data:
                        host = config_data["MONGO_HOST"]
                if "MONGO_PORT" in config_data:
                        port = config_data["MONGO_PORT"]
	
	sys.stderr.write("gmgc_mongodb "+str(host)+":"+str(port)+"\n")
	
	return host, port

#
def get_cluster_data(cluster_id):
        
        ret = None

        query = {"cl":cluster_id}
        #print(" I use get_cluster_data")
        ret = gmgc_mongodb.gmgcdb_clusters_find_one(query)

        if "_id" in ret:
                del ret["_id"]
        return ret

#
def get_unigene_data(unigene_id):

        ret = None

        query = {"u":unigene_id}
        #print(" I use get_unigene_data")
        ret = gmgc_mongodb.gmgcdb_unigenes_find_one(query)

        if "_id" in ret:
                del ret["_id"]

        return ret

## END
