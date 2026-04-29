package com.opendesk;
import java.util.List;

public class StudySpotDataTransObj
{
    public String id;
    public String name;
    public String subtitle;
    public int occupancyPct;
    public String noiseLevel;
    public String outletStatus;
    public String seatStatus;
    public List<String> amenities;
    public String lastUpdated;
    public int totalSeats;
    public double lat;
    public double lng;
    public List<Integer> hourlyBusyness;
    public double distance;
    public String imageUrl;

    public StudySpotDataTransObj(
        String id,
        String name,
        String subtitle,
        int occupancyPct,
        String noiseLevel,
        String outletStatus,
        String seatStatus,
        List<String> amenities,
        String lastUpdated,
        int totalSeats,
        double lat,
        double lng,
        List<Integer> hourlyBusyness,
        double distance,
        String imageUrl
    ) {
        this.id = id;
        this.name = name;
        this.subtitle = subtitle;
        this.occupancyPct = occupancyPct;
        this.noiseLevel = noiseLevel;
        this.outletStatus = outletStatus;
        this.seatStatus = seatStatus;
        this.amenities = amenities;
        this.lastUpdated = lastUpdated;
        this.totalSeats = totalSeats;
        this.lat = lat;
        this.lng = lng;
        this.hourlyBusyness = hourlyBusyness;
        this.distance = distance;
        this.imageUrl = imageUrl;
    }
}
