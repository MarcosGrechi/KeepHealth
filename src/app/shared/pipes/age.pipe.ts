import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ageconversor',
  standalone: true,
})
export class AgePipe implements PipeTransform {
  transform(dataNascimento: string): number {
    const data = new Date(dataNascimento);

    const diferencaAnos = Math.floor((Date.now() - data.getTime()) / (1000 * 3600 * 24 * 365.25));

    return diferencaAnos;
  }
}