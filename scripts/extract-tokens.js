import { Api } from 'figma-api';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const figmaApi = new Api({
  personalAccessToken: process.env.FIGMA_ACCESS_TOKEN,
});

async function extractDesignTokens() {
  try {
    // Validate environment variables
    const accessToken = process.env.FIGMA_ACCESS_TOKEN;
    const fileId = process.env.FIGMA_FILE_ID;
    
    if (!accessToken || accessToken === 'your_figma_access_token_here') {
      console.error('❌ FIGMA_ACCESS_TOKEN is not set or still has placeholder value');
      console.log('Please update your .env file with a real Figma access token');
      return;
    }
    
    if (!fileId || fileId === 'your_figma_file_id_here') {
      console.error('❌ FIGMA_FILE_ID is not set or still has placeholder value');
      console.log('Please update your .env file with a real Figma file ID');
      return;
    }
    
    console.log('🔄 Connecting to Figma API...');
    console.log(`📁 File ID: ${fileId}`);
    
    const file = await figmaApi.getFile(fileId);
    
    // Debug: Log the response structure
    console.log('\n🔍 API Response structure:');
    console.log('Keys in response:', Object.keys(file));
    if (file.data) {
      console.log('Keys in file.data:', Object.keys(file.data));
    }
    
    // Analyze file structure
    console.log('\n📋 Figma File Analysis:');
    const fileName = file.name || file.data?.name || 'Unknown';
    const lastModified = file.lastModified || file.data?.lastModified;
    
    console.log(`📄 File Name: ${fileName}`);
    if (lastModified) {
      console.log(`📅 Last Modified: ${new Date(lastModified).toLocaleString()}`);
    }
    
    // Find pages and frames
    const document = file.document || file.data?.document;
    if (!document || !document.children) {
      console.error('❌ No document or pages found in Figma file');
      console.log('Available keys:', Object.keys(file));
      return;
    }
    
    console.log('\n📑 Pages in file:');
    document.children.forEach((page, index) => {
      console.log(`  ${index + 1}. ${page.name} (${page.children?.length || 0} frames)`);
      
      if (page.children) {
        page.children.forEach((frame, frameIndex) => {
          console.log(`     📱 ${frameIndex + 1}. ${frame.name}`);
          
          // Look for landing page frame
          if (frame.name.toLowerCase().includes('landing') || 
              frame.name.toLowerCase().includes('home') ||
              frame.name.toLowerCase().includes('main')) {
            console.log(`     ⭐ Found potential landing page: ${frame.name}`);
            analyzeLandingPageFrame(frame);
          }
        });
      }
    });
    
    // Extract design tokens
    const tokens = {
      colors: extractColors(file),
      typography: extractTypography(file),
      spacing: extractSpacing(file),
      components: analyzeComponents(file),
      frames: analyzeFrames(file)
    };
    
    // Save tokens to JSON
    const tokensPath = path.join(process.cwd(), 'src/tokens/design-tokens.json');
    fs.mkdirSync(path.dirname(tokensPath), { recursive: true });
    fs.writeFileSync(tokensPath, JSON.stringify(tokens, null, 2));
    
    console.log('\n✅ Design tokens extracted successfully!');
    console.log('📄 Saved to: src/tokens/design-tokens.json');
  } catch (error) {
    console.error('❌ Error extracting design tokens:', error.message);
  }
}

function analyzeLandingPageFrame(frame) {
  console.log(`\n🎯 Analyzing Landing Page: ${frame.name}`);
  console.log(`📐 Size: ${frame.absoluteBoundingBox?.width}x${frame.absoluteBoundingBox?.height}`);
  
  if (frame.children) {
    console.log(`🧩 Components found: ${frame.children.length}`);
    frame.children.forEach((child, index) => {
      console.log(`   ${index + 1}. ${child.name} (${child.type})`);
    });
  }
}

function analyzeComponents(file) {
  const components = {};
  
  function traverseNode(node) {
    if (node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') {
      components[node.name] = {
        type: node.type,
        id: node.id,
        description: node.description || '',
        size: node.absoluteBoundingBox
      };
    }
    
    if (node.children) {
      node.children.forEach(traverseNode);
    }
  }
  
  const document = file.document || file.data?.document;
  if (document && document.children) {
    document.children.forEach(traverseNode);
  }
  return components;
}

function analyzeFrames(file) {
  const frames = {};
  
  const document = file.document || file.data?.document;
  if (document && document.children) {
    document.children.forEach(page => {
      if (page.children) {
        page.children.forEach(frame => {
          frames[frame.name] = {
            type: frame.type,
            id: frame.id,
            size: frame.absoluteBoundingBox,
            backgroundColor: frame.backgroundColor
          };
        });
      }
    });
  }
  
  return frames;
}

function extractColors(file) {
  const colors = {};
  
  // Extract from styles
  if (file.styles) {
    Object.values(file.styles).forEach(style => {
      if (style.styleType === 'FILL') {
        colors[style.name] = style.description || 'No description';
      }
    });
  }
  
  return colors;
}

function extractTypography(file) {
  const typography = {};
  
  // Extract from styles
  if (file.styles) {
    Object.values(file.styles).forEach(style => {
      if (style.styleType === 'TEXT') {
        typography[style.name] = {
          description: style.description || 'No description'
        };
      }
    });
  }
  
  return typography;
}

function extractSpacing(file) {
  const spacing = {};
  
  // Extract common spacing values from components
  function traverseForSpacing(node) {
    if (node.paddingLeft !== undefined) {
      spacing[`padding-${node.paddingLeft}`] = `${node.paddingLeft}px`;
    }
    if (node.itemSpacing !== undefined) {
      spacing[`gap-${node.itemSpacing}`] = `${node.itemSpacing}px`;
    }
    
    if (node.children) {
      node.children.forEach(traverseForSpacing);
    }
  }
  
  const document = file.document || file.data?.document;
     if (document && document.children) {
    document.children.forEach(traverseForSpacing);
    }
  return spacing;
}

extractDesignTokens();