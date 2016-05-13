/****** 5/10/2016 -  Abilash R *******/
var testrun = true;
var CONST = {
		url_pfx : "http://localhost:8080/ws_iMaven/rest",
		url_createJob : jQuery.validator.format("/createNewJob/{0}?activity=1&activity=2&activity=3&activity=4"),
		
		tr : $.validator.format('<tr>{0}</tr>'),
		td : $.validator.format('<td>{0}</td>'),
		td_edit : '<td align="center"><span><icon class="glyphicon glyphicon-pencil"/> </span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><icon class="glyphicon glyphicon-remove"/> </span></td>',
};

var EVENTS = {
	menu_actions : function(){
		$('div#everythin').find('*').each(function(){
			if($(this).data('inject')){				
				$(this).on('click', function(){
					$('#inject').load($(this).data('inject'));
				});
			}
		});
	},
	
};

var VIEW = {
	
	disp_home : function(){
		$('#inject').load('mchomescreen.html');
	},	
		
	disp_CodeVal : function(){
		$('#inject').load('mccodeval.html');
	},
	
	disp_CodeValRes : function(){
		$('#inject').load('mccodevalres.html');
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
		$('#deploybtn').text('Generate Report');
	},
	mockJunit : function(){
		
	},
	
	isCronDisplay : function(){
		if($('#crontype').val() == 1){
			$('#timeSet').removeClass('hidden');
			$('#freqSet').removeClass('hidden').addClass(('hidden'));
		}else{
			$('#timeSet').removeClass('hidden').addClass(('hidden'));
			$('#freqSet').removeClass('hidden');
		}
	},
	disp_repoList : function(){
		$('#div_applist').removeClass('hidden');
	},
	
	addFromModal : function(){
		
		
		var data = '';
		$('.modal').find('input, select').each(function(){
			
			if($(this).attr('type') == 'password'){
				data += CONST.td('**********');
			}else{
				data += CONST.td($(this).val());
			}
			
			
		});
		
		data +=CONST.td_edit;
		data = CONST.tr(data);
		
		$('#datatbl').append(data);
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
	VIEW.disp_home();
	/*$('#test').trigger('click');*/
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