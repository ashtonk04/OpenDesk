
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;

public class StudySpaceTrackerTest {

    private StudySpaceTracker tracker;
    private Location library;
    private LocationStats libraryStats;

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
    
    @Test
    public void addLocationNewSpotTest()
    {
        Location squires = new Location("2", "Squires");

        tracker.addLocation(squires);

        assertEquals(2, tracker.getAllLocations().size());
        assertTrue(tracker.getAllLocations().contains(squires));
    }
}
