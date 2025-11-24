import { Api } from 'figma-api';

const figmaApi = new Api({
  personalAccessToken: import.meta.env.VITE_FIGMA_ACCESS_TOKEN,
});

export const getFigmaFile = async (fileId) => {
  try {
    const file = await figmaApi.getFile(fileId);
    return file;
  } catch (error) {
    console.error('Error fetching Figma file:', error);
    throw error;
  }
};

export const getFigmaImages = async (fileId, nodeIds) => {
  try {
    const images = await figmaApi.getImage(fileId, {
      ids: nodeIds,
      format: 'png',
      scale: 2,
    });
    return images;
  } catch (error) {
    console.error('Error fetching Figma images:', error);
    throw error;
  }
};

export default figmaApi;
