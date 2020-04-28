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
    <div class="row">
      <div class="col-xl-6">
        <div class="m-portlet">
          <div class="m-portlet__head">
            <div class="m-portlet__head-caption">
                <div class="m-portlet__head-title">

                    <span class="m-portlet__head-icon m--hide">
                        <i class="la la-gear"></i>
                    </span>
                    <h3>
                        Search GMGC Cluster catalog
                    </h3>

                </div>
            </div>
          </div>
          <form class="m-form" :action='clusterAction' method='post'>
            <input type="hidden" name="csrfmiddlewaretoken" v-bind:value="csrf">
            <div class="m-portlet__body">
              <div class="m-form__section m-form__section--first">
                <div class="form-group m-form__group">
                  <label>Enter a GMGC identifier</label>
                  <div class="form-group">
                    <input v-model="cluster_id" class="form-control" id="cluster_id" name="cluster_id" placeholder="Cluster ID (xxx_xxx_xxx)"/>
                  </div>
                </div>
              </div>
            </div>

            <div class="m-portlet__foot m-portlet__foot--fit">
              <div class="m-form__actions m-form__actions">
                <button type="submit" class="btn btn-primary">Send</button>
                <button type="reset" class="btn btn-secondary">Cancel</button>
              </div>
            </div>
        
            </div>
          </form>
        </div>
      </div>
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
    <div class="row">
    <div class="col-xl-6">
      <div class="m-portlet">
        <div class="m-portlet__head">
          <div class="m-portlet__head-caption">
              <div class="m-portlet__head-title">

                  <span class="m-portlet__head-icon m--hide">
                      <i class="la la-gear"></i>
                  </span>
                  <h3>
                      Search GMGC Unigene catalog
                  </h3>

              </div>
          </div>
        </div>
        <form class="m-form" :action='unigeneAction' method='post'>
          <input type="hidden" name="csrfmiddlewaretoken" v-bind:value="csrf">
          <div class="m-portlet__body">
            <div class="m-form__section m-form__section--first">
              <div class="form-group m-form__group">
                <label>Enter a GMGC identifier</label>
                <div class="form-group">
                <input v-model="unigene_id" class="form-control" id="unigene_id" name="unigene_id" placeholder="Unigene ID (xxx_xxx_xxx)"/>
                </div>
              </div>
            </div>
          </div>

          <div class="m-portlet__foot m-portlet__foot--fit">
            <div class="m-form__actions m-form__actions">
              <button type="submit" class="btn btn-primary">Send</button>
              <button type="reset" class="btn btn-secondary">Cancel</button>
            </div>
          </div>
      
          </div>
        </form>
      </div>
    </div>
  </div>
`}

var ClusterData = {

    data: function(){
	return {
      cluster_data:cluster_data,
      MembersisHidden:true,
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
    <div class="row">
    <!--basic information-->
    <div class="row">
      <div class="annoBlock col">
        <div class="m-portlet">
          <div class="m-portlet__head">
              <div class="m-portlet__head-caption">
                  <div class="m-portlet__head-title">
                      <span class="m-portlet__head-icon m--hide">
                          <i class="la la-gear"></i>
                      </span>
                      
                      <h3>
                          Basic information
                      </h3>

                  </div>
                </div>
            </div>
          
      
          <div class="m-portlet__body">
            
            <table role="grid" class="table">
            <!--table table-striped- table-bordered table-hover table-checkable dataTable no-footer dtr-inline-->
            <tr ><th >{{cluster_features.members.cl}}</th><td v-if="cluster_data.members">{{ cluster_data.members.cl }}</td><td v-else>No item</td></tr>
            <tr ><th >Pathway</th><td v-if="cluster_data.paths">{{ cluster_data.paths.psd }}</td><td v-else>No item</td></tr>
            <tr ><th >Suffixes</th><td v-if="cluster_data.suffixes">{{ cluster_data.suffixes.sfx }}</td><td v-else>No item</td></tr>

            <tr>
              <th >Members</th>
              <td v-if="cluster_data.members">
                <div v-if="MembersisHidden">
                    <div v-on:click="MembersisHidden = !MembersisHidden" style="color: blue"> {{cluster_data.members.nu}} Members </div>
                </div>
                <div v-if="!MembersisHidden">
                  <div v-on:click="MembersisHidden = !MembersisHidden"> {{cluster_data.members.nu}} Members </div>
                  <div v-if="cluster_data.members">
                    <div v-if="cluster_data.members.clm">
                      <li v-for="member in cluster_data.members.clm"><a v-bind:href="'/gmgc/unigene/'+ member"> {{member}} </a></li>
                    </div>
                  </div>
                </div>
              </td>
              <td v-else>No item</td>
            </tr>
            </table>
          </div> <!-- finish portlet__body-->
        </div> <!-- finish portlet-->
      </div> <!-- annoBlock col-->    
    </div> <!-- finish row -->
    
    <!--Cluster Source info-->
    <div class="row">
      <div class="annoBlock col">
        <div class="m-portlet">
            <div class="m-portlet__head">
                <div class="m-portlet__head-caption">
                    <div class="m-portlet__head-title">
                        <span class="m-portlet__head-icon m--hide">
                            <i class="la la-gear"></i>
                        </span>
                        
                        <h3>
                            Cluster Source infomation
                        </h3>

                    </div>
                </div>
            </div>
          
          <!-- title -->
          <div class="m-portlet__body">
            <div v-if="cluster_data.num_sam">
              <table role="grid" class="table">

                <tr ><th >Cluster ID</th><td >{{ cluster_data.num_sam.cl }}</td></tr>
                <tr ><th >HUMAN_ORAL</th><td >{{ cluster_data.num_sam.or }}</td></tr>      
                <tr ><th >HUMAN_NOSE</th><td >{{ cluster_data.num_sam.nos }}</td></tr>
                <tr ><th >HUMAN_SKIN</th><td >{{ cluster_data.num_sam.skin }}</td></tr> 
                <tr ><th >HUMAN_VAGINA</th><td >{{ cluster_data.num_sam.vag }}</td></tr>
                <tr ><th >HUMAN_GUT</th><td >{{ cluster_data.num_sam.gut }}</td></tr> 
                <tr ><th >CAT_GUT</th><td >{{ cluster_data.num_sam.cat }}</td></tr>
                <tr ><th >DOG_GUT</th><td >{{ cluster_data.num_sam.dog }}</td></tr>
                <tr ><th >MOUSE_GUT</th><td >{{ cluster_data.num_sam.mous }}</td></tr>
                <tr ><th >PIG_GUT</th><td >{{ cluster_data.num_sam.pig }}</td></tr>
                <tr ><th >BUILT</th><td >{{ cluster_data.num_sam.bu }}</td></tr>
                <tr ><th >SOIL</th><td >{{ cluster_data.num_sam.soil }}</td></tr>
                <tr ><th >MARINE</th><td >{{ cluster_data.num_sam.mar }}</td></tr> 
                <tr ><th >FRESHWATER</th><td >{{ cluster_data.num_sam.fw }}</td></tr> 
                <tr ><th >WASTEWATER</th><td >{{ cluster_data.num_sam.was }}</td></tr>
                <!-- data -->
              
              </table>
            </div>
            <div v-else>No item</div>
          </div> <!-- m-portlet__body -->
        </div> <!-- m-portlet -->
      </div>  <!-- block -->
    </div> <!-- row -->
    
    <!-- Cluster stats -->
    <div class="row">
      <div class="annoBlock col">
        <div class="m-portlet">
          <div class="m-portlet__head">
              <div class="m-portlet__head-caption">
                  <div class="m-portlet__head-title">
                      <span class="m-portlet__head-icon m--hide">
                          <i class="la la-gear"></i>
                      </span>
                      
                      <h3>
                        Cluster Stats
                      </h3>

                  </div>
              </div>
          </div>

          <div class="m-portlet__body">
            <table role="grid" class="table">   
                <!--<tr v-if="cluster_data.members" ><th ><font color="blue">Cluster Members stats</font></th></tr>-->

                <tr ><th >{{ cluster_features.members.nu}}</th><td >{{cluster_data.members.nu}}</td></tr>
                <tr ><th >{{ cluster_features.members.nup}}</th><td >{{cluster_data.members.nup}}</td></tr>
                <tr ><th >{{ cluster_features.members.hk}}</th><td >{{cluster_data.members.hk}}</td></tr>
                <tr ><th >{{ cluster_features.members.hu}}</th><td >{{cluster_data.members.hu}}</td></tr>
                <tr ><th >{{ cluster_features.members.nh}}</th><td >{{cluster_data.members.nh}}</td></tr>
                <tr ><th >{{ cluster_features.members.naa}}</th><td >{{cluster_data.members.naa}}</td></tr>
                <tr ><th >{{ cluster_features.members.al}}</th><td >{{cluster_data.members.al}}</td></tr>
                <tr ><th >{{ cluster_features.members.avl}}</th><td >{{cluster_data.members.avl}}</td></tr>
                <tr ><th >{{ cluster_features.members.lg}}</th><td >{{cluster_data.members.lg}}</td></tr>
                <tr ><th >{{ cluster_features.members.sm}}</th><td >{{cluster_data.members.sm}}</td></tr>
                <tr ><th >{{ cluster_features.members.mds}}</th><td >{{cluster_data.members.mds}}</td></tr>
                <tr ><th >{{ cluster_features.members.avi}}</th><td >{{cluster_data.members.avi}}</td></tr>
                <tr ><th >{{ cluster_features.members.mup}}</th><td >{{cluster_data.members.mup}}</td></tr>
                <tr ><th >{{ cluster_features.members.mrp}}</th><td >{{cluster_data.members.mrp}}</td></tr>

                
                <tr v-if="!cluster_data.members" ><th ><font color="blue">No item</font></th></tr>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!--Cluster Correlations-->
    <div class="row">
      <div class="annoBlock col">
        <div class="m-portlet">

          <div class="m-portlet__head">
            <div class="m-portlet__head-caption">
              <div class="m-portlet__head-title">
                  <span class="m-portlet__head-icon m--hide">
                      <i class="la la-gear"></i>
                    </span>
                      
                  <h3>
                    Cluster Correlations
                  </h3>

              </div>
            </div>
          </div>

          <div class="m-portlet__body">
            <!-- start MetaGenomic Pearson Correlations -->
            <div v-if="cluster_data.metaG_corr_p.mG_corr_pearson">
              <div class="table-responsive">
                <table class="horizontal_table VueTables__table table-striped table-bordered table-emapper">
                <caption style="color: blue">MetaGenomic Pearson Correlations</caption>
                  <thead>
                    <tr>
                      <th >Condition</th>
                      <th >num_c</th>
                      <th >mndp</th>
                      <th >pcm</th>
                      <th >ppvm</th>        
                      <th >scm</th>
                      <th >spvm</th>               
                      <th >pcme</th>
                      <th >ppvme</th>                
                      <th >scme</th>
                      <th >spvme</th>
                      <th >pcmax</th>
                      <th >scmax</th>               
                      <th >pcmin</th>
                      <th >scmin</th>           
                      <th >pcstd</th>
                      <th >scstd</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="object in cluster_data.metaG_corr_p.mG_corr_pearson">
                        
                        <td >{{ object.cond }}</td>
                        <td >{{ object.num_c }} </td>
                        <td >{{ object.mndp }} </td>
                        
                        <td >{{ object.pcm |numFilter}}</td>
                        <td >{{ object.ppvm |numFilter}}</td>
                        
                        <td >{{ object.scm |numFilter}}</td>
                        <td >{{ object.spvm |numFilter}}</td>
                        
                        <td >{{ object.pcme |numFilter}}</td>
                        <td >{{ object.ppvme |numFilter}}</td>
                        
                        <td >{{ object.scme |numFilter}}</td>
                        <td >{{ object.spvme |numFilter}}</td>

                        <td >{{ object.pcmax |numFilter}}</td>
                        <td >{{ object.scmax |numFilter}}</td>
                        
                        <td >{{ object.pcmin |numFilter}}</td>
                        <td >{{ object.scmin |numFilter}}</td>
                        
                        <td >{{ object.pcstd |numFilter}}</td>
                        <td >{{ object.scstd |numFilter}}</td>
                        
                    </tr>
                  </tbody>
              </table>
            </div>            
          </div>
            <div v-else>No MetaG Pearson Correlations data</div> 
          <!-- End MetaGenomic Pearson Correlations -->
          
          <!-- Start MetaGenomic Spearman Correlations -->
          <div v-if="cluster_data.metaG_corr_s.mG_corr_spearman">
              <div class="table-responsive">
                <table class="horizontal_table VueTables__table table-striped table-bordered table-emapper">
                <caption style="color: blue">MetaGenomic Spearman Correlations</caption>
                  <thead>
                    <tr>
                      <th >Condition</th>
                      <th >num_c</th>
                      <th >mndp</th>
                      <th >pcm</th>
                      <th >ppvm</th>        
                      <th >scm</th>
                      <th >spvm</th>               
                      <th >pcme</th>
                      <th >ppvme</th>                
                      <th >scme</th>
                      <th >spvme</th>
                      <th >pcmax</th>
                      <th >scmax</th>               
                      <th >pcmin</th>
                      <th >scmin</th>           
                      <th >pcstd</th>
                      <th >scstd</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="object in cluster_data.metaG_corr_s.mG_corr_spearman">
                        
                        <td >{{ object.cond }}</td>
                        <td >{{ object.num_c }} </td>
                        <td >{{ object.mndp }} </td>
                        
                        <td >{{ object.pcm |numFilter}}</td>
                        <td >{{ object.ppvm |numFilter}}</td>
                        
                        <td >{{ object.scm |numFilter}}</td>
                        <td >{{ object.spvm |numFilter}}</td>
                        
                        <td >{{ object.pcme |numFilter}}</td>
                        <td >{{ object.ppvme |numFilter}}</td>
                        
                        <td >{{ object.scme |numFilter}}</td>
                        <td >{{ object.spvme |numFilter}}</td>

                        <td >{{ object.pcmax |numFilter}}</td>
                        <td >{{ object.scmax |numFilter}}</td>
                        
                        <td >{{ object.pcmin |numFilter}}</td>
                        <td >{{ object.scmin |numFilter}}</td>
                        
                        <td >{{ object.pcstd |numFilter}}</td>
                        <td >{{ object.scstd |numFilter}}</td>
                        
                    </tr>
                  </tbody>
              </table>
            </div>            
          </div>
            <div v-else>No MetaG Spearman Correlations data</div>
          <!-- End MetaGenomic Spearman Correlations -->

          <!-- Start MetaTransciptomics Pearson Correlations -->
          <div v-if="cluster_data.metaT_corr_p.mT_corr_pearson">
              <div class="table-responsive">
                <table class="horizontal_table VueTables__table table-striped table-bordered table-emapper">
                <caption style="color: blue">MetaTransciptomics Pearson Correlations</caption>
                  <thead>
                    <tr>
                      <th >Condition</th>
                      <th >num_c</th>
                      <th >mndp</th>
                      <th >pcm</th>
                      <th >ppvm</th>        
                      <th >scm</th>
                      <th >spvm</th>               
                      <th >pcme</th>
                      <th >ppvme</th>                
                      <th >scme</th>
                      <th >spvme</th>
                      <th >pcmax</th>
                      <th >scmax</th>               
                      <th >pcmin</th>
                      <th >scmin</th>           
                      <th >pcstd</th>
                      <th >scstd</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="object in cluster_data.metaT_corr_p.mT_corr_pearson">
                        
                        <td >{{ object.cond }}</td>
                        <td >{{ object.num_c }} </td>
                        <td >{{ object.mndp }} </td>
                        
                        <td >{{ object.pcm |numFilter}}</td>
                        <td >{{ object.ppvm |numFilter}}</td>
                        
                        <td >{{ object.scm |numFilter}}</td>
                        <td >{{ object.spvm |numFilter}}</td>
                        
                        <td >{{ object.pcme |numFilter}}</td>
                        <td >{{ object.ppvme |numFilter}}</td>
                        
                        <td >{{ object.scme |numFilter}}</td>
                        <td >{{ object.spvme |numFilter}}</td>

                        <td >{{ object.pcmax |numFilter}}</td>
                        <td >{{ object.scmax |numFilter}}</td>
                        
                        <td >{{ object.pcmin |numFilter}}</td>
                        <td >{{ object.scmin |numFilter}}</td>
                        
                        <td >{{ object.pcstd |numFilter}}</td>
                        <td >{{ object.scstd |numFilter}}</td>
                        
                    </tr>
                  </tbody>
              </table>
            </div>            
          </div>
            <div v-else>No MetaT Pearson Correlations data</div>
          <!-- End MetaTransciptomics Pearson Correlations -->

          <!-- Start MetaTransciptomics Spearman Correlations -->
          <div v-if="cluster_data.metaT_corr_s.mT_corr_spearman">
              <div class="table-responsive">
                <table class="horizontal_table VueTables__table table-striped table-bordered table-emapper">
                <caption style="color: blue">MetaTransciptomics Spearman Correlations</caption>
                  <thead>
                    <tr>
                      <th >Condition</th>
                      <th >num_c</th>
                      <th >mndp</th>
                      <th >pcm</th>
                      <th >ppvm</th>        
                      <th >scm</th>
                      <th >spvm</th>               
                      <th >pcme</th>
                      <th >ppvme</th>                
                      <th >scme</th>
                      <th >spvme</th>
                      <th >pcmax</th>
                      <th >scmax</th>               
                      <th >pcmin</th>
                      <th >scmin</th>           
                      <th >pcstd</th>
                      <th >scstd</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="object in cluster_data.metaT_corr_s.mT_corr_spearman">
                        
                        <td >{{ object.cond }}</td>
                        <td >{{ object.num_c }} </td>
                        <td >{{ object.mndp }} </td>
                        
                        <td >{{ object.pcm |numFilter}}</td>
                        <td >{{ object.ppvm |numFilter}}</td>
                        
                        <td >{{ object.scm |numFilter}}</td>
                        <td >{{ object.spvm |numFilter}}</td>
                        
                        <td >{{ object.pcme |numFilter}}</td>
                        <td >{{ object.ppvme |numFilter}}</td>
                        
                        <td >{{ object.scme |numFilter}}</td>
                        <td >{{ object.spvme |numFilter}}</td>

                        <td >{{ object.pcmax |numFilter}}</td>
                        <td >{{ object.scmax |numFilter}}</td>
                        
                        <td >{{ object.pcmin |numFilter}}</td>
                        <td >{{ object.scmin |numFilter}}</td>
                        
                        <td >{{ object.pcstd |numFilter}}</td>
                        <td >{{ object.scstd |numFilter}}</td>
                        
                    </tr>
                  </tbody>
              </table>
            </div>            
          </div>
            <div v-else>No MetaT Spearman Correlations data</div>
          <!-- End MetaTransciptomics Spearman Correlations -->


          </div><!-- close m-portlet__body -->
        </div> <!-- close m-portlet -->
      </div> <!-- close block -->
    </div> <!-- close row -->
    
    <!-- Tree visualization -->
    <div class="row">
      <div class="annoBlock col">
        <div class="m-portlet">                                                                                                                                                                                                
            <!-- Server status -->
            <div class="m-portlet__head">
                <div class="m-portlet__head-caption">
                    <div class="m-portlet__head-title">
                        <span class="m-portlet__head-icon m--hide">
                            <i class="la la-gear"></i>
                        </span>
                        
                        <h3>
                          Tree visualization
                        </h3>

                    </div>
                </div>
            </div>                                                                                                                                                                              
            
            <div class="m-portlet__body">
              <!-- this indicates whether you have connection to the plugin ('alive') -->                                                                                                                       
              <div id='server_status'></div> 
              
              <!-- this will be the popup window with actions when the user clicks in the tree -->
              <div id="popup"></div>                                                       
                                                          
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
      </div>
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
  <div class="row">
    <!-- Basic information -->
    <div class="row">
      <div class="annoBlock col">
        <div class="m-portlet">
          <div class="m-portlet__head">
                  <div class="m-portlet__head-caption">
                      <div class="m-portlet__head-title">
                          <span class="m-portlet__head-icon m--hide">
                              <i class="la la-gear"></i>
                          </span>
                          
                          <h3>
                              Basic information
                          </h3>

                      </div>
                  </div>
              </div>

          <div class="m-portlet__body">
          <table role="grid" class="table">
          
            <tr ><th >Unigene</th><td v-if="unigene.clusters" >{{ unigene.clusters.u }}</td><td v-else>No item</td></tr>
            <tr ><th >Cluster</th><td v-if="unigene.clusters" ><a v-bind:href="'/gmgc/cluster/'+ unigene.clusters.cl">{{ unigene.clusters.cl }}</a></td><td v-else>No item</td></tr>
            <tr ><th >Suffixes</th><td v-if="unigene.suffixes" >{{ unigene.suffixes.sfx }}</td><td v-else>No item</td></tr>
            <tr ><th >antiPfam</th><td v-if="unigene.antipfam" >Yes</td><td v-else >No</td></tr>
            
            <a name="aa sequence"></a>
            <tr >
            <th >
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
            <tr >
            <th >
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

          
          </table>
          </div>
        </div>
    </div>
    </div>
    <!-- End Basic information -->

    <!-- Start Gene Source info -->
    <div class="row">
      <div class="annoBlock col">
        <div class="m-portlet">
          <div class="m-portlet__head">
            <div class="m-portlet__head-caption">
                  <div class="m-portlet__head-title">
                      <span class="m-portlet__head-icon m--hide">
                          <i class="la la-gear"></i>
                      </span>
                      
                      <h3>
                          Unigene Source information
                      </h3>

                  </div>
              </div>
            </div>

            <div class="m-portlet__body">
              <!-- title -->
              <div v-if="unigene.gene_count">
              <table role="grid" class="table">
              
                <tr ><th >UNIGENE </th><td >{{ unigene.gene_count.u }}</td></tr>
                <tr >
                    <th >MGS Source</th>
                    <td v-if="unigene.gene_mgs" ><li v-for="object in unigene.gene_mgs.mgs" ><a v-bind:href="'/gmgc/mgs_gene/'+ object">{{ object }}</a></li></td>
                    <td v-else>No item</td></td>
                </tr>
                
                <tr ><th >AMPLICON</th><td >{{ unigene.gene_count.am }}</td></tr>
                <tr ><th >HUMAN_ORAL</th><td >{{ unigene.gene_count.or }}</td></tr>
                <tr ><th >HUMAN_NOSE</th><td >{{ unigene.gene_count.nos }}</td></tr>
                <tr ><th >HUMAN_SKIN</th><td >{{ unigene.gene_count.skin }}</td></tr>
                <tr ><th >HUMAN_VAGINA</th><td >{{ unigene.gene_count.vag }}</td></tr>
                <tr ><th >HUMAN_GUT</th><td >{{ unigene.gene_count.gut}}</td></tr>
                <tr ><th >CAT_GUT</th><td >{{ unigene.gene_count.cat }}</td></tr>
                <tr ><th >DOG_GUT</th> <td >{{ unigene.gene_count.dog }}</td></tr>
                <tr ><th >MOUSE_GUT</th><td >{{ unigene.gene_count.mous }}</td></tr>
                <tr ><th >PIG_GUT</th><td >{{ unigene.gene_count.pig }}</td></tr>
                <tr ><th >BUILT</th><td >{{ unigene.gene_count.bu }}</td></tr>
                <tr ><th >SOIL</th><td >{{ unigene.gene_count.soil }}</td></tr>
                <tr ><th >MARINE</th><td >{{ unigene.gene_count.mar }}</td></tr>
                <tr ><th >FRESHWATER</th><td >{{ unigene.gene_count.fw }}</td></tr> 
                <tr ><th >WASTEWATER</th><td >{{ unigene.gene_count.was }}</td></tr>
                <tr ><th >ISOLATE</th><td >{{ unigene.gene_count.iso}}</td></tr>
                <!-- data -->
              
              </div>
              <div v-else>No item</div>
              </table>
            </div>
          </div>
      </div>
    </div>
    <!-- End Gene Source info -->
    
    <!-- start Taxonomic rank -->
    <div class="row">
      <div class="annoBlock col">
        <div class="m-portlet">
          <!-- for the taxo_map -->
              <div class="m-portlet__head">
                  <div class="m-portlet__head-caption">
                      <div class="m-portlet__head-title">
                          <span class="m-portlet__head-icon m--hide">
                              <i class="la la-gear"></i>
                          </span>
                          
                          <h3>
                            Taxonomic rank
                          </h3>

                      </div>
                  </div>
              </div>

              <!-- title -->
              <div class="m-portlet__body">
                <div v-if="unigene.taxo_map">
                  <table role="grid" class="table">
                  <tr ><th >UNIGENE </th><td >{{ unigene.taxo_map.u }}</td></tr>
                  <tr ><th >Name </th><td  nowrap>{{ unigene.taxo_map.n }}</td></tr>
                  <tr ><th >Rank </th><td >{{ unigene.taxo_map.r }}</td></tr>
                  <tr ><th >Taxid </th><td >{{ unigene.taxo_map.txid }}</td></tr>
                  <!-- data -->
                  <!-- for the taxo_map -->
                  </div>
                  </table>
                <div v-else>No item</div>
              </div>
          </div>
      </div>
    </div>
    <!-- End Taxonomic rank -->

    <!-- Start Gene Correlations -->
    <div class="row">
      <div class="annoBlock col">
        <div class="m-portlet">
            <div class="m-portlet__head">
              <div class="m-portlet__head-caption">
                <div class="m-portlet__head-title">
                    <span class="m-portlet__head-icon m--hide">
                        <i class="la la-gear"></i>
                      </span>
                        
                    <h3>
                      Unigene Correlations
                    </h3>
  
                </div>
              </div>
            </div>

            <div class="m-portlet__body">
                <div  v-if="unigene.metaG_corr.mG_corr">
                  <div class="table-responsive">
                    <table class="horizontal_table VueTables__table table-striped table-bordered table-emapper">
                      <caption style="color: blue">MetaGenomic Correlations</caption>
                      <thead>
                        <tr >
                            <th>Condition</th>
                            <th>Correlations obs_number</th>
                            <th>PEARSON</th>
                            <th>PEARSON_PVAL</th>
                            <th>SPEARMAN</th>
                            <th>SPEARMAN_PVAL</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr v-for="object in unigene.metaG_corr.mG_corr">
                            <td>{{ object.cond }}</td>
                            <td>{{ object.num_c }} </td>
                            <td>{{ object.pc }}</td>
                            <td>{{ object.ppv }}</td>
                            <td>{{ object.sc }}</td>
                            <td>{{ object.spv }}</td>
                        </tr>
                      </tbody>

                    </table>
                  </div>
              </div>            
              <div v-else>No MetaG correlations data</div>
        
              <div  v-if="unigene.metaT_corr.mT_corr">
                  <div class="table-responsive">
                    <table class="horizontal_table VueTables__table table-striped table-bordered table-emapper">
                      <caption style="color: blue">MetaTranscriptomics Correlations</caption>
                      <thead>
                        <tr >
                            <th>Condition</th>
                            <th>Correlations obs_number</th>
                            <th>PEARSON</th>
                            <th>PEARSON_PVAL</th>
                            <th>SPEARMAN</th>
                            <th>SPEARMAN_PVAL</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr v-for="object in unigene.metaT_corr.mT_corr">
                            <td>{{ object.cond }}</td>
                            <td>{{ object.num_c }} </td>
                            <td>{{ object.pc }}</td>
                            <td>{{ object.ppv }}</td>
                            <td>{{ object.sc }}</td>
                            <td>{{ object.spv }}</td>
                        </tr>
                      </tbody>

                    </table>
                  </div>
              </div>            
              <div v-else>No MetaT correlations data</div>
            </div>
        </div>
      </div>
    </div>
    <!-- End Gene Correlations -->

    <!-- Start Functional annotation -->
    <div class="row">
      <div class="annoBlock col">
        <div class="m-portlet">
              <div class="m-portlet__head">
                  <div class="m-portlet__head-caption">
                      <div class="m-portlet__head-title">
                          <span class="m-portlet__head-icon m--hide">
                              <i class="la la-gear"></i>
                          </span>                
                          <h3>
                              Functional Annotation
                          </h3>

                      </div>
                  </div>
               </div>
 
              <div class="portlet__body">
                <nav>
                  <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <a class="nav-item nav-link active" id="nav-sprot-tab" data-toggle="tab" href="#nav-sprot" role="tab" aria-controls="nav-sprot" aria-selected="true">SwissProt Hit</a>
                    <a class="nav-item nav-link" id="nav-trembl-tab" data-toggle="tab" href="#nav-trembl" role="tab" aria-controls="nav-trembl" aria-selected="false">Trembl Hit</a>
                    <a class="nav-item nav-link" id="nav-emapper-tab" data-toggle="tab" href="#nav-emapper" role="tab" aria-controls="nav-emapper" aria-selected="false">eggNOG_v2 Annotation</a>
                    <a class="nav-item nav-link" id="nav-intrinsic-tab" data-toggle="tab" href="#nav-intrinsic" role="tab" aria-controls="nav-intrinsic" aria-selected="false">Intrinsic features</a>
                    <a class="nav-item nav-link" id="nav-pfam-tab" data-toggle="tab" href="#nav-pfam" role="tab" aria-controls="nav-pfam" aria-selected="false">Pfam Annotation</a>
                    <a class="nav-item nav-link" id="nav-smart-tab" data-toggle="tab" href="#nav-smart" role="tab" aria-controls="nav-smart" aria-selected="false">SMART Annotation</a>
                  </div>
                </nav>

                <div class="tab-content" id="nav-tabContent" style="padding-left:15px;">

                  <!--first tab-->
                  <div class="tab-pane fade show active" id="nav-sprot" role="tabpanel" aria-labelledby="nav-sprot-tab" >
                    <div v-if="unigene.sprot_best">
                    <table role="grid" class="table">
                        <tr ><th>AC</th><td><a v-bind:href="'https://www.uniprot.org/uniprot/'+ unigene.sprot_best.spb.n" target="_blank">{{ unigene.sprot_best.spb.n }}</a></td></tr>
                        <tr ><th>Query coverage</th><td>{{ unigene.sprot_best.spb.qc }}</td></tr>
                        <tr ><th>Target coverage</th><td>{{ unigene.sprot_best.spb.tc }}</td></tr>
                        <tr ><th>Score</th><td>{{ unigene.sprot_best.spb.sc }}</td></tr>
                        <tr ><th>E-value</th><td>{{ unigene.sprot_best.spb.ev }}</td></tr>
                        <tr ><th>Percent identity</th><td>{{ unigene.sprot_best.spb.pi }}</td></tr>
                        <tr ><th>Exact hit</th><td v-if="unigene.sprot_exact">{{ unigene.sprot_exact.spe }}</td><td v-else>no exact hit</td></tr>

                    </table>
                      
                    </div><div v-else><font color="blue">No SwissProt hit</div>
                  </div>
                  <!--first tab-->

                  <!--second tab-->
                  <div class="tab-pane fade" id="nav-trembl" role="tabpanel" aria-labelledby="nav-trembl-tab">
                    <div v-if="unigene.trembl_best">
                      <table role="grid" class="table">

                        <tr ><th>ID</th><td><a v-bind:href="'https://www.uniprot.org/uniprot/'+ unigene.trembl_best.trb.n" target="_blank">{{ unigene.trembl_best.trb.n }}</td></tr>
                        <tr ><th>Query coverage</th><td>{{ unigene.trembl_best.trb.qc }}</td></tr>
                        <tr ><th>Target coverage</th><td>{{ unigene.trembl_best.trb.tc }}</td></tr>
                        <tr ><th>Score</th><td>{{ unigene.trembl_best.trb.sc }}</td></tr>
                        <tr ><th>E-value</th><td>{{ unigene.trembl_best.trb.ev }}</td>
                        <tr ><th>Percent identity</th><td>{{ unigene.trembl_best.trb.pi }}</td></tr>

                      </table>
                    </div><div v-else><font color="blue">No Trembl hit</font></div>
                  </div>
                  <!--second tab-->

                  <!--third tab-->
                  <div class="tab-pane fade" id="nav-emapper" role="tabpanel" aria-labelledby="nav-emapper-tab">
                    <div  v-if="unigene.emapper_v2">
                      <table role="grid" class="table">

                        <tr ><th>Preferred_name</th><td >{{unigene.emapper_v2.p_n}}</td></tr> 
                        <tr ><th>Seed_ortholog_score</th><td >{{unigene.emapper_v2.s_o_s}}</td></tr>
                        <tr ><th>Seed_ortholog_evalue</th><td >{{unigene.emapper_v2.s_o_e}}</td></tr>
                        <tr ><th>seed_eggNOG_ortholog</th><td >{{unigene.emapper_v2.s_e_o}}</td></tr>
                        <tr ><th>COG</th><td >{{unigene.emapper_v2.COG}}</td></tr>
                        <tr ><th>KEGG_ko</th><td >{{unigene.emapper_v2.K_ko}}</td></tr>
                        <tr ><th>Best_tax_level</th><td >{{unigene.emapper_v2.b_tax_l}}</td></tr>
                        <tr ><th>Annot_level_max</th><td >{{unigene.emapper_v2.an_l_max}}</td></tr>
                        <tr ><th>KEGG_Pathway</th><td >{{unigene.emapper_v2.K_P}}</td></tr>
                        <tr ><th>KEGG_Reaction</th><td >{{unigene.emapper_v2.K_R}}</td></tr>
                        <tr ><th>KEGG_rclass</th><td >{{unigene.emapper_v2.K_rc}}</td></tr>
                        <tr ><th>BiGG_Reaction</th><td >{{unigene.emapper_v2.BiGG}}</td></tr>
                        <tr ><th>KEGG_Module</th><td >{{unigene.emapper_v2.K_M}}</td></tr>
                        <tr ><th>bestOG</th><td >{{unigene.emapper_v2.bOGs}}</td></tr>
                        <tr ><th>KEGG_TC</th><td >{{unigene.emapper_v2.K_TC}}</td></tr>
                        <tr ><th>matching_OGs</th><td >{{unigene.emapper_v2.OGs}}</td></tr>
                        <tr ><th>EC</th><td >{{unigene.emapper_v2.EC}}</td></tr>
                        <tr ><th>Description</th><td>{{unigene.emapper_v2.ds}}</td></tr>
                        <tr ><th>BRITE</th><td >{{unigene.emapper_v2.BRITE}}</td></tr>
                        <tr ><th>CAZy</th><td >{{unigene.emapper_v2.CAZy}}</td></tr>
                        <tr ><th>GOs</th><td  style='width: 1000px;word-wrap:break-word;'>{{unigene.emapper_v2.GOs}}</td></tr>
                        
                    </table>
                  
                    <div v-else><font color="blue">No emapper hit</font></div>
                  </div>
                </div>
                <!--third tab-->
                
                <!-- four tab -->
                  <div class="tab-pane fade" id="nav-intrinsic" role="tabpanel" aria-labelledby="nav-intrinsic-tab">
                  <div v-if="unigene.intrinsic">
                    <div class="table-responsive">
                    <table class="horizontal_table VueTables__table table-striped table-bordered table-emapper">
                          <thead>
                            <tr ><th> Features </th><th >Start</th><th >End</th></tr>
                          </thead>

                          <tbody v-for="object in unigene.intrinsic.intr">
                            
                            <tr ><td>{{ object.n }}</td><td >{{ object.s }}</td><td >{{ object.e }}</td></tr>
                            
                          </tbody>
                    </table>
                    </div>
                  </div><div v-else><font color="blue">No Intrinsic hit</font></div>
                  </div>

                  <!-- five tab -->
                  <div class="tab-pane fade" id="nav-pfam" role="tabpanel" aria-labelledby="nav-pfam-tab">
                  <div v-if="unigene.pfam">
                    <div class="table-responsive">
                      <table class="horizontal_table VueTables__table table-striped table-bordered table-emapper">
                          <thead>
                              <tr ><th> Domain </th><th >Start</th><th >End</th><th >Hit score</th><th >E-value</th></tr>
                          </thead>

                          <tbody v-for="object in unigene.pfam.pf">
                            <tr ><td><a v-bind:href="'http://pfam.xfam.org/family/'+ object.n" target="_blank">{{ object.n }}</a></td><td >{{ object.s }}</td><td >{{ object.e }}</td><td >{{ object.sc }}</td><td  >{{ object.ev }}</td></tr>
                          </tbody>
                      </table>
                    </div>
                  </div><div v-else><font color="blue">No Pfam hit</font></div>
                  </div>

                  <!-- six tab -->
                  <div class="tab-pane fade" id="nav-smart" role="tabpanel" aria-labelledby="nav-smart-tab">
                  <div v-if="unigene.smart">
                    <div class="table-responsive">
                      <table class="horizontal_table VueTables__table table-striped table-bordered table-emapper">
                        <thead>
                          <tr ><th> Domain </th><th >Start</th><th >End</th><th >Hit score</th><th >E-value</th></tr>
                        </thead>
                        <tbody v-for="object in unigene.smart.sm">
                          <tr ><td><a v-bind:href="'https://smart.embl.de/smart/do_annotation.pl?DOMAIN='+ object.n + '&BLAST=DUMMY'" target="_blank">{{ object.n }}</a></td><td >{{ object.s }}</td><td >{{ object.e }}</td><td >{{ object.sc }}</td><td  >{{ object.ev }}</td></tr>
                        </tbody>
                      </table>
                    </div>
                    </div><div v-else><font color="blue">No SMART hit</font></div>
                  </div>
                </div>

              </div><!--  m-porlet__body end -->
              
        </div> <!-- m-porlet end -->
      </div>
    </div>
    <!-- End Functional annotation -->

        <a name="neigh"></a>
        <div v-if="unigene.neigh_data">
          <table >
          <tr ><th><font color="blue">Neighbour Prediction</font></th></tr>
          
          <div> 
            <font face="Arial">
            <tr ><th>Unigene</th><td>{{ unigene.neigh_data.u }}</td></tr>
            <tr ><th>query_keggs</th><td>{{ unigene.neigh_data.q_K }}</td></tr>
            <tr ><th>subject_keggs</th><td>{{ unigene.neigh_data.s_K }}</td></tr>
            <tr ><th>analysed_orfs</th><td>{{ unigene.neigh_data.a_orfs }}</td></tr>
            <tr ><th>neigh_genes</th><td>{{ unigene.neigh_data.n_g }}</td></tr>
            <tr ><th>neigh_with_keggs</th><td>{{ unigene.neigh_data.n_K }}</td></tr>
            <tr ><th>kegg_proportion</th><td>{{ unigene.neigh_data.K_p }}</td></tr>
            <tr ><th>presence_of_kegg</th><td>{{ unigene.neigh_data.p_K }}</td></tr>
            <tr ><th>hit_kegg_percentage</th><td>{{ unigene.neigh_data.ht_K_p }}</td></tr>
            <tr ><th>kegg_description</th><td>{{ unigene.neigh_data.K_d }}</td></tr>
            </font>
          </div>
          </table>

        </div><div v-else><font color="blue">No Neighbour Match</font></div>
        

        <a name="neigh_genes"></a>
        <div  v-if="unigene.neigh_data">
            <table >
            <tr ><th><font color="blue">Neighbourhood genes prediction</font></th></tr>
            <font face="Arial">
            <div>
                <tr >
                    <th  height="35px">-2</th>
                    <th  height="35px">-1</th>
                    <th  height="35px">query unigene</th>
                    <th  height="35px">+1</th>
                    <th  height="35px">+2</th>
                </tr>
                <li v-for="object in unigene.neigh_data.predict_neighs">
                    <tr >
                        <td  >
                            <a v-bind:href="'/gmgc/unigene/'+ object.p_n[0][1]+ '/#eggnog'">{{object.p_n[0][1]}}</a><li v-for="kegg in object.p_n[0][2]" id="pic_list">{{kegg}}</li>
                        </td>
                        <td  >
                            <a v-bind:href="'/gmgc/unigene/'+ object.p_n[1][1]+ '/#eggnog'">{{object.p_n[1][1]}}</a><li v-for="kegg in object.p_n[1][2]" >{{kegg}}</li>
                        </td>
                        
                        <td  >{{unigene.clusters.u}}</td>
                        <td  >
                            <a v-bind:href="'/gmgc/unigene/'+ object.p_n[2][1]+ '/#eggnog'">{{object.p_n[2][1]}}</a><ul v-for="kegg in object.p_n[2][2]"><li>{{kegg}}</li></ul>
                        </td>
                        <td  >
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

          <table >
          <tr ><th><font color="blue">Neighbourhood ORFs info</font></th></tr>
          
          <div>
            <tr ><th width="350px" height="35px" nowrap> ORF_name </th><th >start</th><th >end</th><th >strand</th></tr>
          
          <li v-for="object in unigene.neighbour.o">
            <font face="Arial">
            <tr ><td width="350px" height="35px" nowrap>{{object.g}}</td><td >{{object.s[0]}}</td><td >{{object.s[1]}}</td><td >{{object.s[2]}}</td></tr>
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
        <table >
        <font face="Arial">
        <tr ><th >MGS ID</th><td v-if="mgs_data">{{ mgs_data.mgs }}</td><td v-else>No item</td></tr>
        <tr ><th >Unigene members</th><td v-if="mgs_data"><li v-for="u in mgs_data.u"><a v-bind:href="'/gmgc/unigene/'+ u">{{ u }}</a></li></td><td v-else>No item</td></tr>
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

