The MalmotSvg defines the SVG wrapper and its behaviour. 
Other components are embedded within this component.


Here are the docs demo

{{#docs-demo as |demo|}}

   {{#demo.example name="svg02.hbs"}}
    <MalmotSvg @height="30" @width="50">
       <MalmotLine @x1="0" @y2="30" @y1="0" @x2="50"/>
    </MalmotSvg> 
    {{/demo.example}}
    {{demo.snippet "svg02.hbs"}}
{{/docs-demo}}


