// CPCantalapiedra 2019
var cluster_features = {
    members: {
        cl: "Cluster ID",
        clm: "Members",
        al: "al",
        hu: "hu",
        avl: "avl",
        hk: "hk",
        avi: "avi",
        mds: "mds",
        nh: "ng",
        lg: "lg",
        naa: "naa",
        mup: "mup",
        mrp: "mrp",
        sm: "sm",
        nu: "nu"
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
    <div>
        {{ cluster_features.members.cl }}
        <div v-if="cluster_data.members">{{ cluster_data.members.cl }}</div>
        <div v-else>No item</div>
    </div>
    
    <div>
      {{cluster_features.members.clm}}
      <div id="example-1">
        <div v-if="cluster_data.members">
            <div v-if="cluster_data.members.clm">
                <li v-for="member in cluster_data.members.clm">
                    <a v-bind:href="'/gmgc/unigene/'+ member"> {{member}} </a>
                </li>
            </div>
            <div v-else>
                <a v-bind:href="'/gmgc/unigene/'+ cluster_data.members.cl"> {{cluster_data.members.cl}}</a>
            </div>
        </div>
        <li v-else>No item</li>
      </div>
    </div>

    <div> Members Annotation </div>
    <div class="row">
        
        <li v-if="!cluster_data.members" class="block">No item</li>
        <li v-else
            v-for="(value, key) in cluster_data.members">
            <div v-if=" key !== 'cl' & key !== 'clm' " class="block">{{ cluster_features.members[key]}}
                <div v-if=" key !== 'cl' & key !== 'clm' " >{{ value }}</div>
            </div>
        </li>
    </div>
    
    <div>
        Pathway
        <li v-if="cluster_data.paths">{{ cluster_data.paths.psd }}</li>
        <div v-else>No item found</div>
    </div>
    
    <div>
        Suffiexes
        <li v-if="cluster_data.suffixes">{{ cluster_data.suffixes.sfx }}</li>
        <div v-else>No item found</div>
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
    
    <div>
      Unigene
      <div v-if="unigene.clusters.u">{{ unigene.clusters.u }}</div>
      <div v-else>No item</div>
    </div>
    <div>
      Cluster 
      <div><a v-bind:href="'/gmgc/cluster/'+ unigene.clusters.cl"> {{ unigene.clusters.cl }} </a></div>
    </div>
    <div>
      Sequence 
      <div v-if='unigene.sequences.sq'>{{ unigene.sequences.sq }}</div>
      <div v-else>No item</div>
    </div>
    <div>
      Suffixes
      <div v-if="unigene.suffixes.sfx">{{ unigene.suffixes.sfx }}</div>
      <div v-else>No item</div>
    </div>
    <div  v-if="unigene.emapper_v2">
      eggNOG_v2 Annotation 
      <!--<div>{{ unigene.emapper_v2 }}</div>-->
      <div>
      <table rules="rows">
          <tr><th class="block">p_n</th><td class="block">{{unigene.emapper_v2.p_n}}</td></tr> 
          <tr><th class="block">s_o_s</th><td class="block">{{unigene.emapper_v2.s_o_s}}</td></tr>
          <tr><th class="block">s_o_e</th><td class="block">{{unigene.emapper_v2.s_o_e}}</td></tr>
          <tr><th class="block">COG</th><td class="block">{{unigene.emapper_v2.COG}}</td></tr>
          <tr><th class="block">K_ko</th><td class="block">{{unigene.emapper_v2.K_ko}}</td></tr>
          <tr><th class="block">b_tax_l</th><td class="block">{{unigene.emapper_v2.b_tax_l}}</td></tr>
          <tr><th class="block">an_l_max</th><td class="block">{{unigene.emapper_v2.an_l_max}}</td></tr>
          <tr><th class="block">K_ko</th><td class="block">{{unigene.emapper_v2.K_ko}}</td></tr>
          <tr><th class="block">K_P</th><td class="block">{{unigene.emapper_v2.K_P}}</td></tr>
          <tr><th class="block">K_R</th><td class="block">{{unigene.emapper_v2.K_R}}</td></tr>
          <tr><th class="block">BiGG</th><td class="block">{{unigene.emapper_v2.BiGG}}</td></tr>
          <tr><th class="block">K_M</th><td class="block">{{unigene.emapper_v2.K_M}}</td></tr>
          <tr><th class="block">bOGs</th><td class="block">{{unigene.emapper_v2.bOGs}}</td></tr>
          <tr><th class="block">s_e_o</th><td class="block">{{unigene.emapper_v2.s_e_o}}</td></tr>
          <tr><th class="block">K_TC</th><td class="block">{{unigene.emapper_v2.K_TC}}</td></tr>
          <tr><th class="block">OGs</th><td class="block">{{unigene.emapper_v2.OGs}}</td></tr>
          <tr><th class="block">EC</th><td class="block">{{unigene.emapper_v2.EC}}</td></tr>
          <tr><th class="block">ds</th><td class="block">{{unigene.emapper_v2.ds}}</td></tr>
          <tr><th class="block">BRITE</th><td class="block">{{unigene.emapper_v2.BRITE}}</td></tr>
          <tr><th class="block">CAZy</th><td class="block">{{unigene.emapper_v2.CAZy}}</td></tr>
          <tr><th class="block">GOs</th><td class="block">{{unigene.emapper_v2.GOs}}</td></tr>
          <tr><th class="block">K_rc</th><td class="block">{{unigene.emapper_v2.K_rc}}</td></tr>
      </table>
      </div><div v-else>No emapper hit</div> 
    </div>
    
    <div v-if="unigene.pfam">
      Pfam domains
      <!--<div>{{ unigene.pfam.pf }}</div>-->
      <div>
      <li v-for="object in unigene.pfam.pf">
            <tr><th class="block">n</th><td class="block">{{ object.n }}</td></tr>
            <tr><th class="block">sc</th><td class="block">{{ object.sc }}</td></tr>
            <tr><th class="block">s</th><td class="block">{{ object.s }}</td></tr>
            <tr><th class="block">ev</th><td class="block">{{ object.ev }}</td></tr>
            <tr><th class="block">e</th><td class="block">{{ object.e }}</td></tr>
      </li>
      </div>
    </div><div v-else>No Pfam hit</div>
    
    <div v-if="unigene.sprot_best">
      SwissProt best hit 
      <!-- <div>{{ unigene.sprot_best.spb }}</div> -->
      <div> 
        <tr><th class="block">n</th><td class="block">{{ unigene.sprot_best.spb.n }}</td></tr>
        <tr><th class="block">ev</th><td class="block">{{ unigene.sprot_best.spb.ev }}</td></tr>
        <tr><th class="block">qc</th><td class="block">{{ unigene.sprot_best.spb.qc }}</td></tr>
        <tr><th class="block">sc</th><td class="block">{{ unigene.sprot_best.spb.sc }}</td></tr>
        <tr><th class="block">pi</th><td class="block">{{ unigene.sprot_best.spb.pi }}</td></tr>
        <tr><th class="block">tc</th><td class="block">{{ unigene.sprot_best.spb.tc }}</td></tr>
        <tr><th class="block">exact hit</th><td v-if="unigene.sprot_exact" class="block">{{ unigene.sprot_exact.spe }}</td><td v-else class="block">no exact hit</td></tr>
      </div>
    </div><div v-else>No SwissProt hit</div>
    
    <!--
    <div>
      SwissProt exact hit 
      <div>{{ unigene.sprot_exact.spe }}</div>   
    </div>
    -->
    <div v-if="unigene.trembl_best">
      Trembl best hit
      <!-- <div>{{ unigene.trembl_best }}</div> -->
      <div>   
        <tr><th class="block">n</th><td class="block">{{ unigene.trembl_best.trb.n }}</td></tr>
        <tr><th class="block">ev</th><td class="block">{{ unigene.trembl_best.trb.ev }}</td>
        <tr><th class="block">qc</th><td class="block">{{ unigene.trembl_best.trb.qc }}</td></tr>
        <tr><th class="block">sc</th><td class="block">{{ unigene.trembl_best.trb.sc }}</td></tr>
        <tr><th class="block">pi</th><td class="block">{{ unigene.trembl_best.trb.pi }}</td></tr>
        <tr><th class="block">tc</th><td class="block">{{ unigene.trembl_best.trb.tc }}</td></tr>
      </div>
    </div><div v-else>No Trembl hit</div>
    
    
    <div  v-if="unigene.neighbour">
      Neighbourhood
      <!--<div>{{ unigene.neighbour }}</div>-->
      <div>
      <tr><td class="block">start</td><td class="block">end</td><td class="block">strand</td><th class="block" width="pixels | %"> orf_name </th></tr>
      <li v-for="object in unigene.neighbour.o">
        <tr><td class="block">{{object.s[0]}}</td><td class="block">{{object.s[1]}}</td><td class="block">{{object.s[2]}}</td><th class="block" width="pixels | %">{{object.g}}</th></tr>
      </li>
      </div>
    </div><div v-else>No Neighbourhood hit</div>
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
