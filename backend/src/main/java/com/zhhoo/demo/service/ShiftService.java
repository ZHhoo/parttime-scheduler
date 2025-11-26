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

    private User getDefaultUser() {
        // 네가 쓰고 있는 로직 그대로 두면 됨
        return userRepository.findById(1L)
                .orElseThrow(() -> new IllegalStateException("기본 유저가 없습니다."));
    }

    public List<Shift> getShifts(LocalDate startDate, LocalDate endDate) {
        User user = getDefaultUser();
        return shiftRepository.findByUserAndDateBetween(user, startDate, endDate);
    }

    public Shift createShift(ShiftRequest request) {
        User user = getDefaultUser();

        Shift shift = new Shift();
        shift.setUser(user);
        shift.setDate(request.getDate());
        shift.setStartTime(request.getStartTime());
        shift.setEndTime(request.getEndTime());
        shift.setMemo(request.getMemo());
        shift.setJobType(request.getJobType());

        return shiftRepository.save(shift);
    }

    public Shift updateShift(Long id, ShiftRequest request) {
        User user = getDefaultUser();

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

        return shift;
    }

    public void deleteShift(Long id) {
        shiftRepository.deleteById(id);
    }
}
