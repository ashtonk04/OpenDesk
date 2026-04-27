package com.opendesk;
public class UserPreferences {

    private boolean wantsQuiet;
    private boolean needsOutlets;
    private String preferredCrowdLevel;
    private int minCapacity;

    public UserPreferences() {}

    public UserPreferences(boolean wantsQuiet, boolean needsOutlets, String preferredCrowdLevel, int minCapacity) {
        this.wantsQuiet = wantsQuiet;
        this.needsOutlets = needsOutlets;
        this.preferredCrowdLevel = preferredCrowdLevel;
        this.minCapacity = minCapacity;
    }

    public boolean isWantsQuiet() { return wantsQuiet; }
    public void setWantsQuiet(boolean wantsQuiet) { this.wantsQuiet = wantsQuiet; }

    public boolean isNeedsOutlets() { return needsOutlets; }
    public void setNeedsOutlets(boolean needsOutlets) { this.needsOutlets = needsOutlets; }

    public String getPreferredCrowdLevel() { return preferredCrowdLevel; }
    public void setPreferredCrowdLevel(String preferredCrowdLevel) { this.preferredCrowdLevel = preferredCrowdLevel; }

    public int getMinCapacity() { return minCapacity; }
    public void setMinCapacity(int minCapacity) { this.minCapacity = minCapacity; }
}
