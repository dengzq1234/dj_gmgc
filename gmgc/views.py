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
    
    cluster_data = gmgc_queries.get_cluster_data(cluster_id)
    cluster_data = merge_dicts(cluster_data) # merge all result in a dictionary

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
    
    unigene_data = gmgc_queries.get_unigene_data(unigene_id)

    print("this is cluster data", unigene_data)

    return render(request, "unigene.html", {"unigene_data":json.dumps(unigene_data)})

def merge_dicts(dict_args):
    """
    Given any number of dicts, shallow copy and merge into a new dict,
    precedence goes to key value pairs in latter dicts.
    """
    result = {}
    for dictionary in dict_args:
        result.update(dictionary)
    return result

## END
