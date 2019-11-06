#
## CPCantalapiedra 2019

class Clusters:
    
	# ID_PREFIX is a string, not a field.
	ID_PREFIX = "GMGC10"
	DB_FIELD_CL = "cl" # clusterID
	DB_FIELD_SFX = "sfx" # suffixes
	# Full ID of a cluster is:
	# ID_PREFIX+"."+cl[DB_FIELD_CL]+"."+cl[DB_FIELD_SFX]
	DB_FIELD_NU = "nu" # Num cluster members (proteins aka unigenes)
	DB_FIELD_NAA = "naa" # Num aminoacids in cluster members
	DB_FIELD_SM = "sm" # smallest sequence of a member
	DB_FIELD_LG = "lg" # largest sequence of a member
	DB_FIELD_AVL = "avl" # average length of cluster members
	DB_FIELD_AL = "al" # alignment length
	DB_FIELD_AVI = "avi" # average identity of cluster members
	DB_FIELD_MRP = "mrp" # identity of most related pair
	DB_FIELD_MUP = "mup" # identity of most unrelated pair
	DB_FIELD_MDS = "mds" # identity of the member more distant to the cluster
	DB_FIELD_NH = "nh"  # number of genes with no pfam hit in the cluster
	DB_FIELD_HU = "hu" # number of genes with hit in pfam to domains with unknown function
	DB_FIELD_HK = "hk" # number of genes with hit in pfam to domains with known function
	DB_FIELD_PSD = "psd" # path sub directory
	DB_FIELD_PEX = "pex" # path extension

## END
