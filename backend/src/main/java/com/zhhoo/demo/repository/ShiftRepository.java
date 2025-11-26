package com.zhhoo.demo.repository;

import com.zhhoo.demo.domain.Shift;
import com.zhhoo.demo.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ShiftRepository extends JpaRepository<Shift, Long> {

    List<Shift> findByUserAndDateBetweenOrderByDateAscStartTimeAsc(
            User user,
            LocalDate startDate,
            LocalDate endDate
    );
}
