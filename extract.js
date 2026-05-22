const fs = require('fs');
let code = fs.readFileSync('c:/unani_dawakhana_official/script.js', 'utf8');
const regex = /const DEFAULT_PRODUCTS = (\[[\s\S]*?\])\s*;/;
const match = code.match(regex);
if(match) {
  let defaultProducts;
  eval('defaultProducts = ' + match[1]);
  let sql = 'INSERT INTO products (id, name, price, originalPrice, description, stock, image, category, highlights) VALUES\n';
  const values = defaultProducts.map(p => {
    return "('" + p.id + "', '" + p.name + "', " + p.price + ", " + p.originalPrice + ", '" + p.description.replace(/'/g, "''") + "', " + p.stock + ", '" + p.image + "', '" + p.category + "', '" + JSON.stringify(p.highlights).replace(/'/g, "''") + "'::jsonb)";
  });
  sql += values.join(',\n') + ' ON CONFLICT (id) DO NOTHING;';
  fs.writeFileSync('c:/unani_dawakhana_official/insert_products.sql', sql);
  console.log('SQL Generated');
} else {
  console.log('No match found');
}
