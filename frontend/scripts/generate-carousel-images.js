const fs = require('fs');
const path = require('path');

const CAROUSEL_DIR = path.join(__dirname, '../public/carosel');
const OUTPUT_FILE = path.join(__dirname, '../lib/carousel-images.js');

function generateImageList() {
  try {
    // Ensure output directory exists
    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Read carousel directory
    if (!fs.existsSync(CAROUSEL_DIR)) {
      console.error('Carousel directory not found:', CAROUSEL_DIR);
      process.exit(1);
    }

    const files = fs.readdirSync(CAROUSEL_DIR);
    
    // Filter for image files only
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext);
    });

    // Sort files for consistent ordering
    imageFiles.sort();

    const jsContent = `// Auto-generated carousel images list
// Generated at: ${new Date().toISOString()}

export const carouselImages = ${JSON.stringify(imageFiles, null, 2)};

export const carouselData = {
  images: carouselImages,
  generatedAt: "${new Date().toISOString()}",
  count: ${imageFiles.length}
};

export default carouselImages;
`;

    // Write to JS file
    fs.writeFileSync(OUTPUT_FILE, jsContent);
    
    console.log(`✅ Generated carousel image list: ${imageFiles.length} images found`);
    console.log(`📁 Output: ${OUTPUT_FILE}`);
    
  } catch (error) {
    console.error('❌ Error generating image list:', error);
    process.exit(1);
  }
}

// Run the script
generateImageList();
