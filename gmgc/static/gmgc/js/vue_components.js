// CPCantalapiedra 2019
var cluster_features = {
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
        nu: "nu",
        psd: "psd",
        sfx: "suffixes"
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
	    cluster_data:cluster_data,
        cluster_features
	}
    },
    props: ['csrf'],
    template:`

  <div>
    <div class="row">
        <div class="block">
            {{ cluster_features.cl }}
            <ul>{{ cluster_data.cl }}</ul>
        </div>
        
        <div class="block">
          {{cluster_features.clm}}
          <ul id="example-1">
            <li v-for="member in cluster_data.clm">
                {{ member }}
            </li>
          </ul>
        </div>
    </div>
    
    
    <div class="row">
        <li v-for="(value, key) in cluster_data">
            <div v-if=" key !== 'cl' & key !== 'clm' " class="block">{{ cluster_features[key] }}
                <ul v-if=" key !== 'cl' & key !== 'clm' " >{{ value }}</ul>
            </div>
        </li>
    </div>
    
    <!--
    <div>
        Path way
        <ul>{{ cluster_data.psd }}</ul>
    </div>
    
    <div>
        Suffiexes
        <ul>{{ cluster_data.sfx }}</ul>
    </div>
    -->
    
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
