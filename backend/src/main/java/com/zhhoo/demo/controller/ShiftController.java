package com.zhhoo.demo.controller;

import com.zhhoo.demo.domain.Shift;
import com.zhhoo.demo.dto.ShiftRequest;
import com.zhhoo.demo.dto.ShiftResponse;
import com.zhhoo.demo.service.ShiftService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin(
        origins = {
                "http://localhost:3000",
                "https://zhhoo.github.io"
        })
@RestController
public class ShiftController {

    private final ShiftService shiftService;

    public ShiftController(ShiftService shiftService) {
        this.shiftService = shiftService;
    }

    @GetMapping("/shifts")
    public List<ShiftResponse> getShifts(
            @RequestParam Long userId,
            @RequestParam String startDate,
            @RequestParam String endDate
    ) {
        LocalDate s = LocalDate.parse(startDate);
        LocalDate e = LocalDate.parse(endDate);

        List<Shift> shifts = shiftService.getShifts(userId, s, e);
        return shifts.stream()
                .map(ShiftResponse::fromEntity)
                .toList();
    }

    @PostMapping("/shifts")
    public ShiftResponse createShift(
            @RequestParam Long userId,
            @RequestBody ShiftRequest request
    ) {
        Shift saved = shiftService.createShift(userId, request);
        return ShiftResponse.fromEntity(saved);
    }

    @PutMapping("/shifts/{id}")
    public ShiftResponse updateShift(
            @RequestParam Long userId,
            @PathVariable Long id,
            @RequestBody ShiftRequest request
    ) {
        Shift updated = shiftService.updateShift(userId, id, request);
        return ShiftResponse.fromEntity(updated);
    }

    @DeleteMapping("/shifts/{id}")
    public void deleteShift(
            @RequestParam Long userId,
            @PathVariable Long id
    ) {
        shiftService.deleteShift(userId, id);
    }
}
