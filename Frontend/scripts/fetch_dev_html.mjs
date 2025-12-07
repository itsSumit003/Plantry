const res = await fetch("http://localhost:5174");
const text = await res.text();
console.log(text.slice(0, 4000));
