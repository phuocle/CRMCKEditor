'use strict';
CKEDITOR.dialog.add('crmplaceholder', function (editor) {
    var lang = editor.lang.crmplaceholder;
	return {
		title: lang.title,
		minWidth: 300,
		minHeight: 150,
		resizable: CKEDITOR.DIALOG_RESIZE_NONE,
		buttons: [ CKEDITOR.dialog.cancelButton, CKEDITOR.dialog.okButton ],
		onOk: function (widget) {
		    var entity = CKEDITOR.dialog.getCurrent().getContentElement("crmplaceholder", "entity");
		    var field = CKEDITOR.dialog.getCurrent().getContentElement("crmplaceholder", "field");
		    if (entity.getValue() == "null") {
		        alert("Please select entity");
		        return;
		    }
		    if (field.getValue() == "null") {
		        alert("Please select field");
		        return;
		    }
		},
		contents: [
			{
			    id: 'crmplaceholder',
			    label: 'crmplaceholder',
			    title: 'crmplaceholder',
				elements: [
					{
						id: 'entity',
						type: 'select',
						label: lang.entity,
						items: [],
						onShow: function (item) {
						    var select = this.getInputElement();
						    select.setAttribute("style", "width:300px");
						},
						onLoad: function () {
						    var apiconfig = { APIUrl: Xrm.Page.context.getClientUrl() + '/api/data/v8.0/' };
						    var crmAPI = new CRMWebAPI(apiconfig);
						    var selectEntity = CKEDITOR.dialog.getCurrent().getContentElement("crmplaceholder", "entity");
						    selectEntity.add("", "");
						    crmAPI.GetEntityDisplayNameList().then(function(result)
						    {
						        result.sort(function (a, b) { return (a.LogicalName > b.LogicalName) ? 1 : ((b.LogicalName > a.LogicalName) ? -1 : 0); });
						        for (var i = 0; i < result.length; i++) {
						            var entityName = result[i].DisplayName;
						            var metadataId = result[i].MetadataId;
						            var logicalName = result[i].LogicalName;
						            if (CKEDITOR.Entities === "all")
						                selectEntity.add(entityName, metadataId + "." + logicalName);
						            else {
						                var entities = CKEDITOR.Entities.split(',');
						                for (var j = 0; j < entities.length; j++)
						                    if (entities[j] === logicalName)
						                        selectEntity.add(entityName, metadataId + "." + logicalName);
						            }
						        }
						    });

                        },
						onChange: function (item) {
						    var value = this.getValue();
						    if (value == null) return;
						    var metadataId = value.split(".")[0];
						    var selectField = CKEDITOR.dialog.getCurrent().getContentElement("crmplaceholder", "field");
						    selectField.clear();
						    var apiconfig = { APIUrl: Xrm.Page.context.getClientUrl() + '/api/data/v8.0/' };
						    var crmAPI = new CRMWebAPI(apiconfig);
						    crmAPI.GetAttributeDisplayNameList(metadataId).then(function (result) {
						        result.sort(function (a, b) { return (a.SchemaName > b.SchemaName) ? 1 : ((b.SchemaName > a.SchemaName) ? -1 : 0); });
						        var i = 0;
						        for (i = 0; i < result.length; i++) {
						            var schemaName = result[i].SchemaName;
						            var logicalName = result[i].LogicalName;
						            selectField.add(schemaName, logicalName);
						        }
						    });
						},
						setup: function (widget) {
						    var apiconfig = { APIUrl: Xrm.Page.context.getClientUrl() + '/api/data/v8.0/' };
						    var crmAPI = new CRMWebAPI(apiconfig);
						    var value = "";
						    var entity = this;
						    crmAPI.GetEntityDisplayNameList().then(function (result) {
						        var i = 0;
						        for (i = 0; i < result.length; i++)
						            if (result[i].LogicalName == widget.data.entity)
						                value = result[i].MetadataId + "." + result[i].LogicalName;
						        entity.setValue(value);
						    });
						},
						commit: function (widget) {
						    var value = this.getValue();
						    widget.setData('entity', value.split('.')[1]);
						}
					},
                    {
                        id: 'field',
                        type: 'select',
                        label: lang.field,
                        items: [],
                        onShow: function (item) {
                            var select = this.getInputElement();
                            select.setAttribute("style", "width:300px");
                        },
                        setup: function (widget) {
                            var field = this;
                            setTimeout(function () {
                                field.setValue(widget.data.field);
                            }, 1000);
                        },
                        commit: function (widget) {
                            widget.setData('field', this.getValue());
                        }
                    }
				]
			}
		]
	};
} );
