## Neigh packag ##
# Joaquin Giner Lamia

from __future__ import division
import os,sys,json

## self packages
from . import neigh_mongodb


path = os.getcwd()

# load mongo config
def init(config_fn):

	# DB connection

	MONGO_HOST, MONGO_PORT = load_mongo_config(config_fn)

	sys.stderr.write("neigh_queries: connecting to db...\n")

	neigh_mongodb.connectdb(MONGO_HOST, MONGO_PORT)

	sys.stderr.write("neigh_queries: connected\n")

	return


#
def load_mongo_config(config_fn):
	# print("this is in load_mongo_config", config_fn)
	host = None
	port = None
	with open(config_fn, 'r') as mongo_config:
		config_data = json.load(mongo_config)
		if "MONGO_HOST" in config_data:
			host = config_data["MONGO_HOST"]
		if "MONGO_PORT" in config_data:
			port = config_data["MONGO_PORT"]

	sys.stderr.write("gmgc_mongodb " + str(host) + ":" + str(port) + "\n")

	return host, port

