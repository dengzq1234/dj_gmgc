
import JobStatus from './job_status.js';
import ServerStatus from './server_status.js';

var app = new Vue({
    delimiters: ['[[', ']]'],
    el: '#emapper_app',
    components: {
	"server-status":ServerStatus,
	"job-status":JobStatus
    },
    data: {
        active_tool: "eggNOG mapper v2.0",
        params: {
            param_email: null,
            param_database: "all",
            param_goevidence: "non-electronic",
            param_tax_scope: "auto",
            param_search_mode: "diamond",
            param_otype: "all",
            param_seed_evalue: 0.001,
            param_seed_score: 60,
            param_query_cov: 0,
            param_subject_cov: 25,
            param_errors: undefined, 
        },
	
    },
    methods: {
        checkForm: function(e) {
            this.errors = [];
            e.preventDefault();
            
            if (!this.param_email) {
                this.errors.push('Email required.');
            } else if (!this.validEmail(this.email)) {
                this.errors.push('Valid email required.');
            }

            if (!this.errors.length) {
                return true;
            }
            console.log('GOT IT', this.errors);
        },
        validEmail: function(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    }
})
