Click and Drag

To support click and drag support, toggle flags, add
constraints, and add optional callback handlers.

@draggable

Draggable marks the component as draggable. Without
any other arguments, the component can be dragged around
within the SVG wrapper.

{{#docs-demo as |demo|}}
   {{#demo.example name="clickndrag01.hbs"}}
   <CircleWrapper as |wrapper|>
      <MalmotSvg 
         @height="30" 
         @width="200" as |svg|>
            <MalmotCircle 
                @x="11" 
                @y="11" 
                @r="10" 
                @draggable=true
                @svg={{svg}}
                @onClick={{wrapper.clickHandler}}
      />
      </MalmotSvg> 
   </CircleWrapper>
   {{/demo.example}}
   {{demo.snippet "clickndrag01.hbs"}} 
{{/docs-demo}}

