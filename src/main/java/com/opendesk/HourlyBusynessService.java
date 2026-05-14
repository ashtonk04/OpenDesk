package com.opendesk;
  import org.springframework.stereotype.Service;

import java.time.LocalTime;
  import java.util.ArrayList;
  import java.util.Collections;

  @Service
  public class HourlyBusynessService {

      public void applyReportToCurrentHour(StudySpotDataTransObj spot, String occupancy) {
          if (spot == null || occupancy == null) {
              return;
          }

          ensureHourlyDataExists(spot);

          int currentHourIndex = getCurrentHourIndex();
          int reportedPercent = convertOccupancyToPercent(occupancy);

          int existingPercent = spot.hourlyBusyness.get(currentHourIndex);

          // Simple smoothing so one report does not completely overwrite the hour.
          int updatedPercent = (existingPercent + reportedPercent) / 2;

          spot.hourlyBusyness.set(currentHourIndex, updatedPercent);
      }

      private void ensureHourlyDataExists(StudySpotDataTransObj spot) {
          if (spot.hourlyBusyness == null || spot.hourlyBusyness.isEmpty()) {
              spot.hourlyBusyness = new ArrayList<>(Collections.nCopies(10, 0));
          }
      }

      private int getCurrentHourIndex() {
          int hour = LocalTime.now().getHour();

          if (hour <= 8) {
              return 0;
          }

          if (hour >= 22) {
              return 9;
          }

          return Math.min(9, (int) Math.floor((hour - 8) / 1.5));
      }

      private int convertOccupancyToPercent(String occupancy) {
          if (occupancy.equalsIgnoreCase("empty")) {
              return 15;
          }

          if (occupancy.equalsIgnoreCase("moderate")) {
              return 50;
          }

          if (occupancy.equalsIgnoreCase("crowded") || occupancy.equalsIgnoreCase("packed")) {
              return 85;
          }

          return 50;
      }
  }
