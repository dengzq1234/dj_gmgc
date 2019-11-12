## CPCantalapiedra 2019

import os
import json

from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.forms.models import model_to_dict

from .src.mongodb import gmgc_queries

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

    print("this is cluster data", cluster_data)

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
        "neighbour"
    ]
    unigene_data_raw = gmgc_queries.get_unigene_data(unigene_id)

    for index, value in enumerate(unigene_data_raw):
        unigene_data[keys[index]] = value

    print("this is unigene data", unigene_data)

    return render(request, "unigene.html", {"unigene_data":json.dumps(unigene_data)})
## END
