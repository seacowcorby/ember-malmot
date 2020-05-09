# Animating move

To animate value changes, set the animatePositionChange to true

{{#docs-demo as |demo|}}
   {{#demo.example name="animateMove.hbs"}}
      <MalmotSvg 
         @height="30" 
         @width="200" as |svg|>
            <MalmotCircle 
                @x={{componentX}}
                @y="11"
                @r="10"
                @animatePositionChange=true
      />
      </MalmotSvg> 
      <button {{on 'click' moveButtonHandler}}>Move</button> 
   {{/demo.example}} 
   {{demo.snippet "animateMove.hbs"}} 
{{/docs-demo}}

# Animating into position

To animate into position, just set animateInitalPosition to true

{{#docs-demo as |demo|}}
   {{#demo.example name="animateIn.hbs"}}
      <MalmotSvg 
         @height="30" 
         @width="200" as |svg|>
            <MalmotCircle 
                @x="11" 
                @y="11" 
                @r="10" 
                @animateInitialPosition=false
                @animatePositionChange=false
      />
      </MalmotSvg> 
   {{/demo.example}}
   {{demo.snippet "animateIn.hbs"}} 
{{/docs-demo}}



# Simple Circle

To insert a simple circle:

{{#docs-demo as |demo|}}
   {{#demo.example name="circle01.hbs"}}
    <MalmotSvg @height="30" @width="50">
       <MalmotCircle @x="11" @y="11" @r="10"/>
    </MalmotSvg> 
    {{/demo.example}}
    {{demo.snippet "circle01.hbs"}} 
{{/docs-demo}}
 
# Click Handlers 
 
To add a click handler, refer to an action in the onClick attribute

{{#docs-demo as |demo|}}
   {{#demo.example name="circle02.hbs"}}
          <MalmotSvg @height="30" @width="50">
               <MalmotCircle 
                    @x="11" 
                    @y="11" 
                    @r="10"
                    @onClick={{this.clickHandler}}
                    />
            </MalmotSvg> 
   {{/demo.example}}
   {{demo.snippet "circle02.hbs"}} 
{{/docs-demo}}

# Draggable

To make the shape draggable, set the draggable argument to true,
and make sure you add a reference into the outter SVG. 

{{#docs-demo as |demo|}}
   {{#demo.example name="clickndrag01.hbs"}}
      <MalmotSvg 
         @height="30" 
         @width="200" as |svg|>
            <MalmotCircle 
                @x="11" 
                @y="11" 
                @r="10" 
                @draggable=true
                @svg={{svg}}
      />
      </MalmotSvg> 
   {{/demo.example}}
   {{demo.snippet "clickndrag01.hbs"}} 
{{/docs-demo}}

# Clickable and Draggable

To make the shape draggable, set the draggable argument to true,
and make sure you add a reference into the outter SVG. When you 
release the click the onClick will fire. 

{{#docs-demo as |demo|}}
   {{#demo.example name="clickplusclickndrag01.hbs"}}
      <MalmotSvg 
         @height="30" 
         @width="200" as |svg|>
            <MalmotCircle 
                @x="11" 
                @y="11" 
                @r="10" 
                @onClick={{this.clickHandler}}
                @draggable=true
                @svg={{svg}}
      />
      </MalmotSvg> 
   {{/demo.example}}
   {{demo.snippet "clickplusclickndrag01.hbs"}} 
{{/docs-demo}}

# Clickable or Draggable

If you want a click event to fire only i fyou click without draggging
add the maxClickMove number. This number is only used if dragging
is enabled. It is the maximum number of pixels the mouse can move
from the initial click event for an onClick action to be able to fire.

{{#docs-demo as |demo|}}
   {{#demo.example name="clickorclickndrag01.hbs"}}
      <MalmotSvg 
         @height="30" 
         @width="200" as |svg|>
            <MalmotCircle 
                @x="11" 
                @y="11" 
                @r="10" 
                @onClick={{this.clickHandler}}
                @draggable=true
                @maxClickMove=2
                @svg={{svg}}
      />
      </MalmotSvg> 
   {{/demo.example}}
   {{demo.snippet "clickorclickndrag01.hbs"}} 
{{/docs-demo}}



