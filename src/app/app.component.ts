import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSnackBar,
         MatSnackBarAction,
         MatSnackBarActions,
         MatSnackBarLabel,
         MatSnackBarRef,
         } from '@angular/material/snack-bar';
import  flagsmith  from 'flagsmith'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mtb-announcement';
  loading = true;
  environmentID = 'bszYmQJuVQkXN9X4Mckv7Q';     // Flagsmith Client-side AppId/Environment ID
  durationInSeconds = 60;

  constructor(private _snackBar: MatSnackBar) {

    const { environmentID, handleFlags, handleFlagsError } =this;

    flagsmith.init({
      environmentID,
      onChange: handleFlags,
      onError: handleFlagsError
    });

  }

  handleFlags = () => {

    this.loading = false;

    let announcement = flagsmith.getValue('mtb-announcement') as string;

    if( announcement !== "" ) {
        this._snackBar.open(announcement, "Dismiss", {
          duration: this.durationInSeconds * 1000,
        });
      }
  };

  handleFlagsError = () => {

  };

}
