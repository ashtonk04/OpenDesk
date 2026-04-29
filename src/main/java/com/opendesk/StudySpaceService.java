package com.opendesk;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class StudySpaceService {
    private static final int[] OCCUPANCY_BUCKETS = {15, 25, 35, 50, 65, 75, 85, 95};

    private final StudySpotRepository studySpotRepository;

    public StudySpaceService(StudySpotRepository studySpotRepository) {
        this.studySpotRepository = studySpotRepository;
    }

    public List<StudySpotDataTransObj> getAllSpots() {
        return studySpotRepository.findAll(Sort.by("distance"))
            .stream()
            .map(this::toDto)
            .toList();
    }

    public StudySpotDataTransObj getSpotById(String id) {
        return studySpotRepository.findById(id)
            .map(this::toDto)
            .orElse(null);
    }

    public StudySpotDataTransObj submitReport(String id, ReportRequest request) {
        StudySpot spot = studySpotRepository.findById(id).orElse(null);

        if (spot == null) {
            return null;
        }

        if (request.busyness != null) {
            spot.setOccupancyPct(adjustOccupancy(spot.getOccupancyPct(), request.busyness));
            spot.setSeatStatus(convertPercentToSeatStatus(spot.getOccupancyPct()));
        }

        if (request.noiseLevel != null) {
            spot.setNoiseLevel(request.noiseLevel);
        }

        if (request.outletStatus != null) {
            spot.setOutletStatus(request.outletStatus);
        }

        spot.setLastUpdated(Instant.now().toString());
        return toDto(studySpotRepository.save(spot));
    }

    private StudySpotDataTransObj toDto(StudySpot spot) {
        return new StudySpotDataTransObj(
            spot.getId(),
            spot.getName(),
            spot.getSubtitle(),
            spot.getOccupancyPct(),
            spot.getNoiseLevel(),
            spot.getOutletStatus(),
            spot.getSeatStatus(),
            spot.getAmenities(),
            spot.getLastUpdated(),
            spot.getTotalSeats(),
            spot.getLat(),
            spot.getLng(),
            spot.getHourlyBusyness(),
            spot.getDistance(),
            spot.getImageUrl()
        );
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
