

import os, sys
from pymongo import MongoClient
import gridfs

# need to obtain full path to open file from django
module_dir = os.path.dirname(__file__)  # get current directory
TREE_PATH = os.path.join(module_dir, 'tree_log/')

f = open(TREE_PATH + '{}.nw'.format(ID), 'w')
f.write(tree_result)
f.close()
tree_path = os.path.realpath(f.name)

f = open(TREE_PATH + '{}.faa'.format(ID), 'w')
f.write(alignment_result)
f.close()
faa_path = os.path.realpath(f.name)