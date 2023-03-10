import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {
  getID: any;
  updateForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService,
    private activatedRoute: ActivatedRoute
  ) {
    this.getID = this.activatedRoute.snapshot.paramMap.get('id');
    this.crudService.GetBook(this.getID).subscribe((res) => {
      this.updateForm.setValue({
        name: res['name'],
        price: res['price'],
        description: res['description'],
      });
    });
    this.updateForm = this.formBuilder.group({
      name: [''],
      price: [''],
      description: [''],
    });
  }

  ngOnInit(): void {}

  onUpdate(): any {
    this.crudService.UpdateBook(this.getID, this.updateForm.value).subscribe(
      (res) => {
        console.log('Book successfully updated!');
        this.ngZone.run(() => this.router.navigateByUrl('/books-list'));
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
