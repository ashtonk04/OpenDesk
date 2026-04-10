import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "locations")
public class Location {

    @Id
    private String id;

    @Column(nullable = false)
    private String name;

    private String building;
    private String floor;

    private int capacity;

    private boolean hasOutlets;
    private boolean hasPrinters;

    @ElementCollection
    private Set<String> tags;

    public Location() {}

    public Location(String id, String name) {
        this.id = id;
        this.name = name;
    }

    // getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getBuilding() { return building; }
    public void setBuilding(String building) { this.building = building; }

    public String getFloor() { return floor; }
    public void setFloor(String floor) { this.floor = floor; }

    public int getCapacity() { return capacity; }
    public void setCapacity(int capacity) { this.capacity = capacity; }

    public boolean isHasOutlets() { return hasOutlets; }
    public void setHasOutlets(boolean hasOutlets) { this.hasOutlets = hasOutlets; }

    public boolean isHasPrinters() { return hasPrinters; }
    public void setHasPrinters(boolean hasPrinters) { this.hasPrinters = hasPrinters; }

    public Set<String> getTags() { return tags; }
    public void setTags(Set<String> tags) { this.tags = tags; }
}
