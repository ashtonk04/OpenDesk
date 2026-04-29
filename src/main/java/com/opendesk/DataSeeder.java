package com.opendesk;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.List;
import java.util.Set;

@Component
public class DataSeeder implements CommandLineRunner {
    private final StudySpotRepository studySpotRepository;

    public DataSeeder(StudySpotRepository studySpotRepository) {
        this.studySpotRepository = studySpotRepository;
    }

    @Override
    public void run(String... args) {
        List<StudySpot> seeds = seedSpots();

        if (needsCatalogRefresh(seeds)) {
            studySpotRepository.deleteAll();
            studySpotRepository.saveAll(seeds);
        }
    }

    private boolean needsCatalogRefresh(List<StudySpot> seeds) {
        if (studySpotRepository.count() == 0) {
            return true;
        }

        Set<String> seedIds = seeds.stream()
            .map(StudySpot::getId)
            .collect(java.util.stream.Collectors.toSet());

        for (StudySpot seed : seeds) {
            if (!studySpotRepository.existsById(seed.getId())) {
                return true;
            }
        }

        return studySpotRepository.findAll()
            .stream()
            .anyMatch(existing -> !seedIds.contains(existing.getId()));
    }

    private List<StudySpot> seedSpots() {
        return List.of(
            spot(
                "newman-library",
                "Newman Library",
                "560 Drillfield Drive - Main Library Study Spaces",
                88,
                "moderate",
                "scarce",
                "limited",
                List.of("wifi", "coffee", "printing", "reservable"),
                350,
                37.22876,
                -80.41924,
                List.of(30, 42, 58, 73, 88, 96, 91, 79, 64, 48),
                0.1,
                "https://vt.edu/content/dam/vt_edu/about/buildings/images/library-2013.jpg.transform/l-medium/image.jpg"
            ),
            spot(
                "newman-learning-commons",
                "Newman Learning Commons",
                "Newman Library - Collaborative Study Floors",
                92,
                "loud",
                "scarce",
                "full",
                List.of("wifi", "printing", "whiteboards", "power"),
                220,
                37.22870,
                -80.41918,
                List.of(35, 50, 68, 82, 94, 98, 95, 87, 72, 55),
                0.1,
                "https://lib.vt.edu/content/lib_vt_edu/en/about-us/libraries/newman/_jcr_content/content/adaptiveimage.transform/m-medium/image.JPG"
            ),
            spot(
                "newman-quiet-floors",
                "Newman Quiet Floors",
                "Newman Library - Quiet Individual Study Areas",
                79,
                "silent",
                "available",
                "limited",
                List.of("wifi", "quiet", "power"),
                280,
                37.22882,
                -80.41930,
                List.of(24, 36, 49, 62, 78, 88, 84, 74, 57, 40),
                0.1,
                "https://lib.vt.edu/content/lib_vt_edu/en/about-us/libraries/newman/_jcr_content/content/vtmultitab/vt-items_0/adaptiveimage.img.jpg/1688648865251.jpg"
            ),
            spot(
                "torgersen-bridge",
                "Torgersen Bridge",
                "620 Drillfield Drive - Enclosed Reading Room",
                83,
                "quiet",
                "available",
                "limited",
                List.of("wifi", "power", "quiet"),
                90,
                37.22978,
                -80.41997,
                List.of(18, 31, 46, 64, 82, 91, 86, 76, 62, 44),
                0.2,
                "https://www.vt.edu/content/vt_edu/en/about/locations/buildings/torgersen-hall/_jcr_content/content/adaptiveimage_1455662707750.transform/m-medium/image.jpg"
            ),
            spot(
                "torgersen-atrium",
                "Torgersen Atrium",
                "Torgersen Hall - Electronic Study Court",
                71,
                "moderate",
                "available",
                "limited",
                List.of("wifi", "power", "group"),
                70,
                37.22965,
                -80.42008,
                List.of(15, 28, 42, 57, 70, 82, 77, 69, 52, 36),
                0.2,
                "https://vt.edu/content/dam/vt_edu/about/buildings/images/torgersen-hall.jpg.transform/l-medium/image.jpg"
            ),
            spot(
                "squires-student-center",
                "Squires Student Center",
                "290 College Avenue - Study and Lounge Space",
                86,
                "loud",
                "scarce",
                "full",
                List.of("wifi", "coffee", "food", "group"),
                300,
                37.22962,
                -80.41796,
                List.of(20, 38, 61, 80, 91, 97, 94, 88, 76, 59),
                0.3,
                "https://vt.edu/content/dam/vt_edu/about/buildings/images/squires-2013.jpg.transform/l-medium/image.jpg"
            ),
            spot(
                "goodwin-hall",
                "Goodwin Hall",
                "635 Prices Fork Road - Engineering Commons",
                64,
                "moderate",
                "available",
                "limited",
                List.of("wifi", "power", "group"),
                140,
                37.23237,
                -80.42542,
                List.of(12, 23, 36, 51, 66, 74, 70, 61, 45, 29),
                0.5,
                "https://vt.edu/content/dam/vt_edu/about/buildings/images/signature-engineering-rendering.jpg.transform/l-medium/image.jpg"
            ),
            spot(
                "graduate-life-center",
                "Graduate Life Center",
                "155 Otey Street - Donaldson Brown Study Areas",
                57,
                "quiet",
                "available",
                "available",
                List.of("wifi", "power", "quiet"),
                110,
                37.22720,
                -80.42050,
                List.of(8, 16, 28, 43, 55, 67, 61, 52, 38, 24),
                0.4,
                "https://graduatelifecenter.vt.edu/content/graduatelifecenter_vt_edu/en/about-the-GLC/_jcr_content/content/adaptiveimage.transform/m-medium/image.jpg"
            ),
            spot(
                "art-architecture-library",
                "Art and Architecture Library",
                "100 Cowgill Hall - Quiet Branch Library",
                52,
                "quiet",
                "available",
                "available",
                List.of("wifi", "quiet", "power"),
                75,
                37.23110,
                -80.42160,
                List.of(7, 14, 23, 37, 51, 63, 58, 49, 33, 18),
                0.4,
                "https://lib.vt.edu/content/dam/lib_vt_edu/artarch/images/P1000120.jpg.transform/xl-medium/image.jpg"
            ),
            spot(
                "vet-med-library",
                "Veterinary Medicine Library",
                "Duck Pond Drive - Vet Med Quiet Study",
                43,
                "quiet",
                "available",
                "available",
                List.of("wifi", "quiet", "power"),
                65,
                37.21580,
                -80.42550,
                List.of(5, 11, 19, 31, 44, 57, 50, 39, 26, 14),
                0.9,
                "https://lib.vt.edu/content/lib_vt_edu/en/about-us/libraries/vetmed-library/_jcr_content/content/adaptiveimage.transform/m-medium/image.jpg"
            ),
            spot(
                "classroom-building",
                "Classroom Building",
                "1455 Perry Street - Open Study Areas",
                74,
                "moderate",
                "available",
                "limited",
                List.of("wifi", "power", "group"),
                180,
                37.23050,
                -80.43150,
                List.of(12, 24, 40, 58, 72, 86, 81, 68, 48, 30),
                0.8,
                "https://vt.edu/content/dam/vtx_vt_edu/articles/2016/07/new-classroom-building-outside-July12016.jpg.transform/l-medium/image.jpg"
            ),
            spot(
                "mcbryde-hall",
                "McBryde Hall",
                "225 Stanger Street - Academic Study Nooks",
                68,
                "moderate",
                "available",
                "limited",
                List.of("wifi", "power", "group"),
                120,
                37.23035,
                -80.42385,
                List.of(10, 21, 35, 50, 67, 78, 72, 61, 42, 25),
                0.4,
                "https://vt.edu/content/dam/vt_edu/about/buildings/images/mcbryde-2013.jpg.transform/l-medium/image.jpg"
            )
        );
    }

    private StudySpot spot(
        String id,
        String name,
        String subtitle,
        int occupancyPct,
        String noiseLevel,
        String outletStatus,
        String seatStatus,
        List<String> amenities,
        int totalSeats,
        double lat,
        double lng,
        List<Integer> hourlyBusyness,
        double distance,
        String imageUrl
    ) {
        StudySpot spot = new StudySpot();
        spot.setId(id);
        spot.setName(name);
        spot.setSubtitle(subtitle);
        spot.setOccupancyPct(occupancyPct);
        spot.setNoiseLevel(noiseLevel);
        spot.setOutletStatus(outletStatus);
        spot.setSeatStatus(seatStatus);
        spot.setAmenities(amenities);
        spot.setLastUpdated(Instant.now().minusSeconds((long) (distance * 25 * 60)).toString());
        spot.setTotalSeats(totalSeats);
        spot.setLat(lat);
        spot.setLng(lng);
        spot.setHourlyBusyness(hourlyBusyness);
        spot.setDistance(distance);
        spot.setImageUrl(imageUrl);
        return spot;
    }
}
