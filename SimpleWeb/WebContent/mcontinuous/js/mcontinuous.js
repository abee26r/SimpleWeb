/****** 5/10/2016 -  Abilash R *******/
var testrun = true;
var CONST = {
		url_pfx : "http://localhost:8080/ws_iMaven/rest",
		url_createJob : jQuery.validator.format("/createNewJob/{0}?activity=1&activity=2&activity=3&activity=4"),
		
		
};

var EVENTS = {
	menu_actions : function(){
		$('div#vMenu').find('*').each(function(){
			if($(this).data('inject')){				
				$(this).on('click', function(){
					$('#inject').load($(this).data('inject'));
				});
			}
		});
	},	
};

var VIEW = {
	disp_CodeVal : function(){
		$('#inject').load('mccodeval.html');
	},

	disp_junit : function(){
		$('#inject').load('mcjunit.html');
	},
	
	disp_deploy : function(){
		$('#inject').load('mcdeploy.html');
	},
	
	disp_serverList : function(){
		$('#serverlist').removeClass('hidden');
		$('#div_deploy').removeClass('hidden');
	},
	
	disp_deploystats : function(){
		$('#deploystatus').removeClass('hidden');
	},
	mockJunit : function(){
		
	}
};

var CONTROLLER ={
	create_job : function(){
		var url = CONST.url_pfx + CONST.url_createJob($('#jobID').val());
		
		CONTROLLER.private.get(url, null, VIEW.disp_CodeVal);
	},	
	
	getServerList : function(){
		VIEW.disp_serverList();
	},
	
	deploystats : function(){
		VIEW.disp_deploystats();
	},
	
	private : {
		get : function(url, data, successCB){
//			$.getJSON(url, data, successCB);
			if(testrun)
				successCB();
			$.ajax({
				  url: url,
				  dataType: 'json',
				  method : 'GET',
				  contentType: "application/json",
				  data: data,
				  success: successCB,
				  timeout: 10000 
				});
		},
	}
};

$(document).ready(function(){
	EVENTS.menu_actions();
	$('#test').trigger('click');
});

if(testrun)
var MOCK = {
		validate_load_op : [
		  "cntrct_1.0/branch",
		  "prov_1.0/branch2",
		  "myapp3/branch3",
		  "myapp4/barnch4"
		],

		perf_validate_op : [ { "message": "Success Message", "status": "Succeess", "report": null, "appName": "myApp1", "branchID": "master" }, { "message": "Failed - Error Message", "status": "Failed", "report": null, "appName": "myApp2", "branchID": "branchId" }],
		
		junit_op : [{
		                "message": "Success Message",
		                "status": "Succeess",
		                "report": null,
		                "appName": "myApp1",
		                "branchID": "master"
		              },
		              {
		                "message": "Failed - Error Message",
		                "status": "Failed",
		                "report": null,
		                "appName": "myApp2",
		                "branchID": "branchId"
		              }
		            ],
		            

};