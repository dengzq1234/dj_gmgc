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
        nu: "Num of Cluster members",
        nup: "Num of genes in Uniprot"
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
	    cluster_data:cluster_data,
        cluster_features
	}
    },
    props: ['csrf'],
    methods: {
        get_tree_image(){
            // let treepath = "/home/deng/Projects/ete_webplugin_py3/webplugin/test_data/6055.c100000_g1_i1_m.21185.nw";
            // let msapath = "/home/deng/Projects/ete_webplugin_py3/webplugin/test_data/6055.c100000_g1_i1_m.21185.faa";
            // get_tree_image(treepath, msapath, "0", "#img1");
            get_tree_image(cluster_data.tree.nw_path, cluster_data.tree.faa_path, "1", "#img1"); // load from path
        },
    },
    filters: {
          numFilter (value) {
            let realVal = ''
            if (value) {
              realVal = parseFloat(value).toFixed(5)
            } else {
              realVal = '--'
            }
            return realVal
          }
        },
    template:`

  <div>
    <div id='main' class="container">
        <h2>Cluster data</h2>
    </div>
    
    <div class="annoBlock col">
        <h3><a name="basic">Basic information</a></h3>
        <table width="1250" style="border: 1px solid #ccc">

        <font face="Arial">
        <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="30px" nowrap>{{cluster_features.members.cl}}</th><td v-if="cluster_data.members">{{ cluster_data.members.cl }}</td><td v-else>No item</td></tr>
        <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="30px" nowrap>Pathway</th><td v-if="cluster_data.paths">{{ cluster_data.paths.psd }}</td><td v-else>No item</td></tr>
        <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="30px" nowrap>Suffixes</th><td v-if="cluster_data.suffixes">{{ cluster_data.suffixes.sfx }}</td><td v-else>No item</td></tr>
        </font>
        
        <div>
             <tr style="border-bottom: 1px solid #ccc;">
                 <font face="Arial">
                 <th width="225px" height="30px" nowrap>Members</th>
                 <td v-if="cluster_data.members">
                        {{cluster_data.members.nu}} Members
                 </td><td v-else>No item</td>
                 </font>
              </tr>

              <div v-if="cluster_data.members">
                <div v-if="cluster_data.members.clm">
                    <li v-for="member in cluster_data.members.clm">
                         <tr><th width="225px" nowrap></th><td class="block"><a v-bind:href="'/gmgc/unigene/'+ member"> {{member}} </a></td></tr>
                    </li>
                </div>
                <div v-else>
                     <tr><th width="225px" nowrap></th><td class="block"><a v-bind:href="'/gmgc/unigene/'+ cluster_data.members.cl"> {{cluster_data.members.cl}}</a></td></tr>
                </div>
              <tr v-else><th class="block"></th><td class="block">No item</td></tr>
              </div>
        </div>
        </table>
    </div>
    
    <div class="annoBlock col">
        <h3><a name="num_sam">Cluster Source info</a></h3>
        
        <!-- title -->
        <div v-if="cluster_data.num_sam">
        <table width="1250" style="border: 1px solid #ccc">
        <font face="Arial">
        <tr style="border-bottom: 1px solid #ccc;text-align:center;"><th width="225px" height="30px" nowrap>Cluster ID</th><td class="block">{{ cluster_data.num_sam.cl }}</td></tr>
        <tr style="border-bottom: 1px solid #ccc;text-align:center;"><th width="225px" height="30px" nowrap>HUMAN_ORAL</th><td class="block">{{ cluster_data.num_sam.or }}</td></tr>      
        <tr style="border-bottom: 1px solid #ccc;text-align:center;"><th width="225px" height="30px" nowrap>HUMAN_NOSE</th><td class="block">{{ cluster_data.num_sam.nos }}</td></tr>
        <tr style="border-bottom: 1px solid #ccc;text-align:center;"><th width="225px" height="30px" nowrap>HUMAN_SKIN</th><td class="block">{{ cluster_data.num_sam.skin }}</td></tr> 
        <tr style="border-bottom: 1px solid #ccc;text-align:center;"><th width="225px" height="30px" nowrap>HUMAN_VAGINA</th><td class="block">{{ cluster_data.num_sam.vag }}</td></tr>
        <tr style="border-bottom: 1px solid #ccc;text-align:center;"><th width="225px" height="30px" nowrap>HUMAN_GUT</th><td class="block">{{ cluster_data.num_sam.gut }}</td></tr> 
        <tr style="border-bottom: 1px solid #ccc;text-align:center;"><th width="225px" height="30px" nowrap>CAT_GUT</th><td class="block">{{ cluster_data.num_sam.cat }}</td></tr>
        <tr style="border-bottom: 1px solid #ccc;text-align:center;"><th width="225px" height="30px" nowrap>DOG_GUT</th><td class="block">{{ cluster_data.num_sam.dog }}</td></tr>
        <tr style="border-bottom: 1px solid #ccc;text-align:center;"><th width="225px" height="30px" nowrap>MOUSE_GUT</th><td class="block">{{ cluster_data.num_sam.mous }}</td></tr>
        <tr style="border-bottom: 1px solid #ccc;text-align:center;"><th width="225px" height="30px" nowrap>PIG_GUT</th><td class="block">{{ cluster_data.num_sam.pig }}</td></tr>
        <tr style="border-bottom: 1px solid #ccc;text-align:center;"><th width="225px" height="30px" nowrap>BUILT</th><td class="block">{{ cluster_data.num_sam.bu }}</td></tr>
        <tr style="border-bottom: 1px solid #ccc;text-align:center;"><th width="225px" height="30px" nowrap>SOIL</th><td class="block">{{ cluster_data.num_sam.soil }}</td></tr>
        <tr style="border-bottom: 1px solid #ccc;text-align:center;"><th width="225px" height="30px" nowrap>MARINE</th><td class="block">{{ cluster_data.num_sam.mar }}</td></tr> 
        <tr style="border-bottom: 1px solid #ccc;text-align:center;"><th width="225px" height="30px" nowrap>FRESHWATER</th><td class="block">{{ cluster_data.num_sam.fw }}</td></tr> 
        <tr style="border-bottom: 1px solid #ccc;text-align:center;"><th width="225px" height="30px" nowrap>WASTEWATER</th><td class="block">{{ cluster_data.num_sam.was }}</td></tr>
        <!-- data -->
        </font>
        </div>
        <div v-else>No item</div>
        </table>
    </div>
    
    <div class="annoBlock col">
    <h3><a name="cluster_correlations">Cluster Correlations</a></h3>
        <div  v-if="cluster_data.metaG_corr_p.mG_corr_pearson">
              <table width="1250" style="border: 1px solid #ccc">
              <tr style="border-bottom: 1px solid #ccc"><th width="225px" height="35px" nowrap><font color="blue">MetaGenomic Pearson Correlations</font></th></tr>
              <div>
                <tr style="border-bottom: 1px solid #ccc;">
                
                    <th width="150px" height="35px" nowrap>Condition</th>
                    <th width="150px">num_c</th>
                    <th width="150px">mndp</th>
                    

                    <th  width="200px">pcm</th>
                    <th  width="200px">ppvm</th>
                    
                    <th  width="200px">scm</th>
                    <th  width="200px">spvm</th>
                    
                    <th  width="200px">pcme</th>
                    <th  width="200px">ppvme</th>
                    
                    <th  width="200px">scme</th>
                    <th  width="200px">spvme</th>

                    <th  width="200px">pcmax</th>
                    <th  width="200px">scmax</th>
                    
                    <th  width="200px">pcmin</th>
                    <th  width="200px">scmin</th>
                    
                    <th  width="200px">pcstd</th>
                    <th  width="200px">scstd</th>

                    
                </tr>
                <li v-for="object in cluster_data.metaG_corr_p.mG_corr_pearson">
                <font face="Arial">
                <tr style="border-bottom: 1px solid #ccc;">
                    <td width="225px" height="35px" nowrap class="block">{{ object.cond }}</td>
                    <td   width="225px" >{{ object.num_c }} </td>
                    <td   width="225px" >{{ object.mndp }} </td>
                    
                    <td   width="225px" >{{ object.pcm |numFilter}}</td>
                    <td   width="225px" >{{ object.ppvm |numFilter}}</td>
                    
                    <td   width="225px" >{{ object.scm |numFilter}}</td>
                    <td   width="225px" >{{ object.spvm |numFilter}}</td>
                    
                    <td   width="225px" >{{ object.pcme |numFilter}}</td>
                    <td   width="225px" >{{ object.ppvme |numFilter}}</td>
                    
                    <td   width="225px" >{{ object.scme |numFilter}}</td>
                    <td   width="225px" >{{ object.spvme |numFilter}}</td>

                    <td   width="225px" >{{ object.pcmax |numFilter}}</td>
                    <td   width="225px" >{{ object.scmax |numFilter}}</td>
                    
                    <td   width="225px" >{{ object.pcmin |numFilter}}</td>
                    <td   width="225px" >{{ object.scmin |numFilter}}</td>
                    
                    <td   width="225px" >{{ object.pcstd |numFilter}}</td>
                    <td   width="225px" >{{ object.scstd |numFilter}}</td>
                    
                </tr>
                </font>
                </li>
               </div>
              </table>
        </div>            
        <div v-else>No MetaG Pearson Correlations data</div>

        <div  v-if="cluster_data.metaG_corr_s.mG_corr_spearman">
              <table width="1250" style="border: 1px solid #ccc">
              <tr style="border-bottom: 1px solid #ccc"><th width="225px" height="35px" nowrap><font color="blue">MetaGenomic Spearman Correlations</font></th></tr>
              <div>
                <tr style="border-bottom: 1px solid #ccc;">
                
                    <th width="150px" height="35px" nowrap>Condition</th>
                    <th width="150px">num_c</th>
                    <th width="150px">mndp</th>
                    

                    <th  width="200px">pcm</th>
                    <th  width="200px">ppvm</th>
                    
                    <th  width="200px">scm</th>
                    <th  width="200px">spvm</th>
                    
                    <th  width="200px">pcme</th>
                    <th  width="200px">ppvme</th>
                    
                    <th  width="200px">scme</th>
                    <th  width="200px">spvme</th>

                    <th  width="200px">pcmax</th>
                    <th  width="200px">scmax</th>
                    
                    <th  width="200px">pcmin</th>
                    <th  width="200px">scmin</th>
                    
                    <th  width="200px">pcstd</th>
                    <th  width="200px">scstd</th>

                    
                </tr>
                <li v-for="object in cluster_data.metaG_corr_s.mG_corr_spearman">
                <font face="Arial">
                <tr style="border-bottom: 1px solid #ccc;">
                    <td width="225px" height="35px" nowrap class="block">{{ object.cond }}</td>
                    <td   width="225px" >{{ object.num_c }} </td>
                    <td   width="225px" >{{ object.mndp }} </td>
                    
                    <td   width="225px" >{{ object.pcm |numFilter}}</td>
                    <td   width="225px" >{{ object.ppvm |numFilter}}</td>
                    
                    <td   width="225px" >{{ object.scm |numFilter}}</td>
                    <td   width="225px" >{{ object.spvm |numFilter}}</td>
                    
                    <td   width="225px" >{{ object.pcme |numFilter}}</td>
                    <td   width="225px" >{{ object.ppvme |numFilter}}</td>
                    
                    <td   width="225px" >{{ object.scme |numFilter}}</td>
                    <td   width="225px" >{{ object.spvme |numFilter}}</td>

                    <td   width="225px" >{{ object.pcmax |numFilter}}</td>
                    <td   width="225px" >{{ object.scmax |numFilter}}</td>
                    
                    <td   width="225px" >{{ object.pcmin |numFilter}}</td>
                    <td   width="225px" >{{ object.scmin |numFilter}}</td>
                    
                    <td   width="225px" >{{ object.pcstd |numFilter}}</td>
                    <td   width="225px" >{{ object.scstd |numFilter}}</td>
                    
                </tr>
                </font>
                </li>
               </div>
              </table>
        </div>            
        <div v-else>No MetaG Spearman Correlations data</div>

        <div  v-if="cluster_data.metaT_corr_p.mT_corr_pearson">
              <table width="1250" style="border: 1px solid #ccc">
              <tr style="border-bottom: 1px solid #ccc"><th width="225px" height="35px" nowrap><font color="blue">MetaTransciptomics Pearson Correlations</font></th></tr>
              <div>
                <tr style="border-bottom: 1px solid #ccc;">
                
                    <th width="150px" height="35px" nowrap>Condition</th>
                    <th width="150px">num_c</th>
                    <th width="150px">mndp</th>
                    

                    <th  width="200px">pcm</th>
                    <th  width="200px">ppvm</th>
                    
                    <th  width="200px">scm</th>
                    <th  width="200px">spvm</th>
                    
                    <th  width="200px">pcme</th>
                    <th  width="200px">ppvme</th>
                    
                    <th  width="200px">scme</th>
                    <th  width="200px">spvme</th>

                    <th  width="200px">pcmax</th>
                    <th  width="200px">scmax</th>
                    
                    <th  width="200px">pcmin</th>
                    <th  width="200px">scmin</th>
                    
                    <th  width="200px">pcstd</th>
                    <th  width="200px">scstd</th>

                    
                </tr>
                <li v-for="object in cluster_data.metaT_corr_p.mT_corr_pearson">
                <font face="Arial">
                <tr style="border-bottom: 1px solid #ccc;">
                    <td width="225px" height="35px" class="block">{{ object.cond }}</td>
                    <td   width="225px" >{{ object.num_c }} </td>
                    <td   width="225px" >{{ object.mndp }} </td>
                    
                    <td   width="225px" >{{ object.pcm |numFilter}}</td>
                    <td   width="225px" >{{ object.ppvm |numFilter}}</td>
                    
                    <td   width="225px" >{{ object.scm |numFilter}}</td>
                    <td   width="225px" >{{ object.spvm |numFilter}}</td>
                    
                    <td   width="225px" >{{ object.pcme |numFilter}}</td>
                    <td   width="225px" >{{ object.ppvme |numFilter}}</td>
                    
                    <td   width="225px" >{{ object.scme |numFilter}}</td>
                    <td   width="225px" >{{ object.spvme |numFilter}}</td>

                    <td   width="225px" >{{ object.pcmax |numFilter}}</td>
                    <td   width="225px" >{{ object.scmax |numFilter}}</td>
                    
                    <td   width="225px" >{{ object.pcmin |numFilter}}</td>
                    <td   width="225px" >{{ object.scmin |numFilter}}</td>
                    
                    <td   width="225px" >{{ object.pcstd |numFilter}}</td>
                    <td   width="225px" >{{ object.scstd |numFilter}}</td>
                    
                </tr>
                </font>
                </li>
               </div>
              </table>
        </div>            
        <div v-else>No MetaT Pearson correlations data</div>

        <div  v-if="cluster_data.metaT_corr_s.mT_corr_spearman">
              <table width="1250" style="border: 1px solid #ccc">
              <tr style="border-bottom: 1px solid #ccc"><th width="225px" height="35px" nowrap><font color="blue">MetaTransciptomics Spearman Correlations</font></th></tr>
              <div>
                <tr style="border-bottom: 1px solid #ccc;">
                
                    <th width="150px" height="35px" nowrap>Condition</th>
                    <th width="150px">num_c</th>
                    <th width="150px">mndp</th>
                    

                    <th  width="200px">pcm</th>
                    <th  width="200px">ppvm</th>
                    
                    <th  width="200px">scm</th>
                    <th  width="200px">spvm</th>
                    
                    <th  width="200px">pcme</th>
                    <th  width="200px">ppvme</th>
                    
                    <th  width="200px">scme</th>
                    <th  width="200px">spvme</th>

                    <th  width="200px">pcmax</th>
                    <th  width="200px">scmax</th>
                    
                    <th  width="200px">pcmin</th>
                    <th  width="200px">scmin</th>
                    
                    <th  width="200px">pcstd</th>
                    <th  width="200px">scstd</th>

                    
                </tr>
                <li v-for="object in cluster_data.metaT_corr_s.mT_corr_spearman">
                <font face="Arial">
                <tr style="border-bottom: 1px solid #ccc;">
                    <td width="225px" height="35px" class="block">{{ object.cond }}</td>
                    <td   width="225px" >{{ object.num_c }} </td>
                    <td   width="225px" >{{ object.mndp }} </td>
                    
                    <td   width="225px" >{{ object.pcm |numFilter}}</td>
                    <td   width="225px" >{{ object.ppvm |numFilter}}</td>
                    
                    <td   width="225px" >{{ object.scm |numFilter}}</td>
                    <td   width="225px" >{{ object.spvm |numFilter}}</td>
                    
                    <td   width="225px" >{{ object.pcme |numFilter}}</td>
                    <td   width="225px" >{{ object.ppvme |numFilter}}</td>
                    
                    <td   width="225px" >{{ object.scme |numFilter}}</td>
                    <td   width="225px" >{{ object.spvme |numFilter}}</td>

                    <td   width="225px" >{{ object.pcmax |numFilter}}</td>
                    <td   width="225px" >{{ object.scmax |numFilter}}</td>
                    
                    <td   width="225px" >{{ object.pcmin |numFilter}}</td>
                    <td   width="225px" >{{ object.scmin |numFilter}}</td>
                    
                    <td   width="225px" >{{ object.pcstd |numFilter}}</td>
                    <td   width="225px" >{{ object.scstd |numFilter}}</td>
                    
                </tr>
                </font>
                </li>
               </div>
              </table>
        </div>            
        <div v-else>No MetaT Spearman correlations data</div>
    </div>
    
    
    <div class="annoBlock col">
        <h3><a name="stats">Cluster stats</a></h3>
        <table width="1250" style="border: 1px solid #ccc">   
            <tr v-if="cluster_data.members" style="border-bottom: 1px solid #ccc"><th width="300px" height="35px" nowrap><font color="blue"">Cluster Members stats</font></th></tr>
            <div v-if="!cluster_data.members" class="block">No item</div>
            <div v-else>
                   
                <font face="Arial">
                <tr style="border-bottom: 1px solid #ccc;"><th width="300px" height="30px" nowrap>{{ cluster_features.members.nu}}</th><td class="block">{{cluster_data.members.nu}}</td></tr>
                <tr style="border-bottom: 1px solid #ccc;"><th width="300px" height="30px" nowrap>{{ cluster_features.members.nup}}</th><td class="block">{{cluster_data.members.nup}}</td></tr>
                <tr style="border-bottom: 1px solid #ccc;"><th width="300px" height="30px" nowrap>{{ cluster_features.members.hk}}</th><td class="block">{{cluster_data.members.hk}}</td></tr>
                <tr style="border-bottom: 1px solid #ccc;"><th width="300px" height="30px" nowrap>{{ cluster_features.members.hu}}</th><td class="block">{{cluster_data.members.hu}}</td></tr>
                <tr style="border-bottom: 1px solid #ccc;"><th width="300px" height="30px" nowrap>{{ cluster_features.members.nh}}</th><td class="block">{{cluster_data.members.nh}}</td></tr>
                <tr style="border-bottom: 1px solid #ccc;"><th width="300px" height="30px" nowrap>{{ cluster_features.members.naa}}</th><td class="block">{{cluster_data.members.naa}}</td></tr>
                <tr style="border-bottom: 1px solid #ccc;"><th width="300px" height="30px" nowrap>{{ cluster_features.members.al}}</th><td class="block">{{cluster_data.members.al}}</td></tr>
                <tr style="border-bottom: 1px solid #ccc;"><th width="300px" height="30px" nowrap>{{ cluster_features.members.avl}}</th><td class="block">{{cluster_data.members.avl}}</td></tr>
                <tr style="border-bottom: 1px solid #ccc;"><th width="300px" height="30px" nowrap>{{ cluster_features.members.lg}}</th><td class="block">{{cluster_data.members.lg}}</td></tr>
                <tr style="border-bottom: 1px solid #ccc;"><th width="300px" height="30px" nowrap>{{ cluster_features.members.sm}}</th><td class="block">{{cluster_data.members.sm}}</td></tr>
                <tr style="border-bottom: 1px solid #ccc;"><th width="300px" height="30px" nowrap>{{ cluster_features.members.mds}}</th><td class="block">{{cluster_data.members.mds}}</td></tr>
                <tr style="border-bottom: 1px solid #ccc;"><th width="300px" height="30px" nowrap>{{ cluster_features.members.avi}}</th><td class="block">{{cluster_data.members.avi}}</td></tr>
                <tr style="border-bottom: 1px solid #ccc;"><th width="300px" height="30px" nowrap>{{ cluster_features.members.mup}}</th><td class="block">{{cluster_data.members.mup}}</td></tr>
                <tr style="border-bottom: 1px solid #ccc;"><th width="300px" height="30px" nowrap>{{ cluster_features.members.mrp}}</th><td class="block">{{cluster_data.members.mrp}}</td></tr>
                </font>
                
            </div>
        </table>
    </div>

    <div class="annoBlock col">                                                                                                                                                                                                   
        <!-- Server status -->                                                                                                                                                                              
        <h3><a name="tree">Tree visualization</a></h3>
        
        <!-- this will be the popup window with actions when the user clicks in the tree -->
        <div id="popup"></div>                                                       
        <!-- this indicates whether you have connection to the plugin ('alive') -->                                                                                                                       
        <div id='server_status'></div>                                             
        <!-- this is the red rectangle being shown when you hover over a gene name -->                                                                                                                         
        <div id="highlighter"></div>                                                                                                                                                     

        <!-- in the new version you could be interested in the get_tree_from_paths function -->
        <div v-if="cluster_data.tree">                                                                                
            <button type="button" class="psw" v-on:click='get_tree_image'>Check the Tree</button>     
        </div><div v-else>No tree</div>                                                                                                   
                                                                                                                                                                               
        <!-- ETE PLUGIN -->                                                                                                                                                                                 
        <div class="ete_image" id="img1"></div>          
                                                                                                                            
    </div>

  </div>
  
`}


var UnigeneData = {

    data: function(){
	return {
      unigene:unigene_data,
      AAisHidden: true,
      NAisHidden: true
	}
    },
    methods:{
      CopyToClipboard: function(containerid){
        if (document.selection) { 
            var range = document.body.createTextRange();
            range.moveToElementText(document.getElementById(containerid));
            range.select().createTextRange();
            document.execCommand("copy"); 
        
        } else if (window.getSelection) {
            var range = document.createRange();
             range.selectNode(document.getElementById(containerid));
             window.getSelection().addRange(range);
             document.execCommand("copy");
             alert("sequence copied") 
        }}
    },
    filters: {
        numFilter (value) {
        // 3 digits
        let realVal = parseFloat(value).toFixed(3)
        return realVal
        }
    },
    props: ['csrf'],
    template:`
  <div>
    <div id='main' class="container">
        <h2>Unigene data</h2>
    </div>
    <div class="annoBlock col">
    <h3><a name="basic">Basic information</a></h3>
    
        <table width="1250" style="border: 1px solid #ccc">
        <font face="Arial">
        <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="30px" nowrap>Unigene</th><td v-if="unigene.clusters" class="block">{{ unigene.clusters.u }}</td><td v-else>No item</td></tr>
        <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="30px" nowrap>Cluster</th><td v-if="unigene.clusters" class="block"><a v-bind:href="'/gmgc/cluster/'+ unigene.clusters.cl">{{ unigene.clusters.cl }}</a></td><td v-else>No item</td></tr>
        <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="30px" nowrap>Suffixes</th><td v-if="unigene.suffixes" class="block">{{ unigene.suffixes.sfx }}</td><td v-else>No item</td></tr>
        <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="30px" nowrap>antiPfam</th><td v-if="unigene.antipfam" class="block">Yes</td><td v-else class="block">No</td></tr>
        
        <a name="aa sequence"></a>
        <tr style="border-bottom: 1px solid #ccc;">
        <th width="225px" height="30px" nowrap>
          Protein Sequence <br> 
          <div v-if="AAisHidden"><my-button style="float:left;" v-on:click="AAisHidden = !AAisHidden">Display sequence</my-button></div>
          <div v-else><my-button style="float:left;" v-on:click="AAisHidden = !AAisHidden">Hide sequence</my-button></div>
        </th>
        
        <td v-if="unigene.sequences" width="1000px" height="30px">
          <div v-show='AAisHidden'>
            GMGC10.{{unigene.clusters.u}}.{{ unigene.suffixes.sfx }}
          </div>
          <div v-if="!AAisHidden" style='width: 100%; word-break: break-all;'>
            <my-button style="float:right;" @click="CopyToClipboard('aa')">Copy sequence</my-button><br>
            <font face="monospace" size="3" id='aa'>
            >GMGC10.{{unigene.clusters.u}}.{{ unigene.suffixes.sfx }}<br>{{ unigene.sequences.sq }}
            </font>
          </div>
        </td>
        <td v-else>No item</td>
        </tr>

        <a name="na sequence"></a>
        <tr style="border-bottom: 1px solid #ccc;">
        <th width="225px" height="30px" nowrap>
          Nucleic acid Sequence <br>
          <div v-if="NAisHidden"><my-button style='float:left;' v-on:click="NAisHidden = !NAisHidden">Display sequence</my-button></div> 
          <div v-else><my-button style="float:left;" v-on:click="NAisHidden = !NAisHidden">Hide sequence</my-button></div> 
        </th>  
          <td v-if="unigene.nt_seqs" width="1000px" height="30px">
              <div v-show='NAisHidden'>
                GMGC10.{{unigene.nt_seqs.u}}.{{ unigene.suffixes.sfx }}
              </div>

              <div v-if="!NAisHidden" style='width: 100%; word-break: break-all;'>
                <my-button style="float:right;" @click="CopyToClipboard('na')">Copy sequence</my-button><br>
                <font face="monospace" size="3" id='na'>
                  >GMGC10.{{unigene.nt_seqs.u}}.{{ unigene.suffixes.sfx }}<br>{{ unigene.nt_seqs.nt_sq }}
                </font>
              </div> 
          </td>
          <td v-else>No item</td>
        </tr>

        </font>
        </table>
    </div>
    
    <div class="annoBlock col">
    <h4><a name="source">Gene Source info</a></h4>
        <!-- title -->
        <div v-if="unigene.gene_count">
        <table width="1250" style="border: 1px solid #ccc">
        <font face="Arial">
        <tr style="border-bottom: 1px solid #ccc;text-align:center;"><th width="225px" height="30px" nowrap>UNIGENE </th><td class="block">{{ unigene.gene_count.u }}</td></tr>
        <tr style="border-bottom: 1px solid #ccc;text-align:center;">
            <th width="225px" height="30px" nowrap>MGS Source</th>
            <td v-if="unigene.gene_mgs" class="block"><li v-for="object in unigene.gene_mgs.mgs" class="block"><a v-bind:href="'/gmgc/mgs_gene/'+ object">{{ object }}</a></li></td>
            <td v-else>No item</td></td>
        </tr>
        
        <tr style="border-bottom: 1px solid #ccc;text-align:center;"><th width="225px" height="30px" nowrap>AMPLICON</th><td class="block">{{ unigene.gene_count.am }}</td></tr>
        <tr style="border-bottom: 1px solid #ccc;text-align:center;"><th width="225px" height="30px" nowrap>HUMAN_ORAL</th><td class="block">{{ unigene.gene_count.or }}</td></tr>
        <tr style="border-bottom: 1px solid #ccc;text-align:center;"><th width="225px" height="30px" nowrap>HUMAN_NOSE</th><td class="block">{{ unigene.gene_count.nos }}</td></tr>
        <tr style="border-bottom: 1px solid #ccc;text-align:center;"><th width="225px" height="30px" nowrap>HUMAN_SKIN</th><td class="block">{{ unigene.gene_count.skin }}</td></tr>
        <tr style="border-bottom: 1px solid #ccc;text-align:center;"><th width="225px" height="30px" nowrap>HUMAN_VAGINA</th><td class="block">{{ unigene.gene_count.vag }}</td></tr>
        <tr style="border-bottom: 1px solid #ccc;text-align:center;"><th width="225px" height="30px" nowrap>HUMAN_GUT</th><td class="block">{{ unigene.gene_count.gut}}</td></tr>
        <tr style="border-bottom: 1px solid #ccc;text-align:center;"><th width="225px" height="30px" nowrap>CAT_GUT</th><td class="block">{{ unigene.gene_count.cat }}</td></tr>
        <tr style="border-bottom: 1px solid #ccc;text-align:center;"><th width="225px" height="30px" nowrap>DOG_GUT</th> <td class="block">{{ unigene.gene_count.dog }}</td></tr>
        <tr style="border-bottom: 1px solid #ccc;text-align:center;"><th width="225px" height="30px" nowrap>MOUSE_GUT</th><td class="block">{{ unigene.gene_count.mous }}</td></tr>
        <tr style="border-bottom: 1px solid #ccc;text-align:center;"><th width="225px" height="30px" nowrap>PIG_GUT</th><td class="block">{{ unigene.gene_count.pig }}</td></tr>
        <tr style="border-bottom: 1px solid #ccc;text-align:center;"><th width="225px" height="30px" nowrap>BUILT</th><td class="block">{{ unigene.gene_count.bu }}</td></tr>
        <tr style="border-bottom: 1px solid #ccc;text-align:center;"><th width="225px" height="30px" nowrap>SOIL</th><td class="block">{{ unigene.gene_count.soil }}</td></tr>
        <tr style="border-bottom: 1px solid #ccc;text-align:center;"><th width="225px" height="30px" nowrap>MARINE</th><td class="block">{{ unigene.gene_count.mar }}</td></tr>
        <tr style="border-bottom: 1px solid #ccc;text-align:center;"><th width="225px" height="30px" nowrap>FRESHWATER</th><td class="block">{{ unigene.gene_count.fw }}</td></tr> 
        <tr style="border-bottom: 1px solid #ccc;text-align:center;"><th width="225px" height="30px" nowrap>WASTEWATER</th><td class="block">{{ unigene.gene_count.was }}</td></tr>
        <tr style="border-bottom: 1px solid #ccc;text-align:center;"><th width="225px" height="30px" nowrap>ISOLATE</th><td class="block">{{ unigene.gene_count.iso}}</td></tr>
        <!-- data -->
        </font>
        </div>
        <div v-else>No item</div>
        </table>
        
    </div>
    
    <div class="annoBlock col">
    <!-- for the taxo_map -->
    <h4conda><a name="taxa">Taxonomic rank</a></h4conda>
        <!-- title -->
        <div v-if="unigene.taxo_map">
        <table width="1250" style="border: 1px solid #ccc">
        <font face="Arial">
        <tr style="border-bottom: 1px solid #ccc;text-align:center;"><th width="225px" height="30px" nowrap>UNIGENE </th><td class="block">{{ unigene.taxo_map.u }}</td></tr>
        <tr style="border-bottom: 1px solid #ccc;text-align:center;"><th width="225px" height="30px" nowrap>Name </th><td class="block" nowrap>{{ unigene.taxo_map.n }}</td></tr>
        <tr style="border-bottom: 1px solid #ccc;text-align:center;"><th width="225px" height="30px" nowrap>Rank </th><td class="block">{{ unigene.taxo_map.r }}</td></tr>
        <tr style="border-bottom: 1px solid #ccc;text-align:center;"><th width="225px" height="30px" nowrap>Taxid </th><td class="block">{{ unigene.taxo_map.txid }}</td></tr>
        <!-- data -->
        </font>
        </table>
        <!-- for the taxo_map -->
        </div>
        <div v-else>No item</div>
    </div>
    
    <div class="annoBlock col">
    <h3><a name="correlations">Gene Correlations</a></h3>
        <div  v-if="unigene.metaG_corr.mG_corr">
              <table width="1250" style="border: 1px solid #ccc">
              <tr style="border-bottom: 1px solid #ccc"><th width="225px" height="35px" nowrap><font color="blue">MetaGenomic Correlations</font></th></tr>
              <div>
                <tr style="border-bottom: 1px solid #ccc;">
                    <th width="225px" height="35px" nowrap>Condition</th>
                    <th width="150px">Correlations obs_number</th>
                    <th  width="225px">PEARSON</th>
                    <th  width="225px">PEARSON_PVAL</th>
                    <th  width="225px">SPEARMAN</th>
                    <th  width="225px">SPEARMAN_PVAL</th>
                </tr>
                <li v-for="object in unigene.metaG_corr.mG_corr">
                <font face="Arial">
                <tr style="border-bottom: 1px solid #ccc;">
                    <td width="225px" height="35px" nowrap>{{ object.cond }}</td>
                    <td   class="block" >{{ object.num_c }} </td>
                    <td   width="225px" >{{ object.pc }}</td>
                    <td   width="225px" >{{ object.ppv }}</td>
                    <td   width="225px" >{{ object.sc }}</td>
                    <td   width="225px" >{{ object.spv }}</td>
                </tr>
                </font>
                </li>
               </div>
              </table>
        </div>            
        <div v-else>No MetaG correlations data</div>
        
        <div  v-if="unigene.metaT_corr.mT_corr">
              <table width="1250" style="border: 1px solid #ccc">
              <tr style="border-bottom: 1px solid #ccc"><th width="225px" height="35px" nowrap><font color="blue">MetaTranscriptomics Correlations</font></th></tr>
              <div>
                <tr style="border-bottom: 1px solid #ccc;">
                    <th width="225px" height="35px" nowrap>Condition</th>
                    <th width="150px">Correlations obs_number</th>
                    <th  width="225px">PEARSON</th>
                    <th  width="225px">PEARSON_PVAL</th>
                    <th  width="225px">SPEARMAN</th>
                    <th  width="225px">SPEARMAN_PVAL</th>
                </tr>
                <li v-for="object in unigene.metaT_corr.mT_corr">
                <font face="Arial">
                <tr style="border-bottom: 1px solid #ccc;">
                    <td width="225px" height="35px" nowrap>{{ object.cond }}</td>
                    <td   class="block" >{{ object.num_c }} </td>
                    <td   width="225px" >{{ object.pc }}</td>
                    <td   width="225px" >{{ object.ppv }}</td>
                    <td   width="225px" >{{ object.sc }}</td>
                    <td   width="225px" >{{ object.spv }}</td>
                </tr>
                </font>
                </li>
               </div>
              </table>
        </div>            
        <div v-else>No MetaT correlations data</div>
        
    </div>
    
    <div class="annoBlock col">
    <h3>Functional annotation</h3>
          <a name="eggnog"></a>
          <div  v-if="unigene.emapper_v2">
              <table width="1250" style="border: 1px solid #ccc">
              <tr style="border-bottom: 1px solid #ccc"><th width="225px" height="35px" nowrap><font color="blue">eggNOG_v2 Annotation</font></th></tr>
              <div>    
                  <font face="Arial">
                  <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>Preferred_name</th><td class="block">{{unigene.emapper_v2.p_n}}</td></tr> 
                  <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>Seed_ortholog_score</th><td class="block">{{unigene.emapper_v2.s_o_s}}</td></tr>
                  <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>Seed_ortholog_evalue</th><td class="block">{{unigene.emapper_v2.s_o_e}}</td></tr>
                  <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>seed_eggNOG_ortholog</th><td class="block">{{unigene.emapper_v2.s_e_o}}</td></tr>
                  <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>COG</th><td class="block">{{unigene.emapper_v2.COG}}</td></tr>
                  <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>KEGG_ko</th><td class="block">{{unigene.emapper_v2.K_ko}}</td></tr>
                  <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>Best_tax_level</th><td class="block">{{unigene.emapper_v2.b_tax_l}}</td></tr>
                  <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>Annot_level_max</th><td class="block">{{unigene.emapper_v2.an_l_max}}</td></tr>
                  <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>KEGG_Pathway</th><td class="block">{{unigene.emapper_v2.K_P}}</td></tr>
                  <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>KEGG_Reaction</th><td class="block">{{unigene.emapper_v2.K_R}}</td></tr>
                  <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>KEGG_rclass</th><td class="block">{{unigene.emapper_v2.K_rc}}</td></tr>
                  <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>BiGG_Reaction</th><td class="block">{{unigene.emapper_v2.BiGG}}</td></tr>
                  <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>KEGG_Module</th><td class="block">{{unigene.emapper_v2.K_M}}</td></tr>
                  <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>bestOG</th><td class="block">{{unigene.emapper_v2.bOGs}}</td></tr>
                  <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>KEGG_TC</th><td class="block">{{unigene.emapper_v2.K_TC}}</td></tr>
                  <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>matching_OGs</th><td class="block">{{unigene.emapper_v2.OGs}}</td></tr>
                  <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>EC</th><td class="block">{{unigene.emapper_v2.EC}}</td></tr>
                  <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>Description</th><td>{{unigene.emapper_v2.ds}}</td></tr>
                  <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>BRITE</th><td class="block">{{unigene.emapper_v2.BRITE}}</td></tr>
                  <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>CAZy</th><td class="block">{{unigene.emapper_v2.CAZy}}</td></tr>
                  <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>GOs</th><td class="block" style='width: 1000px;word-wrap:break-word;'>{{unigene.emapper_v2.GOs}}</td></tr>
                  </font>
                  </table>
              </div>
          <div v-else><font color="blue">No emapper hit</font></div> 
        
        <a name="sprot"></a>  
        <div v-if="unigene.sprot_best">
          <table width="1250" style="border: 1px solid #ccc">
          <tr style="border-bottom: 1px solid #ccc"><th width="225px" height="35px" nowrap><font color="blue">SwissProt best hit</font></th></tr>
          
          <div> 
            <font face="Arial">
            <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>AC</th><td><a v-bind:href="'https://www.uniprot.org/uniprot/'+ unigene.sprot_best.spb.n" target="_blank">{{ unigene.sprot_best.spb.n }}</a></td></tr>
            <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>Query coverage</th><td>{{ unigene.sprot_best.spb.qc }}</td></tr>
            <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>Target coverage</th><td>{{ unigene.sprot_best.spb.tc }}</td></tr>
            <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>Score</th><td>{{ unigene.sprot_best.spb.sc }}</td></tr>
            <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>E-value</th><td>{{ unigene.sprot_best.spb.ev }}</td></tr>
            <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>Percent identity</th><td>{{ unigene.sprot_best.spb.pi }}</td></tr>
            <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>Exact hit</th><td v-if="unigene.sprot_exact">{{ unigene.sprot_exact.spe }}</td><td v-else>no exact hit</td></tr>
            </font>
          </div>
          </table>
          
        </div><div v-else><font color="blue">No SwissProt hit</font></div>
        
        <a name="trembl"></a>
        <div v-if="unigene.trembl_best">
          <table width="1250" style="border: 1px solid #ccc">
          <tr style="border-bottom: 1px solid #ccc"><th width="225px" height="35px" nowrap><font color="blue">Trembl best hit</font></th></tr>

          <div> 
            <font face="Arial">
            <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>ID</th><td><a v-bind:href="'https://www.uniprot.org/uniprot/'+ unigene.trembl_best.trb.n" target="_blank">{{ unigene.trembl_best.trb.n }}</td></tr>
            <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>Query coverage</th><td>{{ unigene.trembl_best.trb.qc }}</td></tr>
            <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>Target coverage</th><td>{{ unigene.trembl_best.trb.tc }}</td></tr>
            <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>Score</th><td>{{ unigene.trembl_best.trb.sc }}</td></tr>
            <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>E-value</th><td>{{ unigene.trembl_best.trb.ev }}</td>
            <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>Percent identity</th><td>{{ unigene.trembl_best.trb.pi }}</td></tr>
            </font>
          </div>
          </table>
        </div><div v-else><font color="blue">No Trembl hit</font></div>
        
        <a name="intrinsic"></a>
        <div v-if="unigene.intrinsic">
          <table width="1250" style="border: 1px solid #ccc">
          <tr style="border-bottom: 1px solid #ccc"><th width="225px" height="35px" nowrap><font color="blue">Intrinsic features</font></th></tr>
          <div>
                <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap> Features </th><th class="block">Start</th><th class="block">End</th></tr>
                <li v-for="object in unigene.intrinsic.intr">
                <font face="Arial">
                <tr style="border-bottom: 1px solid #ccc;"><td width="225px" height="35px" nowrap>{{ object.n }}</td><td class="block">{{ object.s }}</td><td class="block">{{ object.e }}</td></tr>
                </font>
                </li>
          </div>
          </table>
        </div><div v-else><font color="blue">No Intrinsic hit</font></div>

        <a name="pfam"></a>
        <div v-if="unigene.pfam">
          <table width="1250" style="border: 1px solid #ccc">
          <tr style="border-bottom: 1px solid #ccc"><th width="225px" height="35px" nowrap><font color="blue">Pfam annotation</font></th></tr>
          <div>
                <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap> Domain </th><th class="block">Start</th><th class="block">End</th><th class="block">Hit score</th><th class="block">E-value</th></tr>
                <li v-for="object in unigene.pfam.pf">
                <font face="Arial">
                <tr style="border-bottom: 1px solid #ccc;"><td width="225px" height="35px" nowrap><a v-bind:href="'http://pfam.xfam.org/family/'+ object.n" target="_blank">{{ object.n }}</a></td><td class="block">{{ object.s }}</td><td class="block">{{ object.e }}</td><td class="block">{{ object.sc }}</td><td class="block" >{{ object.ev }}</td></tr>
                </font>
                </li>
          </div>
          </table>
        </div><div v-else><font color="blue">No Pfam hit</font></div>
        
        <a name="smart"></a>
        <div v-if="unigene.smart">
          <table width="1250" style="border: 1px solid #ccc">
          <tr style="border-bottom: 1px solid #ccc"><th width="225px" height="35px" nowrap><font color="blue">SMART annotation</font></th></tr>
          <div>
                <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap> Domain </th><th class="block">Start</th><th class="block">End</th><th class="block">Hit score</th><th class="block">E-value</th></tr>
                <li v-for="object in unigene.smart.sm">
                <font face="Arial">
                <tr style="border-bottom: 1px solid #ccc;"><td width="225px" height="35px" nowrap><a v-bind:href="'https://smart.embl.de/smart/do_annotation.pl?DOMAIN='+ object.n + '&BLAST=DUMMY'" target="_blank">{{ object.n }}</a></td><td class="block">{{ object.s }}</td><td class="block">{{ object.e }}</td><td class="block">{{ object.sc }}</td><td class="block" >{{ object.ev }}</td></tr>
                </font>
                </li>
          </div>
          </table>
        </div><div v-else><font color="blue">No SMART hit</font></div>


        <a name="neigh"></a>
        <div v-if="unigene.neigh_data">
          <table width="1250" style="border: 1px solid #ccc">
          <tr style="border-bottom: 1px solid #ccc"><th width="225px" height="35px" nowrap><font color="blue">Neighbour Prediction</font></th></tr>
          
          <div> 
            <font face="Arial">
            <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>Unigene</th><td>{{ unigene.neigh_data.u }}</td></tr>
            <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>query_keggs</th><td>{{ unigene.neigh_data.q_K }}</td></tr>
            <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>subject_keggs</th><td>{{ unigene.neigh_data.s_K }}</td></tr>
            <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>analysed_orfs</th><td>{{ unigene.neigh_data.a_orfs }}</td></tr>
            <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>neigh_genes</th><td>{{ unigene.neigh_data.n_g }}</td></tr>
            <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>neigh_with_keggs</th><td>{{ unigene.neigh_data.n_K }}</td></tr>
            <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>kegg_proportion</th><td>{{ unigene.neigh_data.K_p }}</td></tr>
            <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>presence_of_kegg</th><td>{{ unigene.neigh_data.p_K }}</td></tr>
            <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>hit_kegg_percentage</th><td>{{ unigene.neigh_data.ht_K_p }}</td></tr>
            <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="35px" nowrap>kegg_description</th><td>{{ unigene.neigh_data.K_d }}</td></tr>
            </font>
          </div>
          </table>

        </div><div v-else><font color="blue">No Neighbour Match</font></div>
        

        <a name="neigh_genes"></a>
        <div  v-if="unigene.neigh_data">
            <table width="1250" style="border: 1px solid #ccc">
            <tr style="border-bottom: 1px solid #ccc"><th width="225px" height="35px" nowrap><font color="blue">Neighbourhood genes prediction</font></th></tr>
            <font face="Arial">
            <div>
                <tr style="border-bottom: 1px solid #ccc;">
                    <th width="200px" height="35px">-2</th>
                    <th width="200px" height="35px">-1</th>
                    <th width="200px" height="35px">query unigene</th>
                    <th width="200px" height="35px">+1</th>
                    <th width="200px" height="35px">+2</th>
                </tr>
                <li v-for="object in unigene.neigh_data.predict_neighs">
                    <tr style="border-bottom: 1px solid #ccc;">
                        <td width="200px" >
                            <a v-bind:href="'/gmgc/unigene/'+ object.p_n[0][1]+ '/#eggnog'">{{object.p_n[0][1]}}</a><li v-for="kegg in object.p_n[0][2]" id="pic_list">{{kegg}}</li>
                        </td>
                        <td width="200px" >
                            <a v-bind:href="'/gmgc/unigene/'+ object.p_n[1][1]+ '/#eggnog'">{{object.p_n[1][1]}}</a><li v-for="kegg in object.p_n[1][2]" >{{kegg}}</li>
                        </td>
                        
                        <td width="200px" >{{unigene.clusters.u}}</td>
                        <td width="200px" >
                            <a v-bind:href="'/gmgc/unigene/'+ object.p_n[2][1]+ '/#eggnog'">{{object.p_n[2][1]}}</a><ul v-for="kegg in object.p_n[2][2]"><li>{{kegg}}</li></ul>
                        </td>
                        <td width="200px" >
                            <a v-bind:href="'/gmgc/unigene/'+ object.p_n[3][1]+ '/#eggnog'">{{object.p_n[3][1]}}</a><li v-for="kegg in object.p_n[3][2]" >{{kegg}}</li>
                        </td>
                    </tr>
                </li>
            </div>
            </font>
            </table>
        </div><div v-else><font color="blue">No Neighbour Gene Match</font></div>

        <a name="orf"></a>
        <div  v-if="unigene.neighbour">

          <table width="1250" style="border: 1px solid #ccc">
          <tr style="border-bottom: 1px solid #ccc"><th width="225px" height="35px" nowrap><font color="blue">Neighbourhood ORFs info</font></th></tr>
          
          <div>
            <tr style="border-bottom: 1px solid #ccc;"><th width="350px" height="35px" nowrap> ORF_name </th><th class="block">start</th><th class="block">end</th><th class="block">strand</th></tr>
          
          <li v-for="object in unigene.neighbour.o">
            <font face="Arial">
            <tr style="border-bottom: 1px solid #ccc;"><td width="350px" height="35px" nowrap>{{object.g}}</td><td class="block">{{object.s[0]}}</td><td class="block">{{object.s[1]}}</td><td class="block">{{object.s[2]}}</td></tr>
            </font>
          </li>
          </div>
          </table>

        </div><div v-else><font color="blue">No Neighbourhood ORFs hit</font></div>
    </div>
  </div>
`}

var MgsData = {

    data: function(){
	return {
	    mgs_data:mgs_data,
	}
    },
    props: ['csrf'],
    template:`

  <div>
    <div id='main' class="container">
        <h2>MGS data</h2>
    </div>
    
    <div class="annoBlock col">
        <table width="1250" style="border: 1px solid #ccc">
        <font face="Arial">
        <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="30px" nowrap>MGS ID</th><td v-if="mgs_data">{{ mgs_data.mgs }}</td><td v-else>No item</td></tr>
        <tr style="border-bottom: 1px solid #ccc;"><th width="225px" height="30px" nowrap>Unigene members</th><td v-if="mgs_data"><li v-for="u in mgs_data.u"><a v-bind:href="'/gmgc/unigene/'+ u">{{ u }}</a></li></td><td v-else>No item</td></tr>
        </font>
        </table>
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
        "mgs-data":MgsData,
    },
    data: {
        active_tool: "GMGC collection",
    },
})

// END

