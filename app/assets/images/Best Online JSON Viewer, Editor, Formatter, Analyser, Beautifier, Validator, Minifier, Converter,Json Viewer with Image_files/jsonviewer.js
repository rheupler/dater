var isJsonData = true, json = "", editor, mode,editorAce, editorResult,viewname;

$(document).ready(function() {

	var container = document.getElementById("jsoneditor");

	var options = {
		mode : 'tree',
		error : function(err) {
			openErrorDialog(err.toString());
		}
	};

	viewname = $("#viewName").val().trim();
	
	if(viewname=='jsonviewer'){
		
		var mode = document.getElementById('mode');
		mode.onchange = function() {
			editor.setMode(mode.value);
			showJSON(true);
		};
		
		setViewTitle("JSON VIEWER", true, true);

		createEditor("json", "json");
	}
	else if(viewname=='online-json-editor'){
		setViewTitle("Online JSON EDITOR",true,true);
		
		$(".JsonInputDiv").append("<a href='#' id='jsonMinify' style='float:left;  margin-right: 7px;position: relative;	background-color: #D5DDF6;border:1px solid #aec0f8;' class='minifyClass compact' onclick='MinifyJSON()' title='Minify'>Minify</a>");
		$(".JsonInputDiv").append("<a href='#' id='jsonBeautify' style='float:left;  margin-right: 7px;position: relative;	background-color: #D5DDF6;border:1px solid #aec0f8;' class='minifyClass format' onclick='FormatJSON()' title='Beautify'>Beautify</a>");

		createEditor("json");	
		editorAce.setOptions({
		    enableBasicAutocompletion: true,
		    enableSnippets: true,
		    enableLiveAutocompletion: false
		});
	} 
	
	editor = new jsoneditor.JSONEditor(container, options, json);
	
});

function showJSON(modeChange) {

	isJsonData = true;
	$("#json").show();
	$("#xml").hide();
	try {
		var data = new Object();
		data = editorAce.getValue();

		if (data != null && data != "" && data.trim().length > 0) {

			json = {
				// "array" : JSON.parse(data)
				"array" : jsonlint.parse(data)
			};

			if (modeChange == undefined && viewname=='jsonviewer') {
				$('#mode').val('tree');
				editor.setMode('tree');

				editor.set(json);
				editor.expandAll();
			}
			else{
				editor.set(json);
				editor.expandAll();
			}
			setOutputMsg("Tree Viewer");
		}
	} catch (e) {
		jsonValidateError(e);
	}
}
function jsonValidateError(e) {
	$("#json").hide();
	$("#xml").show();
	if(viewname=='jsonviewer'){
		editorResult.setValue("" + e);
	}
	else{
		editor.set(e);
	}
	setOutputMsg("Invalid Json");
}

function setToEditor(data) {
	
	if (data.trim().length > 0) {
		if(viewname=='jsonviewer'){
			editorResult.getSession().setMode("ace/mode/json");
		}
		try {
			editorAce.setValue(vkbeautify.json(data));
		} catch (e) {
			// TODO: handle exception
			editorAce.setValue(data);
		}
		showJSON();

	} else {
		openErrorDialog("No data return");
	}

}

function getJSON() {
	isJsonData = true;
	var s = editor.getText();
	if (s != '') {
		var c = s.indexOf(':');
		var newstr = s.substring(c + 1, (s.length - 1));
		var obj = JSON.parse(newstr);
		editorAce.setValue(vkbeautify.json(obj));
	}

}

function FormatJSON() {

	var oldformat = editorAce.getValue();

	if (oldformat.length > 0) {
		try {
			if (jsonlint.parse(oldformat)) {
				
				var newformat = vkbeautify.json(oldformat);
				if(viewname=='online-json-editor'){
					editorAce.setValue(newformat);
				}
				else{
					isJsonData = true;
					editorResult.getSession().setMode("ace/mode/json");
					$("#json").hide();
					$("#xml").show();
					editorResult.getSession().setUseWrapMode(false);
					editorResult.setValue(newformat);	
				}
				

				setOutputMsg("Beautify Json");
			}
		}

		catch (e) {
			jsonValidateError(e);
		}
	}
}

function MinifyJSON() {

	var oldformat = editorAce.getValue();

	if (oldformat.trim().length > 0) {

		try {
			if (jsonlint.parse(oldformat)) {
				
				var newformat = vkbeautify.jsonmin(oldformat);
				if(viewname=='online-json-editor'){
					editorAce.setValue(newformat);
				}
				else{
					isJsonData = true;
					$("#json").hide();
					$("#xml").show();
					editorResult.getSession().setMode("ace/mode/json");
					editorResult.getSession().setUseWrapMode(true);
					editorResult.setValue(newformat);	
				}

				setOutputMsg("Minify Json");
			}
		} catch (e) {
			jsonValidateError(e);
		}
	}
}

function createJSONFile() {
	var content = "";
	if ($("#json").is(':visible')) {
		content = editor.getText();
	} else {
		content = editorResult.getValue();

	}
	if (content != null && content != "" && content.trim().length > 0) {
		var blob = new Blob([ "" + content + "" ], {
			type : "text/plain;charset=utf-8"
		});

		var fileName = "codebeautify.json";
		if (isJsonData == false) {
			fileName = "codebeautify.xml";
		}
		saveAs(blob, fileName);
	} else {
		setOutputMsg("Result is Empty");
		openErrorDialog("Sorry Result is Empty");
	}
}

function json2xmlConvert() {

	var obj = editorAce.getValue();

	if (obj.trim().length > 0) {

		try {
			if (jsonlint.parse(obj)) {
				isJsonData = false;
				$("#json").hide();
				$("#xml").show();
				editorResult.getSession().setMode("ace/mode/xml");

				var xotree = new XML.ObjTree();
				var xml = xotree.writeXML(JSON.parse(obj));
				xml = decodeSpecialCharacter(xml);
				editorResult.setValue(vkbeautify.xml(xml));

				setOutputMsg("Json To XML");
			}
		} catch (e) {
			jsonValidateError(e);
		}
	}
}

// new functionality on 31/10/2013
// json validate
// it can give simple result if validate json or not
function validateJSON() {
	var data = editorAce.getValue();

	if (data != null && data != "" && data.trim().length > 0) {
		isJsonData = true;
		$("#json").hide();
		$("#xml").show();

		try {
			if (jsonlint.parse(data)) {
				editorResult.setValue("Valid JSON");
			}
		} catch (e) {
			jsonValidateError(e);
		}
		setOutputMsg("Validate Json");
	}
}

