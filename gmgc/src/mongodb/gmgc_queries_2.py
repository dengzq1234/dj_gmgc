#!/usr/bin/python
## CPCantalapiedra 2019

import sys
import json

import gmgc_mongodb

from Clusters import Clusters
from Unigenes import Unigenes
from Sprots import Sprots
from Meta import Meta

### globals

VALID_FT = set(["ACT_SITE"]) #VALID_FT = set(["CHAIN", "ACT_SITE"])

DB_GMGC = "gmgc"
COL_CLUSTERS = "clusters"
COL_UNIGENES = "unigenes"
COL_SAMPLES_A = "samples_a"
COL_SAMPLES_B = "samples_b"
DB_SPROT = "sprot"
COL_FT = "ft"
DB_META = "meta"
COL_GMGC = "gmgc"

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

### Query functions
#
def find(db, collection, query = {}):
        
        ret = None
        
        if db == DB_GMGC:
                if collection == COL_CLUSTERS:
                        ret = gmgc_mongodb.gmgcdb_clusters_find(query)
                elif collection == COL_UNIGENES:
                        ret = gmgc_mongodb.gmgcdb_unigenes_find(query)
                elif collection == COL_SAMPLES_A:
                        ret = gmgc_mongodb.gmgcdb_samples_a_find(query)
                elif collection == COL_SAMPLES_B:
                        ret = gmgc_mongodb.gmgcdb_samples_b_find(query)
                else:
                        raise Exception("Unknown collection "+str(collection)+\
                                        " for db "+str(db))
        elif db == DB_SPROT:
                if collection == COL_FT:
                        ret = gmgc_mongodb.sprotdb_ft_find(query)
                else:
                        raise Exception("Unknown collection "+str(collection)+\
                                        " for db "+str(db))
        elif db == DB_META:
                if collection == COL_GMGC:
                        ret = gmgc_mongodb.metadb_find(query)
                else:
                        raise Exception("Unknown collection "+str(collection)+\
                                        " for db "+str(db))
        else:
                raise Exception("Unknown database "+str(db)+"\n")
        
	return ret

#
def find_one(db, collection, query = {}):

        ret = None
        
        if db == DB_GMGC:
                if collection == COL_CLUSTERS:
                        ret = gmgc_mongodb.gmgcdb_clusters_find_one(query)
                elif collection == COL_UNIGENES:
                        ret = gmgc_mongodb.gmgcdb_unigenes_find_one(query)
                elif collection == COL_SAMPLES_A:
                        ret = gmgc_mongodb.gmgcdb_samples_a_find_one(query)
                elif collection == COL_SAMPLES_B:
                        ret = gmgc_mongodb.gmgcdb_samples_b_find_one(query)
                else:
                        raise Exception("Unknown collection "+str(collection)+\
                                        " for db "+str(db))
        elif db == DB_SPROT:
                if collection == COL_FT:
                        ret = gmgc_mongodb.sprotdb_ft_find_one(query)
                else:
                        raise Exception("Unknown collection "+str(collection)+\
                                        " for db "+str(db))
        elif db == DB_META:
                if collection == COL_GMGC:
                        ret = gmgc_mongodb.metadb_find_one(query)
                else:
                        raise Exception("Unknown collection "+str(collection)+\
                                        " for db "+str(db))
        else:
                raise Exception("Unknown database "+str(db)+"\n")
        
	return ret

#
def get_clusters_with_actsites(min_nu = 10, any_ft = False):
	'''
	Generator of clusters (cls) (gmgc DB, clusters collection)
	which have at least one unigene with Swissprot exact (spe) hit.
	min_nu: minimum number of unigenes in cluster
	any_ft: Swissprot exact hits with FT records of any kind
	'''

	query = {Clusters.DB_FIELD_NU:min_nu}
	
	for cl in find(DB_GMGC, COL_CLUSTERS, query):
                
		cl_id = cl[Clusters.DB_FIELD_CL]
                
                cl_unigenes = get_cluster_unigenes(cl_id)
                
                cl["u_list"] = []
                
                cl_has_spe = False
                cl_has_actsites = False
                
                for u in cl_unigenes:
                        
                        cl["u_list"].append(u)
                        
                        if not Unigenes.DB_FIELD_SPE in u: continue
                        
                        cl_has_spe = True

                        sp_id = u[Unigenes.DB_FIELD_SPE]

                        u_sprot_fts = get_sprot_fts(sp_id)

                        u["spe_ft_list"] = u_sprot_fts

                        u_actsites = filter_fts(u_sprot_fts, VALID_FT)

                        if not len(u_actsites) > 0: continue
                        
                        cl_has_actsites = True
                        
                if cl_has_spe and cl_has_actsites:
                        yield cl
                        
	return

#
def get_sprot_fts(sp_id):
	'''
	'''
        
	query = {Sprots.DB_FIELD_AC:sp_id}
        sp = find_one(DB_SPROT, COL_FT, query)
	sp_fts = sp[Sprots.DB_FIELD_FT]

	return sp_fts

#
def filter_fts(sp_fts, VALID_FT):
	
	sp_fts = [x for x in sp_fts if x[Sprots.DB_FIELD_FT_FT] in VALID_FT]
	
	return sp_fts

#
def get_cluster_unigenes(cl_id):
	'''
	'''
	query = {Unigenes.DB_FIELD_CL:cl_id}
        
	cl_unigenes = gmgc_mongodb.gmgcdb_unigenes_find(query)
        
	return cl_unigenes

#
def f_get_us_spb_ec(max_ev = 1e-5, min_qc = 0.5, FULL_ID = False):
	'''
	Generator of unigenes (us) (gmgc DB, unigenes collection)
	which have at least one Swissprot best (spb) hit with EC annotation.
	'''
	
	NO_EC = "-"
	
	exists = {"spb":{"$exists":True}}
	qc = {"spb.qc":{"$gte":min_qc}}
	ev = {"spb.ev":{"$lte":max_ev}}
	query = {"$and":[exists, qc, ev]}
	
	for u in gmgc_mongodb.gmgcdb_unigenes_find(query):
		
		u_id = u[Unigenes.DB_FIELD_U]
		spb_ec = NO_EC
		
		if Unigenes.DB_FIELD_SPB in u:
			spb_field = u[Unigenes.DB_FIELD_SPB]
			spb_id = spb_field[Unigenes.DB_FIELD_SPB_N]
			
			spb_ec = f_get_sp_ec(spb_id)
			if not spb_ec:
				continue
				#spb_ec = NO_EC
		else:
			raise Exception(Unigenes.DB_FIELD_SPB+" field not found for "+str(u_id))
			#spb_ec = NO_EC
		
		if FULL_ID:
			u_sfx = u[Unigenes.DB_FIELD_SFX]
			yield_value = [Unigenes.ID_PREFIX+"."+u_id+"."+u_sfx, spb_ec]
		else:
			yield_value = [u_id, spb_ec]

		yield yield_value

	return

#
def f_get_sp_ec(sp_id):
	'''
	'''
	query = {Sprots.DB_FIELD_AC:sp_id}
	sp_fts = gmgc_mongodb.sprotdb_query_ft_ac(query)
	
	ret = None
	if sp_fts:
		if Sprots.DB_FIELD_EC in sp_fts:
			ret = sp_fts[Sprots.DB_FIELD_EC]

	return ret

#
def get_meta(db, collection):
        query = {Meta.DB_FIELD_DB:db, Meta.DB_FIELD_COL:collection}
        return find(DB_META, COL_GMGC, query)



## REMOVE

#
def cluster_has_sprot_function(u_with_spe):
	'''
	'''
        
	ret = False
        
	for spe in u_with_spe:
	    sp_id = spe[Unigenes.DB_FIELD_SPE]
            sp_fts = get_sprot_fts(sp_id)
	    if sprot_has_actsites(sp_id):
	        ret = True
	        break
        
	return ret

## END
