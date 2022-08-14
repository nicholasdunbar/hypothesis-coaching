This folder contains resusable templates which you can embed vars {{somevarname}} into the templates/*-template.html files and the /*-content.json file will find and replace those vars using the following code:
```
var content = {};
    // get toolbox object
    import('./index.js')
      //get standard template containing header and footer
      .then( () => toolbox.getTemplateFn("main") )
      //get depression-content.json key and value store that will be used to replace handle bar vars in templates
      .then( () => toolbox.getJSONFn("depression"))
      //custom code that populates part of the json obj
      .then( (obj) => {
        content = obj; 
        content.header.link = toolbox.getScheduleURL();
      } )
      //get templates/header-template.html and populate handle bar vars with key value pairs from the previosly loaded depression-content.json data
      .then( () => toolbox.getTemplateFn("header", content.header) )
      //get templates/section1-glyph-template.html and populate handle bar vars with key value pairs from the depression-content.json data
      .then( () => toolbox.getTemplateFn("section1-glyph", content.sections[0]) )
      .then(()=>
        {
          //init toolbox
          toolbox.initPage();
          //set nav bar highlight
          toolbox.initNav(undefined);
          toolbox.initQuote(content.quote);
        })
      .then( () => console.log("load successful"));
      ```