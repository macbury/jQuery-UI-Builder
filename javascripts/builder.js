var builder = {
	library: [],
	
	renderComponents: function(){
		$.each(this.library, function () {
			var component = this;
			
			if (this.options.hidden == true) { return }
			
			var dom = component.getDomObject();
			$("#library .components").append(dom);
			
			$(dom).draggable({
				containment: '#editor',
				cursor: 'move',
				cursorAt: { top: 16, left: 16 },
				revert: true,
				helper: function(event) {
					return $(event.currentTarget).find('img').clone();
				}
			});
		});
	},
	
	newDialog: function(){
		$('#editor').empty().append('<div id="dialog"></div>');
		$('#dialog').dialog({
			position: [10, 43],
			height: 400,
			width: 500,
			title: 'New Dialog',
			draggable: false,
			stack: false
		});
	},
	
	init: function(){
		$(".sidebar").accordion({ header: "h3", autoHeight: false });
		
		$("#library").dialog({
			position: [window.innerWidth - 220, 43],
			height: 300,
			width: 200,
			maxWidth: 250
		});
		
		this.renderComponents();
		
		//$('#editor').droppable({
		//	hoverClass: 'component-hover',
		//	accept: ".forEditor",
		//	drop: function(event, ui) {
				//$(this).addClass('ui-state-highlight');
		//	}
		//});
		
		$('#search').keyup(function () {
			var keyword = new RegExp($(this).val(), 'gi');
			
			if (keyword.length == '') {
				$("#library .component").show();
			} else {
				$("#library .component").each(function () {
					var text = $(this).text();
					if (text.match(keyword) == null) {
						$(this).hide();
					}else{
						$(this).show();
					}
				});
			}
			

		});
		
		this.newDialog();
		
		$(".button:not(.ui-state-disabled)")
				.hover(
					function(){ 
						$(this).addClass("ui-state-hover"); 
					},
					function(){ 
						$(this).removeClass("ui-state-hover"); 
					}
				)
				.mousedown(function(){
						$(this).parents('.buttonset-single:first').find(".button.ui-state-active").removeClass("ui-state-active");
						if( $(this).is('.ui-state-active.button-toggleable, .buttonset-multi .ui-state-active') ){ $(this).removeClass("ui-state-active"); }
						else { $(this).addClass("ui-state-active"); }	
				})
				.mouseup(function(){
					if(! $(this).is('.button-toggleable, .buttonset-single .button,  .buttonset-multi .button') ){
						$(this).removeClass("ui-state-active");
					}
				});
	},
}