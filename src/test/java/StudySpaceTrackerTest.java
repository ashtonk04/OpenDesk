import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.opendesk.Location;
import com.opendesk.LocationStats;
import com.opendesk.StudySpaceRecommender;
import com.opendesk.StudySpaceTracker;
import com.opendesk.UserPreferences;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;

public class StudySpaceTrackerTest {

    private StudySpaceTracker tracker;
    private Location library;
    private LocationStats libraryStats;

    @BeforeEach
    public void setUp() {
        tracker = new StudySpaceTracker();

        library = new Location("1", "Newman Library");
        library.setBuilding("Newman Library");
        library.setFloor("2");
        library.setCapacity(120);
        library.setHasOutlets(true);
        library.setHasPrinters(true);
        library.setTags(new HashSet<String>());

        libraryStats = new LocationStats();
        libraryStats.setLocation(library);
        libraryStats.setNoiseLevel("Quiet");
        libraryStats.setOccupancyPercent(25);
        libraryStats.setOutletsAvailable(true);
        libraryStats.setCrowdLevel("Low");
        libraryStats.setReportCount(0);
        libraryStats.setLastUpdated(LocalDateTime.now().minusMinutes(10));

        tracker.addLocation(library);
        tracker.addLocationStats(libraryStats);
    }

    //-------------- addLocation() Tests ----------------------------
    @Test
    public void addLocationNewSpotTest() {
        Location squires = new Location("2", "Squires");

        tracker.addLocation(squires);

        assertEquals(2, tracker.getAllLocations().size());
        assertTrue(tracker.getAllLocations().contains(squires));
    }

    //-------------- getLocation() Tests ----------------------------
    @Test
    public void getLocationReturnsMatchTest()
    {
        Location result = tracker.getLocation("Newman Library");

        assertNotNull(result);
        assertEquals("Newman Library", result.getName());
        assertEquals("1", result.getId());
    }

    @Test
    public void getLocationNotFoundTest()
    {
        Location result = tracker.getLocation("Not Real Spot");

        assertNull(result);
    }
     
    @Test
    public void getLocationCaseInsensitiveTest()
    {
        Location result = tracker.getLocation("newman library");

        assertNotNull(result);
        assertEquals("Newman Library", result.getName());
    }

    //-------------- getAllLocations() Tests ----------------------------
    @Test
    public void getAllLocationsOnlyOneSpotTest()
    {
        List<Location> results = tracker.getAllLocations();

        assertEquals(1, results.size());
        assertTrue(results.contains(library));
    }

    @Test 
    public void getAllLocationsMultipleSpotsTest()
    {
        Location squires = new Location("2", "Squires");
        Location torg = new Location("3", "Torg Bridge");

        tracker.addLocation(squires);
        tracker.addLocation(torg);

        List<Location> results = tracker.getAllLocations();
        assertEquals(3, results.size());
        assertTrue(results.contains(squires));
        assertTrue(results.contains(torg));
    }

    //-------------------------- filterByNoise() Tests ---------------------
    
    @Test 
    public void filterByNoiseOnlyQuietTest()
    {
        Location squires = new Location("2", "Squires");
        LocationStats squiresStats = new LocationStats();
        squiresStats.setLocation(squires);
        squiresStats.setNoiseLevel("Loud");

        Location torg = new Location("3", "Torg Bridge");
        LocationStats torgStats = new LocationStats();
        torgStats.setLocation(torg);
        torgStats.setNoiseLevel("Quiet");

        tracker.addLocation(squires);
        tracker.addLocation(torg);
        tracker.addLocationStats(squiresStats);
        tracker.addLocationStats(torgStats);

        List<LocationStats> results = tracker.filterByNoise("Quiet");
        assertEquals(2, results.size());
        assertEquals("Quiet", results.get(0).getNoiseLevel());
        assertEquals("Quiet", results.get(1).getNoiseLevel());
    }

    @Test
    public void filterByNoiseCaseInsensitiveTest()
    {
        Location squires = new Location("2", "Squires");
        LocationStats squiresStats = new LocationStats();
        squiresStats.setLocation(squires);
        squiresStats.setNoiseLevel("LOUD");

        tracker.addLocation(squires);
        tracker.addLocationStats(squiresStats);

        List<LocationStats> results = tracker.filterByNoise("loud");
        assertEquals(1, results.size());
        assertEquals("LOUD", results.get(0).getNoiseLevel());
    }

    @Test 
    public void filterByNoiseNoMatchesTest()
    {
        List<LocationStats> results = tracker.filterByNoise("Moderate");
        assertTrue(results.isEmpty());
    }

    @Test  
    public void filterByNoiseNullTest()
    {
        Location squires = new Location("2", "Squires");
        LocationStats squiresStats = new LocationStats();
        squiresStats.setLocation(squires);
        squiresStats.setNoiseLevel(null);

        tracker.addLocation(squires);
        tracker.addLocationStats(squiresStats);

        List<LocationStats> results = tracker.filterByNoise("Quiet");
        // Only libraryStats (from setUp) should match; squiresStats has null noise and must be excluded
        assertEquals(1, results.size());
        assertFalse(results.contains(squiresStats));
    }
    /**
     * getAllLocations when empty
     * addLocation when duplicate
     */


    @Test
    public void addLocationDuplicateTest()
    {
        Location duplicateLibrary = new Location("1", "Newman Library");

        tracker.addLocation(duplicateLibrary);

        List<Location> results = tracker.getAllLocations();

        // Since no duplicate prevention exists, both should be present
        assertEquals(2, results.size());
        assertTrue(results.contains(library));
        assertTrue(results.contains(duplicateLibrary));
    }

    // -------- Integration Tests --------

    @Test
    public void submitReportThenRecommenderReflectsUpdatedDataTest()
    {
        Location squires = new Location("2", "Squires");
        squires.setCapacity(60);
        LocationStats squiresStats = new LocationStats();
        squiresStats.setLocation(squires);
        squiresStats.setNoiseLevel("Loud");
        squiresStats.setCrowdLevel("High");
        squiresStats.setOutletsAvailable(false);

        tracker.addLocation(squires);
        tracker.addLocationStats(squiresStats);

        // Degrade library via report: now loud, high crowd, no outlets
        tracker.submitReport("Newman Library", "High", "Loud", false);

        StudySpaceRecommender recommender = new StudySpaceRecommender(tracker.getLocationStatsList());
        UserPreferences prefs = new UserPreferences(true, true, "Low", 0);
        List<LocationStats> results = recommender.recommend(prefs);

        assertEquals(2, results.size());
        // Library was degraded — neither space matches quiet+outlets, both score 0
        assertTrue(results.contains(libraryStats));
        assertTrue(results.contains(squiresStats));
    }
}
