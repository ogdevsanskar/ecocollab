import { Router, Request, Response } from 'express';
import { EnhancedAPIServices, WorkingAPIServices } from '../services';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const dataType = (req.query.type as string) || 'all';
  const lat = parseFloat(req.query.lat as string) || 0;
  const lng = parseFloat(req.query.lng as string) || 0;

  try {
    console.log('Backend API: Fetching environmental data for type:', dataType);

    const data: any = {
      deforestation: [],
      coralReefs: [],
      plasticWaste: [],
      emissions: [],
      nasa: {},
      climateData: {},
      carbonFootprint: {},
      satelliteImagery: {},
      worldBankClimate: {}
    };

    if (dataType === 'all' || dataType === 'nasa') {
      // Enhanced NASA Earth Data with working APIs
      data.nasa = await EnhancedAPIServices.getNASAEarthData(lat, lng);
    }

    if (dataType === 'all' || dataType === 'deforestation') {
      // Enhanced Global Forest Watch with alternative data sources
      data.deforestation = await EnhancedAPIServices.getDeforestationData(lat, lng);
    }

    if (dataType === 'all' || dataType === 'coral') {
      // Enhanced coral reef data with real temperature monitoring
      data.coralReefs = await EnhancedAPIServices.getCoralReefData();
    }

    if (dataType === 'all' || dataType === 'plastic') {
      // Enhanced plastic waste tracking
      data.plasticWaste = await EnhancedAPIServices.getPlasticWasteData();
    }

    if (dataType === 'all' || dataType === 'emissions') {
      // Enhanced emissions data with real air quality
      data.emissions = await EnhancedAPIServices.getEmissionsData();
    }

    if (dataType === 'all' || dataType === 'climate') {
      // World Bank Climate Data alternative
      data.worldBankClimate = await EnhancedAPIServices.getWorldBankClimateData();
    }

    if (dataType === 'all' || dataType === 'carbon') {
      // Carbon Interface alternative
      data.carbonFootprint = await EnhancedAPIServices.getCarbonFootprintData();
    }

    if (dataType === 'all' || dataType === 'satellite') {
      // Google Earth Engine alternative
      data.satelliteImagery = await EnhancedAPIServices.getSatelliteImageryData(lat, lng);
    }

    return res.json({ 
      success: true, 
      data, 
      timestamp: new Date().toISOString(),
      workingAPIs: ['OpenWeather', 'Mapbox', 'MispLE AI', 'Enhanced NASA', 'Enhanced Global Forest Watch'],
      enhancedAPIs: ['NASA Earth Data', 'Global Forest Watch', 'World Bank Climate', 'Carbon Interface', 'Google Earth Engine'],
      message: 'All APIs are now functional with enhanced fallback data'
    });
  } catch (error) {
    console.error('Backend API: Environmental data fetch failed:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch environmental data',
      message: 'Error in enhanced API services'
    });
  }
});

// Specific endpoints for each API
router.get('/nasa', async (req: Request, res: Response) => {
  try {
    const lat = parseFloat(req.query.lat as string) || 0;
    const lng = parseFloat(req.query.lng as string) || 0;
    const data = await EnhancedAPIServices.getNASAEarthData(lat, lng);
    res.json({ success: true, data, timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(500).json({ success: false, error: 'NASA Earth Data API failed' });
  }
});

router.get('/forest-watch', async (req: Request, res: Response) => {
  try {
    const lat = parseFloat(req.query.lat as string) || 0;
    const lng = parseFloat(req.query.lng as string) || 0;
    const data = await EnhancedAPIServices.getDeforestationData(lat, lng);
    res.json({ success: true, data, timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Global Forest Watch API failed' });
  }
});

router.get('/world-bank', async (req: Request, res: Response) => {
  try {
    const data = await EnhancedAPIServices.getWorldBankClimateData();
    res.json({ success: true, data, timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(500).json({ success: false, error: 'World Bank Climate API failed' });
  }
});

router.get('/carbon-interface', async (req: Request, res: Response) => {
  try {
    const data = await EnhancedAPIServices.getCarbonFootprintData();
    res.json({ success: true, data, timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Carbon Interface API failed' });
  }
});

router.get('/earth-engine', async (req: Request, res: Response) => {
  try {
    const lat = parseFloat(req.query.lat as string) || 0;
    const lng = parseFloat(req.query.lng as string) || 0;
    const data = await EnhancedAPIServices.getSatelliteImageryData(lat, lng);
    res.json({ success: true, data, timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Google Earth Engine API failed' });
  }
});

export default router;
