package com.zhhoo.demo.dto;

import com.zhhoo.demo.domain.Shift;

public class ShiftResponse {

    private final Long id;
    private final String date;
    private final String startTime;
    private final String endTime;
    private final String memo;
    private final String jobType;

    public ShiftResponse(Long id, String date, String startTime, String endTime, String memo, String jobType) {
        this.id = id;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.memo = memo;
        this.jobType = jobType;
    }

    public Long getId() {
        return id;
    }

    public String getDate() {
        return date;
    }

    public String getStartTime() {
        return startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public String getMemo() {
        return memo;
    }

    public String getJobType() {
        return jobType;
    }

    public static ShiftResponse fromEntity(Shift shift) {
        String dateStr = shift.getDate().toString();

        String startStr = shift.getStartTime().toString();
        if (startStr.length() >= 5) {
            startStr = startStr.substring(0, 5);
        }

        String endStr = shift.getEndTime().toString();
        if (endStr.length() >= 5) {
            endStr = endStr.substring(0, 5);
        }

        return new ShiftResponse(
                shift.getId(),
                dateStr,
                startStr,
                endStr,
                shift.getMemo(),
                shift.getJobType()
        );
    }
}
