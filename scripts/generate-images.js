#!/usr/bin/env node

/**
 * Notification Icon Generator Script
 * 
 * This script automatically generates notification icons for Android
 * with different sizes based on the source image.
 * 
 * It uses Sharp library for image processing and automatically installs
 * required dependencies if they're not already available.
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

/**
 * The temporary packages to install for image generation
 * These will be installed with --no-save flag to avoid modifying package.json
 */
const tempPackages = ["sharp", "picocolors"];

/**
 * Check if required packages are already installed
 * This prevents unnecessary installations if the packages are already available
 */
const checkAndInstallPackages = () => {
  for (const pkg of tempPackages) {
    let isInstalled = false;
    try {
      require.resolve(pkg);
      isInstalled = true;
    } catch (e) {
      isInstalled = false;
    }

    if (!isInstalled) {
      console.log(`📦 Temporarily installing ${pkg}...`);
      execSync(`npm install ${pkg} --no-save`, { stdio: "inherit" });
    }
  }
};

// Install required packages if not already available
checkAndInstallPackages();

// Now we can safely require these packages
const pc = require("picocolors");
const sharp = require("sharp");

const log = {
  error: (text) => console.log(pc.red(text)),
  text: (text) => console.log(text),
  warn: (text) => console.log(pc.yellow(text)),
};

/**
 * Main function to generate notification icons
 */
const generate = async () => {
  const workingPath = process.cwd();
  const sourcePath = path.resolve(workingPath, "src/assets/images/notification-icon.png");
  
  // Check if source image exists
  if (!fs.existsSync(sourcePath)) {
    log.error(`❌ Source image not found: ${sourcePath}`);
    log.error(`Please make sure the file exists at src/assets/images/notification-icon.png`);
    return;
  }
  
  log.text(`🔍 Found source image: ${path.relative(workingPath, sourcePath)}`);
  const image = sharp(sourcePath);

  // Define Android resource path
  const androidPath = path.resolve(workingPath, "android/app");
  const resPath = path.resolve(androidPath, "src", "main", "res");
  
  if (!fs.existsSync(androidPath)) {
    log.error(`❌ Android app directory not found: ${androidPath}`);
    return;
  }
  
  log.text(`\n    ${pc.underline("Android Notification Icons")}`);
  
  // Create directories if they don't exist
  const directories = [
    "mipmap-mdpi",
    "mipmap-hdpi",
    "mipmap-xhdpi",
    "mipmap-xxhdpi",
    "mipmap-xxxhdpi"
  ];
  
  // Ensure directories exist
  for (const dir of directories) {
    const dirPath = path.resolve(resPath, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }
  
  // Define sizes for different densities
  const sizes = [
    { size: 24, directory: "mipmap-mdpi" },
    { size: 36, directory: "mipmap-hdpi" },
    { size: 48, directory: "mipmap-xhdpi" },
    { size: 72, directory: "mipmap-xxhdpi" },
    { size: 96, directory: "mipmap-xxxhdpi" }
  ];
  
  // Generate all notification icons
  await Promise.all(
    sizes.map(({ directory, size }) => {
      const fileName = "ic_notification.png";
      const filePath = path.resolve(resPath, directory, fileName);
      
      return image
        .clone()
        .resize(size)
        .png({ quality: 100 })
        .toFile(filePath)
        .then(() => {
          log.text(`✨ ${path.relative(workingPath, filePath)} (${size}x${size})`);
        })
        .catch(err => {
          log.error(`❌ Error generating ${filePath}: ${err.message}`);
        });
    })
  );

  log.text(`\n✅ Done! Notification icons generated successfully.`);
};

// Execute the generator
generate().catch(err => {
  log.error(`❌ Error: ${err.message}`);
  process.exit(1);
});
