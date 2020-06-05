### Parseamos el fichero con las descripciones de los KEGGs pathways
### y generamos un diccionario para almacenarlos.

# import os
# path = os.getcwd()
# kegg_pathways = open(path+"/KEGGs_pathways.txt","r")

def make_kegg_dict(kegg_pathways):
    """generate kegg pathway dictionary containning kegg descriptions"""
    global kegg_dict
    kegg_dict = {}


    for line in kegg_pathways:
       fields = line.strip("\n").split("\t")
       kegg= fields[0]
       description= " ".join(fields[1::]).rstrip(" ")
       kegg_dict[kegg]= description

    return kegg_dict



def get_kegg_description(kegg):
        """retrieve kegg description from kegg_dict hash """
        description = kegg_dict[kegg]
        return description


def mongo_orf_find(GMGC,maximum_neighbours_genes,coll_unigenes):
        """ retrieve orf genomic information"""

        GMGC_cluster = coll_unigenes.find({"u":GMGC})
        GMGC_dict = {}
        count = 0

        for orf in GMGC_cluster:
                orf = orf['o']
                count +=1
                if count < maximum_neighbours_genes:
                        for a in orf:

                                gene = a['g']
                                Locus = a['s']
                                start = Locus[0]
                                end = Locus[1]
                                strand = Locus[2]

                                try:
                                        #GMGC_dict[gene]=[contig,start,end,strand,sample]
                                        GMGC_dict[gene]=[start,end,strand]
                                        #print [contig,start,end,strand,sample]

                                except:
                                        print("something was wrong")
                else:
                        break

        return GMGC_dict


def retrieve_gmgc(gene, coll_unigenes):
        """ retrieve gmgc for every orf from unigenes db """
        GMGC_function = coll_unigenes.find({ "o.g":gene},{"u":1}).limit(1)

        selected = []
        gmgc = ""
        for n in GMGC_function:
                try:
                        gmgc = n["u"]
                except:
                        gmgc = ""

        return gmgc


def retrieve_neighbours_data(gmgc_cluster,maximum_neighbours_genes):
        """ get a list containning -2-1+1+2 neighbours genes surrounding 
        the unigenes in every contig """  

        neigh_dict = {}

        count = 0

        for k,v in gmgc_cluster.items():
                count +=1
                if count < maximum_neighbours_genes:

                        gene_ordered =[]
                        query_gene = k

                        start = v[0]
                        end = v[1]
                        strand = v[2]
                        orf = k.split("_")
                        gene = int(orf[3])
                        sample_contig =orf[0:3]

                        gene_list =[-2,-1,1,2]


                        for gene_pos in gene_list:
                                sample_cont = []
                                genes = int(gene)+int(gene_pos)
                                sample_cont = sample_contig[0:3]
                                sample_cont.append(str(genes))
                                genes = "_".join(sample_cont)
                                gene_ordered.append(genes)
                                neigh_dict[query_gene]=gene_ordered
                else:
                        break

        return neigh_dict



def clean_unigene(gmgc):
        '''in case GMGC nomeclature was used in the input example,
         GMGC.100_000_123.UNKNOWN words after/before . are removed'''
        gmgc_clean = gmgc.split(".")[1]
        return gmgc_clean





def mongo_functional_find(GMGC, coll_clusters): #prueba al 350
        """ get functional information from mongo.clusters db for gmgc element"""
        kegg_list = []
        GMGC_function = coll_clusters.find({"u":GMGC})
        #GMGC_function = coll_clusters_egg350.find({"u":GMGC})
        GMGC_function_list =[]
        for element in GMGC_function:

                kegg = element['K_P']
                kegg = kegg.split(",")

                for n in kegg: #depuro la lista de kegg para quedarme solo con los kegg pathways
                    if n in kegg_dict and n not in kegg_list:
                        kegg_list.append(n)

                #gene_symbol = element['g_s']
                #cog = element['COG']
                #desc = element['desc']
                #eggnog = element['Egg']

                try:
                    #GMGC_function_list=[kegg_list,cog,eggnog,gene_symbol,desc]
                    GMGC_function_list=[kegg_list]
                except:
                    print("something was wrong!")

        return GMGC_function_list




def print_results(result_list,list_unigenes):
    if list_unigenes == True:
        for i in result_list:
            result = "\t".join(i)
            print(result)
    else:
        result = "\t".join(result_list[0])
        print(result)