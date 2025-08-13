const ee = require('@google/earthengine');

describe('Google Earth Engine Integration Tests', () => {
  beforeAll(async () => {
    const keyPath = process.env.GEE_PRIVATE_KEY_PATH;
    
    if (!keyPath) {
      throw new Error('GEE_PRIVATE_KEY_PATH environment variable is required');
    }

    try {
      await new Promise((resolve, reject) => {
        ee.initialize(null, null, resolve, reject, null, keyPath);
      });
      
      console.log('Earth Engine initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Earth Engine:', error);
      throw error;
    }
  }, 30000);

  test('should authenticate and access Earth Engine', async () => {
    const image = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_044034_20140318');
    expect(image).toBeDefined();
  });
});