TakeStock
=========
TakeStock is a Google Chrome Extension that allows the user to see stock data and recent Tweets just by highlighting any text on a loaded webpage.  Upon highlighting, a popup containing stock pricing information, a stock graph, and a Twitter feed is overlayed on the page.

##Features
Ability to obtain stock pricing data, both numerical and graphical, as well as recent Tweets, simply by highlighting text on an active webpage.

##Technology
1.  Node.js
2.  Twitter API Integration
3.  Finance.Yahoo.com API Integration

##Installation

####Clone Repo
`git clone https://github.com/sellds4/TakeStock.git`

####Install Node
You may obtain pre-compiled Node.js binaries for several platforms from http://nodejs.org/download.

####Install nTwitter

`npm install ntwitter` (https://github.com/AvianFlu/ntwitter)

####Install the Google Chrome Extension
Either navigate to `chrome://extensions/` in the web address bar or 
1) Click the Chrome menu  on the browser toolbar.
2) Select Tools.
3) Select Extensions.
 
To install TakeStock, click on `Load unpacked extension...` and navigate to the TakeStock folder and click `Open`

If you would like to disable the Extension, simply unselect the "Enabled" checkbox for the TakeStock extension 

NOTE:  You will need to register your app with the Twitter API (https://dev.twitter.com/).  Also, to run the server locally after installing Node.js, simply type "node server.js" in the command line ensuring that you have access to the TakeStock local folder.
