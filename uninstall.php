<?php
if ( !defined( 'WP_UNINSTALL_PLUGIN' ) )
	die();
//Delete plugin options$options = get_option('sci_general');if ($options['delete_settings']){	delete_option('sci_general');	delete_option('sci_version');}
?>