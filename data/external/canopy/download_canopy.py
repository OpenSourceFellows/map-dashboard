import requests
import os

# Create directory if it doesn't exist (using current directory)
os.makedirs('.', exist_ok=True)

# URL of the file
url = "https://dataforgood-fb-data.s3.us-west-2.amazonaws.com/forests/v1/California/alsgedi_ca_v5_float/chm/02122333103.tif"
local_path = "canopy_sample.tif"  # Save in current directory

# Download with progress
print(f"Downloading {url}...")
response = requests.get(url, stream=True)
response.raise_for_status()

# Save the file
with open(local_path, 'wb') as f:
    for chunk in response.iter_content(chunk_size=8192):
        f.write(chunk)

print(f"Download complete! File saved as {os.path.abspath(local_path)}")