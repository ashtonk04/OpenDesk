1. System Architecture 
OpenDesk follows a Client-Server architecture using a mobile frontend and a cloud-based backend to manage realtime study space metrics.

Data Flow:
Data Collection: Users submit "Busyness" and "Noise" reports via the mobile app.

Processing: The backend receives these reports and calculates the current "Live" status of a location.

Distribution: The processed data is stored in a database and pushed to all active clients to update the home screen list.

Frontend : AI was used in the design enhancement and development.
Backend : We will be using integrating our program with AWS 

