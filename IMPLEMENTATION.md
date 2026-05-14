1) System Architecture 
   - OpenDesk follows a client-server architecture that consists of a React frontend and a Java Spring Boot backend. 

   Components
    Frontend: React
    - Handles the user interactions and UI renderings
    - Displays all study spaces with occupancies and other details 
    - Allows users to submit report updates on study space data along with favorite locaitons 

    Backend: Spring Boot 
    - Provides RESTful APIs for the study space data 
    - Processes the user reports submitted for locations 
    - Updates the occupanciess, noise levels, and outlet availability dynamically

2) Data + Data Flow

    Collection
    - Users create and submit reports on locations updating their busyness and noise levels and outlet availability

    Processing 
    - The backend receives a submitted report and updates data along with recording latest update time for display

    Distribution 
    - The updated data is then returned to frontend and UI displays the new values 

3) Design 

    RESTfull API 
    - '/api/spots' for getting study spots 
    - '/api/reports' for user reports submitting

    Single Server (React and Spring Boot combination)
    - The frontend (React) is combined/bundled into the backend (Spring Boot)
    - The application runs on the single port: 8080

    Bucket Occupancy 
    - Occuancy value reports update based on buckets 
    - Empty moves 2 buckets down for occupancy percentage (50% to 25%)
    - Crowded moves 2 buckets up for occupancy percentage (50% to 75%)
    - Moderate moves 1 bucket up/down depending on where it currently sits (15% to 25% OR 75% to 65%)

4) Technologies / AI Usage 
    - Frontend: React
    - Backend: Java and Spring Boot
    - Build Tools: Maven and Vite
    
    AI tools were used in various parts of project
    - UI designing improvements from base UI idea
    - Debubgging/fixing both frontend and backend issues along with integration 
    - Idea formation for improvements/changes to UI 
    