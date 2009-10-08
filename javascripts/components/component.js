function Component(options) {
	this.options = options;
	this.init();
}

Component.prototype.init = function () {
	builder.library.push(this);
}

Component.prototype.icon = function () { 
	if (this.options.icon == undefined) {
		return 'object.png';
	}else{
		return this.options.icon;
	}
}

Component.prototype.getDomObject = function () {
	var html = $('<div class="component ui-corner-all"></div>');
	html.append('<img src="images/library/'+this.icon()+'" width="32" height="32" />');
	html.append('<b>'+this.options.name+'</b> - '+this.options.description);
	html.data('plugin', this.options.plugin);
	
	return html;
}