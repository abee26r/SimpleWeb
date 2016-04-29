$(document).ready(function(){
	
	events_register.tabs();//register tabs click actions
	events_register.tab_submit();//register submit buttons
	events_register.tab_datepicker();//register the date picker events
//	events_register.btn_spinner();
});

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
			view_actions.clearGrid();
			var input = logic.gatherTabData(this);
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
	
	btn_spinner : function(){
		$(document).bind("ajaxSend", function(){
				$(".tab_submit").button('loading');
			 }).bind("ajaxComplete", function(){
			    $(".tab_submit").button('reset');
			 });
	}
};

var view_actions = {
	
		tabs_activate : function (tab){
			$(tab).addClass('active').siblings().removeClass('active');
			var section_id = $(tab).data('section-id');	
			$('#'+section_id).removeClass('hidden').siblings().addClass('hidden');
		},
		
		populateGrid : function(json){
			
			//populate header
			var tbl, header='', body='';

			while((typeof json[0]) == 'undefined'){
				json = json[Object.keys(json)];
			}
			var keys = Object.keys(json[0]);
			$.each(keys, function(index, val){
				header = header + CONSTANTS.th(val);
			}); 
			header = CONSTANTS.tr(header);
			
			//populate body
			$.each(json, function(index, val){
				var row = '';
				$.each(keys, function(i, v){
					row = row + CONSTANTS.td(val[v]);
				});
				body = body + CONSTANTS.tr(row);
			}); 
			
			
			//create table
			tbl = CONSTANTS.tbl(header, body);			
			$('#data-grid').append(tbl).removeClass('hidden');
			    $('html, body').animate({
			        scrollTop: $("#data-grid").offset().top - 60
			    }, 1000);

		},
		
		clearGrid : function(){
			$('#data-grid').html('');
		},
		
};

var logic = {
	gatherTabData : function(btn){
		var input = {};
		$.each($(btn).parent('fieldset').siblings('fieldset').find('input'), function(){
			input[$(this).attr("id")] = $(this).val();
		});
		var data = JSON.stringify(input)
		api_calls.serviceCall(data, btn);
		
	}	
};

var api_calls ={
		
		serviceCall : function(data, btn){
			
			api_calls.private.get(CONSTANTS[$(btn).data('svc-url')], data, view_actions.populateGrid);
		},
		
		//Consider this as private method and dont use from outside api_calls
		private : {
			
			get : function(url, data, successCB){
				$.getJSON(url, data, successCB);
			}
				
		},
		
};