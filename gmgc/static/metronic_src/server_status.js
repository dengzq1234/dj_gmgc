export default {
    delimiters: ['[[', ']]'],
    data:function(){
        return {
            jobslist:jobslist,
	    // show_refresh_server_status:true,
	    csrf_token:csrf_token,
	}
    },
    methods:{
	cmd_job:function(url){
	    const vm = this; // Required to have the Vue component within the response function
	    
            // Required to add the CSRF token which django is requesting                                               
            // (there are other methods, like using cookies...)
            axios.defaults.headers.common = {'X-Requested-With': 'XMLHttpRequest', 'X-CSRFToken' : this.csrf_token};
	    
            axios.post(url, {})
                .then(function (response) {
		    // console.log (vm.csrf_token)
		    // console.log(response)
                    vm.jobslist = response.data.jobslist;
		    // vm.show_refresh_server_status=false;
		    setTimeout (
			() => {
			    // vm.show_refresh_server_status=true;
			    vm.refreshServerStatus();},
			5*1000);
                })
                .catch(function (error) {console.log(error);})
	},
	refreshServerStatus:function(){this.cmd_job('/server_status')},
    },
    created() {
	this.refreshServerStatus();
    },
    template:`
<div class="m-portlet">
    <div class="m-portlet__head" style="display:flex;width:100%;">
      <div class="m-portlet__head-caption">
	<div class="m-portlet__head-title">
	  <span class="m-portlet__head-icon m--hide">
	    <i class="la la-gear"></i>
	  </span>
	  <h3>Server Status</h3>
	</div>
      </div>
      <div style="display:flex;flex-direction:column;justify-content:center">
	   <span><i>(auto-refreshing every 5 seconds...)</i></span>
       </div>
    </div>
    <div class="m-portlet__body">
        <table class="table table-striped- table-bordered table-hover table-checkable dataTable no-footer dtr-inline"
            role="grid">
          <thead>
            <tr>
              <th>File</th>
              <th>User</th>
              <th>Sequences</th>
              <th>Tax. Scope</th>
              <th>Date</th>
              <th>Status</th>
              <th>Elapsed</th>
            </tr>
          </thead>
          <tbody>
	    <tr v-for="job in jobslist" v-bind:annot="job" v-bind:key="job.jobname">
              <td>
		  <span v-if="job.original_file.length<40">[[ job.original_file ]]</span>
		  <span v-if="job.original_file.length>=40">[[ job.original_file.substring(0,40)+" ..." ]]</span>
	      </td>
              <td>
		  <span v-if="job.email.length<20">[[ job.email ]]</span>
		  <span v-if="job.email.length>=20">[[ job.email.substring(0,20)+" ..." ]]</span>
	      </td>
              <td><span>[[ job.numseqs ]]</span></td>
              <td><span>[[ job.tax_scope ]]</span></td>
              <td><span>[[ job.submitted ]]</span></td>
              <td>
		  <span v-if="job.status!='Running'">[[ job.status ]]</span>
		  <span v-if="job.status=='Running'"><strong>[[ job.status ]]</strong></span>
	      </td>
              <td><span>[[ job.elapsed ]]</span></td>
            </tr>
          </tbody>
        </table>
    </div>
</div>
`}
