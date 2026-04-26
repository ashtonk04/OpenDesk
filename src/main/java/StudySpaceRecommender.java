import java.util.ArrayList;
import java.util.List;

public class StudySpaceRecommender {

    private List<LocationStats> locationStatsList;

    public StudySpaceRecommender(List<LocationStats> locationStatsList) {
        this.locationStatsList = locationStatsList;
    }

    // Returns spaces ranked by how well they match the given preferences
    public List<LocationStats> recommend(UserPreferences prefs) {
        List<LocationStats> candidates = new ArrayList<>();

        for (LocationStats stats : locationStatsList) {
            if (meetsMinCapacity(stats, prefs)) {
                candidates.add(stats);
            }
        }

        candidates.sort((a, b) -> Integer.compare(score(b, prefs), score(a, prefs)));

        return candidates;
    }

    private boolean meetsMinCapacity(LocationStats stats, UserPreferences prefs) {
        if (stats.getLocation() == null) return prefs.getMinCapacity() == 0;
        return stats.getLocation().getCapacity() >= prefs.getMinCapacity();
    }

    private int score(LocationStats stats, UserPreferences prefs) {
        int s = 0;

        if (prefs.isWantsQuiet() && "QUIET".equalsIgnoreCase(stats.getNoiseLevel())) s += 3;
        if (prefs.isNeedsOutlets() && stats.isOutletsAvailable()) s += 2;
        if (prefs.getPreferredCrowdLevel() != null
                && prefs.getPreferredCrowdLevel().equalsIgnoreCase(stats.getCrowdLevel())) s += 3;

        return s;
    }
}
