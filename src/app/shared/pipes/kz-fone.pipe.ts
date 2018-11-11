import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({
	name: 'kzFone'
})
export class KzFonePipe implements PipeTransform {

	transform(fone: string): string {
 		if (!fone) {
            return '';
        }

        fone = fone.toString();
    
        var foneValor = fone.replace(/\D/g, '');
    
        if (foneValor.length !== 11) {
            return fone;
        }
        
        var foneLista = foneValor.match(/^(\d{2})(\d{5})(\d{4})$/);

        if (foneLista && foneLista.length === 4) {
            fone = '(' + foneLista[1] + ')' + foneLista[2] + '-' + foneLista[3]
        }
        
        return fone;
	}
}
