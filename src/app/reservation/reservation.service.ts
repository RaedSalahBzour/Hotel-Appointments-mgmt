import { Injectable, OnInit } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservations: Reservation[] = [];
  private Url = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) {}
  getReservations(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(this.Url + '/reservations');
  }
  getReservation(id: string): Observable<Reservation> | undefined {
    return this.httpClient.get<Reservation>(this.Url + '/reservation/' + id);
  }
  addReservation(reservation: Reservation): Observable<Reservation> {
    return this.httpClient.post<Reservation>(
      this.Url + '/reservation',
      reservation
    );
  }
  deleteReservation(id: string): Observable<void> {
    return this.httpClient.delete<void>(this.Url + '/reservation/' + id);
  }
  updateReservation(
    id: string,
    updatedReservation: Reservation
  ): Observable<Reservation> {
    return this.httpClient.put<Reservation>(
      this.Url + '/reservation/' + id,
      updatedReservation
    );
  }
}
