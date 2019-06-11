
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})

export class CommonSystemSettings {
    get commonError(): string {
        return 'Some thing went wrong.'
    }
}
