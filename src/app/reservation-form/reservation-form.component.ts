import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css'],
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  public id: string | null = null;
  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      guestName: ['', Validators.required],
      guestEmail: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ],
      ],
      roomNumber: ['', Validators.required],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
    });
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      let reservation = this.reservationService
        .getReservation(this.id)
        ?.subscribe((reservation) => {
          if (reservation) this.reservationForm.patchValue(reservation);
        });
    }
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      let reservation: Reservation = this.reservationForm.value;
      if (this.id)
        this.reservationService
          .updateReservation(this.id, reservation)
          .subscribe((reservation) => {
            console.log(reservation);
          });
      else
        this.reservationService
          .addReservation(reservation)
          .subscribe((reservation) => {
            console.log(reservation);
          });

      this.router.navigate(['/list']);
    }
  }
}
