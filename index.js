var topnav = document.querySelector("#topnav");
var header = document.querySelector("header");
var sectionTemplate = document.querySelector("#section3");
//https://calendly.com/hypothesiscoaching/15-minute-free-consultation
var getStartedURL = "what-is-coaching.html";
var baseURL = window.location.protocol+"//"+window.location.hostname;
baseURL += window.location.port != 80 ? ':'+window.location.port : '';
baseURL += "/";

// Used to toggle the menu on small screens when clicking on the menu button
function toggleMenu() {
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
  for (n = 2; n <= linkNames.length+1; n++){
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
  section = document.querySelector("#section"+n);
  while(document.body.contains(section)){
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


//load content
var URL = window.location.pathname; // Gets page name
var page = URL.substring(URL.lastIndexOf('/') + 1);
var highlight = null;
switch(page){
  case "depression.html":
  //set button to white
  //w3-white
    highlight = 0;
    getContentFn(0)();
  break;
  case "direction.html":
    highlight = 1;
    getContentFn(1)();
  break;
  case "nafld.html":
    highlight = 2;
    getContentFn(2)();
    break;
    case "about.html":
      highlight = 3;
      getContentFn(3)();
      break;
  case "disclaimer.html":
    highlight = null;
    getContentFn("disclaimer")();
  break;
  case "tos.html":
    highlight = null;
    getContentFn("tos")();
  break;
  case "privacy.html":
    highlight = null;
    getContentFn("privacy")();
  break;
  case "what-is-coaching.html":
    highlight = null;
    getTemplateFn("what-is-coaching")();
  break;
  case "red-rope-policy.html":
    highlight = null;
    getTemplateFn("red-rope-policy")();
  break;
  case "alternatives.html":
    highlight = null;
    getTemplateFn("alternatives")();
  break;
  default:
    highlight = -1;
    setHomeContent();
}


initNavButtons(new Array(
                "Depression",
                "Life Direction Coaching",
                "Fatty Liver Disease",
                "About"),
                highlight
              );


jumpToTop();
