export default {
    delimiters: ['[[', ']]'],
    data:function(){
        return {
	    jobdata:jobdata,
	    jobs_statuses:jobs_statuses,
	    job_info:job_info,
	    hosturl:hosturl,
	    csrf_token:csrf_token,
	    show_refresh_button:false,
	}
    },
    methods:{
	cmd_job:function(url, jobname){
	    // console.log("CMD_JOB " + url + " " + jobname);
	    const vm = this; // Required to have the Vue component within the response function
	    
            // Required to add the CSRF token which django is requesting                                               
            // (there are other methods, like using cookies...)
            axios.defaults.headers.common = {'X-Requested-With': 'XMLHttpRequest', 'X-CSRFToken' : this.csrf_token};
	    
            axios.post(url, {"jobname":jobname})
                .then(function (response) {
                    vm.jobdata = response.data.jobdata;
		    
		    vm.show_refresh_button=true;

		    if (vm.should_refresh()) {
			setTimeout (
			    () => {
				vm.show_refresh_button=false;
				vm.refreshJobStatus()},
			    5*1000);
		    }
		    // console.log(vm.jobdata);
                })
                .catch(function (error) {console.log(error);})
	},
	refreshJobStatus:function(){
	    this.cmd_job('/refresh_job', this.jobdata.jobname);
	},
	should_refresh:function(){
	    return (this.jobdata.status == this.jobs_statuses.started ||
                    this.jobdata.status == this.jobs_statuses.running ||
                    this.jobdata.status == this.jobs_statuses.waiting)
	},	
    },
    created() {
	if (this.should_refresh()) {
	    this.refreshJobStatus();
	}
    },
    template:`
<div class="m-content">
    <div class="row">
	<job-control :jobdata="jobdata" :jobstatus="jobdata.status" :jobs_statuses="jobs_statuses" :cmd_job="cmd_job" :job_info="job_info" :hosturl="hosturl"></job-control>
    </div>
    <div class="row">
	<annot-table :jobdata="jobdata" :jobstatus="jobdata.status" :jobs_statuses="jobs_statuses"></annot-table>
    </div>
</div>
`}


// JOB CONTROL

Vue.component('job-control', {
    delimiters: ['[[', ']]'],
    props:["jobdata", "jobstatus", "jobs_statuses", "cmd_job", "job_info", "hosturl"],
    computed:{
	show_start:function(){return this.jobstatus == jobs_statuses.ready;},
	show_cancel:function(){return this.jobstatus == jobs_statuses.started ||
			       this.jobstatus == jobs_statuses.running ||
			       this.jobstatus == jobs_statuses.waiting;},
	show_refresh:function(){return this.show_cancel && this.$parent.show_refresh_button},
	// show_download:function(){return this.jobstatus == jobs_statuses.done;},
        },
    methods:{
	start_job:function(){this.cmd_job('/start_job', jobdata.jobname);},
	refreshJob:function(){this.cmd_job('/refresh_job', jobdata.jobname);},
	cancelJob:function(){this.cmd_job('/cancel_job', jobdata.jobname)},
    },
template:`
<div class="m-portlet">
    <div class="m-portlet__head">
        <div class="m-portlet__head-caption">
	        <span class="m-portlet__head-icon m--hide">
	            <i class="la la-gear"></i>
	        </span>
		<table class="table table-striped- dataTable no-footer dtr-inline" role="grid">
		    <tbody>
			<tr>
			    <td style="vertical-align:middle"><span style="font-size:large"><strong>Job [[ jobdata.jobname ]]</strong></span></td>
			    <td style="vertical-align:middle" v-if="jobdata.status"><span>Status: <strong>[[ jobdata.status ]]</strong></span></td>
			    <td style="vertical-align:middle" v-if="show_start" style="padding:10 10 10 10 ">
				    <!-- Start button -->
				    <button v-if="show_start" v-on:click="start_job">Start job</button>
			    </td>
			    <td style="vertical-align:middle" v-if="jobdata.submitted"><span>Submitted: [[ jobdata.submitted ]]</span></td>
			    <td style="vertical-align:middle" v-if="jobdata.elapsed"><span>Time elapsed: [[ jobdata.elapsed ]]</span></td>


			    <td style="vertical-align:middle">
				    <span v-if="show_refresh" style="font-size:11px"><i>(auto-refreshing every 5 seconds...)</i></span>
			    </td>
			</tr>
		    </tbody>
		</table>
        </div>
    </div>
        <div class="m-portlet__body">
        <table class="table table-striped- table-bordered table-hover table-checkable dataTable no-footer dtr-inline"
                    role="grid">
	<thead>
	<tr>
		<th v-if="job_info.job_name">Job name</th>
		<th v-if="job_info.email">User</th>
		<th v-if="job_info.date_created">Date created</th>
		<th v-if="job_info.original_file">File</th>
		<th v-if="job_info.nseqs">Sequences</th>
		<th v-if="job_info.nsites">Total length</th>
		<th v-if="job_info.tax_scope">Tax. scope</th>
		<th v-if="job_info.orthology_type">Orth. restrictions</th>
		<th v-if="job_info.go_evidence">GO evidence</th>
		<th v-if="job_info.seed_evalue">Min. hit e-value</th>
		<th v-if="job_info.seed_score">Min. hit bit-score</th>
		<th v-if="job_info.query_cov">Min. % of query cov.</th>
		<th v-if="job_info.subject_cov">Min. % of subject cov.</th>
		<th v-if="show_cancel"></th>
	</tr>
	</thead>
	<tbody>
            <tr>
		<td v-if="job_info.job_name"><span>[[ job_info.job_name  ]]</span></td>
		<td v-if="job_info.email">
		    <span v-if="job_info.email.length<20">[[ job_info.email ]]</span>
		    <span v-if="job_info.email.length>=20">[[ job_info.email.substring(0,16)+" ..." ]]</span>
		</td>
		<td v-if="job_info.date_created"><span>[[ job_info.date_created ]]</span></td>
		<td v-if="job_info.original_file">
		    <span v-if="job_info.original_file.length<40">[[ job_info.original_file ]]</span>
		    <span v-if="job_info.original_file.length>=40">[[ job_info.original_file.substring(0,36)+" ..." ]]</span>
		</td>
		<td v-if="job_info.nseqs"><span>[[ job_info.nseqs ]]</span></td>
		<td v-if="job_info.nsites"><span>[[ job_info.nsites ]] [[ job_info.seq_type ]]</span></td>
		<td v-if="job_info.tax_scope"><span>[[ job_info.tax_scope ]]</span></td>
		<td v-if="job_info.orthology_type"><span>[[ job_info.orthology_type ]]</span></td>
		<td v-if="job_info.go_evidence"><span>[[ job_info.go_evidence ]]</span></td>
		<td v-if="job_info.seed_evalue"><span>[[ job_info.seed_evalue ]]</span></td>
		<td v-if="job_info.seed_score"><span>[[ job_info.seed_score ]]</span></td>
		<td v-if="job_info.query_cov"><span>[[ job_info.query_cov ]]</span></td>
		<td v-if="job_info.subject_cov"><span>[[ job_info.subject_cov ]]</span></td>
		<td v-if="show_cancel">
			<!-- Cancel button -->
			<button v-if="show_cancel" v-on:click="cancelJob">Cancel job</button>
		</td>
	    </tr>
	    <tr>
		    <td colspan="100" v-if="job_info.cmdline">
			    <span>[[ job_info.cmdline.replace('python2 "$EMAPPERPATH"/', "").replace(/"/g, "") ]]</span>
		    </td>
	    </tr>
	    <tr>
		    <td colspan="100">
			  <a v-bind:href="[[ hosturl ]]+'/'+[[ job_info.job_name ]]" target="_blank"><strong>Access your job files here</strong></a>
		    </td>
	    </tr>
	</tbody>
        </table>
</div>
</div>
        `
})


// ANNOTATIONS TABLE (vue-table-2)

Vue.component('annot-table', {
    props:["jobdata", "jobstatus", "jobstatuses"],
    data:function(){
        return {
	    columns:['query_name', 'seed_ortholog', 'evalue', 'score', 'best_tax_level', 'Preferred_name', 
	    	     'GO_terms', 'EC', 'KEGG_ko', 'KEGG_Pathway', 'KEGG_Module', 'KEGG_Reaction', 
	    	     'KEGG_rclass', 'BRITE', 'KEGG_TC', 'CAZy', 'BiGG_Reaction', 'annot_level',
	    	     'matching_OGs', 'bestOG', 'COG_cat', 'description'],
	    options:{
		headings:{evalue:"e-value", best_tax_level:"best tax lvl", EC:"EC number", KEGG_ko:"KEGG KO", annot_level:"annot lvl max", matching_OGs:"eggNOG OGs"},
		filterable:["query_name"],
	    },
	    annotsdata:[], // undefined,
	    loaded:false,
        }
    },
    methods:{	
	load_annotsdata:function(){
	    let url = "job_annotations";
	    let jobname = jobdata.jobname;
	    // console.log("LOAD ANNOTS " + url + " " + jobname);
	    const vm = this; // Required to have the Vue component within the response function

	    // Required to add the CSRF token which django is requesting                                               
	    // (there are other methods, like using cookies...)
	    axios.defaults.headers.common = {'X-Requested-With': 'XMLHttpRequest', 'X-CSRFToken' : this.$parent.csrf_token};

	    axios.post(url, {"jobname":jobname})
		.then(function (response) {
		    vm.annotsdata = JSON.parse(response.data.annotsdata);
		    // console.log("RESPONSE");
		    // console.log(vm.annotsdata);
		})
		.catch(function (error) {console.log(error);})
	},
	down_job:function(url, jobname){
	    const vm = this; // Required to have the Vue component within the response function
	    
            // Required to add the CSRF token which django is requesting                                               
            // (there are other methods, like using cookies...)
            axios.defaults.headers.common = {'X-Requested-With': 'XMLHttpRequest', 'X-CSRFToken' : this.$parent.csrf_token};
	    
            axios.post(url, {"jobname":jobname}, {
		responseType: 'blob',
		timeout: 30000,
	    }).then(function (response) {
		
		// retrieve the file data
		let blob = new Blob([response.data], { type: 'text/csv' })
		
		// create "hidden" link which will trigger the browser to save the file
		let link = document.createElement('a')
		link.href = window.URL.createObjectURL(blob)

		// retrieve filename
		let content_disp = response.headers['content-disposition']
		var startIndex = content_disp.indexOf("filename=") + 9; // Adjust '+ 10' if filename is not the right one.
		var endIndex = content_disp.length;
		var filen = content_disp.substring(startIndex, endIndex);
		
		// save the file using the "hidden" link
		link.download = filen
		
		// not working on firefox --> link.click()
		// the next works on Firefox and Chrome. Likely it works also on Opera and Safari
		//https://stackoverflow.com/questions/32225904/programmatical-click-on-a-tag-not-working-in-firefox
		link.dispatchEvent(new MouseEvent(`click`, {bubbles: true, cancelable: true, view: window}))
		
            }).catch(function (error) {console.log(error);})	    
	},
	downloadAnnots:function(){this.down_job('/download_annotations', jobdata.jobname)},
	downloadExcel:function(){this.down_job('/download_excel', jobdata.jobname)},
	exploreAnnots:function(){this.load_annotsdata(); this.loaded=true;},
    },
    // beforeMount(){
    // 	this.load_annotsdata();
    // 	this.loaded = true;
    // },
    template:`
<div v-if="this.jobstatus == jobs_statuses.done" class="m-portlet">  
    <div class="m-portlet__head">
        <div class="m-portlet__head-caption">
		<table class="table table-striped- dataTable no-footer dtr-inline" role="grid">
		    <tbody>
			<tr>
			    <td v-if="loaded" style="vertical-align:middle"><span style="font-size:large"><strong>Annotations</strong></span></td>
			    <td v-if="!loaded" style="vertical-align:middle">
				    <!-- Explore annotations button -->
				    <button style="font-size:12px" v-on:click="exploreAnnots">Explore annotations</button>
			    </td>
			    <td>
				<table>
				<tr>
				    <td style="vertical-align:middle">
					<span>Downloads</span>
				    </td>
				    <td style="vertical-align:middle">
					    <!-- Download button -->
					    <button style="font-size:12px" v-on:click="downloadAnnots">CSV</button>
				    </td>
				    <td style="vertical-align:middle">
					    <!-- Download excel file button -->
					    <button style="font-size:12px" v-on:click="downloadExcel">Excel</button>
				    </td>
				</tr>
				</table>
			    </td>
			</tr>
		    </tbody>
		</table>
        </div>
    </div>

    <div v-if="loaded" class="m-portlet__body">

	<v-client-table v-if="loaded" :data="annotsdata" :columns="columns" :options="options">

	    <template v-slot:seed_ortholog="props">
		<a target="_blank" v-bind:href="'http://eggnog5.embl.de/#/app/results?seqid='+props.row.seed_ortholog.substring(props.row.seed_ortholog.indexOf('.')+1)">{{ props.row.seed_ortholog }}</a>
	    </template>

	    <template v-slot:evalue="props">
		<span class=nowrap>{{ props.row.evalue }}</span>
	    </template>

	    <template v-slot:GO_terms="props">
		<div class=scrollable>
		    <a v-for="GO_term in props.row.GO_terms" target="_blank" v-bind:href="'http://amigo.geneontology.org/amigo/term/'+GO_term">{{ GO_term }} </a>
		</div>
	    </template>

	    <template v-slot:EC="props">
		<div class=scrollable>
		    <a v-for="EC in props.row.EC" target="_blank" v-bind:href="'https://www.brenda-enzymes.org/enzyme.php?ecno='+EC">{{ EC }} </a>
		</div>
	    </template>

	    <template v-slot:KEGG_ko="props">
		<div class=scrollable>
                <a v-for="KEGG_ko in props.row.KEGG_ko" target="_blank" v-bind:href="'http://www.genome.jp/dbget-bin/www_bget?'+KEGG_ko">{{ KEGG_ko }} </a>
		</div>
	    </template>

	    <template v-slot:KEGG_Pathway="props">
		<div class=scrollable>
                <a v-for="KEGG_Pathway in props.row.KEGG_Pathway" target="_blank" v-bind:href="'http://www.genome.jp/dbget-bin/www_bget?'+KEGG_Pathway">{{ KEGG_Pathway }} </a>
		</div>
	    </template>

	    <template v-slot:KEGG_Module="props">
		<div class=scrollable>
                <a v-for="KEGG_Module in props.row.KEGG_Module" target="_blank" v-bind:href="'http://www.genome.jp/dbget-bin/www_bget?'+KEGG_Module">{{ KEGG_Module }} </a>
		</div>
	    </template>

	    <template v-slot:KEGG_Reaction="props">
		<div class=scrollable>
                <a v-for="KEGG_Reaction in props.row.KEGG_Reaction" target="_blank" v-bind:href="'http://www.genome.jp/dbget-bin/www_bget?'+KEGG_Reaction">{{ KEGG_Reaction }} </a>
		</div>
	    </template>

	    <template v-slot:KEGG_rclass="props">
		<div class=scrollable>
                <a v-for="KEGG_rclass in props.row.KEGG_rclass" target="_blank" v-bind:href="'http://www.genome.jp/dbget-bin/www_bget?'+KEGG_rclass">{{ KEGG_rclass }} </a>
		</div>
	    </template>

	    <template v-slot:BRITE="props">
		<div class=scrollable>
                <a v-for="BRITE in props.row.BRITE" target="_blank" v-bind:href="'https://www.genome.jp/kegg-bin/search_brite?catalog=brite.list&search_string='+BRITE">{{ BRITE }} </a>
		</div>
	    </template>

	    <template v-slot:KEGG_TC="props">
		<div class=scrollable>
                <span v-for="KEGG_TC in props.row.KEGG_TC">{{ KEGG_TC }} </span>
		</div>
	    </template>

<!-- 'CAZy', 'BiGG_Reaction', 'annot_level' -->

	    <template v-slot:matching_OGs="props">
		<div class=scrollable>
                <a v-for="matching_OG in props.row.matching_OGs" target="_blank" v-bind:href="'http://eggnog5.embl.de/#/app/results?target_nogs='+matching_OG">{{ matching_OG }} </a>
		</div>
	    </template>

<!-- 'bestOG', 'COG_cat', -->

	    <template v-slot:description="props">
		<div class=scrollable>
		{{ props.row.description }}
		</div>
	    </template>

	</v-client-table>

    </div>
</div>
`})

// END
