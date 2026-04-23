import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "location_stats")
public class LocationStats {

    @Id
    private String locationId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "location_id")
    private Location location;

    private String noiseLevel;
    private int occupancyPercent;
    private boolean outletsAvailable;

    private String crowdLevel;

    private int reportCount;

    private LocalDateTime lastUpdated;

    public LocationStats() {}

    // getters and setters
    public String getLocationId() { return locationId; }
    public void setLocationId(String locationId) { this.locationId = locationId; }

    public Location getLocation() { return location; }
    public void setLocation(Location location) { this.location = location; }

    public String getNoiseLevel() { return noiseLevel; }
    public void setNoiseLevel(String noiseLevel) { this.noiseLevel = noiseLevel; }

    public int getOccupancyPercent() { return occupancyPercent; }
    public void setOccupancyPercent(int occupancyPercent) { this.occupancyPercent = occupancyPercent; }

    public boolean isOutletsAvailable() { return outletsAvailable; }
    public void setOutletsAvailable(boolean outletsAvailable) { this.outletsAvailable = outletsAvailable; }

    public String getCrowdLevel() { return crowdLevel; }
    public void setCrowdLevel(String crowdLevel) { this.crowdLevel = crowdLevel; }

    public int getReportCount() { return reportCount; }
    public void setReportCount(int reportCount) { this.reportCount = reportCount; }

    public LocalDateTime getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(LocalDateTime lastUpdated) { this.lastUpdated = lastUpdated; }
}
