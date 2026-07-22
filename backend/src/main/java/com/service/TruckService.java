package com.service;

import com.ai.entity.BookingRequest;
import com.ai.entity.Truck;
import com.ai.repository.BookingRequestRepository;
import com.ai.repository.TruckRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TruckService {

    @Autowired
    private TruckRepository truckRepository;

    @Autowired
    private BookingRequestRepository bookingRequestRepository;

    private static final double OFFLINE_AI_RATE_PER_KM = 10.0;

    public String getBookingResponse(String source, String destination, String date) {
        List<Truck> trucks = truckRepository.findAll();

        BookingRequest request = new BookingRequest(source, destination, date, trucks.size());
        bookingRequestRepository.save(request);

        String guaranteedOption = "Offline-AI Truck is available at ₹" +
        (int) OFFLINE_AI_RATE_PER_KM + "/km for your route from " + source + " to " + destination +
        " on " + date + ". Want to book it?";

        if (trucks.isEmpty()) {
            return guaranteedOption + " No other trucks are registered on the platform yet, " +
                   "but we've saved your request and will notify you if a better price becomes available.";
        }

        return guaranteedOption + " We've also sent your request to " + trucks.size() +
               " other registered truck owner(s) — please wait up to 4 hours in case someone offers a better price.";
    }

    public String confirmBooking(String source, String destination, String date) {
        List<BookingRequest> matches = bookingRequestRepository.findAll();
        // find the most recent matching pending request for this route
        BookingRequest match = matches.stream()
                .filter(r -> r.getSource().equalsIgnoreCase(source)
                          && r.getDestination().equalsIgnoreCase(destination)
                          && "PENDING".equals(r.getStatus()))
                .reduce((first, second) -> second) // take the latest
                .orElse(null);

        if (match != null) {
            match.setStatus("CONFIRMED");
            bookingRequestRepository.save(match);
        } else {
            BookingRequest newRequest = new BookingRequest(source, destination, date, 0);
            newRequest.setStatus("CONFIRMED");
            bookingRequestRepository.save(newRequest);
        }

        return "✅ Booking confirmed! Your Offline-AI Truck for the route " + source + " to " + destination +
               " on " + date + " is booked at ₹" + (int) OFFLINE_AI_RATE_PER_KM + "/km. " +
               "The driver will contact you shortly.";
    }
}
