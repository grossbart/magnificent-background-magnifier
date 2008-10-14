/**
 *
 *  MAGNIFICENT BACKGROUND MAGNIFIER
 *  
 *  Copyright 2008 Peter Gassner
 *  http://www.naehrstoff.ch/
 *
 *  Version 1.0, 2008/05/01
 *  
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *  
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *  
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */


/* Global Variables
------------------------------------------------ */
var container;
var image;
var originalImageWidth;
var originalImageHeight;
var marginTop;
var marginRight;
var marginBottom;
var marginLeft;


/* Setup environment after window onload
------------------------------------------------ */
function setup() {
  // Read margins from body
  marginTop = parseInt($('body').css("margin-top"));
  marginRight = parseInt($('body').css("margin-right"));
  marginBottom = parseInt($('body').css("margin-bottom"));
  marginLeft = parseInt($('body').css("margin-left"));
  
  // Wrap all existing elements in a helper div
  $('body').children().wrapAll('<div id="mbmWrapper"></div>');
  $('#mbmWrapper').css({
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1});

  // Read background image from body and extract its URL
  var imagePath = $('body').css("background-image").replace(/url\((.*)\)/i, "$1");

  // Create a new image element with imagePath
  image = $(document.createElement("img")).attr({src: imagePath, alt: "", id: "mbmImage"});

  // Hide background image of body
  $('body').css({backgroundImage: "none"});

  // Create container element for magnified background image
  container = $(document.createElement("div"));
  container.css({
    position: "fixed",
    zIndex: 0,
    overflow: "hidden",
    top:  marginTop,
    left: marginLeft});
    container.attr({id: "mbmContainer"});

  // Insert image into container
  image.appendTo(container);

  // Insert container into body
  container.appendTo(document.body);

  // After the image has been integrated into the HTML
  // save its original dimensions for calculations
  originalImageWidth = image.width();
  originalImageHeight = image.height();
}


/* Resize background image to fit window
------------------------------------------------ */
function resizeBackground() {
  // Set container width to 0 to prevent
  // wrong calculations because of scrollbars (Firefox)
  container.width(0);
  container.height(0);

  // Get browser window size
  var windowHeight = $(window).height();
  var windowWidth  = $(window).width();

  // Resize image to fit window
  if (windowHeight > windowWidth * (originalImageHeight/originalImageWidth)) {
    image.height(windowHeight);
    image.width(windowHeight * originalImageWidth/originalImageHeight);
  } else {
    image.height(windowWidth * originalImageHeight/originalImageWidth);
    image.width(windowWidth);
  }

  container.width(windowWidth - marginLeft - marginRight);
  container.height(windowHeight - marginTop - marginBottom);
}


/* Event handling
------------------------------------------------ */
window.onload = function() {
  setup();
  resizeBackground();
}
window.onresize = function() {
  resizeBackground();
}