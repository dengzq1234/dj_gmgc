## Neigh packag ##
# Joaquin Giner Lamia

from __future__ import division
from collections import Counter
import os,sys,json

## self packages
from .neigh_functions import *

path = os.getcwd()

"""
if sys.argv[1] == "-f":
	try:
		input_gmgc_file= sys.argv[2]
		input_file = open(input_gmgc_file,"r")
		for line in input_file:
			gmgc_list.append(line.strip())
		list_unigenes = True
	except:
		sys.exit("\nError: please add a GMGC\nUsage: mongo_GMGC_neigh.py <gmgc> or \n mongo_GMGC_neigh.py -f <file.txt>")


if sys.argv[1] != "-f":
	try:
		input_gmgc= sys.argv[1]
		gmgc_list.append(input_gmgc)
		list_unigenes = False
	except:
		sys.exit("\nError: please add a GMGC\nUsage: mongo_GMGC_neigh.py <gmgc> or \n mongo_GMGC_neigh.py -f <file.txt>")

"""

###### Parametters for the analysis

maximum_neighbours_genes = int(401) # maximun number of neighbours smaller the number smaller computing time 
percentage_cut_off = int(25) # percentage of keggs (porcentaje de keggs necesario para considerar un kegg como posible candidato entre todos los neighbours keggs)



##### neigh analysis ####

def neigh_analysis(gmgc_list, coll_unigenes, coll_clusters):

	result_list = []
	for gmgc in gmgc_list:

		if "GMGC" in gmgc:
			gmgc = clean_unigene(gmgc)

		kegg_list = []
		gmgc_orf_dict = {}
		number_neigh = 0
		neigh_with_keggs = 0
		analysed_orfs = 0
		keggs_for_draw_list=[] #obtener los stats de los genes con Kegss
		neigh_with_keggs_real = 0

		predicted_neighs = [] # obtain predicted nighbour genes

		gmgc_cluster = mongo_orf_find(gmgc,maximum_neighbours_genes,coll_unigenes)

		gene_ordered = retrieve_neighbours_data(gmgc_cluster,maximum_neighbours_genes)

		count_for_maximum_neighbours_genes = 0
		unigenes_functions=[]
		if count_for_maximum_neighbours_genes < maximum_neighbours_genes: # asi solo computamos hasta un maximo de neighbourhoods, por default 400
			for k,v in gene_ordered.items():
				count_for_maximum_neighbours_genes +=1
				analysed_orfs += 1
				query_gene = k
				gene_list = v

				minus2= retrieve_gmgc(gene_list[0],coll_unigenes)
				minus1= retrieve_gmgc(gene_list[1],coll_unigenes)
				plus1= retrieve_gmgc(gene_list[2],coll_unigenes)
				plus2= retrieve_gmgc(gene_list[3],coll_unigenes)
				gmgc_list = [minus2,minus1,plus1,plus2]

				predicted_neigh = {}
				predicted_neigh['g'] = query_gene
				predicted_neigh['p_n'] = [
					[gene_list[0], minus2],
					[gene_list[1], minus1],
					[gene_list[2], plus1],
					[gene_list[3], plus2]
				]
				predicted_neighs.append(predicted_neigh)

				#print gmgc_list


				keggs_for_draw = []

				for unigene in gmgc_list: # unigene = cluster de GMGC al que pertenece el unigene
					parsed_kegg = []
					kegg = "NA"
					number_neigh +=1

					try:
						kegg = mongo_functional_find(unigene,coll_clusters)[0]
						kegg_for_print = mongo_functional_find(unigene,coll_clusters)

					except:
						kegg = "NA"

					if kegg == []:
						kegg="NA"

					if kegg != "NA" and kegg[0] != '':
						neigh_with_keggs_real +=1


					if kegg[0] =='':
						kegg= "NA"
						keggs_for_draw.append(kegg)
					else:
						keggs_for_draw.append(kegg)


					for n in kegg: #depuro la lista de kegg para quedarme solo con los kegg pathways

						if n in kegg_dict and n not in parsed_kegg and n != '': 
							parsed_kegg.append(n)
							unigenes_functions.append(n)

				#print keggs_for_draw		#for neigh visulization


########## with this secetion we retrieve neigh_orf_with_keggs, ###################
				keggs_for_draw_list.append(keggs_for_draw)

		kegg_depured_list =[]
		for k in keggs_for_draw_list:
			if k.count("NA") != 4:
				kegg_depured_list.append(k)

		neigh_orf_with_keggs = len(kegg_depured_list) # numero de genes unigenes que tenein al menos un kegg en sus neighbourhoods
		#print kegg_depured_list,neigh_orf_with_keggs

####################################################################################


		gmgc_functional = mongo_functional_find(gmgc,coll_clusters)# obtiene la informacion funcional del GMGC query

		try:
			query_kegg_list = gmgc_functional[0]

		except:
			query_kegg_list = []
			query_kegg_list.append("NA")


		try: # Comprueba si el GMGC query tiene kegg y cual son sus descripciones
			for kegg in query_kegg_list:
				kegg_desc = get_kegg_description(kegg)


				if kegg_desc == '':
					kegg=kegg_desc="NA"

		except:
			kegg=kegg_desc="NA"



		kegg_description_dict = {}
		Count = Counter(unigenes_functions)

		Count = {key:val for key, val in Count.items() if val != 1}		## Eliminamos los Keggs que estan una sola vez
		for k,v in Count.items():
			count = int(v)
			neigh_with_keggs += count # numero total de keggs en el analisis menos los keggs que han aparecido una sola vez




		subject_kegg_list = []
		subject_kegg_dict = {} #almacenamos todos los kegg que pasen el porcentaje para compararlos con los query_kegg_list
		for k,v in Count.items(): # v es el numero de veces que ha aparecido en ese cluster por vencidad dicha funcion
			KEGG_count = str(v)
			percentage = float(v/neigh_orf_with_keggs)*100 # calculamos el porcentaje sobre el numero de genes neighbours with keggs
			percentage = ("{0:.2f}".format(percentage))

			if float(percentage) >= percentage_cut_off:
				kegg = k
				kegg_description = get_kegg_description(kegg)
				kegg_description_dict[kegg]=kegg_description
				subject_kegg_dict[kegg]=percentage
				subject_kegg_list.append(kegg)

		if kegg_description_dict != {}:
			hits_kegg_list = [] # lista que almacena los hits que coinciden con los iniciales del query
			hit_kegg_percentage = [] # guarda el porcentage con el que paso dicho kegg, porcentaje de abundancia entre los keggs.
			hits = 0
			hit_kegg_count_per_orf = {}
			hit_kegg_count_per_orf_negative = {}
			for k,v in subject_kegg_dict.items():
				kegg = k
				percentage = v
				k_p = k+"@"+str(percentage)
				hit_kegg_percentage.append(k_p) 
				num_query_kegg = len(query_kegg_list)
				num_subject_kegg = len(subject_kegg_list)


				if kegg in query_kegg_list:
					hits +=1
					hits_kegg = kegg+"_"+str(percentage)
					hits_kegg_list.append(hits_kegg)


					kegg_count = 0
					for k in kegg_depured_list:
						for orf in k:
							if kegg in orf:
								kegg_count +=1

					hit_kegg_count_per_orf[kegg]=kegg_count

				if kegg not in 	query_kegg_list:

					kegg_count = 0
					for k in kegg_depured_list:
						for orf in k:
							if kegg in orf:
								kegg_count +=1

					hit_kegg_count_per_orf_negative[kegg]=kegg_count


			passed_kegg_average =0
			percentage_kegg_sum= 0
			passed_kegg_count = 0
			try:
				for kegg,count in hit_kegg_count_per_orf.items():

					try:
						kegg_n = ("{0:.2f}".format(count/neigh_orf_with_keggs)) # proporcion del numero de orf que tenian el kegg en sus neighbourhood. cuanto mayor mejor
					except:
						kegg_n = 0

					percentage_kegg_sum = percentage_kegg_sum+float(kegg_n)

					passed_kegg_count += 1
				passed_kegg_average = percentage_kegg_sum/passed_kegg_count	


			except:
				passed_kegg_average=0


			passed_kegg_average_negative =0
			percentage_kegg_sum= 0
			passed_kegg_count = 0
			try:
				for kegg,count in hit_kegg_count_per_orf_negative.items():

					try:
						kegg_n = ("{0:.2f}".format(count/neigh_orf_with_keggs)) # proporcion del numero de orf que tenian el kegg en sus neighbourhood. cuanto mayor mejor
					except:
						kegg_n = 0	
					percentage_kegg_sum = percentage_kegg_sum+float(kegg_n)	
					passed_kegg_count += 1
				passed_kegg_average_negative = percentage_kegg_sum/passed_kegg_count	


			except:
				passed_kegg_average_negative=0	


			try:
				kegg_positives = ("{0:.2f}".format(int(hits)/num_query_kegg)) # cuanto mas cercano a 1 mejor.
			except:
				kegg_positives = 0

			try:
				kegg_accuracy = ("{0:.2f}".format(hits/len(subject_kegg_list))) # porcentaje de hits sobre todos los keggs predichos. Cuanto menor mejor
			except:
				kegg_accuracy = 0


			try:
				kegg_proportion = ("{0:.2f}".format(neigh_with_keggs/number_neigh)) # porcentaje de de genes neigh que tenian kegg sobre todos los neigh analizado. cuanto mayor mejor.
			except:
				kegg_proportion = 0


			try:
				kegg_dispersion = ("{0:.2f}".format(neigh_with_keggs/neigh_orf_with_keggs)) # porcentaje de de genes neigh que tenian kegg sobre todos los neigh analizado. cuanto mayor mejor.
			except:
				kegg_dispersion = 0


			try:

				if query_kegg_list == [u'']:
					query_kegg_list =['NA']

				for kegg in query_kegg_list:
					kegg_description = get_kegg_description(kegg)
					kegg_description_dict[kegg]=kegg_description
			except:
				query_kegg_list= ["NA"]


			try:
				description_list = []

				for kegg, description in kegg_description_dict.items():
					k_d= str(kegg)+"@"+str(description)
					description_list.append(k_d)

			except:
				description_list=[]



			#print ("unigeneID"+"\t"+"query_keggs"+"\t"+"subject_keggs"+"\t"+"analysed_orfs"+"\t"+"neigh_genes"+"\t"+"neigh_with_keggs"+"\t"+"kegg_proportion"+"\t"+"presence_of_kegg"+"\t"+"hit_kegg_percentage"+"\t"+"kegg_description")
			result =[gmgc,",".join(query_kegg_list),",".join(subject_kegg_list),str(analysed_orfs),str(number_neigh),str(neigh_with_keggs),str(kegg_proportion),str(kegg_dispersion),",".join(hit_kegg_percentage),";".join(description_list)]
			result_list.append(result)
		else:
			result = None
			result_list.append(result)

	return result_list, predicted_neighs

def neigh_run(gmgc_list, coll_unigenes, coll_clusters):
	# list_unigenes = False
	global kegg_dict
	module_dir = os.path.dirname(__file__)

	kegg_pathways = open(module_dir + "/KEGGs_pathways.txt","r")
	kegg_dict = make_kegg_dict(kegg_pathways)

	### connection to mongo client using mongo_client.py ###

	result_list, predicted_neighs = neigh_analysis(gmgc_list, coll_unigenes, coll_clusters)
	result_list = result_list[0]
	if result_list != None:
		return neigh_output(result_list, predicted_neighs)
	else:
		result_list



def neigh_output(result_list, p_n):
	result_output = {}
	keys = [
		"u",
		"q_K",
		"s_K",
		"a_orfs",
		"n_g",
		"n_K",
		"K_p",
		"p_K",
		"ht_K_p",
		"K_d"
	]
	for index, result in enumerate(result_list):
		result_output[keys[index]] = result
	result_output['predict_neighs'] = p_n
	return result_output

"""
if __name__ == main(kegg_pathways):
	main(kegg_pathways)
"""



