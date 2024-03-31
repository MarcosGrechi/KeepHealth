import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conversorAltura',
  standalone: true
})
export class HeightPipe implements PipeTransform {

  transform(value: number | undefined): unknown {
    return value? value/100 : 0;
  }

}