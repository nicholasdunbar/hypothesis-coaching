var topnav;
var header;
var store = {};
//old landing pages for reference:
//https://forms.gle/zi1pgjQTtABAdTNN9
//https://calendly.com/hypothesiscoaching/15-minute-free-consultation
//what-is-coaching.html;
var getStartedURL = "https://calendly.com/hypothesiscoaching/15-minute-free-consultation";
var baseURL = window.location.protocol+"//"+window.location.hostname;
baseURL += window.location.port != 80 ? ':'+window.location.port : '';
baseURL += "/";
function getScheduleURL(query = ""){
  return getStartedURL+query;
}
//used to load css sheets dynamically
function loadStyle(src) {
      let link = document.createElement('link');
      link.href = src;
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.onerror = () => console.log(`Style load error for ${src}`);
      document.head.append(link);
}

// Used to toggle the menu on small screens when clicking on the menu button
function toggleMenu(e) {
  var x = document.getElementById("nav2");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}
//scroll to the top of the document
function jumpToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
//return promise that when ran will load json content
function getJSONFn(i){
  var key = i+"-content.json";
  if (key in store){
    return new Promise((resolve) => resolve (store[key]));
  }
  return fetch(baseURL+key)
    .then((response) => response.json())
    .then((response) => {
      store[key] = response;
      return store[key];
    });
}
//return promise to get, populate, and render template
function getTemplateFn(i, contentObj = undefined){
  var key = i+"-template.html";
  if (key in store){
    return new Promise( resolve => resolve(store[key]) )
    .then( response => loadHTMLContent (response, contentObj) );
  }
  return fetch(baseURL+"/templates/"+key)
    .then(response => response.text())
    .then((response) => {
      store[key] = response;
      return response;
    })
    .then(response => loadHTMLContent (response, contentObj));
}
//return function to load HTML content at the bottom of the page
function getHTMLContentFn(i){
  
    var key = i+"-template.html";
    if (key in store){
      return new Promise(resolve => resolve (store[key]))
      .then(response => loadHTMLContent(response));
    }
    return fetch(baseURL+key)
    .then(response => response.text())
    .then(response => {
      store[key] = response;
      return response;
    })
    .then(response => loadHTMLContent (response));
}
function loadHTMLContent(html, contentObj){
  const allSections = document.querySelectorAll('#template, #topnav, #section-container, header');
  const lastNode = allSections[allSections.length-1]; 
  const newNode = document.createElement('div');
  if (contentObj !== undefined){
    for (const [key, value] of Object.entries(contentObj)){
      html = html.replaceAll(`{{${key}}}`, value);
    }
  }
  newNode.id = "section-container";
  newNode.innerHTML = html;
  lastNode.after(newNode);
  let anchorEl;
  anchorEl = newNode.querySelector('a.get-started');
  if (anchorEl) anchorEl.href = getStartedURL;
}
function initNavButtons(highlight){
  var links1 = document.querySelectorAll("#nav1 a");
  for (var n = 1; n < links1.length; n++){
    links1[n].classList.remove("w3-white");
    if (links1[n].textContent.toLowerCase() === highlight){
      //highlight the link in the nav
      links1[n].classList.add("w3-white");
    }
  }

}
//update Header
function initHeader(h, p, l){
  getStartedURL = l;
  header.querySelector('h1').innerHTML = h;
  header.querySelector('p').innerText = p;
}
//replaces text in certain sections
function initText(section, titleTxt, descriptionTxt, bodyTxt, glyphClass) {
  var titleEl = document.querySelector(section+" h1");
  var descriptionEl = document.querySelector(section+" h5");
  var bodyEl = document.querySelector(section+" p");
  var glyphEl = document.querySelector(section+" i");
  //update glyph class
  if (glyphEl != null){
    glyphEl.style.display = "inline-block";
    if (glyphClass === undefined){
      glyphEl.style.display = "none";
    }

    glyphEl.classList.forEach((item, i) => {
      if (item.includes("section") && (glyphClass != null && glyphClass !== undefined)){
        glyphEl.classList.remove(glyphEl.classList[i]);
        glyphEl.classList.add(glyphClass);
      }
    });
  }

  //first paragraph text
  titleEl.innerHTML = titleTxt;
  descriptionEl.innerHTML = descriptionTxt;
  bodyEl.innerHTML = bodyTxt;
  //replace get started URLs with the one defined at the top
  //This allows me to easily change the langing page across all content 
  let anchorEl;
  anchorEl = bodyEl.querySelector('a.get-started');
  if (anchorEl) anchorEl.href = getStartedURL;
  anchorEl = descriptionEl.querySelector('a.get-started');
  if (anchorEl) anchorEl.href = getStartedURL;
  
}
function initQuote(qText){
  var qEl = document.querySelector("#quote");
  qEl.innerText = qText;
}

//load all the css styles
loadStyle("https://www.w3schools.com/w3css/4/w3.css");
loadStyle("https://fonts.googleapis.com/css?family=Montserrat");
loadStyle("https://fonts.googleapis.com/css?family=Lato");
loadStyle("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
loadStyle("css/global-styles.css");

//load content
var URL = window.location.pathname; // Gets page name
var page = URL.substring(URL.lastIndexOf('/') + 1);
//set button to white
//w3-white
var highlight = null;
function initPage(){
  topnav = document.querySelector("#topnav");
  header = document.querySelector("header");
  jumpToTop();
}
function initNav(whichNavHighlight){
  highlight = whichNavHighlight;
  initNavButtons(highlight);
}
//meta pixel code:
//comment for now, we may only need the calendly integration
!function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '312932777447892');
  fbq('track', 'PageView');
//:end meta pixel code

//Google tag (gtag.js):
import('https://www.googletagmanager.com/gtag/js?id=G-S2F3DW3DB3')
.then( () => {
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-S2F3DW3DB3');
  console.log('google analytics loaded');  
} )
//:end Google tag (gtag.js)

// export as Node module /  browser variable
const toolbox = {initNav, initPage, getHTMLContentFn, getTemplateFn, getJSONFn, toggleMenu, initQuote, getScheduleURL, fbq};
if (typeof exports === 'object' && typeof module !== 'undefined') module.exports = {toolbox};
else window.toolbox = toolbox; 