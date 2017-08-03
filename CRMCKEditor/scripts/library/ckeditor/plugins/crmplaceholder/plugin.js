'use strict';
( function() {
    CKEDITOR.plugins.add('crmplaceholder', {
		requires: 'widget,dialog',
		lang: 'en',
		icons: 'crmplaceholder',
		hidpi: true,
		onLoad: function() {
		    CKEDITOR.addCss('.crmplaceholder{background-color:#ff0}');
		},
		init: function( editor ) {
		    var lang = editor.lang.crmplaceholder;
			CKEDITOR.dialog.add('crmplaceholder', this.path + 'dialogs/crmplaceholder.js');
			editor.widgets.add('crmplaceholder', {
			    dialog: 'crmplaceholder',
				pathName: lang.pathName,
				template: '<span class="crmplaceholder">[[]]</span>',
				downcast: function () {
					return new CKEDITOR.htmlParser.text( '[[' + this.data.entity + "." + this.data.field + ']]' );
				},
				init: function () {
				    var data = this.element.getText().slice(2, -2);
				    if (data != null && data != undefined && data.length > 0) {
				        var columns = data.split(".");
				        this.setData('entity', columns[0]);
				        this.setData('field', columns[1]);
				    }
				},
				data: function () {
				    this.element.setText('[[' + this.data.entity + "." + this.data.field + ']]');
				}
			});
			editor.ui.addButton && editor.ui.addButton('crmplaceholderButton', {
				label: lang.toolbar,
				command: 'crmplaceholder',
				toolbar: 'crm,1',
				icon: 'crmplaceholder'
			} );
		},
		afterInit: function( editor ) {
			var placeholderReplaceRegex = /\[\[([^\[\]])+\]\]/g;
			editor.dataProcessor.dataFilter.addRules( {
				text: function( text, node ) {
					var dtd = node.parent && CKEDITOR.dtd[ node.parent.name ];
					if ( dtd && !dtd.span )
						return;
					return text.replace( placeholderReplaceRegex, function( match ) {
						var widgetWrapper = null,
							innerElement = new CKEDITOR.htmlParser.element('span', { 'class': 'crmplaceholder' });
						innerElement.add( new CKEDITOR.htmlParser.text( match ) );
						widgetWrapper = editor.widgets.wrapElement(innerElement, 'crmplaceholder');
						return widgetWrapper.getOuterHtml();
					} );
				}
			});
		}
	});
})();
