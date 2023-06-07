# How to customize spacing in a dashed border

<div style="
border-bottom: 1px dashed green;
">

Let's say you have a dashed border like this:

</div>

```css
border-bottom: 1px dashed green;
```

<div style="
border-bottom: 1px solid;
border-image: repeating-linear-gradient(90deg, green, green 6px, transparent 6px, transparent 16px) 1;
">

but you want to control the spacing and length of dashes.  One *mostly* readable solution is:

</div>

```css
border-bottom: 1px solid;
border-image: repeating-linear-gradient(90deg, green, green 6px, transparent 6px, transparent 16px) 1;
```
