var CONSTANTS = {
	URL_SVC_1 : 'http://localhost:8083/ipet/api/v1/auditdata',
	URL_SVC_2 : jQuery.validator.format('http://localhost:8083/ipet/api/v1/auditdata/tracking/{0}'),
	URL_SVC_3 : jQuery.validator.format('http://localhost:8083/ipet/api/v1/auditdata/correlation/{0}'),
	URL_SVC_4 : jQuery.validator.format('http://localhost:8083/ipet/api/v1/auditdata/tracking/{0}/payload'),
	URL_SVC_5 : jQuery.validator.format('http://localhost:8083/ipet/api/v1/auditdata/tracking/{0}/payload/resubmit'),
	
	
	corr_input : jQuery.validator.format('<fieldset class="form-inline col-sm-10 tab-padd-vert"><label class="control-label" for="correlationid{0}">Correlation ID {0}:</label><input type="text" id="correlationid{0}" class="form-control input-margin-horiz" placeholder="Enter Correlation ID here" size="40" /><button id="add-corr" class="btn btn-success" style="width: 3em;"><span><span class="glyphicon-plus"></span></span></button></fieldset>'),
	tbl : jQuery.validator.format('<table class="table table-hover table-bordered table-striped text-center"><thead>{0}</thead><tbody>{1}</tbody></table>'),
	tr : jQuery.validator.format('<tr>{0}</tr>'),
	th : jQuery.validator.format('<th class="text-center">{0}</th>'),
	td : jQuery.validator.format('<td>{0}</td>'),
	tr_modal : jQuery.validator.format('<tr class="modal_win">{0}</tr>'),	
	
	xml1 : [{
		   "TRACKING_ID": "f426ca3a-8f27-42ab-a55f-74d248df31fd",
		   "PAYLOAD": "<?xml version=\"1.0\" encoding=\"windows-1252\"?><ODM xmlns:cd=\"http://www.cdisc.org/ns/odm/v1.3\" xmlns:ds=\"http://www.w3.org/2000/09/xmldsig#\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"http://www.cdisc.org/ns/odm/v1.3 ODM1-3-0.xsd\" ODMVersion=\"1.3\" FileOID=\"ABC00000100\" PriorFileOID=\"ETO-01-0001\" FileType=\"Transactional\" Description=\"ODM v1.3 Visit Data\" AsOfDateTime=\"2007-01-30T17:57:00\" CreationDateTime=\"2007-01-30T18:07:23\" Granularity=\"AllClinicalData\" Originator=\"behera@amgen.com\">\r\n\t<Study OID=\"PROJ353535\">\r\n\t\t<GlobalVariables>\r\n\t\t\t<StudyName>Amgen 353535<\/StudyName>\r\n\t\t\t<StudyDescription>Amgen 353535<\/StudyDescription>\r\n\t\t\t<ProtocolName>Amgen 353535<\/ProtocolName>\r\n\t\t<\/GlobalVariables>\r\n\t<\/Study>\r\n\t<ClinicalData StudyOID=\"353535\" MetaDataVersionOID=\"v1.1.0\">\r\n\t\t<SubjectData SubjectKey=\"3535351000\">\r\n\t\t\t<StudyEventData StudyEventOID=\"SE.ENROLLMENT\">\r\n\t\t\t\t<FormData FormOID=\"FORM.VISIT\">\r\n\t\t\t\t\t<ItemGroupData ItemGroupOID=\"IG.VISITS\">\r\n\t\t\t\t\t\t<ItemDataInteger ItemOID=\"IT.STUDYID\">353535<\/ItemDataInteger>\r\n\t\t\t\t\t\t<ItemDataString ItemOID=\"IT.SITEID\">100<\/ItemDataString>\r\n\t\t\t\t\t\t<ItemDataString ItemOID=\"IT.SUBJID\">84<\/ItemDataString>\r\n\t\t\t\t\t\t<ItemDataDate ItemOID=\"IT.ENROLLDT\">2014-05-13<\/ItemDataDate>\r\n\t\t\t\t\t\t<ItemDataString ItemOID=\"IT.ENROLLMENTID\">4133341990<\/ItemDataString> \r\n\t\t\t\t\t<\/ItemGroupData>\r\n\t\t\t\t<\/FormData>\r\n\t\t\t<\/StudyEventData>\r\n\t\t<\/SubjectData>\r\n\t<\/ClinicalData>\r\n<\/ODM>"
		}],
	json1 : [
	         {
	             "ACTION": "RESUBMITTED",
	             "ERROR_CODE": "ERR601",
	             "CORRELATION_ID3": "84",
	             "TARGET": "CP4",
	             "APPLICATION_NAME": "iPaasDemo",
	             "TRACKING_ID": "f426ca3a-8f27-42ab-a55f-74d248df31fd",
	             "STATUS": "ERROR",
	             "ERROR_DESCRIPTION": "Basic Data validation failed.",
	             "ERROR_TYPE": "VALIDATIONERROR",
	             "CORRELATION_ID1": "353535",
	             "MILESTONE": "EXIT",
	             "TIMESTAMP": "2016-04-29 17:40:00.2",
	             "CORRELATION_ID2": "100",
	             "SOURCE": "SubjectQ"
	          },
	             {
	             "ACTION": "RESUBMITTED",
	             "ERROR_CODE": "NA",
	             "CORRELATION_ID3": "84",
	             "TARGET": "SubjectQ",
	             "APPLICATION_NAME": "iPaasDemo",
	             "TRACKING_ID": "f426ca3a-8f27-42ab-a55f-74d248df31fd",
	             "STATUS": "SUCCESS",
	             "ERROR_DESCRIPTION": "NA",
	             "ERROR_TYPE": "NA",
	             "CORRELATION_ID1": "353535",
	             "MILESTONE": "ENTRY",
	             "TIMESTAMP": "2016-04-29 17:39:54.855",
	             "CORRELATION_ID2": "100",
	             "SOURCE": "CP4"
	          }
	       ],
	json2 : [
	         {
	             "ACTION": "OPEN",
	             "ERROR_CODE": "ERR601",
	             "CORRELATION_ID3": "84",
	             "TARGET": "CP4",
	             "APPLICATION_NAME": "iPaasDemo",
	             "TRACKING_ID": "f426ca3a-8f27-42ab-a55f-74d248df31fd",
	             "STATUS": "ERROR",
	             "ERROR_DESCRIPTION": "Basic Data validation failed.",
	             "ERROR_TYPE": "VALIDATIONERROR",
	             "CORRELATION_ID1": "353535",
	             "MILESTONE": "EXIT",
	             "TIMESTAMP": "2016-04-29 17:40:00.2",
	             "CORRELATION_ID2": "100",
	             "SOURCE": "SubjectQ"
	          },
	             {
	             "ACTION": "OPEN",
	             "ERROR_CODE": "NA",
	             "CORRELATION_ID3": "84",
	             "TARGET": "SubjectQ",
	             "APPLICATION_NAME": "iPaasDemo",
	             "TRACKING_ID": "f426ca3a-8f27-42ab-a55f-74d248df31fd",
	             "STATUS": "SUCCESS",
	             "ERROR_DESCRIPTION": "NA",
	             "ERROR_TYPE": "NA",
	             "CORRELATION_ID1": "353535",
	             "MILESTONE": "ENTRY",
	             "TIMESTAMP": "2016-04-29 17:39:54.855",
	             "CORRELATION_ID2": "100",
	             "SOURCE": "CP4"
	          }
	       ],
       json3 : [
                {
                    "ACTION": "RESUBMITTED",
                    "ERROR_CODE": "ERR601",
                    "CORRELATION_ID3": "84",
                    "TARGET": "CP4",
                    "APPLICATION_NAME": "iPaasDemo",
                    "TRACKING_ID": "f426ca3a-8f27-42ab-a55f-74d248df31fd",
                    "STATUS": "ERROR",
                    "ERROR_DESCRIPTION": "Basic Data validation failed.",
                    "ERROR_TYPE": "VALIDATIONERROR",
                    "CORRELATION_ID1": "353535",
                    "MILESTONE": "EXIT",
                    "TIMESTAMP": "2016-04-29 17:40:00.2",
                    "CORRELATION_ID2": "100",
                    "SOURCE": "SubjectQ"
                 },
                    {
                    "ACTION": "RESUBMITTED",
                    "ERROR_CODE": "NA",
                    "CORRELATION_ID3": "84",
                    "TARGET": "SubjectQ",
                    "APPLICATION_NAME": "iPaasDemo",
                    "TRACKING_ID": "f426ca3a-8f27-42ab-a55f-74d248df31fd",
                    "STATUS": "SUCCESS",
                    "ERROR_DESCRIPTION": "NA",
                    "ERROR_TYPE": "NA",
                    "CORRELATION_ID1": "353535",
                    "MILESTONE": "ENTRY",
                    "TIMESTAMP": "2016-04-29 17:39:54.855",
                    "CORRELATION_ID2": "100",
                    "SOURCE": "CP4"
                 }
              ],
};

var req_objects = {
		
	dt_request : {
		
		startDate : '',//Mandatory
		endDate : '',//Mandatory
		appname : '',//Optional		
	},
	
	trk_request : {
		
		trackingid : '',//Mandatory
	},
	
	corr_request : {
		
		correlationid1 : '',//Mandatory
		correlationid2 : '',//Optional
		correlationid3 : '',//Optional
	},

	resubmit_request : {
		
		   tracking_id: '',	
		   payload: '',		  
		   flow_name:'SIDW'
		   
		}
};