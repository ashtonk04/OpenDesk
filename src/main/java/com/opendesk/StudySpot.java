package com.opendesk;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OrderColumn;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "study_spots")
public class StudySpot {
    @Id
    private String id;

    @Column(nullable = false)
    private String name;

    private String subtitle;
    private int occupancyPct;
    private String noiseLevel;
    private String outletStatus;
    private String seatStatus;

    @ElementCollection
    @CollectionTable(name = "study_spot_amenities", joinColumns = @JoinColumn(name = "spot_id"))
    @OrderColumn(name = "amenity_order")
    private List<String> amenities = new ArrayList<>();

    private String lastUpdated;
    private int totalSeats;
    private double lat;
    private double lng;

    @ElementCollection
    @CollectionTable(name = "study_spot_hourly_busyness", joinColumns = @JoinColumn(name = "spot_id"))
    @OrderColumn(name = "hour_order")
    private List<Integer> hourlyBusyness = new ArrayList<>();

    private double distance;

    @Column(length = 1024)
    private String imageUrl;

    public StudySpot() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSubtitle() { return subtitle; }
    public void setSubtitle(String subtitle) { this.subtitle = subtitle; }

    public int getOccupancyPct() { return occupancyPct; }
    public void setOccupancyPct(int occupancyPct) { this.occupancyPct = occupancyPct; }

    public String getNoiseLevel() { return noiseLevel; }
    public void setNoiseLevel(String noiseLevel) { this.noiseLevel = noiseLevel; }

    public String getOutletStatus() { return outletStatus; }
    public void setOutletStatus(String outletStatus) { this.outletStatus = outletStatus; }

    public String getSeatStatus() { return seatStatus; }
    public void setSeatStatus(String seatStatus) { this.seatStatus = seatStatus; }

    public List<String> getAmenities() { return amenities; }
    public void setAmenities(List<String> amenities) { this.amenities = new ArrayList<>(amenities); }

    public String getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(String lastUpdated) { this.lastUpdated = lastUpdated; }

    public int getTotalSeats() { return totalSeats; }
    public void setTotalSeats(int totalSeats) { this.totalSeats = totalSeats; }

    public double getLat() { return lat; }
    public void setLat(double lat) { this.lat = lat; }

    public double getLng() { return lng; }
    public void setLng(double lng) { this.lng = lng; }

    public List<Integer> getHourlyBusyness() { return hourlyBusyness; }
    public void setHourlyBusyness(List<Integer> hourlyBusyness) { this.hourlyBusyness = new ArrayList<>(hourlyBusyness); }

    public double getDistance() { return distance; }
    public void setDistance(double distance) { this.distance = distance; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
