
## connection to mongo client ###
import os, sys
from pymongo import MongoClient
import gridfs
import random

### globals
client = None

def connectdb(MONGO_HOST, MONGO_PORT):
        '''
        Creates a MongoClient and
        connects to the gmgc and sprot databases
        '''

        global client
        if not client:
                client = MongoClient(MONGO_HOST, MONGO_PORT)
        return

def tree_run(ID):
        query = {'filename':ID}
        global client
        db_tree = None
        db_alg = None
        if not db_tree or db_alg:

                db_tree = client.trees
                db_alg = client.alignments

                #db_tree = client.sample_trees
                #db_alg = client.sample_alignments

                fs_tree = gridfs.GridFS(db_tree)
                fs_alg = gridfs.GridFS(db_alg)
                
                one_tree = fs_tree.find_one(query)
                one_alg = fs_alg.find_one(query)
                
                if one_tree and one_alg:
                        tree_result = one_tree.read().decode("utf-8")
                        alignment_result = one_alg.read().decode("utf-8")
                else:
                        return None

                # need to obtain full path to open file
                
                module_dir = os.path.dirname(os.path.dirname(__file__))  # get current directory
                TREE_PATH = os.path.join(module_dir, 'tmp/')
                
                treeID = random.randint(0,20) #give a ID to tmp files
                #f = open(TREE_PATH + '{}.nw'.format(ID), 'w')
                f = open(TREE_PATH + 'cluster_{}.nw'.format(treeID), 'w')
                f.write(tree_result)
                f.close()
                tree_path = os.path.realpath(f.name)
                
                #f = open(TREE_PATH + '{}.faa'.format(ID),'w')
                f = open(TREE_PATH + 'cluster_{}.faa'.format(treeID), 'w')
                f.write(alignment_result)
                f.close()
                faa_path = os.path.realpath(f.name)

        return [tree_result, alignment_result, tree_path, faa_path]
