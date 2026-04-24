import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

// Tests generated with AI assistance (Claude Sonnet 4.6)
// Prompt: "Generate unit tests for StudySpaceRecommender covering preference matching,
//          capacity filtering, ranking order, and empty result cases"
public class StudySpaceRecommenderTest {

    private Location library;
    private Location squires;
    private LocationStats libraryStats;
    private LocationStats squiresStats;

    @BeforeEach
    public void setUp() {
        library = new Location("1", "Newman Library");
        library.setCapacity(120);

        libraryStats = new LocationStats();
        libraryStats.setLocation(library);
        libraryStats.setNoiseLevel("Quiet");
        libraryStats.setCrowdLevel("Low");
        libraryStats.setOutletsAvailable(true);

        squires = new Location("2", "Squires");
        squires.setCapacity(50);

        squiresStats = new LocationStats();
        squiresStats.setLocation(squires);
        squiresStats.setNoiseLevel("Loud");
        squiresStats.setCrowdLevel("High");
        squiresStats.setOutletsAvailable(false);
    }

    // -------- recommend() unit tests --------

    @Test
    public void recommendReturnsAllSpacesAboveMinCapacityTest() {
        List<LocationStats> stats = List.of(libraryStats, squiresStats);
        StudySpaceRecommender recommender = new StudySpaceRecommender(stats);

        UserPreferences prefs = new UserPreferences(false, false, null, 30);
        List<LocationStats> results = recommender.recommend(prefs);

        assertEquals(2, results.size());
    }

    @Test
    public void recommendExcludesSpacesBelowMinCapacityTest() {
        List<LocationStats> stats = List.of(libraryStats, squiresStats);
        StudySpaceRecommender recommender = new StudySpaceRecommender(stats);

        UserPreferences prefs = new UserPreferences(false, false, null, 100);
        List<LocationStats> results = recommender.recommend(prefs);

        assertEquals(1, results.size());
        assertEquals("Newman Library", results.get(0).getLocation().getName());
    }

    @Test
    public void recommendRanksQuietSpaceFirstWhenWantsQuietTest() {
        List<LocationStats> stats = List.of(squiresStats, libraryStats);
        StudySpaceRecommender recommender = new StudySpaceRecommender(stats);

        UserPreferences prefs = new UserPreferences(true, false, null, 0);
        List<LocationStats> results = recommender.recommend(prefs);

        assertEquals("Newman Library", results.get(0).getLocation().getName());
    }

    @Test
    public void recommendRanksOutletSpaceHigherWhenNeedsOutletsTest() {
        List<LocationStats> stats = List.of(squiresStats, libraryStats);
        StudySpaceRecommender recommender = new StudySpaceRecommender(stats);

        UserPreferences prefs = new UserPreferences(false, true, null, 0);
        List<LocationStats> results = recommender.recommend(prefs);

        assertEquals("Newman Library", results.get(0).getLocation().getName());
    }

    @Test
    public void recommendRanksMatchingCrowdLevelHigherTest() {
        List<LocationStats> stats = List.of(squiresStats, libraryStats);
        StudySpaceRecommender recommender = new StudySpaceRecommender(stats);

        UserPreferences prefs = new UserPreferences(false, false, "Low", 0);
        List<LocationStats> results = recommender.recommend(prefs);

        assertEquals("Newman Library", results.get(0).getLocation().getName());
    }

    @Test
    public void recommendReturnsEmptyWhenNoSpacesMeetMinCapacityTest() {
        List<LocationStats> stats = List.of(libraryStats, squiresStats);
        StudySpaceRecommender recommender = new StudySpaceRecommender(stats);

        UserPreferences prefs = new UserPreferences(false, false, null, 500);
        List<LocationStats> results = recommender.recommend(prefs);

        assertTrue(results.isEmpty());
    }

    @Test
    public void recommendReturnsEmptyForEmptyInputTest() {
        StudySpaceRecommender recommender = new StudySpaceRecommender(new ArrayList<>());

        UserPreferences prefs = new UserPreferences(true, true, "Low", 0);
        List<LocationStats> results = recommender.recommend(prefs);

        assertTrue(results.isEmpty());
    }

    @Test
    public void recommendHighestScoringSpaceFirstWithMultiplePreferencesTest() {
        // library matches quiet + outlets + low crowd = 8 pts
        // squires matches nothing = 0 pts
        List<LocationStats> stats = List.of(squiresStats, libraryStats);
        StudySpaceRecommender recommender = new StudySpaceRecommender(stats);

        UserPreferences prefs = new UserPreferences(true, true, "Low", 0);
        List<LocationStats> results = recommender.recommend(prefs);

        assertEquals("Newman Library", results.get(0).getLocation().getName());
        assertEquals("Squires", results.get(1).getLocation().getName());
    }
}
