const fs = require('fs');

async function fetchProducts() {
  try {
    const res = await fetch('https://unaniayurved.com/products.json?limit=250');
    const data = await res.json();
    
    let jsContent = "const DEFAULT_PRODUCTS = [\n";
    
    data.products.forEach((p, index) => {
      const priceStr = p.variants[0].price;
      const compareStr = p.variants[0].compare_at_price || priceStr;
      
      const price = Math.round(parseFloat(priceStr));
      let originalPrice = Math.round(parseFloat(compareStr));
      if (originalPrice === price) originalPrice += 500; // Just for visual discount

      const image = p.images.length > 0 ? p.images[0].src : "assets/placeholder.png";
      const desc = p.body_html.replace(/<[^>]*>?/gm, '').replace(/\n/g, ' ').substring(0, 150) + "...";
      
      jsContent += `    {
      id: "${p.handle}",
      name: "${p.title.replace(/"/g, '\\"')}",
      price: ${price},
      originalPrice: ${originalPrice},
      description: "${desc.replace(/"/g, '\\"')}",
      image: "${image}",
      stock: 50,
      sold: Math.floor(Math.random() * 50) + 10,
      category: "General Wellness",
      highlights: ["Premium quality herbal product.", "Safe and natural ingredients.", "Trusted Unani formulation."]
    }${index === data.products.length - 1 ? '' : ','}\n`;
    });
    
    jsContent += "  ];";
    
    console.log(jsContent);
    fs.writeFileSync('new_products.js', jsContent);
    console.log("Written to new_products.js successfully.");
    
  } catch (e) {
    console.error(e);
  }
}

fetchProducts();
