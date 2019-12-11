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
        num_sam = gmgc_clusters.num_sam.find_one(query) # in num_sam collection
        metaG_corr = get_meta_corr(gmgc_clusters.metaG_abs_norm.find(query), 'mG_corr',query)
        metaT_corr = get_meta_corr(gmgc_clusters.metaT_abs_norm.find(query), 'mT_corr', query)
        results = [
            members,
            paths,
            suffixes,
            num_sam,
            metaG_corr,
            metaT_corr
        ]

        return results

def gmgcdb_unigenes_find_one(query):
        '''
        '''
        global client
        gmgc_unigenes = client.gmgc_unigenes

        clusters = gmgc_unigenes.clusters.find_one(query)
        sequences = gmgc_unigenes.sequences.find_one(query)
        suffixes = gmgc_unigenes.suffixes.find_one(query)
        emapper_v2 = gmgc_unigenes.emapper_v2.find_one(query)
        pfam = gmgc_unigenes.pfam.find_one(query)
        sprot_best = gmgc_unigenes.sprot_best.find_one(query)
        sprot_exact = gmgc_unigenes.sprot_exact.find_one(query)
        trembl_best = gmgc_unigenes.trembl_best.find_one(query)
        neighbour = gmgc_unigenes.neighbour.find_one(query)
        gene_count = gmgc_unigenes.gene_count.find_one(query)
        taxo_map = gmgc_unigenes.taxo_map.find_one(query)
        gene_mgs = gmgc_unigenes.gene_mgs.find_one(query)
        antipfam = gmgc_unigenes.antipfam.find_one(query)

        metaG_corr = get_meta_corr(gmgc_unigenes.metaG_abs_norm.find(query), 'mG_corr',query)
        metaT_corr = get_meta_corr(gmgc_unigenes.metaT_abs_norm.find(query), 'mT_corr',query)

        # change file type of single result of gene_mgs to list
        if gene_mgs is not None:
            mgs = gene_mgs['mgs']
            if type(mgs) == str:
                mgs_l = []
                mgs_l.append(mgs)
                gene_mgs['mgs'] = mgs_l

        results = [
            clusters,
            sequences,
            suffixes,
            emapper_v2,
            pfam,
            sprot_best,
            sprot_exact,
            trembl_best,
            neighbour,
            gene_count,
            taxo_map,
            gene_mgs,
            antipfam,
            metaG_corr,
            metaT_corr
        ]

        return results

def gmgcdb_unigenes_mgs_find_one(query):
    '''
    '''
    global client
    gmgc_unigenes = client.gmgc_unigenes
    mgs_gene = gmgc_unigenes.mgs_gene.find_one(query)

    return mgs_gene

def get_meta_corr(cursor, key, query):
    output = {}
    corr = objects_to_array(cursor)
    if len(corr) == 0:
        output[key] = None
    else:
        output[key] = corr
    if 'u' in query:
        output['u'] = query['u']
    else:
        output['cl'] = query['cl']
    return output

def objects_to_array(cursor):
    find_all = []
    for obj in cursor:
        del obj['_id']

        if 'u' in obj:
            del obj['u'] # if correlation data in unigene
        else:
            del obj['cl'] # if correlation data in cluster
        find_all.append(obj)
    return find_all

## END
