# Taxi - HaiBinTou  [8th July 2021]

Project done during General Assembly Software Engineering Immersive (SEI-30 Singapore)   
A web app that retrieves real-time taxi availability data with location coordinates, from https://data.gov.sg/dataset/taxi-availability.  
Using the coordinates, each taxi is individually displayed on an interactive map (built with React-Leaflet).   
The dataset is refreshed every minute and updated on the app.

# Map Features (_url/Map_)
### Map all available taxis, arranged into cluster groups
Each available taxi is marked by a taxi icon.
Clicking on the icon will retrieve the street address of the taxi.
Taxis are grouped into clusters for easier readability and smoother experience. ie. On average, there will be about 3000-4000 available taxis at one instance, making the map cluttered and memory intensive.

### Double click to place marker (draggable)
Double click anywhere on the map to place a marker, it has tooltip showing marker's street address. 
You can drag the marker to move its position, street address will be updated when drag ends.

### Map Layer settings

1. Switch-able layers, users can switch between:
    * Dark themed map with minimal details (JawgMaps)
    * Light themed map showing key features Hospitals, Schools, Public Transport etc. (JawgMaps)
    * Dark themed map with dotted MRT Lines (OneMap)

2. Toggle-able layers, users can toggle Show / Hide:
    * Available Taxis (_Checked by default_) - Taxi markers and cluster groups
    * Taxi Stands Markers
    * Taxi Surchage Area - boundaries in green highlight, mouse over to see the surcharge amount and details
    * Cycling Paths - Park Connectors and Cycle Path Network 
    (_Not really related to Taxis, but i am adding it for this project's possible future development_)

# Data Features (_url/Data_)
### Line Graph representation of Available Taxis
User inputs - Data Resolution and Data Length. Upon selection of any input, graph will automatically render with latest fetched data. The dataset will take reference from the time instance where user selects an input.

__Data resolution__: Time interval between each data point (x-axis)  
__Data length__: Total number of additional points to plot on graph (not including current timestamp)

E.g. User inputs at 13:00: Data resolution of 5 minutes and Data length of 12 points.  
Graph will render dataset from the last 60 minutes, with data points of 5 minutes spread. 
* Datapoint 1 - Taxi count at 12:00 ..
* Datapoint 2 - Taxi count at 12:05 ..
* Datapoint 3 - Taxi count at 12:10 .. 
* Datapoint 11 - Taxi count at 12:50 .. 
* Datapoint 12 - Taxi count at 12:55 ..
* Datapoint 13 - Taxi count at 13:00 (end of dataset)

# Data retrieved from - APIs, GeoJson, Info and Graphics
1. API
* https://data.gov.sg/dataset/taxi-availability - LTA's Datamall: Taxi Availability from LTA's Datamall (returns taxi count, geo-coordinates from timestamp request)
* https://developer.here.com/documentation/geocoding-search-api/api-reference-swagger.html - HERE Developers: Reverse Geocode (returns nearest address from geo coordinates request)
2. GEOJson
* https://data.gov.sg/dataset/lta-taxi-stop - GEOJson of Taxi Stand coordinates
* https://www.lta.gov.sg/content/ltagov/en/getting_around/taxis_private_hire_cars/taxi_fares_payment_methods.html - Taxi surcharge areas, hours and fee
* https://www.keene.edu/campus/maps/tool/ - Tool for drawing polygon boundaries on map, returns array of polygon's coordinates
3. Art and Graphics
* https://www.flaticon.com/authors/surang - Icons for Taxi and Taxi Stand
4. Map layers
* https://www.jawg.io/en/ - Jawg Map Layer
* https://www.onemap.gov.sg/home/ - OneMap Map Layer
* https://waymarkedtrails.org/ - Cycling Paths Layer

# Built with
* https://leafletjs.com/ & https://react-leaflet.js.org/ - Interactive Mapping tool 
* https://github.com/yuzhva/react-leaflet-markercluster -  Cluster grouping of Taxi Icons (Markers)
* https://recharts.org/en-US - Data visualization and chart
* https://reactjs.org/ - React on Javascript
