Circle component

{{#docs-demo as |demo|}}
   {{#demo.example name="circle01.hbs"}}
    <MalmotSvg @height="30" @width="50">
       <MalmotCircle @x="11" @y="11" @r="10"/>
    </MalmotSvg> 
    {{/demo.example}}
    {{demo.snippet "circle01.hbs"}} 
{{/docs-demo}}

This is how you do click handling.

{{#docs-demo as |demo|}}
   {{#demo.example name="circle02.hbs"}}
   <CircleWrapper as |wrapper|>
      <MalmotSvg 
         @height="30" 
         @width="50">
            <MalmotCircle 
                @x="11" 
                @y="11" 
                @r="10" 
                @draggable=true
                @onClick={{wrapper.clickHandler}}
      />
      </MalmotSvg> 
      {{wrapper.someText}}
   </CircleWrapper>
   {{/demo.example}}
   {{demo.snippet "circle02.hbs"}} 
{{/docs-demo}}

