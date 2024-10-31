jQuery(document).ready(function(){	//Add credits to footer
	updateStatus();
});
function updateStatus(){
	
	
		jQuery.ajax({		  url: SkypeCustomImages.ajaxurl,		  cache: false,		  data: 	{
						action:'sci_ajax',
						skypename:SkypeCustomImages.skypename,
					},		  success: 	function(status){							// If status was not detedted - do nothing							if (status != 0){
								//Update the icon accordingly								var footer_html = jQuery('.sk_footer').html();								var widget_html = jQuery('.sk_widget').html();								var shortcode_html = jQuery('.sk_shortcode').html();								
								if (footer_html != status) jQuery('.sk_footer').html(status);								if (widget_html != status) jQuery('.sk_widget').html(status);								if (shortcode_html != status) jQuery('.sk_shortcode').html(status);							}
							
							if (SkypeCustomImages.interval >= 0) setTimeout('updateStatus()', SkypeCustomImages.interval); 
						},		  dataType:'html'		});
	
}

