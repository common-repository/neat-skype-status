=== Neat Skype Status (Custom Images and AJAX) ===
Contributors: aurimus
Donate link: http://neat-wordpress-plugins.mission.lt/neat-skype-status#get_it
Tags:  Skype Button, skype button widget, Custom Images, Online Status, Skype Icon, AJAX, skype-button, skype widget, im, shortcode
Requires at least: 2.9.2
Tested up to: 3.5.0
Stable tag: 1.2.7

Light and simple Skype Button plugin (w/ Official or your Skype Status Icons) in post/page/widget or floating. Skype Status updates without refresh.

== Description ==

Light and simple Skype for website (with Official or Custom Images) in post/page/widget or floating. Online status updates without page reload.

[youtube http://www.youtube.com/watch?v=nn_HTfVSYg4]

Official Skype provides limited number of Skype Buttons (status icons) to show Skype online status. This plugin solves the problem by providing a way to use your own images (custom skype status icons) - this is especially useful for web designers who would like to make skype better fit to their design theme. 
You can have skype status icons with transparent background (provided by default) and also have transparent skype button itself.

Some websites are used for long periods of time without pressing the browser reload button to refresh the page. Normal Skype button can mislead users in this case by showing incorrect status. This wordpress skype plugin refreshes the status of skype button automatically by sending AJAX http requests (with chosen interval of time between refreshes). This can be useful for gaming websites or some websites that rely heavily on Flash, Java-aplet or AJAX technologies (that don't require page refresh to function).

This can also serve as simple skype button.

= v1 Features =

* Customize your skype button icon (or use official).
* Skype AJAX status - auto-refresh without page reload.
* Transparent background and transparent Skype status icons.
* Simple admin interface with only useful settings: skype button click action, update interval, theme and some other...
* Insert to post/page with shortcode or sidebar as skype wordpress widget.
* Very light and simple - only what you need and not more.

= Neat Skype Status v2 =


* **Multiple skype buttons and accounts in widget** - can be used to present your team members.
* **Make your design better** - customize skype button widget style. 
* **Never miss a contact** - many buttons in one. Skype Button that changes automatically to display status for skype contact who is found online. This is useful if you have multiple people that visitors can contact - you can choose to display them all or have all in one.
* **Change how you want to be contacted from skype!** You can choose an option for skype button to dynamically change the action according to your skype status (Call if Online, Chat if Busy, Leave voicemail if offline etc.)

Download after supporting my positive cause:  **[HERE](http://neat-wordpress-plugins.mission.lt/neat-skype-status#get_it)**

Add skype widget to website with multiple skype status buttons - it can become a board of skype statuses with names and custom style. Sort of Custom Skype for website that displays who is online from your company (of employers / players etc.).

= v2 Features (in detail) =

* Choose between additional skype button icons: translated to other languages, actions (skype call me button and other)
* Visible name and text for showing when button is hovered;
* Set coordinates and transparency for floating skype button in dashboard;
* Dynamic Request Timeout to ease server load on high traffic.
* Display skype status with plain text instead of images;
* Set initial skype button status to display while true status is unknown (skype servers lagging);
* In Neat Skype Button widget - choose between Row (skype buttons from left to right), Board (Skype button and visible name in each row) or Integrated (multiple accounts in one button) views;
* Set skype button action "Map to status" for any account to be able to change it from your PC skype application;
* Choose Skype button widget style or define new one;

== Installation ==

Please send me any suggestions (bugs/features) [here](http://neat-wordpress-plugins.mission.lt/neat-skype-status) or in wordpress forums (don't forget to tag it so I receive notification)

Use the automatic installer from within the WordPress administration, or:

1. Download the `.zip` file by clicking on the Download button on the right
1. Unzip the file
1. Upload the `neat-skype-status` directory to your `plugins` directory
1. Go to the Plugins page from within the WordPress administration
1. Click Activate for Neat Skype Status (Custom Images and AJAX)

After activation click Settings (or go Settings -> Neat Skype Status). Enter your skype name as a minimum requirement (other options are optional). 
Make sure you set your skype status visible on the web in your Skype settings (Menu: Skype -> Privacy...) the option "Allow my skype online status to be shown on the web"

= Skype Custom Icons =

Just follow the examples in wp-content\plugins\neat-skype-status\images folder - make a copy of a theme, rename it and replace the images with your own .png images.

Some of the statuses are not anymore used by latest skype, but it still works if you manage to set your status to one of non-available statuses (with old skype version). If you want to reduce the number of statuses even futher - you can make a couple of copies of the same icon with different numbers in name.

= Skype Button Style v1 =

Edit css/sci-style.css

There are 3 different styles for your skype buttons: floating skype button, skype widget or shortcode. It's pretty much self explanatory (I left some comments there for you as a gift). If you don't know how to use CSS - let me know what you need and I will add it to skype css as commented text.

= Skype Button Style v2 =

* Non permanent way: in wordpress admin go to Plugins -> Editor and select Neat Skype Status plugin on top-right corner: select one of the styles and edit it, save. When you update the plugin - changes will be deleted!
* Permanent: Using FTP open plugin directory wp-content/plugins/neat-skype-status/css and make a copy of the stylesheet that you would like to modify.

**[Download v2](http://neat-wordpress-plugins.mission.lt/neat-skype-status#get_it)**

= Status in plain text how-to v2 =

* Non permanent way: in wordpress admin go to Plugins -> Editor and select Neat Skype Status plugin on top-right corner: select neat-"skype-status/texts/simple.txt" and edit it, save. When you update the plugin - changes will be deleted!
* Permanent: Using FTP open plugin directory wp-content/plugins/neat-skype-status/texts, make a copy of simple.txt and rename it. Change the text inside the file to what you want. 

Then use shortcode [skype theme="yourtextfile.txt"] in post/page or with php <?php echo do_shortcode('[skype theme="yourtextfile.txt"]'); ?> 

**[Download v2](http://neat-wordpress-plugins.mission.lt/neat-skype-status#get_it)**

= Shortcode options v2 =

Shortcode example: [skype skypename="neatplugins" visible_name="Neat Skype Status" action="call"]

skypename - skypename to check
visible_name - name that appears when hovered
action - action to take. You can also use special action "map" to be able to change action by changing your status

**[Download v2](http://neat-wordpress-plugins.mission.lt/neat-skype-status#get_it)**

= Skype Status Admin Settings = 

* Skype name - your skype nickname that is shown in header of you skype application (not your visible name)
* Floating skype status - skype button that floats on the left side of your website, but it can also be set to float anywhere else by editing the style files.
* Initial skype status check - I recommend this unticked because it can slow down your website if skype online status service is lagging (which it does often)
* Skype status update interval - It will send request to skype servers to update the status - the more often the quicker will be your Skype button refresh after you change your skype status
* Skype button click action - what you want skype to do when user clicks on the skype button: call, chat etc. In v2 choose special action "Map to status" to be able to change action dinamically from your Skype
* Skype theme for icons - your skype status image set, can be chosen between official ones, some that I have made for you or you can upload your own (see next section)

== Screenshots ==

1. EXAMPLE of Custom Skype icons - floating, shortcode and skype widget.
2. Neat settings. In v2 you can see previews of icons for each theme.
3. v2: Floating widget so people can always find you.
4. v2: Integrated option makes it easy for your visitors.
5. v2: Output of skype status in plain text.
6. v2: Animation of board and integrated options
7. v2: Animation of how can you control button action by changing your status
8. v2: Put skype button anywhere! You can set coordinates in wordpress dashboard setting in v2
9. v2: Widget with ColorWay theme.
10. v2: Custom styles
11. v2: Receive a call when you want to, get a message when you are busy or voicemail when you are offline. And control it from your skype.
12. v2: You can edit the text in wordpress dashboard


**[Download v2](http://neat-wordpress-plugins.mission.lt/neat-skype-status#get_it)**

== Changelog ==

= 2.2.0 =
* New styles and buttons
* New: Multiple skype buttons in widget - can be used like a web skype for your visitors.
* New: Ability to customize widget style. 
* New: Never miss a contact - many buttons in one. Skype Button that changes automatically to display status for skype contact who is found online. This is useful if you have multiple people that visitors can contact - you can choose to display them all or have all in one.
* New: You can choose an option to dynamically change the action of skype button according to your skype status (Call if Online, Chat if Busy, Leave voicemail if offline etc.)
* New: Custom text tooltip for hover over button.
* New: New admin interface with button icons previews while selecting skype icons theme. Setting floating skype button coordinates and transparency with sliders.
* New: Ability to add image for hovering with mouse. So when you hover the image turns to something else.
* New: Ability to use plain text to display skype status instead of icons.
* Fix: Optimized AJAX system to be more effective.
* All updates from v1

**[Download v2](http://neat-wordpress-plugins.mission.lt/neat-skype-status#get_it)**

= 1.2.7 =
* Critical fix (adaptation to MS Skype API changes). Must do if you want the plugin to work!

= 1.2.6 =
* I brought many improvements to v2 that I wanted to bring to v1 (see 1.3.0 bellow) but because of lack of time, couldn't do it! I'll do it in the future, meanwhile if you like v1 - donate something you can and get v2. Thanks.
* Improvement: Now you can put only one or 2 images to theme folder and that will work.
* Fix: some small bug fixes, including IE issues.

= 1.2.5 =
* Small bug fixes

= 1.2.0 =
* New: Improved performance and response time. Important update for high traffic websites and/or websites running on low resources servers. Now using wordpress transients to cache skype servers response.

= 1.1.9 =
* New: status does not change if skype server times out or returns 'unknown' status. This makes it stable while skype servers are lagging.

= 1.1.8 =
* Fixed bug that would make critical php error because of white space output before headers.
* The the admin side is more neat now.

= 1.1.7 =
* Fix: Now using wp_remote_get instead of fopen to get status. This allows to timeout request and send new one if skype servers are lagging.

= 1.1.5 =
* Fix: Now works with MS Internet Explorer v7, v8 and v9
* Fix: Works even if no settings are saved (does not throw PHP warnings)
* Fix: Now version handling is done correctly and appropriate settings saved between updates.

= 1.1.4 =
* New: New AJAX requests are now sent only after previous request is completed. 
* New: Put -1 for interval to disable AJAX calls (only one initial call will be made)
* New: Option to remove settings after uninstall and better version management
* Fix: Cosmetical fix for settings
* Fix: If images for SkypeMe or Not available are not found - it falls back to online or away accordingly

= 1.1.3 =
* Fix: html is not affected on each AJAX request - only when status changes (reduces flickering)
* New: more skype status icons
* More important settings are now on the top

= 1.1.2 = 
* Some bug fixes

= 1.1.0 =
* New: option to preload skype button images to avoid flickering on first skype status changes after page reload
* New: Skype CSS was simplified
* New: All official I could produce on Skype website
* New: Can choose initial image to load while loading page without 

= 1.0.1 =
* Readme changes.

= 1.0 =
* Initial release.

= 1.3.0 (in development) =
* New: Custom text tooltip for hover over button. Default available for translation.
* New: Translation ready! Now you can localize the plugin (including admin interface). Please send me translations to neatplugins@gmail.com and I will add it for everybody to use
* Improvement: Only two images are required (1.png and 2.png), however putting at least one image in the theme folder will work. Names for images are also supported: unknown.png, offline.png, online.png, away.png, notavailable.png donotdisturb.png, skypeme.png

== Upgrade Notice ==

= 1.2.7 =
Must update for plugin to work. Make sure to have a copy of your custom images and styles before upgrade.




== Frequently Asked Questions ==

= What is this different from usual Skype Button from Official website ? = 

You can use your own images to represent Skype Online Status and it refresh it automatically without reloading the page.
v2: All skype buttons in one (shows the first online account found), ability to change skype button action (call, chat etc.) by changing your status and status in plain text.

**[Download v2](http://neat-wordpress-plugins.mission.lt/neat-skype-status#get_it)**

= What is this better than other plugins that I can find? = 

See question above AND it's much more lightweight, other plugins I found were full of stuff that (I think) nobody would use and it just slows down your website for such a small thing like Skype button.

= It always shows offline, what's wrong? = 

Make sure you set your skype status visible on the web in your Skype settings (Menu: Skype -> Privacy...) the option "Allow my skype online status to be shown on the web"