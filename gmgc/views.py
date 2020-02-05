## CPCantalapiedra 2019

import os
import json

from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.forms.models import model_to_dict

from .src.mongodb import gmgc_queries
from .src.neigh import neigh_queries,neigh_start
from .src.neigh import neigh_mongodb
from .src.get_tree import tree_queries, tree_mongodb

MONGO_CONFIG = "mongo.cnf"

# Create your views here.
def index(request):
    return render(request, "index.html", {})

def index_unigene(request):
    return render(request, "index_unigene.html", {})

def cluster(request, cluster_id):

    ## 1. Retrieve parameters
    if cluster_id != "null":
        print("Cluster ID: "+cluster_id)
    else:
        return render(request, 'null.html')

    ## 2. init mongo
    
    # need to obtain full path to open file from django    
    module_dir = os.path.dirname(__file__)  # get current directory
    MONGO_CONFIG_PATH = os.path.join(module_dir, MONGO_CONFIG)
    
    gmgc_queries.init(MONGO_CONFIG_PATH)

    ## 3. retrieve data
    cluster_data = dict()
    cluster_data_raw = gmgc_queries.get_cluster_data(cluster_id)
    cluster_data['members'] = cluster_data_raw[0]
    cluster_data['paths'] = cluster_data_raw[1]
    cluster_data['suffixes'] = cluster_data_raw[2]
    cluster_data['num_sam'] = cluster_data_raw[3]
    cluster_data['metaG_corr'] = cluster_data_raw[4]
    cluster_data['metaT_corr'] = cluster_data_raw[5]
    cluster_data['metaG_corr_p'] = cluster_data_raw[6]
    cluster_data['metaG_corr_s'] = cluster_data_raw[7]
    cluster_data['metaT_corr_p'] = cluster_data_raw[8]
    cluster_data['metaT_corr_s'] = cluster_data_raw[9]

    cluster_data['tree'] = get_tree(cluster_id)

    print("this is cluster data", cluster_data['metaG_corr_p'])

    return render(request, "cluster.html", {"cluster_data":json.dumps(cluster_data)})

def unigene(request, unigene_id):

    ## 1. Retrieve parameters
    if unigene_id != "null":
        print("Unigene ID: "+unigene_id)
    else:
        return render(request, 'null.html')

    ## 2. init mongo
    
    # need to obtain full path to open file from django    
    module_dir = os.path.dirname(__file__)  # get current directory
    MONGO_CONFIG_PATH = os.path.join(module_dir, MONGO_CONFIG)
    gmgc_queries.init(MONGO_CONFIG_PATH)

    ## 3. retrieve data
    unigene_data = dict()
    keys = [
        "clusters",
        "sequences",
        "suffixes",
        "emapper_v2",
        "pfam",
        "sprot_best",
        "sprot_exact",
        "trembl_best",
        "neighbour",
        "gene_count",
        "taxo_map",
        "gene_mgs",
        "antipfam",
        'metaG_corr',
        'metaT_corr'
    ]
    unigene_data_raw = gmgc_queries.get_unigene_data(unigene_id)

    for index, value in enumerate(unigene_data_raw):
        unigene_data[keys[index]] = value

    # add neigh annotation data
    unigene_data['neigh_data']  = neigh(unigene_id)


    print("this is unigene data", unigene_data)
    return render(request, "unigene.html", {"unigene_data":json.dumps(unigene_data)})

def mgs_gene(request, mgs_id):

    ## 1. Retrieve parameters
    if mgs_id != "null":
        print("MGS id: " + mgs_id)
    else:
        return

    ## 2. init mongo

    # need to obtain full path to open file from django
    module_dir = os.path.dirname(__file__)  # get current directory
    MONGO_CONFIG_PATH = os.path.join(module_dir, MONGO_CONFIG)

    gmgc_queries.init(MONGO_CONFIG_PATH)

    ## 3. retrieve data

    mgs_gene_data_raw = gmgc_queries.get_mgs_gene_data(mgs_id)
    print("this is MGS data", mgs_gene_data_raw)
    return render(request, "mgs_gene.html", {"mgs_data":json.dumps(mgs_gene_data_raw)})


def neigh(unigene_id):
    """gmgc_queries
    :param unigene_id:
    :return: annotation of neighbour, as object neigh_result, and return to part of unigene_data
    example :
    unigeneID       query_keggs     subject_keggs   analysed_orfs   neigh_genes     neigh_with_keggs        kegg_proportion presence_of_kegg        hit_kegg_percentage     kegg_description
    000_000_004     NA      03430,00900,00730       304     1216    839     0.69    2.94    03430@52.98,00900@155.44,00730@85.96    03430@Mismatch repair;00900@Terpenoid backbone biosynthesis;00730@Thiamine metabolism
    """
    ## 1. Retrieve parameters
    if unigene_id != "null":
        print("Unigene ID: " + unigene_id)
    else:
        return

    ## 2. init mongo

    # need to obtain full path to open file from django
    module_dir = os.path.dirname(__file__)  # get current directory
    MONGO_CONFIG_PATH = os.path.join(module_dir, MONGO_CONFIG)
    neigh_queries.init(MONGO_CONFIG_PATH)

    ## 3. retrieve data
    neigh_query = []
    neigh_query.append(unigene_id)

    MONGO_HOST, MONGO_PORT = neigh_queries.load_mongo_config(MONGO_CONFIG_PATH)
    coll_unigenes = neigh_mongodb.connectdb(MONGO_HOST, MONGO_PORT)[0]
    coll_clusters = neigh_mongodb.connectdb(MONGO_HOST, MONGO_PORT)[1]

    # neigh_data = neigh_queries.neigh_run(neigh_query,coll_unigenes,coll_clusters)
    neigh_data = neigh_start.neigh_run(neigh_query, coll_unigenes, coll_clusters)
    #print("this is neigh data", neigh_data)
    return neigh_data

def get_tree(cluster_id):
    ## 1. Retrieve parameters
    if cluster_id != "null":
        print("cluster ID: " + cluster_id)
    else:
        return

    ## 2. init mongo

    # need to obtain full path to open file from django
    module_dir = os.path.dirname(__file__)  # get current directory
    MONGO_CONFIG_PATH = os.path.join(module_dir, MONGO_CONFIG)
    tree_queries.init(MONGO_CONFIG_PATH)

    ## 3. retrieve data
    MONGO_HOST, MONGO_PORT = tree_queries.load_mongo_config(MONGO_CONFIG_PATH)
    tree_data = tree_mongodb.tree_run(cluster_id)

    tree_dict = {}
    if tree_data:
        tree_dict['nw'] = tree_data[0]
        tree_dict['faa'] = tree_data[1]
    else:
        return None
    return tree_dict
## END
