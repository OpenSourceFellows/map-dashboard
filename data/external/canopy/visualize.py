import rasterio
import matplotlib.pyplot as plt
import numpy as np
from rasterio.windows import Window

# Open the GeoTIFF
with rasterio.open('canopy.tif') as src:
    # Read a smaller window (first 2000x2000 pixels)
    window = Window(0, 0, min(2000, src.width), min(2000, src.height))
    data = src.read(1, window=window)
    
    # Create a masked array for no-data values
    data = np.ma.masked_where(data == src.nodata, data)
    
    # Plot
    plt.figure(figsize=(10, 8))
    plt.imshow(data, cmap='viridis')
    plt.colorbar(label='Canopy Height (m)')
    plt.title('Canopy Height (First 2000x2000 pixels)')
    plt.axis('off')
    plt.tight_layout()
    plt.savefig('canopy_preview.png', dpi=150, bbox_inches='tight')
    print("Preview saved as 'canopy_preview.png'")