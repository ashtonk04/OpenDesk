package com.opendesk;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/spots")
@CrossOrigin(origins = "http://localhost:5173")
public class StudySpaceController {
    private final StudySpaceService studySpaceService;

    public StudySpaceController(StudySpaceService studySpaceService) {
        this.studySpaceService = studySpaceService;
    }

    @GetMapping
    public List<StudySpotDataTransObj> getAllSpots() {
        return studySpaceService.getAllSpots();
    }

    @GetMapping("/{id}")
    public StudySpotDataTransObj getSpotById(@PathVariable String id) {
        return studySpaceService.getSpotById(id);
    }

    @PostMapping("/{id}/report")
    public StudySpotDataTransObj submitReport(
        @PathVariable String id,
        @RequestBody ReportRequest request
    ) {
        return studySpaceService.submitReport(id, request);
    }
}