package com.controller;

import com.ai.entity.Truck;
import com.ai.repository.TruckRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trucks")
@CrossOrigin(origins = "*")
public class TruckRegistrationController {

    @Autowired
    private TruckRepository truckRepository;


    @PostMapping
    public Truck registerTruck(@RequestBody Truck truck) {
        return truckRepository.save(truck);
    }

    @GetMapping
    public List<Truck> getAllTrucks() {
        return truckRepository.findAll();
    }
}