<?php
class SCI_Widget extends WP_Widget {

	function SCI_Widget() {
		// Instantiate the parent object
		parent::WP_Widget( false,
			$name = __( 'Neat Skype Status v1', GCI_TEXT_DOMAIN ),
			array( 'description' => __( 'Add skype button (options in settings)', SCI_TEXT_DOMAIN ) ) );
	}

	function widget( $args, $instance ) {
		// Widget output
		extract($args, EXTR_SKIP);
		echo $before_widget;
		$options = get_option( SCI_GENERAL_OPTIONS_NAME );		extract($options);
		if (!empty($skypename)) {			$image_icon_html = getSkypeStatusIcon($skypename, $initial_check);			echo '<a class="sk_widget" href="skype:'.$skypename.'?'.$action.'">'.$image_icon_html.' </a>';		} else {			echo __( 'You should include skype name in "Skype AJAX status" settings.', SCI_TEXT_DOMAIN );		} 		
		echo $after_widget;
	}
	function update( $new_instance, $old_instance ) {					$instance = $old_instance;		$instance['support_dev'] = (isset($new_instance['support_dev']))?true:false;				if ($instance['support_dev']){			$footer_options = get_option('sci_footer_options');			$footer_options['support_dev'] = true;			update_option('sci_footer_options', $footer_options);		}				return $instance;	}
	function form( $instance ) {			$options = get_option( SCI_GENERAL_OPTIONS_NAME );		?>						<table width="215px"><tr><th><label>Skypename</label></th><th><label >Action</label></th></tr>			<tr>			<td width="100%"><input size="15" disabled type="text" value="<?php echo $options['skypename']; ?>"/></td>			<td><select disabled>				<option <?php selected($options['action'], 'call'); ?> value='call'>Call</option>				<option <?php selected($options['action'], 'chat'); ?> value='chat'>Chat</option>				<option <?php selected($options['action'], 'add'); ?> value='add'>Add</option>				<option <?php selected($options['action'], 'userinfo'); ?> value='userinfo'>View profile</option>				<option <?php selected($options['action'], 'voicemail'); ?> value='voicemail'>Voicemail</option>				<option <?php selected($options['action'], 'sendfile'); ?> value='sendfile'>Send file</option>			</select></td></tr>			<tr><td colspan="2" ><label><a href="http://neat-wordpress-plugins.mission.lt/neat-skype-status#get_it" style="text-decoration: none">Add new..</a></label></td></tr>		</table>		<br><br>		<h3>Support <a href="http://www.mission.lt/en" target="_blank">positive cause</a> and <a href="http://neat-wordpress-plugins.mission.lt/neat-skype-status#get_it">Download</a> v2:</h3>		<ul>			<li>* <b>Widget styles.</b> (floating, transparent). </li>			<li>* <b>Multiple skype buttons.</b> Display as board or integrated (shows account found online)</li>			<li>* <b>Change button action from your PC skype</b></li>		</ul>				<?php $footer_options = get_option('sci_footer_options');		if (!$footer_options['support_dev']): ?>				<label><input type="checkbox" <?php checked($instance['support_dev']); ?> name="<?php echo $this->get_field_name('support_dev'); ?>" value="on" /> No thanks, I'll support development by adding link instead of text to my site's footer</label>				<?php endif; ?>				<h2><b><a href="http://neat-wordpress-plugins.mission.lt/neat-skype-status" style="text-decoration: none;">Live demo</a></b></h2>								<?php		echo '<a style="float:right" href="options-general.php?page=neat-skype-status.php">' . __( 'Settings', SCI_TEXT_DOMAIN ) . '</a><br>';
	}
} 
?>