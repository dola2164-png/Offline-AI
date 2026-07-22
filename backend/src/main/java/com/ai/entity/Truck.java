package com.ai.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "trucks")
public class Truck {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "truck_model", nullable = false)
    private String truckModel;

    @Column(name = "city_pin", nullable = false)
    private String cityPin;

    @Column(name = "owner_name", nullable = false)
    private String ownerName;

    @Column(name = "phone_number", nullable = false, unique = true)
    private String phoneNumber;

    @Column(unique = true)
    private String email;

    @Column(name = "mileage_kmpl")
    private Double mileageKmpl;

    public Truck() {
    }

    public Long getId() {
        return id;
    }

    public String getTruckModel() {
        return truckModel;
    }

    public void setTruckModel(String truckModel) {
        this.truckModel = truckModel;
    }

    public String getCityPin() {
        return cityPin;
    }

    public void setCityPin(String cityPin) {
        this.cityPin = cityPin;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Double getMileageKmpl() {
        return mileageKmpl;
    }

    public void setMileageKmpl(Double mileageKmpl) {
        this.mileageKmpl = mileageKmpl;
    }
}