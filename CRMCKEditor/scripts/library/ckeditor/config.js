CKEDITOR.editorConfig = function( config ) {
	config.language = 'en';
	config.contentsCss = CKEDITOR.getUrl('contents.css');
	config.autoGrow_onStartup = true;
	config.toolbarGroups = [
        { name: 'document', groups: ['mode', 'document', 'doctools'] },
        { name: 'clipboard', groups: ['clipboard', 'undo'] },
        { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
        { name: 'forms', groups: ['forms'] },
        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
        { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
        { name: 'links', groups: ['links'] },
        { name: 'insert', groups: ['insert'] },
        { name: 'styles', groups: ['styles'] },
        { name: 'colors', groups: ['colors'] },
        { name: 'tools', groups: ['tools'] },
        { name: 'others', groups: ['others'] },
        { name: 'about', groups: ['about'] }
    ];
	if (CKEDITOR.EnabledPlaceHolder) {
	    config.toolbarGroups.push({ name: 'crm', groups: ['crm'] });
	    config.extraPlugins = 'widget,lineutils,crmplaceholder';
	}
	config.dialog_noConfirmCancel = true;
	config.skin = CKEDITOR.Skin;
	CKEDITOR.on('instanceReady', function (ev) {
	    CKEDITOR.instances.RTEditor.execCommand('maximize');
	});
};
