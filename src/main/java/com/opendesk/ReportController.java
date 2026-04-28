package com.opendesk;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:5173")
public class ReportController {
    private final StudySpaceService studySpaceService;

    public ReportController(StudySpaceService studySpaceService) {
        this.studySpaceService = studySpaceService;
    }

    @PostMapping
    public Map<String, Object> submitReport(@RequestBody FrontendReportRequest request) {
        ReportRequest backendRequest = new ReportRequest();
        backendRequest.busyness = request.occupancy;
        backendRequest.noiseLevel = request.noiseLevel;

        if (request.outletsAvailable != null) {
            backendRequest.outletStatus = request.outletsAvailable ? "available" : "none";
        }

        StudySpotDataTransObj updatedSpot =
            studySpaceService.submitReport(request.spotId, backendRequest);

        Map<String, Object> response = new HashMap<>();

        if (updatedSpot == null) {
            response.put("success", false);
            response.put("message", "Spot not found");
            return response;
        }

        response.put("success", true);
        response.put("pointsEarned", 5);
        response.put("spot", updatedSpot);

        return response;
    }

    public static class FrontendReportRequest {
        public String spotId;
        public String noiseLevel;
        public String occupancy;
        public Boolean outletsAvailable;
        public String userId;
    }
}