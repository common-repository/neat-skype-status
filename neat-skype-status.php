<?php
/*
Plugin Name: Neat Skype Status (AJAX and Custom Images)
Plugin URI: http://neat-wordpress-plugins.mission.lt/neat-skype-status
Description: Light and simple plugin displays Skype Button (with Official or Custom Images) in post/page/widget or floating. Status updates without page reload.
Version: 1.2.7
Author: aurimus
Author URI: http://neat-wordpress-plugins.mission.lt/neat-skype-status/
License: GPL2

---

Copyright 2010 Aurimas Kubeldzis (email: 4urimas@gmail.com)

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
*/

define('SCI_PLUGIN_NAME', str_replace('.php', '', basename(__FILE__)));
define('SCI_TEXT_DOMAIN', 'neat-skype-status');
define('SCI_GENERAL_OPTIONS_NAME', 'sci_general' );
define( 'SCI_VERSION', '1.2.6' );

define('SCI_PATH', WP_PLUGIN_URL.'/'.str_replace(basename( __FILE__),"",plugin_basename(__FILE__)));
define('SCI_SYSTEM_PATH', dirname(__FILE__));

if(!class_exists('skype_ajax')){
	class skype_ajax{
	
		function __construct() {
			register_activation_hook( __FILE__, array( $this, 'activate_plugin' ) );
			add_action( 'init', array( $this, 'init_plugin' ) );
			add_action( 'wp_ajax_sci_ajax', array( $this, 'sci_ajax' ) );
			add_action( 'wp_ajax_nopriv_sci_ajax', array( $this, 'sci_ajax' ) );
			add_action( 'widgets_init', array( $this, 'add_widget' ) );
			add_action( 'widgets_init', array( $this, 'add_widget2' ) );
			
			//No point doing any of this if currently processing an AJAX request
			if ( ! defined( 'DOING_AJAX' ) || !DOING_AJAX ) {
			add_action( 'admin_menu', array( $this, 'setup_admin' ) );
			add_action( 'wp_footer', array( $this, 'add_to_footer' ) );
			add_action( 'admin_init', array( $this, 'init_admin' ) );
			add_action( 'wp_print_styles', array( $this, 'add_styles' ) );
			add_action( 'wp_print_scripts', array( $this, 'add_scripts' ) );
			add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), array( $this, 'add_settings_link' ) );
			add_shortcode( 'skype', array( $this, 'shortcode_handler' ) );
			add_shortcode( 'neat-skype-status', array( $this, 'shortcode_handler' ) );
			}
		}
		
		function activate_plugin(){
			if( version_compare( PHP_VERSION, '5.2', '<' ) ) {
				if( is_admin() ) {
					require_once ABSPATH . '/wp-admin/includes/plugin.php';
					deactivate_plugins( basename( __FILE__ ) );
					wp_die( 'This plugin requires the server on which your site resides to be running PHP 5.2 or higher. As of version 3.2, WordPress itself will also <a href="http://wordpress.org/news/2010/07/eol-for-php4-and-mysql4">have this requirement</a>. You should get in touch with your web hosting provider and ask them to update PHP.<br /><br /><a href="' . admin_url( 'plugins.php' ) . '">Back to Plugins</a>' );
				}
			}
			
			//Generate phrase for seo purposes
			$keywords_array = array('Skype Button plugin',
									'Skype Status Icons plugin',
									'Skype Status AJAX wp plugin',
									'Skype for website',
									'Skype AJAX status',
									'Custom Skype status',
									'Custom Skype button',
									'Custom Skype icons for wordpress',
									'Custom Skype status plugin',
									'Skype Button widget',
									'Transparent skype status',
									'Wordpress skype plugin',
									'Neat Skype Status',
									'Skype button widget',
									'Skype plugin for wordpress');
			$phrase = $keywords_array[array_rand($keywords_array)];
			update_option( 'sci_footer_options', array('phrase' => $phrase, 'support_dev' => true) );
		}
		
		//Register the widget
		function add_widget() {
			require_once 'widget/sci-widget.php';
			return register_widget( 'SCI_Widget' );
		}
		
		function add_widget2() {
			require_once 'widget/sci-widget2.php';
			return register_widget( 'SCI_Widget2' );
		}
		
		function init_plugin() {
			//Load text domain for i18n
			load_plugin_textdomain( SCI_TEXT_DOMAIN, false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
		}

		//Adds 'Settings' link to main WordPress Plugins page
		function add_settings_link( $links ) {
			array_unshift( $links, '<a href="options-general.php?page=neat-skype-status.php">' . __( 'Settings', SCI_TEXT_DOMAIN ) . '</a>' );
			array_unshift( $links, '<a href="http://neat-wordpress-plugins.mission.lt/neat-skype-status#get_it">' . __( 'Download v2', SCI_TEXT_DOMAIN ) . '</a>' );
			return $links;
		}
		/*
		function sci_admin_styles() {
			//Don't add styles if on admin screens	
				wp_enqueue_script( 'sci_admin_script' );
		}*/
		
		function setup_admin(){
			global $sci_settings_page;

			$sci_settings_page = add_options_page( 'Neat Skype Status', 'Neat Skype Status', 'manage_options', basename( __FILE__ ), array( $this, 'admin_page' ) );
			
			//add_action('admin_print_styles-' . $sci_settings_page, 'sci_admin_styles');

		}
		
		
		
		function update_settings() {
				
			//Generate phrase for seo purposes
			$keywords_array = array('Skype Button plugin',
									'Skype Status Icons plugin',
									'Skype Status AJAX wp plugin',
									'Skype for website',
									'Skype AJAX status',
									'Custom Skype status',
									'Custom Skype button',
									'Custom Skype icons for wordpress',
									'Custom Skype status plugin',
									'Skype Button widget',
									'Transparent skype status',
									'Wordpress skype plugin',
									'Neat Skype Status',
									'Skype button widget',
									'Skype plugin for wordpress');
			$phrase = $keywords_array[array_rand($keywords_array)];
			add_option( 'sci_footer_options', array('phrase' => $phrase, 'support_dev' => true) );

			add_option( 'sci_version', SCI_VERSION );

			add_option( SCI_GENERAL_OPTIONS_NAME );
			
			//Get general options
			$options = get_option( SCI_GENERAL_OPTIONS_NAME );

			$defaults = array(
				'skype_footer' => true,
				//'footer_coordX' => 5,
				//'footer_coordY' => 250,
//				'footer_transp' => 100,
				'skypename' => 'neatplugins',
//				'visible_name' => 'Echo Service',
				'theme' => 'simple (very big Button)',
				'interval' => 3000,
				'action' => 'call',
				//'initial_status' => 1,
				'initial_check' => false,
				'preload_images' => true,
				'delete_settings' => false
			);
			
			
			//Merge old and new settings
			$new_options = shortcode_atts( $defaults , $options );

			//Save options
			update_option( SCI_GENERAL_OPTIONS_NAME, $new_options );
			
			
			
		}
		
		function init_admin() {
		
			$version = get_option( 'sci_version' );

			//If updating from previous versions, do something
			/*if ( false === $version || version_compare( $version, '0.7', '<' ) ) {
			
			}*/

			//If updating from a previous version, update the settings
			if ( false === $version || version_compare( $version, SCI_VERSION, '<' ) )
				$this->update_settings();

			register_setting( 'sci_general', 'sci_general', array( $this, 'validate_general_options' ) );
			register_setting( 'sci_general', 'sci_footer_options', array( $this, 'validate_footer_options' ) );
			//wp_register_script( 'sci_admin_script', plugins_url('js/sci-admin-script.js', __FILE__) );

		}
		
		function validate_footer_options( $input ) {
			$sci_footer_options = get_option('sci_footer_options');
			$sci_footer_options['support_dev'] = ( isset( $input['support_dev'] ) ) ? true : false;

			return $sci_footer_options;
		}
		
		function validate_general_options( $input ) {
			$options = get_option(SCI_GENERAL_OPTIONS_NAME);
			
			$options['skype_footer'] = ( isset( $input['skype_footer'] ) ) ? true : false;
			$options['skypename'] = esc_html( $input['skypename'] );
			$options['theme'] = esc_html($input['theme']);
			$interval_value = intval($input['interval']);
			$options['interval'] = (($interval_value >= 1000) || ($interval_value == -1))? $interval_value:1000;
			$options['action'] = esc_html($input['action']);
			//$options['initial_status'] = esc_html($input['initial_status']);
			$options['initial_check'] = ( isset( $input['initial_check'] ) ) ? true : false;
			$options['preload_images'] = ( isset( $input['preload_images'] ) ) ? true : false;
			$options['delete_settings'] = ( isset( $input['delete_settings'] ) ) ? true : false;
			
			//Delete transients
			delete_transient( 'sci_temp_status' );

			add_settings_error( 'sci_general', 'sci_general_updated', __( 'General options updated.', SCI_TEXT_DOMAIN ), 'updated' );

			return $options;
		}
		
		function admin_page() {
			?>
			<div style="float:right">
			<label> <input onclick="javascript: jQuery('.donate_eur').show();jQuery('.donate_usd').hide();" type="radio"  name="donate_currency" value="eur"/><strong>EUR</strong> </label>&nbsp;&nbsp;&nbsp;<label id="donate_usd_radio" ><input onclick="javascript: jQuery('.donate_eur').hide();jQuery('.donate_usd').show();" checked="checked" type="radio" name="donate_currency"  value="usd" /><strong>USD</strong> </label>
			<form class="donate_eur" style="display:none;" action="https://www.paypal.com/cgi-bin/webscr" method="post">
			<input type="hidden" name="cmd" value="_s-xclick">
			<input type="hidden" name="hosted_button_id" value="KD3N3CXP22PJG">
			<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
			</form>
			<form class="donate_usd" action="https://www.paypal.com/cgi-bin/webscr" method="post">
			<input type="hidden" name="cmd" value="_s-xclick">
			<input type="hidden" name="hosted_button_id" value="QHUWXFPYKQVJ2">
			<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
			</form>
			.. to <strong><a href="http://neat-wordpress-plugins.mission.lt/neat-skype-status#get_it" >download v2</a></strong>
			</div>
			
			<div class="wrap">
				<form method="post" action="options.php" id="some-form1">
					<?php
					settings_fields( 'sci_general' );
					//Get saved general options
					$options = get_option(SCI_GENERAL_OPTIONS_NAME);
					$sci_footer_options = get_option('sci_footer_options');
					/*
					$plugin_dir_name = WP_PLUGIN_URL.'/'.str_replace(basename( __FILE__),"",plugin_basename(__FILE__));
					$some_array = explode('//', $plugin_dir_name );
					$plugin_dir = $some_array[1];
					*/
					?>

					<br />
					<h3><?php _e('Options', SCI_TEXT_DOMAIN); ?></h3>
					
					<table class="form-table">
						<tr style="border-bottom-style:dotted">
							<th scope="row"><b><?php _e('Option name', SCI_TEXT_DOMAIN); ?></b></th>
							<td style="width:1%"> <b>Value</b></td><td><b><a href="http://neat-wordpress-plugins.mission.lt/neat-skype-status" >Neat Skype Status v2</a> options</b>
							</td>
						</tr>
					
						<tr>
							<th scope="row"><?php _e('Skype username:', SCI_TEXT_DOMAIN); ?></th>
							<td style="width:1%"><input type="text" name="sci_general[skypename]" value="<?php echo $options['skypename']; ?>" /> </td><td><label><strong><a href="http://neat-wordpress-plugins.mission.lt/neat-skype-status#get_it" style="text-decoration: none"> Add visible name </a>(for title when hovering with mouse)</label></strong>
							</td>
						</tr>
						
						<tr>
							<th scope="row"><?php _e('Button click action', SCI_TEXT_DOMAIN); ?></th>
							<td>	<select name="sci_general[action]">
									<option <?php selected($options['action'], 'call'); ?> value='call'>Call</option>
									<option <?php selected($options['action'], 'chat'); ?> value='chat'>Chat</option>
									<option <?php selected($options['action'], 'add'); ?> value='add'>Add me to skype</option>
									<option <?php selected($options['action'], 'userinfo'); ?> value='userinfo'>View my profile</option>
									<option <?php selected($options['action'], 'voicemail'); ?> value='voicemail'>Leave me voicemail</option>
									<option <?php selected($options['action'], 'sendfile'); ?> value='sendfile'>Send me a file</option>
								</select> </td><td><label><strong><a href="http://neat-wordpress-plugins.mission.lt/neat-skype-status" style="text-decoration: none"> Depending on my skype status </a>(change automatically when status changes)</label></strong>
							</td>
						</tr>
						
						<tr>
							<th scope="row"><?php _e('Button icons theme', SCI_TEXT_DOMAIN); ?></th>
							<td><select name="sci_general[theme]">
								<?php
									$files = scandir('../wp-content/plugins/neat-skype-status/images/');
									//Print_r($files);
									foreach ($files as $num => $dir_name){
										if ($num > 1){
											$add = ($options['theme'] == $dir_name)?'selected':'';
											echo "<option $add value='$dir_name'>$dir_name</option>";
										}
									}
									
								?>
								</select></td><td><label><strong><a href="http://neat-wordpress-plugins.mission.lt/neat-skype-status#get_it" style="text-decoration: none"> Display status as TEXT </a></label></strong>
							</td>
						</tr>
						
						<tr>
							<th scope="row"><?php _e('Add floating skype button', SCI_TEXT_DOMAIN); ?></th>
							<td>
							<input onclick="javascript: jQuery('.footer_opt').toggle();" type="checkbox" name="sci_general[skype_footer]"<?php checked($options['skype_footer'], true); ?> value="on" /></td><td> <label class="footer_opt" <?php if(!$options['skype_footer']) echo 'style="display:none"'?>><strong><a style="text-decoration: none" href="http://neat-wordpress-plugins.mission.lt/neat-skype-status#get_it"> Set coordinates and transparency</a></label></strong>
							</td>
						</tr>
						
						<tr>
							<th scope="row"><?php _e('Update Interval (ms)', SCI_TEXT_DOMAIN); ?></th>
							<td>
								<input type="text" name="sci_general[interval]" value="<?php echo $options['interval']; ?>" /> </td><td><label> <strong><a style="text-decoration: none" href="http://neat-wordpress-plugins.mission.lt/neat-skype-status#get_it">Set timeout for each request</a></label></strong>
							</td>
						</tr>
						
						
						<div id="advanced_options">
						
						<tr>
							<th scope="row"><?php _e('Check status while loading page', SCI_TEXT_DOMAIN); ?></th>
							<td>
							<input onclick="javascript: jQuery('#select_initial_status').toggle();" id="initial_check" type="checkbox" name="sci_general[initial_check]"<?php checked($options['initial_check'], true); ?> value="off" /> </td><td><label id="select_initial_status" <?php if($options['initial_check']) echo 'style="display:none"'?> > <strong><a style="text-decoration: none"  href="http://neat-wordpress-plugins.mission.lt/neat-skype-status#get_it">Set initial status </a>(shows up for a short time before getting true status)</label></strong>
							</td>
						</tr>
						
						
						<tr>
							<th scope="row"><?php _e('Preload images', SCI_TEXT_DOMAIN); ?></th>
							<td colspan="2">
								<span class="description"><?php _e('Will load invisible chosen theme images to avoid short flicker when status changes first time (because of image loading)', SCI_TEXT_DOMAIN); ?></span>
								<br />
								<input type="checkbox" name="sci_general[preload_images]"<?php checked($options['preload_images'], true); ?> value="on" />
							</td>
						</tr>
						
						<tr>
							<th scope="row"><?php _e('Support development', SCI_TEXT_DOMAIN); ?></th>
							<td colspan="2">
								<span class="description"><?php _e('This will add small link instead of text to support development. Please leave it on or <strong><a style="text-decoration: none" href="http://neat-wordpress-plugins.mission.lt/neat-skype-status#get_it">make a small donation to get v2</a></strong> - which ads no link/text and is more feature rich', SCI_TEXT_DOMAIN); ?></span>
								<br />
								<input type="checkbox" name="sci_footer_options[support_dev]"<?php checked($sci_footer_options['support_dev'], true); ?> value="on" />
							</td>
						</tr>
						
						<tr>
							<th scope="row"><?php _e('Delete settings on remove', SCI_TEXT_DOMAIN); ?></th>
							<td colspan="2">
								<span class="description"><?php _e('If checked will remove plugin completely with its options in database. NOTICE: SAVE YOUR CUSTOM IMAGES AND STYLE. If you have made changes to default stylesheet or replaced images in some theme or added new ones - it will be deleted regardless of this option. ', SCI_TEXT_DOMAIN); ?></span>
								<br />
								<input type="checkbox" name="sci_general[delete_settings]"<?php checked($options['delete_settings'], true); ?> value="on" />
							</td>
						</tr>
						
						
						
						</div>
					
					
					</table>
					
					<input type="submit" class="button-primary" value="<?php _e('Save', SCI_TEXT_DOMAIN); ?>" />
				</form>
			</div><br>
				<div style="margin-left:5px;line-height:180%;font-family: 'times new roman'">	
					<h1>OK, what to do next?</h1>
					<ul style="list-style-type:circle;font-size:18px;margin-left:20px;">
						<li><strong>Add widget. </strong>Go to <em><a href="widgets.php" >Appearance->Widgets</a></em> drag-n-drop <em>Neat Skype Status v1</em> or <strong><em><a style="text-decoration: none" href="http://neat-wordpress-plugins.mission.lt/neat-skype-status#get_it">Neat Skype Status v2</a></em></strong> to some widget area. With v2 you can set multiple skype names to represent your team or you can integrate multiple accounts into single skype button that will automatically switch to account found online</li>
						<li><strong>Add to post or page. </strong>Use shortcode [skype] or [neat-skype-status] to insert skype button anywhere in post or page. The latter will add text for supporting development instead of external link. If you want to totally remove any text/link - support development with donation and <strong><a style="text-decoration: none" href="http://neat-wordpress-plugins.mission.lt/neat-skype-status#get_it">download v2</a></strong>. With v2 you can use shortcode options to override most of default settings (skypename, button action, visible name and icon theme) </li>
						<li><strong>Add floating status. </strong>Tick option "Add floating skype button" above, this will add it on left side of your website. <strong><a style="text-decoration: none" href="http://neat-wordpress-plugins.mission.lt/neat-skype-status#get_it">In v2</a></strong> you can set coordinates and icon transparency. You can use widget <strong><a style="text-decoration: none" href="http://neat-wordpress-plugins.mission.lt/neat-skype-status#get_it">v2</a></strong> to add floating widget too!</li>
						<li><strong>Add anywhere in your theme. </strong>Use php code <code>echo do_shortcode('[skype]');</code>. All options of <strong><a style="text-decoration: none" href="http://neat-wordpress-plugins.mission.lt/neat-skype-status#get_it">in v2</a></strong> that are valid to shortcodes - works this way too! So with <strong><a style="text-decoration: none" href="http://neat-wordpress-plugins.mission.lt/neat-skype-status#get_it">v2</a></strong> you can construct your own website skype in HTML</li>
					</ul><br>
					
					<h1 id="update">Download Neat Skype Status v2 for multiple skype accounts and more.</h1>
					<table><tr><td style="text-align:justify;"><div style="font-size:18px;line-height:140%;margin-left:20px;">
					<strong>The plugin is free, but please consider making a donation of €5, €10, €20 or whatever you can</strong> towards our non-profit project <a href="http://www.mission.lt/en" target="_blank">mission.lt</a> that brings positive social change. You will be redirected to download directly from PayPal (use button on this page). <strong>You get my full support on v2</strong>, you can request any additional feature you like!<br><br>

					<strong>If you want to donate less than €5 - please login to your PayPal account and make personal transfer </strong> as a gift to aurimas@mission.lt (to avoid fees). After that send me an email with subject “NSS-donation €Donation_amount Your_Full_Name” - you will auto-receive v2.
					
					<br><br><strong>V2 Highlights</strong>:<br>
					1. Link multiple accounts to one skype button<br>
					2. Change skype button action from your skype<br>
					3. Predefined and custom style widget(s)
					
					
					<td style="width:250px;text-align:center;">
					<form class="donate_eur" style="display:none;" action="https://www.paypal.com/cgi-bin/webscr" method="post">
					<input type="hidden" name="cmd" value="_s-xclick">
					<input type="hidden" name="hosted_button_id" value="KD3N3CXP22PJG">
					<input type="image" width="184px" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
					</form>
					<form class="donate_usd" action="https://www.paypal.com/cgi-bin/webscr" method="post">
					<input type="hidden" name="cmd" value="_s-xclick">
					<input type="hidden" name="hosted_button_id" value="QHUWXFPYKQVJ2">
					<input type="image" width="184px" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
					</form>

					<label> <input onclick="javascript: jQuery('.donate_eur').show();jQuery('.donate_usd').hide();" type="radio" name="donate_currency_bottom" value="eur"/><strong>EUR</strong> </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label id="donate_usd_radio" ><input onclick="javascript: jQuery('.donate_eur').hide();jQuery('.donate_usd').show();" checked="checked" type="radio" name="donate_currency_bottom"  value="usd" /><strong>USD</strong> </label>
					</td>
					</tr></table>
				</div>

			

			<?php
			
			
		}
		
		
		
		//Adds the required CSS
		function add_styles() {
			//Don't add styles if on admin screens
			if( ! is_admin() ) {
				
				wp_enqueue_style( 'sci_styles', WP_PLUGIN_URL . '/' . SCI_PLUGIN_NAME . '/css/sci-style.css' );
			} 
		}

		//Adds the required scripts
		function add_scripts() {
			//Don't add scripts if on admin pages
			if ( ! is_admin() ) {
				//wp_enqueue_script( 'jquery' );
				wp_enqueue_script( 'sci_scripts', WP_PLUGIN_URL . '/' . SCI_PLUGIN_NAME . '/js/sci-script.js', array( 'jquery' ), null, false );
				wp_enqueue_script( 'sci_scripts', WP_PLUGIN_URL . '/' . SCI_PLUGIN_NAME . '/js/skypeCheck.js');
				
				$options = get_option( SCI_GENERAL_OPTIONS_NAME );
				extract($options);
				//register additional script
				wp_register_script( 'footer_filter', WP_PLUGIN_URL . '/' . SCI_PLUGIN_NAME . '/js/footer.js', array( 'jquery' ), null, false );
				wp_enqueue_script( 'footer_filter' );
				

				
				wp_localize_script( 'sci_scripts', 'SkypeCustomImages', array(
					'ajaxurl' => admin_url( 'admin-ajax.php' ),
					'skypename' => $skypename,
					'interval' => $interval
				) );
			}
		}
		
		function sci_ajax() {
			$skypename = $_GET['skypename'];
			$icon = getSkypeStatusIcon($skypename);
			echo $icon;
			die();
		}
		
		//Add to footer
		function add_to_footer(){
			$options = get_option( SCI_GENERAL_OPTIONS_NAME );
			extract($options);
			$footer_options = get_option('sci_footer_options');
			$phrase = $footer_options['phrase'];
			
			if ($footer_options['support_dev']) echo '<div id="sci_nss_link"><a href="http://neat-wordpress-plugins.mission.lt/neat-skype-status">'.$phrase.'</a></div>';
				else echo '<div id="sci_nss_link"><a>Neat Skype Status - '.$phrase.'</a></div>';
			
			
			//if requested - load them to footer
			$avail_statuses = getAStatuses($theme);
			if ($preload_images) foreach ($avail_statuses as $status) echo '<img style="display:none" src="'.SCI_PATH.'images/'.$theme.'/'.strval($status).'.png"/>';
			
			if($skype_footer){
			
				if (!empty($skypename)) {
					$image_icon_html = getSkypeStatusIcon($skypename, $initial_check);
					echo '<a class="sk_footer" href="skype:'.$skypename.'?'.$action.'">'.$image_icon_html.' </a>';
				} else {
					echo __( 'You should include skype name in "Neat Skype Status" settings.', SCI_TEXT_DOMAIN );
				} 
			
			}
			
		}
		
		//Handles the shortcode stuff
		function shortcode_handler($atts, $wrapped_content, $shortcode) {
			$options = get_option( SCI_GENERAL_OPTIONS_NAME );
			extract($options);
			
			if ($shortcode == 'skype'){
				$footer_options = get_option('sci_footer_options');
				$footer_options['support_dev'] = true;
				update_option('sci_footer_options', $footer_options);
			}

			//Check that skype name was provided
			if (!empty($skypename)) {
				$image_icon_html = getSkypeStatusIcon($skypename, $initial_check);
				return '<a class="sk_shortcode" href="skype:'.$skypename.'?'.$action.'">'.$image_icon_html.' </a>';
			} else {
				return __( 'You should include skype name in "Neat Skype Status" settings.', SCI_TEXT_DOMAIN );
			} 
		}
	
	
	}
}


function getSkypeStatus($username) {

	// Turn off warnings cause it keeps bothering
	$raw_data = @wp_remote_get( 'http://mystatus.skype.com/smallicon/'.$username.'.png', array	(
																						'sslverify' => false, 
																						'timeout'   => 2    
																					) );
	if( is_wp_error( $raw_data ) ) {
	   return '0';
	} else {
		//echo strlen($raw_data['body']);
		return sizeToStatus(strlen($raw_data['body']));
	}

}

//Translate icon file size to status number
function sizeToStatus($img_size){
	switch ($img_size) {
		case 376: $status =  1; break;
		case 428: $status =  2; break;
		case 546: $status =  3; break;
		case 490: $status =  4; break;
		case 500: $status =  5; break;
		case 502: $status =  7; break;
		default: $status = 0;
	}; 
	return $status;
}



function getSkypeStatusIcon($username, $http_request = true) {
	$options = get_option( SCI_GENERAL_OPTIONS_NAME );
	extract($options);
	
	if ($http_request) {
		//Use transients to cache
		if ( !( $status = get_transient( 'sci_temp_status' ) ) ) {
			// It wasn't there, so regenerate the data and save the transient
			 $status = getSkypeStatus($username);
			 $expire_period = intval(abs($interval/1000));
			 set_transient( 'sci_temp_status', $status, $expire_period );
		}
		//If this is AJAX request and the status is unknown - then return 0 instead of HTML, so the Javascript will know that it doesn't need to update the status.
		if ( defined( 'DOING_AJAX' ) && DOING_AJAX && $status == '0') return 0;
	} else $status = '2';
	
	//Get available status icons (images)
	$avail_statuses = getAStatuses($theme);

	return '<img border="0" alt="'.$action.' '.$username.'" src="'.SCI_PATH.'images/'.$theme.'/'.getValidStatus($status, $avail_statuses).'.png">';
	
}

//Check what images from current theme exist and return array
function getAStatuses($theme){
	$avail_status_arr = get_transient($theme.'_icons');
	if ($avail_status_arr === false){
		$avail_status_arr = array();
		for ($i=0;$i<8;$i++) if (file_exists(SCI_SYSTEM_PATH.'/images/'.$theme.'/'.$i.'.png')) $avail_status_arr[] = $i;
		set_transient($theme.'_icons', $avail_status_arr, 10); // Available aproximately for one page load
	}
	return $avail_status_arr;
}

//Return valid status from the statuses that were found
function getValidStatus($status, $avail_statuses){
	if (empty($avail_statuses)) return $status;
	
	for ($i = 0;!in_array($status, $avail_statuses) && $i < 8; $i++)
	switch ($status) {
		case 0: $status =  1; break;
		case 1: $status =  2; break;
		case 2: $status =  1; break;
		case 3: $status =  2; break;
		case 4: $status =  3; break;
		case 5: $status =  4; break;
		case 6: $status =  1; break;
		case 7: $status =  2; break;
	}; 
	
	if ($i == 8) return $avail_statuses[0];
		else return $status;
	
		/*
	0 - unknown
	1 - offline
	2 - online
	3 - away
	4 - not available
	5 - do not disturb
	6 - invisible
	7 - skype me
	*/
}


$gce = new skype_ajax();

?>