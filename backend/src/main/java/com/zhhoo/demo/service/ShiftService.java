package com.zhhoo.demo.service;

import com.zhhoo.demo.domain.Shift;
import com.zhhoo.demo.domain.User;
import com.zhhoo.demo.dto.ShiftRequest;
import com.zhhoo.demo.repository.ShiftRepository;
import com.zhhoo.demo.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class ShiftService {

    private final ShiftRepository shiftRepository;
    private final UserRepository userRepository;

    public ShiftService(ShiftRepository shiftRepository, UserRepository userRepository) {
        this.shiftRepository = shiftRepository;
        this.userRepository = userRepository;
    }

    private User getUserOrThrow(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("해당 사용자가 없습니다. id=" + userId));
    }

    public List<Shift> getShifts(Long userId, LocalDate startDate, LocalDate endDate) {
        User user = getUserOrThrow(userId);
        return shiftRepository.findByUserAndDateBetween(user, startDate, endDate);
    }

    public Shift createShift(Long userId, ShiftRequest request) {
        User user = getUserOrThrow(userId);

        Shift shift = new Shift();
        shift.setUser(user);
        shift.setDate(request.getDate());
        shift.setStartTime(request.getStartTime());
        shift.setEndTime(request.getEndTime());
        shift.setMemo(request.getMemo());
        shift.setJobType(request.getJobType());
        shift.setBreakMinutes(request.getBreakMinutes());
        shift.setHourlyWage(request.getHourlyWage());

        return shiftRepository.save(shift);
    }

    public Shift updateShift(Long userId, Long id, ShiftRequest request) {
        User user = getUserOrThrow(userId);

        Shift shift = shiftRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Shift not found: " + id));

        if (!shift.getUser().getId().equals(user.getId())) {
            throw new IllegalStateException("다른 사용자의 스케줄입니다.");
        }

        shift.setDate(request.getDate());
        shift.setStartTime(request.getStartTime());
        shift.setEndTime(request.getEndTime());
        shift.setMemo(request.getMemo());
        shift.setJobType(request.getJobType());
        shift.setBreakMinutes(request.getBreakMinutes());
        shift.setHourlyWage(request.getHourlyWage());

        return shift;
    }

    public void deleteShift(Long userId, Long id) {
        User user = getUserOrThrow(userId);

        Shift shift = shiftRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Shift not found: " + id));

        if (!shift.getUser().getId().equals(user.getId())) {
            throw new IllegalStateException("다른 사용자의 스케줄입니다.");
        }

        shiftRepository.delete(shift);
    }
}
