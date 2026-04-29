package com.opendesk;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class StudySpaceService {
    private static final int[] OCCUPANCY_BUCKETS = {15, 25, 35, 50, 65, 75, 85, 95};

    private final List<StudySpotDataTransObj> spots = new ArrayList<>();

    public StudySpaceService() {
        spots.add(new StudySpotDataTransObj(
            "newman-library",
            "Newman Library",
            "Main Campus · 4th Floor Reading Room",
            46,
            "moderate",
            "plenty",
            "available",
            Arrays.asList("wifi", "coffee"),
            Instant.now().minusSeconds(4 * 60).toString(),
            350,
            37.2284,
            -80.4234,
            Arrays.asList(20, 35, 40, 65, 85, 95, 75, 55, 30, 20),
            0.1
        ));

        spots.add(new StudySpotDataTransObj(
            "squires-student-center",
            "Squires Student Center",
            "Main Campus · 2nd Floor Study Lounge",
            82,
            "loud",
            "scarce",
            "limited",
            Arrays.asList("wifi", "coffee", "printing"),
            Instant.now().minusSeconds(12 * 60).toString(),
            120,
            37.2296,
            -80.4218,
            Arrays.asList(10, 20, 45, 70, 90, 95, 85, 80, 60, 40),
            0.2
        ));

        spots.add(new StudySpotDataTransObj(
            "goodwin-hall",
            "Goodwin Hall",
            "Engineering Quad · 3rd Floor Commons",
            18,
            "silent",
            "available",
            "available",
            Arrays.asList("wifi"),
            Instant.now().minusSeconds(1 * 60).toString(),
            80,
            37.2275,
            -80.4260,
            Arrays.asList(5, 10, 15, 25, 40, 55, 35, 20, 10, 5),
            0.3
        ));

        spots.add(new StudySpotDataTransObj(
            "torgersen-bridge",
            "Torgersen Bridge",
            "Torgersen Hall · 4th Floor Bridge",
            12,
            "quiet",
            "available",
            "available",
            Arrays.asList("wifi"),
            Instant.now().minusSeconds(2 * 60).toString(),
            40,
            37.2268,
            -80.4255,
            Arrays.asList(5, 8, 12, 20, 35, 45, 30, 20, 10, 5),
            0.4
        ));
    }

    public List<StudySpotDataTransObj> getAllSpots() {
        return spots;
    }

    public StudySpotDataTransObj getSpotById(String id) {
        for (StudySpotDataTransObj spot : spots) {
            if (spot.id.equals(id)) {
                return spot;
            }
        }

        return null;
    }

    public StudySpotDataTransObj submitReport(String id, ReportRequest request) {
        StudySpotDataTransObj spot = getSpotById(id);

        if (spot == null) {
            return null;
        }

        if (request.busyness != null) {
            spot.occupancyPct = adjustOccupancy(spot.occupancyPct, request.busyness);
            spot.seatStatus = convertPercentToSeatStatus(spot.occupancyPct);
        }

        if (request.noiseLevel != null) {
            spot.noiseLevel = request.noiseLevel;
        }

        if (request.outletStatus != null) {
            spot.outletStatus = request.outletStatus;
        }

        spot.lastUpdated = Instant.now().toString();
        return spot;
    }

    private int adjustOccupancy(int currentPct, String busyness) {
        int currentIndex = findClosestBucketIndex(currentPct);
        int moderateIndex = findClosestBucketIndex(50);

        if (busyness.equalsIgnoreCase("empty")) {
            currentIndex = currentIndex - 2;
        }
        else if (busyness.equalsIgnoreCase("crowded")
            || busyness.equalsIgnoreCase("packed")) {
            currentIndex = currentIndex + 2;
        }
        else if (busyness.equalsIgnoreCase("moderate")) {
            if (currentIndex < moderateIndex) {
                currentIndex++;
            }
            else if (currentIndex > moderateIndex) {
                currentIndex--;
            }
        }

        if (currentIndex < 0) {
            currentIndex = 0;
        }

        if (currentIndex >= OCCUPANCY_BUCKETS.length) {
            currentIndex = OCCUPANCY_BUCKETS.length - 1;
        }

        return OCCUPANCY_BUCKETS[currentIndex];
    }

    private int findClosestBucketIndex(int percentage) {
        int closestIndex = 0;
        int smallestDifference = Math.abs(percentage - OCCUPANCY_BUCKETS[0]);

        for (int i = 1; i < OCCUPANCY_BUCKETS.length; i++) {
            int difference = Math.abs(percentage - OCCUPANCY_BUCKETS[i]);

            if (difference < smallestDifference) {
                smallestDifference = difference;
                closestIndex = i;
            }
        }

        return closestIndex;
    }

    private String convertPercentToSeatStatus(int percentage) {
        if (percentage < 60) {
            return "available";
        }

        if (percentage < 85) {
            return "limited";
        }

        return "full";
    }
}