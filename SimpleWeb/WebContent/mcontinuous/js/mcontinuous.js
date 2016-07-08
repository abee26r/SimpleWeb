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
	delete_selected : function del(){
		$('#datatbl').find('input[type=checkbox]:checked').each(function(){
			$(this).parent().parent().remove();
		});
	},
	
	getappgover : function(){
		$('#appgoverpane').removeClass('hidden');
		$('#appname').text($('#appList').val());
//		CIRCLE_OBJ.generate(5, 150, 'evnirnoments');
	},
	wait : function() {

		// none, bounce, rotateplane, stretch, orbit,
		// roundBounce, win8, win8_linear or ios
		var effect = 'bounce'; 
		
			$('body').waitMe({

				// none, rotateplane, stretch, orbit, roundBounce, win8,
				// win8_linear, ios, facebook, rotation, timer, pulse,
				// progressBar, bouncePulse or img
				effect : 'progressBar',
				text : 'Please wait for process to complete...',
				bg : 'rgba(255,255,255,0.7)',
				color : '#000',
				sizeW : '',
				sizeH : '',
				source : '',
				onClose : function() {
				}

			});
			
			setTimeout(function(){
				$('body').waitMe('hide');
				alert('Success!!');
			}, 5000);
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

var CIRCLE_OBJ = {
		theta : [],

		setup : function (n, r, id) {
		    var main = document.getElementById(id);
		    var mainHeight = parseInt(window.getComputedStyle(main).height.slice(0, -2));
		    var circleArray = [];
		    var colors = ['red', 'green', 'purple', 'orange'];
		    for (var i = 0; i < n; i++) {
		        var circle = document.createElement('div');
		        var pane = $('#p1').html();
		        $(circle).append(pane);
		        circle.className = 'circle number' + i;
		        circleArray.push(circle);
		        circleArray[i].posx = Math.round(r * (Math.cos(CIRCLE_OBJ.theta[i]))) + 'px';
		        circleArray[i].posy = Math.round(r * (Math.sin(CIRCLE_OBJ.theta[i]))) + 'px';
		        circleArray[i].style.position = "absolute";
		        circleArray[i].style.backgroundColor = colors[i];
		        circleArray[i].style.top = ((mainHeight / 2) - parseInt(circleArray[i].posy.slice(0, -2))) + 'px';
		        circleArray[i].style.left = ((mainHeight/ 2 ) + parseInt(circleArray[i].posx.slice(0, -2))) + 'px';
		        main.appendChild(circleArray[i]);
		    }
		},

		generate : function(n, r, id) {
		    var frags = 360 / n;
		    for (var i = 0; i <= n; i++) {
		    	CIRCLE_OBJ.theta.push((frags / 180) * i * Math.PI);
		    }
		    CIRCLE_OBJ.setup(n, r, id)
		},		
		
};