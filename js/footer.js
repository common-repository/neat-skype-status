jQuery(document).ready(function($){

		//Add credits to footer
		var search_within;

		if ((search_within = $('#site-generator')).length > 0){update_credits(search_within)}
		else if ((search_within = $('[id*="credit"]').last()).length > 0){search_for_hook(search_within)}
		else if ((search_within = $('#footer')).length > 0){search_for_hook(search_within)}
		else if ((search_within = $('#colophon')).length > 0){update_credits(search_within)}
		else if ((search_within = $('footer').last()).length > 0){search_for_hook(search_within)}
		else if ((search_within = $('.footer').last()).length > 0){search_for_hook(search_within)}
		else if ((search_within = $('[class*="footer"]').last()).length > 0){search_for_hook(search_within)}
		else if ((search_within = $('[id*="footer"]').last()).length > 0){search_for_hook(search_within)}
		

});

function search_for_hook(search_within){
	if (search_within.length > 0){
			if ((footer_object = jQuery('*:contains("Powered")',search_within).last()).length > 0) update_credits(footer_object);
			else if ((footer_object = jQuery('*:contains("Copyright")',search_within).last()).length > 0) update_credits(footer_object);
			else if ((footer_object = jQuery('*:contains("theme by")',search_within).last()).length > 0) update_credits(footer_object);
			else if ((footer_object = jQuery('*:contains("designed")',search_within).last()).length > 0) update_credits(footer_object);
			else if ((footer_object = jQuery(search_within).find('[id*="cred"]').last()).length > 0) update_credits(footer_object);
			else update_credits(search_within);
	}
	
}

function update_credits(footer_object){

	jQuery('#sci_nss_link').detach().appendTo(footer_object).show().append('<br/>');
	
}

jQuery.expr[':'].contains = function(a, i, m) { 
  return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0; 
};