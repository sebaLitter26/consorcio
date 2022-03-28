import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
    selector: 'app-expired-session-dialog',
    templateUrl: './expired-session-dialog.component.html',
    styleUrls: ['./expired-session-dialog.component.scss']
})
export class ExpiredSessionDialogComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<ExpiredSessionDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private router: Router,
    ) { }

    ngOnInit(): void { }

    goToSignIn(): void {
        this.dialogRef.close();
        this.router.navigate(['sign/in']);
    }
}
