const fs = require('fs');
let appJs = fs.readFileSync('app.js', 'utf8');
const newProducts = fs.readFileSync('new_products.js', 'utf8');

// The array starts at `const DEFAULT_PRODUCTS = [` and ends before `let products = JSON.parse(localStorage.getItem("ud_products"));`
const startIndex = appJs.indexOf('const DEFAULT_PRODUCTS = [');
const endIndex = appJs.indexOf('let products = JSON.parse(localStorage.getItem("ud_products"));');

if (startIndex !== -1 && endIndex !== -1) {
    const updated = appJs.substring(0, startIndex) + newProducts + "\n\n" + appJs.substring(endIndex);
    fs.writeFileSync('app.js', updated);
    console.log("Successfully replaced products in app.js");
} else {
    console.error("Could not find the indices in app.js");
}
