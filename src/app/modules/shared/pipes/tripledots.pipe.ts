import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tripledots'
})
export class TripledotsPipe implements PipeTransform {

  transform(text: string): string {
    if (text.length > 25) {
      text = text.substr(0, 25);
      text += '...';
    }
    return text;
  }

}
