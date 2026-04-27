package com.opendesk;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/spots")
@CrossOrigin(origins = "http://localhost:5173")
public class StudySpaceController {
    private final List<StudySpotDataTransObj> spots = new ArrayList<>();

    public StudySpaceController() {
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

    @GetMapping
    public List<StudySpotDataTransObj> getAllSpots() {
        return spots;
    }

    @GetMapping("/{id}")
    public StudySpotDataTransObj getSpotById(@PathVariable String id) {
        for (StudySpotDataTransObj spot : spots) {
            if (spot.id.equals(id)) {
                return spot;
            }
        }

        return null;
    }

    @PostMapping("/{id}/report")
    public StudySpotDataTransObj submitReport(
        @PathVariable String id,
        @RequestBody ReportRequest request
    ) {
        for (StudySpotDataTransObj spot : spots) {
            if (spot.id.equals(id)) {
                if (request.busyness != null) {
                    spot.occupancyPct = convertBusynessToPercent(request.busyness);
                    spot.seatStatus = convertBusynessToSeatStatus(request.busyness);
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
        }

        return null;
    }

    private int convertBusynessToPercent(String busyness) {
        if (busyness.equalsIgnoreCase("empty")) {
            return 15;
        }

        if (busyness.equalsIgnoreCase("moderate")) {
            return 50;
        }

        if (busyness.equalsIgnoreCase("crowded") || busyness.equalsIgnoreCase("packed")) {
            return 85;
        }

        return 50;
    }

    private String convertBusynessToSeatStatus(String busyness) {
        if (busyness.equalsIgnoreCase("empty")) {
            return "available";
        }

        if (busyness.equalsIgnoreCase("moderate")) {
            return "limited";
        }

        if (busyness.equalsIgnoreCase("crowded") || busyness.equalsIgnoreCase("packed")) {
            return "limited";
        }

        return "available";
    }
}