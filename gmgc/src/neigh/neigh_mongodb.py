
## connection to mongo client ###

from pymongo import MongoClient

def connectdb(MONGO_HOST, MONGO_PORT):
        global coll_unigenes
        global coll_clusters
        db = None
        if not db:
                client = MongoClient(MONGO_HOST, MONGO_PORT)
                db = client.gmgc_unigenes
                coll_unigene = db.neighbour
                coll_cluster = db.emapper_v2
                coll_e5 = db.eggnog_v5

        return [coll_unigene, coll_cluster, coll_e5]

## changed variable of collections 
