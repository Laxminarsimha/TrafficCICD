import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CommonCommercialUtills {
    get commonError(): string {
        return 'Some thing went wrong.'
    }
}