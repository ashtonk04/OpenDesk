package com.opendesk;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {
    private final StudySpotRepository studySpotRepository;

    public DataSeeder(StudySpotRepository studySpotRepository) {
        this.studySpotRepository = studySpotRepository;
    }

    @Override
    public void run(String... args) {
        if (studySpotRepository.count() > 0) {
            return;
        }

        studySpotRepository.saveAll(List.of(
            spot(
                "newman-library",
                "Newman Library",
                "Drillfield - 4th Floor Group Study Rooms",
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
                image("photo-1521587760476-6c12a4b040da")
            ),
            spot(
                "newman-learning-commons",
                "Newman Learning Commons",
                "Newman Library - 2nd and 4th Floor Collaboration Areas",
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
                image("photo-1497366754035-f200968a6e72")
            ),
            spot(
                "newman-quiet-floors",
                "Newman Quiet Floors",
                "Newman Library - 3rd and 5th Floor Quiet Study",
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
                image("photo-1507842217343-583bb7270b66")
            ),
            spot(
                "torgersen-bridge",
                "Torgersen Bridge",
                "Torgersen Hall - Enclosed Reading Room",
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
                image("photo-1487958449943-2429e8be8625")
            ),
            spot(
                "torgersen-atrium",
                "Torgersen Atrium",
                "Torgersen Hall - 1st Floor Electronic Study Court",
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
                image("photo-1518005020951-eccb494ad742")
            ),
            spot(
                "squires-student-center",
                "Squires Student Center",
                "College Ave - 2nd Floor Study and Lounge Space",
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
                image("photo-1556761175-b413da4baf72")
            ),
            spot(
                "goodwin-hall",
                "Goodwin Hall",
                "Engineering Quad - Commons and Open Seating",
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
                image("photo-1497366811353-6870744d04b2")
            ),
            spot(
                "graduate-life-center",
                "Graduate Life Center",
                "Donaldson Brown - Graduate Study Areas",
                57,
                "quiet",
                "available",
                "available",
                List.of("wifi", "power", "quiet"),
                110,
                37.22370,
                -80.42130,
                List.of(8, 16, 28, 43, 55, 67, 61, 52, 38, 24),
                0.7,
                image("photo-1519389950473-47ba0277781c")
            ),
            spot(
                "art-architecture-library",
                "Art and Architecture Library",
                "Cowgill Hall - Quiet Branch Library",
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
                image("photo-1519741497674-611481863552")
            ),
            spot(
                "academic-building-one-library",
                "Academic Building One Library",
                "North End - Health Sciences Study Space",
                43,
                "quiet",
                "available",
                "available",
                List.of("wifi", "quiet", "power"),
                65,
                37.23510,
                -80.43170,
                List.of(5, 11, 19, 31, 44, 57, 50, 39, 26, 14),
                0.9,
                image("photo-1517245386807-bb43f82c33c4")
            ),
            spot(
                "ati-waoki-center",
                "Ati: Wa:oki Indigenous Community Center",
                "Squires 122 - Community Study Space",
                36,
                "quiet",
                "available",
                "available",
                List.of("wifi", "community", "library"),
                50,
                37.22958,
                -80.41792,
                List.of(4, 9, 14, 22, 34, 45, 41, 31, 20, 11),
                0.3,
                image("photo-1524758631624-e2822e304c36")
            ),
            spot(
                "el-centro",
                "El Centro",
                "Squires 309 - Cultural Center and Community Space",
                41,
                "moderate",
                "available",
                "available",
                List.of("wifi", "community", "library"),
                30,
                37.22966,
                -80.41788,
                List.of(5, 10, 17, 26, 40, 53, 47, 36, 24, 13),
                0.3,
                image("photo-1557804506-669a67965ba0")
            )
        ));
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

    private String image(String photoId) {
        return "https://images.unsplash.com/" + photoId + "?auto=format&fit=crop&w=1200&q=80";
    }
}
