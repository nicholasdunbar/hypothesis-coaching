var topnav;
var header;
var sectionTemplate;
//https://calendly.com/hypothesiscoaching/15-minute-free-consultation
//var getStartedURL = "what-is-coaching.html";
var getStartedURL = "https://calendly.com/hypothesiscoaching/15-minute-free-consultation";
var baseURL = window.location.protocol+"//"+window.location.hostname;
baseURL += window.location.port != 80 ? ':'+window.location.port : '';
baseURL += "/";

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
//navigate to form to apply
function getStartedBtnFn(){
  window.location.href = getStartedURL;
}
function loadContent(json){
  var n;
  var section;
  var sectionLast;
  var sectionClone;
  if (json.header.isShow && !document.body.contains(header)){
    topnav.after(header);
  } else if (!json.header.isShow && document.body.contains(header)) {
    header.remove();
  }
  if (json.header.isShow){
    initHeader(json.header.h, json.header.p, json.header.link);
  }
  jumpToTop();
  for (var i = 0; i < json.sections.length; i++){
    n = i+1;
    section = document.querySelector("#section"+n);
    if(document.body.contains(section)){
      sectionLast = section;
    } else {
      //add section
      sectionClone = sectionTemplate.cloneNode(true);
      sectionClone.setAttribute("id", "section"+n);
      sectionLast.after(sectionClone);
      sectionLast = sectionClone;
    }
    initText("#section"+n, json.sections[i].h, json.sections[i].d, json.sections[i].p, json.sections[i].glyph);

  }
  clearSectionsAfter(++n);

  initQuote(json.quote);
}
//get function that when ran will load json content
function getContentFn(i){
  return function(){
    fetch(baseURL+i+"-content.json")
    .then(function(response){return response.json()})
    .then(loadContent);
  }
}
//get function that when ran will load HTML content
function getTemplateFn(i){
  return function(){
    fetch(baseURL+i+"-template.html")
    .then(function(response){return response.text()})
    .then(loadHTMLContent);
  }
}
function loadHTMLContent(html){
  console.log(html);
  header.remove();
  clearSectionsAfter(1);
  const quote = document.querySelector('#quote');
  quote.remove();
  const headerNode = document.querySelector('#topnav');
  const newNode = document.createElement('div');
  newNode.innerHTML = html;
  headerNode.after(newNode);
}
function initNavButtons(linkNames, highlight){
  var links1 = document.querySelectorAll("#nav1 a");
  var links2 = document.querySelectorAll("#nav2 a");
  //set first home link
  //links1[1].addEventListener("click", setHomeContent);
  links1[1].classList.remove("w3-white");
  if (highlight == -1){
    //highlight the home link in the nav
    links1[1].classList.add("w3-white");
  }
  for (var n = 2; n <= linkNames.length+1; n++){
    links1[n].innerText = linkNames[n-2];
    //links1[n].addEventListener("click", getContentFn(n-2));
    links1[n].classList.remove("w3-white");
    if (n-2 == highlight){
      links1[n].classList.add("w3-white");
    }
  }
  for (n = 0; n < linkNames.length; n++){
    links2[n].innerText = linkNames[n];
    //links2[n].addEventListener("click", getContentFn(n));
    //links2[n].classList.remove("w3-white");
    //if (n == highlight){
    //  links2[n].classList.add("w3-white");
    //}
  }
}
//update Header
function initHeader(h, p, l){
  getStartedURL = l;
  header.querySelector('h1').innerHTML = h;
  header.querySelector('p').innerText = p;
  header.querySelector('button').removeEventListener("click", getStartedBtnFn);
  header.querySelector('button').addEventListener("click", getStartedBtnFn);
}
//remove sections after n
function clearSectionsAfter(n){
  //clear unnecessary sections
  var isFound = true;
  var section;
  try {
    section = document.querySelector("#section"+n);
  } catch(e){
    isFound = false;
  }
  while(isFound && document.body.contains(section)){
    section.remove();
    n++;
    section = document.querySelector("#section"+n);
  }
}
//replaces text in certain sections
function initText(section, titleTxt, descriptionTxt, bodyTxt, glyphClass) {
  console.log("replace text ran");
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
}
function initQuote(qText){
  var qEl = document.querySelector("#quote");
  qEl.innerText = qText;
}
function setHomeContent(){
  highlight = -1;
  if (!document.body.contains(header)){
    topnav.after(header);
  }
  initHeader('There is a new way<br/>to transform your life.',"You don't need WILL Power, you need WHY power.", getStartedURL);
  clearSectionsAfter(3);
  initText( "#section1",
            "Will Power Alone Doesn't Work",

            "We've all heard the Nike ad. Just do it. After decades of advertising "+
            "70% of Americans have obesity or are overweight. Will power doesn't work. It is time for a new approach.",

            "Start by asking WHY you want to make a change in your life. "+
            "Coaching uses psychological techniques that help stimulate a person's motivation. "+
            "Why Power Coaches are trained in an evidence based technique called Motivational Interviewing (MI). "+
            "Its effectiveness has been validated in 200 randomized control studies - "+
            "the highest quality evidence science has to offer. ",
            "section1-icon"
          );
  initText( "#section2",
            "What We Do",

            "We are ACE certified, health and wellness life coaches. We specialize in helping sixteen to early-twenties boys "+
            "with Life Direction Coaching, people suffering from depression, "+
            "and people diagnosed with Fatty Liver Disease. "+
            "Click the links in the menu bar for more information",

            "Good coaches interrupt unproductive thought patterns. "+
            "They help you creatively explore and unearth your deepest motivations. "+
            "They teach personal-organizational strategies, but most of all, they're there for you, so you don't have to struggle alone. "+
            "<br><br>Contact us now, <a href=\"https://forms.gle/zi1pgjQTtABAdTNN9\">click here to get started</a><br>Download <a href=\"https://docs.google.com/document/d/1MPu0u-vEvTZePmOS1k911bH41HvpvJE1B0SSwyxkqoU/edit?usp=sharing\">brochure here</a><br><br>* We are not medical professionals. We are behavior change experts. We do not diagnose or prescribe. Coaching for NAFLD requires an integrated approach with a registered dietitian, functional medical doctor, gastroenterologist, or other qualified MD. Coaching for depression requires you are also seeing a licensed therapist or state certified mental health practitioner. <a href=\"disclaimer.html\">See disclaimer here.</a>",
            "section2-icon"
          );
  initQuote("Do what you can, with what you have, where you are. – Theodore Roosevelt");
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
  sectionTemplate = document.querySelector("#section3");
  jumpToTop();
}
function initNav(whichNavHighlight){
  highlight = whichNavHighlight;
  initNavButtons(new Array(
    "Depression",
    "Life Direction Coaching",
    "Fatty Liver Disease",
    "About"),
    highlight
  );
}
//meta pixel code:
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

// export as Node module /  browser variable
const toolbox = {initNav, initPage, getContentFn, getTemplateFn, setHomeContent, toggleMenu};
if (typeof exports === 'object' && typeof module !== 'undefined') module.exports = {toolbox};
else window.toolbox = toolbox;