const puppeteer = require('puppeteer');
const fs = require('fs');

const IMAGE_TN_URL = 'https://s3.us-west-2.amazonaws.com/www.gethomesome.com/productimages_tn/';
const IMAGE_FULL_URL = 'https://s3.us-west-2.amazonaws.com/www.gethomesome.com/productimages/';

async function scrape() {
  console.log('Launching browser...');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Set viewport
  await page.setViewport({ width: 1280, height: 800 });
  
  // Track API responses for products
  const products = [];
  const categories = [];
  
  page.on('response', async (response) => {
    const url = response.url();
    if (url.includes('api') || url.includes('gethomesome')) {
      try {
        const contentType = response.headers()['content-type'] || '';
        if (contentType.includes('application/json')) {
          const json = await response.json();
          
          // Check if this is product data
          if (Array.isArray(json)) {
            if (json.length > 0 && (json[0].productName || json[0].upc || json[0].categoryName)) {
              console.log(`Intercepted ${json.length} items from: ${url.slice(0, 100)}`);
              
              if (json[0].categoryName || json[0].subCategories) {
                categories.push(...json);
              } else {
                products.push(...json);
              }
            }
          }
        }
      } catch (e) {
        // Not JSON or can't parse
      }
    }
  });
  
  console.log('Navigating to Patel Brothers...');
  await page.goto('https://shop.patelbros.com/products', {
    waitUntil: 'networkidle2',
    timeout: 60000
  });
  
  console.log('Page loaded. Waiting for content...');
  
  // Wait a bit for dynamic content
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  // Try to select a store location if needed
  const selectStore = await page.$('.location-selector, .store-selector, [ng-click*="location"]');
  if (selectStore) {
    console.log('Found store selector, clicking...');
    await selectStore.click();
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Click first available store
    const storeOption = await page.$('.location-option, .store-option, [ng-click*="selectLocation"]');
    if (storeOption) {
      await storeOption.click();
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  
  // Wait more for products to load
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  // Extract products from the page DOM
  console.log('\nExtracting products from page...');
  
  const pageProducts = await page.evaluate(() => {
    const items = [];
    
    // Try various selectors
    const productSelectors = [
      '.product-card',
      '.product-item',
      '.product',
      '[ng-repeat*="product"]',
      '.item-card',
      '.grocery-item'
    ];
    
    for (const selector of productSelectors) {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        console.log(`Found ${elements.length} elements with selector: ${selector}`);
        elements.forEach(el => {
          const nameEl = el.querySelector('.product-name, .item-name, .name, h3, h4, .title');
          const imgEl = el.querySelector('img');
          const priceEl = el.querySelector('.price, .product-price, .item-price');
          
          if (nameEl || imgEl) {
            items.push({
              name: nameEl ? nameEl.textContent.trim() : '',
              image: imgEl ? imgEl.src : '',
              price: priceEl ? priceEl.textContent.trim() : ''
            });
          }
        });
        break;
      }
    }
    
    // Also try to get all images that look like product images
    if (items.length === 0) {
      const allImages = document.querySelectorAll('img[src*="productimages"]');
      allImages.forEach(img => {
        const parent = img.closest('.product, .item, .card, div');
        const nameEl = parent ? parent.querySelector('.name, .title, h3, h4, p') : null;
        items.push({
          name: nameEl ? nameEl.textContent.trim() : '',
          image: img.src,
          price: ''
        });
      });
    }
    
    return items;
  });
  
  console.log(`Found ${pageProducts.length} products on page`);
  
  // Take screenshot for debugging
  await page.screenshot({ path: '/Users/pratyush/neomart-demo/scripts/patelbros-screenshot.png', fullPage: true });
  console.log('Screenshot saved to scripts/patelbros-screenshot.png');
  
  // Save HTML for debugging
  const html = await page.content();
  fs.writeFileSync('/Users/pratyush/neomart-demo/scripts/patelbros-rendered.html', html);
  console.log('Rendered HTML saved to scripts/patelbros-rendered.html');
  
  await browser.close();
  
  // Combine all found products
  let allProducts = [...products, ...pageProducts];
  
  // Process categories if found
  if (categories.length > 0) {
    console.log(`\nProcessing ${categories.length} categories...`);
    categories.forEach(cat => {
      if (cat.products && Array.isArray(cat.products)) {
        cat.products.forEach(p => {
          allProducts.push({
            name: p.productName || p.name,
            upc: p.upc,
            image: p.upc ? `${IMAGE_TN_URL}${p.upc}.jpg` : '',
            imageFull: p.upc ? `${IMAGE_FULL_URL}${p.upc}.jpg` : '',
            price: p.price,
            category: cat.categoryName
          });
        });
      }
    });
  }
  
  // Deduplicate
  const seen = new Set();
  allProducts = allProducts.filter(p => {
    const key = p.name + p.image;
    if (seen.has(key)) return false;
    seen.add(key);
    return p.name || p.image;
  });
  
  console.log(`\n=== TOTAL: ${allProducts.length} PRODUCTS ===\n`);
  
  // Display products
  allProducts.slice(0, 50).forEach((p, i) => {
    console.log(`${i + 1}. ${p.name || 'Unknown'}`);
    console.log(`   Image: ${p.image}`);
    if (p.price) console.log(`   Price: ${p.price}`);
    console.log('');
  });
  
  // Save to JSON
  fs.writeFileSync(
    '/Users/pratyush/neomart-demo/scripts/patelbros-products.json',
    JSON.stringify(allProducts, null, 2)
  );
  console.log(`\n✓ Saved to scripts/patelbros-products.json`);
}

scrape().catch(console.error);
