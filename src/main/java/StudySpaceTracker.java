import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List; 

public class StudySpaceTracker
{
    //Lists for all locations (name/building) and respective data (busyness/noise)
    private List<Location> locations;
    private List<LocationStats> locationStatsList;

    public StudySpaceTracker()
    {
        //Initialize new lists for locations and specific location stats
        locations = new ArrayList<Location>();
        locationStatsList = new ArrayList<LocationStats>();
    }

    //Add new location to list 
    public void addLocation(Location location)
    {
        locations.add(location);
    }

    //Add stats for a specific spot to list
    public void addLocationStats(LocationStats stats)
    {
        locationStatsList.add(stats);
    }

    //Gets a location by name 
    public Location getLocation(String name)
    {
        for (Location l : locations)
        {
            //Checks for equality regardless of upper/lower case chars
            if (l.getName().equalsIgnoreCase(name))
            {
                return l;
            }
        }

        //not found 
        return null;
    }

    //Returns all study spots 
    public List<Location> getAllLocations()
    {
        return locations;
    }

    //Gets study spaces based on filtered noise level, each match added and returned 
    public List<LocationStats> filterByNoise(String noiseLevel)
    {
        List<LocationStats> matches = new ArrayList<LocationStats>();
        for (LocationStats stats : locationStatsList)
        {
            if (stats.getNoiseLevel() != null &&  stats.getNoiseLevel().equalsIgnoreCase(noiseLevel))
            {
                matches.add(stats);
            }
        }

        return matches;
    }

    //Gets study spaces based on filtered outlet availability, each match added and returned 
    public List<LocationStats> filterByOutletAvailability(boolean outletsAvailable)
    {
        List<LocationStats> matches = new ArrayList<LocationStats>();
        for (LocationStats stats : locationStatsList)
        {
            if (stats.isOutletsAvailable() == outletsAvailable)
            {
                matches.add(stats); 
            }
        }
        return matches;
    }
 
    //Sumbit report to update a space's data, only updates provided data 
    public void submitReport(String locationName, String busyness, String noise, Boolean outlets)
    {
        for (LocationStats stats : locationStatsList)
        {
            if (stats.getLocation() != null && stats.getLocation().getName().equalsIgnoreCase(locationName))
            {
                //Busyness level update if new value given 
                if (busyness != null && !busyness.isEmpty())
                {
                    stats.setCrowdLevel(busyness);
                }

                //Noise level if new value given 
                if (noise != null && !noise.isEmpty())
                {
                    stats.setNoiseLevel(noise);
                }

                if (outlets != null)
                {
                    stats.setOutletsAvailable(outlets);
                }

                stats.setReportCount(stats.getReportCount() + 1);
                stats.setLastUpdated(LocalDateTime.now());
            }
        }
    }
}