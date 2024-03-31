import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ageconversor',
  standalone: true,
})
export class AgePipe implements PipeTransform {
  transform(dataNascimento: string): number {
    // Converte data de string para Date
    const data = new Date(dataNascimento);

    // Calcula a diferença entre a data atual e a data de nascimento
    const diferencaAnos = Math.floor((Date.now() - data.getTime()) / (1000 * 3600 * 24 * 365.25));

    // Retorna a idade
    return diferencaAnos;
  }
}