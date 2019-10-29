#
## CPCantalapiedra 2019

class Unigenes:

	# ID_PREFIX is a string, not a field.
	ID_PREFIX = "GMGC10"
	DB_FIELD_U = "u"
	DB_FIELD_SFX = "sfx"
	# Full ID of a unigene is:
	# ID_PREFIX+"."+u[DB_FIELD_U]+"."+u[DB_FIELD_ID_SUFFIX]

	DB_FIELD_SQ = "sq" # faa sequence

	DB_FIELD_CL = "cl"
	DB_FIELD_SPE = "spe" # Swissprot exact hit

	DB_FIELD_SPB = "spb" # Swissprot best hit
	# SPB fields
	DB_FIELD_SPB_N = "n" # Sprot AC number
	DB_FIELD_SPB_EV = "ev" # evalue
	DB_FIELD_SPB_SC = "sc" # score
	DB_FIELD_SPB_PI = "pi" # pident
	DB_FIELD_SPB_QC = "qc" # query coverage
	DB_FIELD_SPB_TC = "tc" # target coverage

	DB_FIELD_TRB = "trb" # Trembl best hit
	# TRB fields
	DB_FIELD_TRB_N = "n" # Trembl name
	DB_FIELD_TRB_SC = "sc" # Trembl hit score
	DB_FIELD_TRB_EV = "ev" # Trembl hit evalue
	DB_FIELD_TRB_PI = "pi" # Trembl hit percent identity
	DB_FIELD_TRB_QC = "qc" # Trembl hit query coverage
	DB_FIELD_TRB_TC = "tc" # Trembl hit target coverage

	DB_FIELD_PF = "pf" # list of PFAMs
	# PF fields
	DB_FIELD_PF_N = "n" # PFAM name 
	DB_FIELD_PF_S = "s" # PFAM hit start
	DB_FIELD_PF_E = "e" # PFAM hit end
	DB_FIELD_PF_SC = "sc" # PFAM hit score
	DB_FIELD_PF_EV = "ev" # PFAM hit evalue

	DB_FIELD_FR = "fr"
	DB_FIELD_R = "r"
	DB_FIELD_ORF = "orf" # dict of ORFs
	# Each ORF is a dictionary:
	# key: ORF name (sample.contig...)
	# values: list of ["S"|"R", start, end, strand, contig]

## END
