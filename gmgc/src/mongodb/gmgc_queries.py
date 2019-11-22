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

        query = {"cl":cluster_id}

        results = gmgc_mongodb.gmgcdb_clusters_find_one(query)
        #results = [result for result in results if result is not None]

        for ret in results:
                if ret is not None and "_id" in ret:
                        del ret["_id"]

        return results
#
def get_unigene_data(unigene_id):

        ret = None

        query = {"u":unigene_id}

        results = gmgc_mongodb.gmgcdb_unigenes_find_one(query)
        #results = [result for result in results if result is not None]

        for ret in results:
                if ret is not None and "_id" in ret:
                        del ret["_id"]

        return results

def get_mgs_gene_data(mgs_id):
        ret = None

        query = {"mgs": mgs_id}

        result = gmgc_mongodb.gmgcdb_unigenes_mgs_find_one(query)

        if result is not None and "_id" in result:
                del result["_id"]

        return result


## END
