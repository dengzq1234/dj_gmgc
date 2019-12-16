
## connection to mongo client ###

from pymongo import MongoClient

def mongo_connect():
        global coll_unigenes
        global coll_clusters
        db = None
        if not db:
                client = MongoClient('localhost', 27018)
                db = client.gmgc_unigenes
                coll_unigene = db.neighbour
                coll_cluster = db.emapper_v2

        return [coll_unigene,coll_cluster]

## changed variable of collections 
