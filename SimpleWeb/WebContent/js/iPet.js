//Object to encapsulate all event registrations
var events_register = {
		
	tabs : function(){
		var tab = $('div ul#sbTabs li');		
		tab.on('click', function(){
			view_actions.tabs_activate(this);
		});
	},
	tab_submit : function(){
		$('.tab_submit').on('click', function(){
			view_actions.reset_content();
			view_actions.clearGrid();
			var input = logic.gatherTabData(this);
			api_calls.tabServiceCall(input, this);
		});
	},
	tab_datepicker : function(){
		$('.datetimepicker_date').datetimepicker({
	        format: 'MM/DD/YYYY',
	      });
		
		$('.datetimepicker_time').datetimepicker({
	        format: 'HH:mm:ss',
	      });
	},
	
	prevent_submit : function(){
		$("body").submit(function(e) {
		    e.preventDefault();
		});
	},
	
	row_click_modal : function(){
		var t = $('div > table > tbody > tr.modal_win');
		$('div > table > tbody > tr.modal_win').on('click', function(){
			api_calls.xmlServiceCall($(this).find(':nth-child(6)').text());
		});
	},
	
	resubmit : function(){
		$('#resubmit-btn').on('click', function(){
			api_calls.resubmit_svc(this, $('#xml_text').val());
		});
	},
	
	ajax_error : function(){
		$( document ).ajaxError(function( event, jqxhr, settings, thrownError ) {
			  
			    alert('Bad Service. Something went wrong while accessing the service!!');
			    view_actions.reset_content();
			  
			});
	},
	
	logout : function(){
		$('#logout').on('click', function(){
	
			sessionStorage.removeItem('auth');
			window.location = './login.html';
		});
	},
	
	
};

var view_actions = {
	
		tabs_activate : function (tab){
			$(tab).addClass('active').siblings().removeClass('active');
			var section_id = $(tab).data('section-id');	
			$('#'+section_id).removeClass('hidden').siblings().addClass('hidden');
		},
		
		populateGrid : function(json){
			json = CONSTANTS.json1;
			//populate header
			var tbl, header='', body='';

			while(typeof json != 'undefined' && typeof json[0] == 'undefined'){
				json = json[Object.keys(json)];
			}
			
			if(typeof json == 'undefined' || json.length == 0){
				$('#tab_err_msg').show();
				$(".sub_tog").toggle();
				return;
			}
			
			var keys = Object.keys(json[0]);
			$.each(keys, function(index, val){
				header = header + CONSTANTS.th(val);
			}); 
			header = CONSTANTS.tr(header);
			
			//populate body
			$.each(json, function(index, val){
				var row = '', err = false, count = 0;
				$.each(keys, function(i, v){
					count++;
					row = row + CONSTANTS.td(val[v]);
					if(count == 7 && val[v] == 'ERROR'){
						err = true;
					}
				});
				if(err){
					body = body + CONSTANTS.tr_modal(row);
				}else{
					body = body + CONSTANTS.tr(row);
				}
				
			}); 
			
			
			//create table
			tbl = CONSTANTS.tbl(header, body);			
			$('#data-grid').append(tbl).removeClass('hidden');
			    $('html, body').animate({
			        scrollTop: $("#data-grid").offset().top - 90
			    }, 1000);
			
			//register click events
			events_register.row_click_modal();
		    $(".sub_tog").toggle();

		},
		
		clearGrid : function(){
			$('#data-grid').html('');
		},
		
		reset_content : function(){
			$(".sub_tog").toggle();
			$('#tab_err_msg').hide();
		},
		
		populate_modal : function(json){
			json = CONSTANTS.xml1;
			if(typeof json == 'undefined' || json.length == 0){
				return;
			}
			$('#resubmit-btn').data('trk-id', json[0]['TRACKING_ID']);
			$('#xml_text').text(json[0]['PAYLOAD']);
			$('#xmlModal').modal();
		},
};

var logic = {
	gatherTabData : function(btn){
		var input = {};
		$.each($(btn).parent('fieldset').siblings('fieldset').find('input'), function(){
			input[$(this).attr("id")] = $(this).val();
		});
		
		return input;
	},
	
	dateFormat : function(_date, _time){
		var monthNames = ["X", "JAN", "FEB", "MAR",
		                  "APR", "MAY", "JUN", "JUL",
		                  "AUG", "SEP", "OCT",
		                  "NOV", "DEC"
		                ];
		var dt_str = '';
		var dt_parts = _date.split('/');
		var tm_parts = _time.split(':');
		//TARGET 18-APR-16 08.35.54.813000000
		
		if(dt_parts.length > 1 && tm_parts.length > 1){
			if(dt_parts[0].indexOf('0') == 0){
				dt_parts[0] = dt_parts[0].substring(1,2);
			}
			dt_str = dt_parts[1] + '-' + monthNames[dt_parts[0]] + '-' + dt_parts[2].substring(2, 4) + ' ' 
						+ tm_parts[0] + '.'  + tm_parts[1] + '.' +  + tm_parts[2] + '.000000000';
		}
		 
		
		return dt_str;
	},
	
	//Returns the request object based on the key
	req_obj_factory : function(key){
		
		if(typeof key == undefined)
			return;
		var obj;
		if(key == CONSTANTS.URL_SVC_1){
			obj = req_objects.dt_request;	
		}else if(key == CONSTANTS.URL_SVC_2){
			obj = req_objects.trk_request;
			
		}else if(key == CONSTANTS.URL_SVC_3){
			obj = req_objects.corr_request;
			
		}else if(key == CONSTANTS.URL_SVC_5){
			obj = req_objects.resubmit_request;
		}
		
		return obj;
	},

	//data var should be in same index order as request object
	set_req_data : function(data, obj){
		if(typeof data == undefined || typeof obj == undefined)
			return;
		
		//crude buut ok for now
		if(obj['startDate'] != undefined){
			obj['startDate'] = logic.dateFormat($('#frmDt').val(), $('#frmtime').val());
			obj['endDate'] = logic.dateFormat($('#toDt').val(), $('#totime').val());
		}else{
			return data;
		}
			
		
		return obj;
	},
	
};

var api_calls ={
		
		tabServiceCall : function(data, btn){
			var path_var = $(btn).data('is-path-var');
			var svc_url = CONSTANTS[$(btn).data('svc-url')];
			
			data = logic.set_req_data(data, logic.req_obj_factory(svc_url));
			
			if(typeof path_var != 'undefined'){
				svc_url = svc_url(data[path_var]);
			}
			
			
			api_calls.private.get(svc_url, JSON.stringify(data), view_actions.populateGrid);
		},
		
		xmlServiceCall : function(data){
			
			var svc_url = CONSTANTS.URL_SVC_4(data);
			api_calls.private.get(svc_url, '', view_actions.populate_modal);
		},
		
		resubmit_svc : function(btn, xml){
			var trkId = $(btn).data('trk-id');
			var xmldata = logic.req_obj_factory(CONSTANTS.URL_SVC_5); 
			xmldata.tracking_id = trkId;
			xmldata.payload = xml;
			
			api_calls.private.post(CONSTANTS.URL_SVC_5(trkId), JSON.stringify(xmldata), function(){alert('Transaction Resubmitted.');});
		},
		
		//Consider this as private method and dont use from outside api_calls
		private : {
			
			get : function(url, data, successCB){
//				$.getJSON(url, data, successCB);
				successCB();
				$.ajax({
					  url: url,
					  dataType: 'json',
					  method : 'GET',
					  data: data,
					  success: successCB,
					  timeout: 10000 
					});
			},
			post : function(url, data, successCB){
				successCB();
				$.ajax({
					  url: url,
					  dataType: 'json',
					  method : 'POST',
					  data: data,
					  success: successCB,
					  timeout: 10000 
					});
			}
				
		},
		
};

$(document).ready(function(){
	
	events_register.prevent_submit();//prevent all submit
	events_register.tabs();//register tabs click actions
	events_register.tab_submit();//register submit buttons
	events_register.tab_datepicker();//register the date picker events
	events_register.ajax_error();//Register global ajax error handler
	events_register.resubmit();//Register resubmit
	events_register.logout();
});