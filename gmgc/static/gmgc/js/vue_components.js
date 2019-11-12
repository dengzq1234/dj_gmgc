// CPCantalapiedra 2019
var cluster_features = {
    members: {
        cl: "Cluster ID",
        clm: "Gene Members",
        al: "Alignment length",
        hu: "Num of unknown function genes",
        avl: "Average length of Cluster",
        hk: "Num of known function genes",
        avi: "Average identity of Cluster",
        mds: "Identity of the member more distant",
        nh: "Num of genes with no hit",
        lg: "Longest sequence",
        naa: "Num of amino acids in Cluster",
        mup: "Identity of most unrelated pair",
        mrp: "Identity of most related pair",
        sm: "Shortest sequence of a member",
        nu: "Num of Cluster members"
        },
    paths:{
        psd: "psd"
        },
    suffixes:{
        sfx: "suffixes"
        }
    };

var unigene_features = {

}

// LOCAL REGISTRATION
var ClusterForm = {
    data: function(){
	return {
	    cluster_id:null,
	}
    },
    computed: {
	clusterAction: function() {
	    return "cluster/"+this.cluster_id+"/";
	}
    },
    props: ['csrf'],
    template:`
  <div class="row h-100 justify-content-center align-items-center">
    <form class="col-5 card" :action='clusterAction' method='post'>
      <input type="hidden" name="csrfmiddlewaretoken" v-bind:value="csrf">
      <div class="card-header">
	<h5>Enter a GMGC cluster identifier (FORM A)</h5>
      </div>
      <div class="card-body">
	
	<div class="form-group">
	  <input v-model="cluster_id" class="form-control" id="cluster_id" name="cluster_id" placeholder="Cluster ID (xxx_xxx_xxx)"/>
	</div>
	
	<div class="text-center">
	  <button type="submit" class="btn btn-primary">Send</button>
	</div>
	
      </div>
    </form>
  </div>
  
`}

var UnigeneForm = {
    data: function(){
	return {
	    unigene_id:null,
	}
    },
    computed: {
	unigeneAction: function() {
	    return "unigene/"+this.unigene_id+"/";
	}
    },
    props: ['csrf'],
    template:`
  <div class="row h-100 justify-content-center align-items-center">
    <form class="col-5 card" :action='unigeneAction' method='post'>
      <input type="hidden" name="csrfmiddlewaretoken" v-bind:value="csrf">
      <div class="card-header">
	<h5>Enter a GMGC unigene identifier (FORM B)</h5>
      </div>
      <div class="card-body">
	
	<div class="form-group">
	  <input v-model="unigene_id" class="form-control" id="unigene_id" name="unigene_id" placeholder="Unigene ID (xxx_xxx_xxx)"/>
	</div>
	<div class="text-center">
	  <button type="submit" class="btn btn-primary">Send</button>
	</div>
	
      </div>
    </form>
  </div>
`}

var ClusterData = {

    data: function(){
	return {
	    cluster_data:cluster_data,
        cluster_features
	}
    },
    props: ['csrf'],
    template:`

  <div>
    <div id='main' class="container">
        <h2>Cluster data</h2>
    </div>
    <div class="annoBlock col">
        <h3>Basic information</h3>
        <font face="Arial">
        <tr><th class="block">{{cluster_features.members.cl}}</th><td v-if="cluster_data.members">{{ cluster_data.members.cl }}</td><td v-else>No item</td></tr>
        <tr><th class="block">Pathway</th><td v-if="cluster_data.paths">{{ cluster_data.paths.psd }}</td><td v-else>No item</td></tr>
        <tr><th class="block">Suffixes</th><td v-if="cluster_data.suffixes">{{ cluster_data.suffixes.sfx }}</td><td v-else>No item</td></tr>
        </font>
        <div>
             <tr><th><font face="Arial">Members</font></th></tr>
                <div v-if="cluster_data.members">
                    <div v-if="cluster_data.members.clm">
                        <li v-for="member in cluster_data.members.clm">
                            <tr><th class="block"></th><td class="block"><a v-bind:href="'/gmgc/unigene/'+ member"> {{member}} </a></td></tr>
                        </li>
                    </div>
                    <div v-else>
                        <tr><th class="block"></th><td class="block"><a v-bind:href="'/gmgc/unigene/'+ cluster_data.members.cl"> {{cluster_data.members.cl}}</a></td></tr>
                    </div>
                 </div>
                 <tr v-else><th class="block"></th><td class="block">No item</td></tr>
        </div>
    </div>
    
    <div class="annoBlock col">
        <h3>Functional Annoation</h3>
            <div  v-if="cluster_data.members">
                <font color="blue" style="border-bottom:solid 1px #000000;">Cluster Members Annotation</font>
            </div>
                <div v-if="!cluster_data.members" class="block">No item</div>
                <div v-else>      
                    <tr><th width="300px" height="25px" nowrap><font face="Arial">{{ cluster_features.members.nu}}</font></th><td class="block">{{cluster_data.members.nu}}</td></tr>
                    <tr><th width="300px" height="25px" nowrap><font face="Arial">{{ cluster_features.members.hk}}</font></th><td class="block">{{cluster_data.members.hk}}</td></tr>
                    <tr><th width="300px" height="25px" nowrap><font face="Arial">{{ cluster_features.members.hu}}</font></th><td class="block">{{cluster_data.members.hu}}</td></tr>
                    <tr><th width="300px" height="25px" nowrap><font face="Arial">{{ cluster_features.members.nh}}</font></th><td class="block">{{cluster_data.members.nh}}</td></tr>
                    <tr><th width="300px" height="25px" nowrap><font face="Arial">{{ cluster_features.members.naa}}</font></th><td class="block">{{cluster_data.members.naa}}</td></tr>
                    <tr><th width="300px" height="25px" nowrap><font face="Arial">{{ cluster_features.members.al}}</font></th><td class="block">{{cluster_data.members.al}}</td></tr>
                    <tr><th width="300px" height="25px" nowrap><font face="Arial">{{ cluster_features.members.avl}}</font></th><td class="block">{{cluster_data.members.avl}}</td></tr>
                    <tr><th width="300px" height="25px" nowrap><font face="Arial">{{ cluster_features.members.lg}}</font></th><td class="block">{{cluster_data.members.lg}}</td></tr>
                    <tr><th width="300px" height="25px" nowrap><font face="Arial">{{ cluster_features.members.sm}}</font></th><td class="block">{{cluster_data.members.sm}}</td></tr>
                    <tr><th width="300px" height="25px" nowrap><font face="Arial">{{ cluster_features.members.mds}}</font></th><td class="block">{{cluster_data.members.mds}}</td></tr>
                    <tr><th width="300px" height="25px" nowrap><font face="Arial">{{ cluster_features.members.avi}}</font></th><td class="block">{{cluster_data.members.avi}}</td></tr>
                    <tr><th width="300px" height="25px" nowrap><font face="Arial">{{ cluster_features.members.mup}}</font></th><td class="block">{{cluster_data.members.mup}}</td></tr>
                    <tr><th width="300px" height="25px" nowrap><font face="Arial">{{ cluster_features.members.mrp}}</font></th><td class="block">{{cluster_data.members.mrp}}</td></tr>
                </div>
    </div>
  </div>
  
`}

var UnigeneData = {
    data: function(){
	return {
	    unigene:unigene_data,
	}
    },
    props: ['csrf'],
    template:`
  <div>
    <div id='main' class="container">
        <h2>Unigene data</h2>
    </div>
    <div class="annoBlock col">
        <h3>Basic information</h3>
        <font face="Arial">
        <tr><th class="block">Unigene</th><td v-if="unigene.clusters">{{ unigene.clusters.u }}</td><td v-else>No item</td></tr>
        <tr><th class="block">Cluster</th><td v-if="unigene.clusters"><a v-bind:href="'/gmgc/cluster/'+ unigene.clusters.cl">{{ unigene.clusters.cl }}</a></td><td v-else>No item</td></tr>
        <tr><th class="block">Sequence</th><td v-if="unigene.sequences">{{ unigene.sequences.sq }} </td><td v-else>No item</td></tr>
        <tr><th class="block">Suffixes</th><td v-if="unigene.suffixes">{{ unigene.suffixes.sfx }}</td><td v-else>No item</td></tr>
        </font>
    </div>
    
    <div class="annoBlock col">
    <h3>Functional annotation</h3>
        <div  v-if="unigene.emapper_v2">
          <font color="blue">eggNOG_v2 Annotation</font>
          <!--<div>{{ unigene.emapper_v2 }}</div>-->
          <div>
          <table rules="rows " style="border-top:solid 1px #000000;">
              <font face="Arial">
              <tr><th width="225px" height="30px" nowrap>Preferred_name</th><td class="block">{{unigene.emapper_v2.p_n}}</td></tr> 
              <tr><th width="225px" height="30px" nowrap>Seed_ortholog_score</th><td class="block">{{unigene.emapper_v2.s_o_s}}</td></tr>
              <tr><th width="225px" height="30px" nowrap>Seed_ortholog_evalue</th><td class="block">{{unigene.emapper_v2.s_o_e}}</td></tr>
              <tr><th width="225px" height="30px" nowrap>seed_eggNOG_ortholog</th><td class="block">{{unigene.emapper_v2.s_e_o}}</td></tr>
              <tr><th width="225px" height="30px" nowrap>COG</th><td class="block">{{unigene.emapper_v2.COG}}</td></tr>
              <tr><th width="225px" height="30px" nowrap>KEGG_ko</th><td class="block">{{unigene.emapper_v2.K_ko}}</td></tr>
              <tr><th width="225px" height="30px" nowrap>Best_tax_level</th><td class="block">{{unigene.emapper_v2.b_tax_l}}</td></tr>
              <tr><th width="225px" height="30px" nowrap>Annot_level_max</th><td class="block">{{unigene.emapper_v2.an_l_max}}</td></tr>
              <tr><th width="225px" height="30px" nowrap>KEGG_Pathway</th><td class="block">{{unigene.emapper_v2.K_P}}</td></tr>
              <tr><th width="225px" height="30px" nowrap>KEGG_Reaction</th><td class="block">{{unigene.emapper_v2.K_R}}</td></tr>
              <tr><th width="225px" height="30px" nowrap>KEGG_rclass</th><td class="block">{{unigene.emapper_v2.K_rc}}</td></tr>
              <tr><th width="225px" height="30px" nowrap>BiGG_Reaction</th><td class="block">{{unigene.emapper_v2.BiGG}}</td></tr>
              <tr><th width="225px" height="30px" nowrap>KEGG_Module</th><td class="block">{{unigene.emapper_v2.K_M}}</td></tr>
              <tr><th width="225px" height="30px" nowrap>bestOG</th><td class="block">{{unigene.emapper_v2.bOGs}}</td></tr>
              <tr><th width="225px" height="30px" nowrap>KEGG_TC</th><td class="block">{{unigene.emapper_v2.K_TC}}</td></tr>
              <tr><th width="225px" height="30px" nowrap>matching_OGs</th><td class="block">{{unigene.emapper_v2.OGs}}</td></tr>
              <tr><th width="225px" height="30px" nowrap>EC</th><td class="block">{{unigene.emapper_v2.EC}}</td></tr>
              <tr><th width="225px" height="30px" nowrap>Description</th><td>{{unigene.emapper_v2.ds}}</td></tr>
              <tr><th width="225px" height="30px" nowrap>BRITE</th><td class="block">{{unigene.emapper_v2.BRITE}}</td></tr>
              <tr><th width="225px" height="30px" nowrap>CAZy</th><td class="block">{{unigene.emapper_v2.CAZy}}</td></tr>
              <tr><th width="225px" height="30px" nowrap>GOs</th><td class="block">{{unigene.emapper_v2.GOs}}</td></tr>
              </font>
          </table>
          </div><div v-else>No emapper hit</div> 
        </div>
    
        <div v-if="unigene.pfam">
          <font color="blue">Pfam annotation</font>
          <!--<div>{{ unigene.pfam.pf }}</div>-->
          <div>
          <li v-for="object in unigene.pfam.pf">
                <table rules="rows " style="border-top:solid 1px #000000;">
                <font face="Arial">
                <tr><th width="225px" height="30px" nowrap>Domain</th><td>{{ object.n }}</td></tr>
                <tr><th width="225px" height="30px" nowrap>Start</th><td>{{ object.s }}</td></tr>
                <tr><th width="225px" height="30px" nowrap>End</th><td>{{ object.e }}</td></tr>
                <tr><th width="225px" height="30px" nowrap>E-value</th><td>{{ object.ev }}</td></tr>
                <tr><th width="225px" height="30px" nowrap>Hit score</th><td>{{ object.sc }}</td></tr>
                </font>
                <table>
          </li>
          </div>
        </div><div v-else><font color="blue">No Pfam hit</font></div>
    
        <div v-if="unigene.sprot_best">
          <font color="blue">SwissProt best hit</font>
          <!-- <div>{{ unigene.sprot_best.spb }}</div> -->
          <div> 
            <table rules="rows " style="border-top:solid 1px #000000;">
            <font face="Arial">
            <tr><th width="225px" height="30px" nowra>AC</th><td>{{ unigene.sprot_best.spb.n }}</td></tr>
            <tr><th width="225px" height="30px" nowra>Query coverage</th><td>{{ unigene.sprot_best.spb.qc }}</td></tr>
            <tr><th width="225px" height="30px" nowra>Target coverage</th><td>{{ unigene.sprot_best.spb.tc }}</td></tr>
            <tr><th width="225px" height="30px" nowra>Score</th><td>{{ unigene.sprot_best.spb.sc }}</td></tr>
            <tr><th width="225px" height="30px" nowra>E-value</th><td>{{ unigene.sprot_best.spb.ev }}</td></tr>
            <tr><th width="225px" height="30px" nowra>Percent identity</th><td>{{ unigene.sprot_best.spb.pi }}</td></tr>
            <tr><th width="225px" height="30px" nowra>Exact hit</th><td v-if="unigene.sprot_exact">{{ unigene.sprot_exact.spe }}</td><td v-else>no exact hit</td></tr>
            </font>
            <table>
          </div>
        </div><div v-else><font color="blue">No SwissProt hit</font></div>
    
        <div v-if="unigene.trembl_best">
          <font color="blue">Trembl best hit</font>
          <!-- <div>{{ unigene.trembl_best }}</div> -->
          <div>
            <table style="border-top:solid 1px #000000;">   
            <font face="Arial">
            <tr><th width="225px" height="30px" nowra>ID</th><td>{{ unigene.trembl_best.trb.n }}</td></tr>
            <tr><th width="225px" height="30px" nowra>Query coverage</th><td>{{ unigene.trembl_best.trb.qc }}</td></tr>
            <tr><th width="225px" height="30px" nowra>Target coverage</th><td>{{ unigene.trembl_best.trb.tc }}</td></tr>
            <tr><th width="225px" height="30px" nowra>Score</th><td>{{ unigene.trembl_best.trb.sc }}</td></tr>
            <tr><th width="225px" height="30px" nowra>E-value</th><td>{{ unigene.trembl_best.trb.ev }}</td>
            <tr><th width="225px" height="30px" nowra>Percent identity</th><td>{{ unigene.trembl_best.trb.pi }}</td></tr>
            </font>
            <table>
          </div>
        </div><div v-else><font color="blue">No Trembl hit</font></div>
    
    
        <div  v-if="unigene.neighbour">
          <font color="blue">Neighbourhood</font>
          <!--<div>{{ unigene.neighbour }}</div>-->
          <div>
          <table rules="rows " style="border-bottom:solid 1px #000000;">
            <tr><th width="300px" height="30px" nowrap> orf_name </th><td class="block">start</td><td class="block">end</td><td class="block">strand</td></tr>
          </table>
          <li v-for="object in unigene.neighbour.o">
            <font face="Arial">
            <tr><th width="300px" height="30px" nowrap>{{object.g}}</th><td class="block">{{object.s[0]}}</td><td class="block">{{object.s[1]}}</td><td class="block">{{object.s[2]}}</td></tr>
            </font>
          </li>
          </div>
        </div><div v-else><font color="blue">No Neighbourhood hit</font></div>
    </div>
  </div>
`}

var app = new Vue({
    delimiters: ['[[', ']]'],
    el: '#gmgcVueApp',
    components: {
        "cluster-form":ClusterForm,
        "unigene-form":UnigeneForm,
	"cluster-data":ClusterData,
	"unigene-data":UnigeneData,
    },
    data: {
        active_tool: "GMGC collection",
    },
})

// END
