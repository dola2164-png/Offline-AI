package com.ai.repository;

import com.ai.entity.Truck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TruckRepository extends JpaRepository<Truck, Long> {

    boolean existsByPhoneNumber(String phoneNumber);

}