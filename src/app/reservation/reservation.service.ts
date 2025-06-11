import { Injectable, OnInit } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservations: Reservation[] = [];
  constructor() {
    let storedReservations = localStorage.getItem('reservations');
    this.reservations = storedReservations
      ? JSON.parse(storedReservations)
      : [];
  }
  getReservations(): Reservation[] {
    return this.reservations;
  }
  getReservation(id: string): Reservation | undefined {
    return this.reservations.find((res) => res.id === id);
  }
  addReservation(reservation: Reservation): void {
    reservation.id = Date.now().toString();
    this.reservations.push(reservation);
    this.seedLocalStorage(this.reservations);
  }
  deleteReservation(id: string): void {
    let index = this.reservations.findIndex((res) => res.id === id);
    if (index !== -1) this.reservations.splice(index, 1);
    this.seedLocalStorage(this.reservations);
  }
  updateReservation(
    id: string,
    updatedReservation: Partial<Reservation>
  ): void {
    let index = this.reservations.findIndex((res) => res.id === id);
    if (index !== -1) {
      this.reservations[index] = {
        ...this.reservations[index],
        ...updatedReservation,
      };
    }
    this.seedLocalStorage(this.reservations);
  }
  seedLocalStorage(reservations: Reservation[]) {
    localStorage.setItem('reservations', JSON.stringify(reservations));
  }
}
