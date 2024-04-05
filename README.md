# Full-Page-Scroll Project

## Stack
- html, css, javascript
- react

## Example
```javascript
import { FullPageScroll } from 'react-fp-scroll';

export default function Test() {
  return (
    <FullPageScroll>
      <div style={{height:'100vh', backgroundColor:'orange'}}></div>
      <div style={{height:'100vh', backgroundColor:'lightcoral'}}></div>
      <div style={{height:'100vh', backgroundColor:'orange'}}></div>
      <div style={{height:'100vh', backgroundColor:'lightcyan'}}></div>
    </FullPageScroll>
  );
}
```

```javascript
// This must be the top-level component of the page.
return (
  <FullPageScroll>
    {children...}
  </FullPageScroll>
)
```