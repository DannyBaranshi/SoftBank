package com.lta.bancocanon.software_bancario.Controller;

public class SaldoResponse {
    private Double saldoDisponible;
    private Double saldoContable;

    public SaldoResponse() {}

    public SaldoResponse(Double saldoDisponible, Double saldoContable) {
        this.saldoDisponible = saldoDisponible;
        this.saldoContable = saldoContable;
    }

    public Double getSaldoDisponible() {
        return saldoDisponible;
    }

    public void setSaldoDisponible(Double saldoDisponible) {
        this.saldoDisponible = saldoDisponible;
    }

    public Double getSaldoContable() {
        return saldoContable;
    }

    public void setSaldoContable(Double saldoContable) {
        this.saldoContable = saldoContable;
    }
}
