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
	    cluster:cluster_data,
        cluster_features
	}
    },
    props: ['csrf'],
    template:`
  <div>

    <div>{{ cluster_features.members.cl }}</div>
    <div>{{ cluster.cl }}</div>
    
    <div>
      {{cluster_features.members.clm}}
      <ul id="example-1">
	<li v-for="member in cluster.clm">
	  {{ member }}
	</li>
      </ul>
    </div>
    
    <li v-for="(value, key) in cluster">
        <div v-if=" key !== 'cl' & key !== 'clm' ">{{ cluster_features.members[key] }} : {{ value }}</div>
    </li>
    
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
    <div>Unigene data</div>
    <div>Unigene: {{ unigene.u }}</div>
    <div>
      Cluster: {{ unigene.cl }}
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
