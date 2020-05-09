Animation of position



{{#docs-demo as |demo|}}
   {{#demo.example name="animate01.hbs"}}
      
         <MalmotSvg 
            @height="30" 
            @width="200">
            
               <MalmotCircle 
                  @x={{simpleX}}
                  @y={{simpleY}} 
                  @r={{simpleR}} 
                                      @animateInitialPosition=true
                                      @animatePositionChange=true/>
         </MalmotSvg> 
         <button {{on 'click' moveButtonHandler}}>Move</button> 
     
   {{/demo.example}} 
   {{demo.snippet "animate01.hbs"}} 
{{/docs-demo}}


Animate-in

Here we render three circles, evenly spaced, and thesize of the bubble is 
based on the size of a countries population

{{#docs-demo as |demo|}}
   {{#demo.example name="threepopulation.hbs"}}  
         {{#each this.threeCountries as |country|}} 
            <ul>   
               <li>{{country.code.country_name}}: {{get country.populations '1977'}}</li>
            </ul>
         {{/each}}
         <MalmotSvg 
            @height="100" 
            @width="300">
               
               {{#each this.threeCountries as |country index|}}
                  <MalmotCircle 
                     @x={{add 50 (mult index 100)}}
                     @y=50 
                     @r={{malmot-scaler this.threeCountryScale (get country.populations '1977')}}
                     @animateInitialPosition=true
                     @animatePositionChange=true
                               />
               {{/each}} 
         </MalmotSvg> 
         <button {{on 'click' moveButtonHandler}}>Move</button> 
     
   {{/demo.example}} 
   {{demo.snippet "threepopulation.hbs"}} 
{{/docs-demo}}

