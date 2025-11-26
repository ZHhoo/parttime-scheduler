package com.zhhoo.demo.controller;

import com.zhhoo.demo.domain.Shift;
import com.zhhoo.demo.dto.ShiftRequest;
import com.zhhoo.demo.dto.ShiftResponse;
import com.zhhoo.demo.service.ShiftService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/shifts")
@CrossOrigin(origins = "http://localhost:3000")
public class ShiftController {

    private final ShiftService shiftService;

    public ShiftController(ShiftService shiftService) {
        this.shiftService = shiftService;
    }

    // GET http://localhost:8080/shifts?startDate=2025-11-01&endDate=2025-11-30
    @GetMapping
    public List<ShiftResponse> getShifts(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate
    ) {
        List<Shift> shifts = shiftService.getShifts(startDate, endDate);
        return shifts.stream()
                .map(ShiftResponse::fromEntity)
                .collect(Collectors.toList());
    }

    // POST http://localhost:8080/shifts
    @PostMapping
    public ShiftResponse createShift(@RequestBody ShiftRequest request) {
        Shift saved = shiftService.createShift(request);
        return ShiftResponse.fromEntity(saved);
    }

    // PUT http://localhost:8080/shifts/{id}
    @PutMapping("/{id}")
    public ShiftResponse updateShift(
            @PathVariable Long id,
            @RequestBody ShiftRequest request
    ) {
        Shift updated = shiftService.updateShift(id, request);
        return ShiftResponse.fromEntity(updated);
    }

    // DELETE http://localhost:8080/shifts/{id}
    @DeleteMapping("/{id}")
    public void deleteShift(@PathVariable Long id) {
        shiftService.deleteShift(id);
    }
}
