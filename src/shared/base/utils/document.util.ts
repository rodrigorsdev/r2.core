export default class DocumentUtil {
    static isCpf(cpf: string): boolean {

        if (typeof cpf !== "string")
            return false;

        cpf = cpf.replace(/[\s.-]*/igm, '');

        if (!cpf ||
            cpf.length != 11 ||
            cpf == "00000000000" ||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999")
            return false;

        var soma = 0;
        var resto;

        for (var i = 1; i <= 9; i++)
            soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);

        resto = (soma * 10) % 11

        if ((resto == 10) || (resto == 11))
            resto = 0;

        if (resto != parseInt(cpf.substring(9, 10)))
            return false;

        soma = 0;

        for (var i = 1; i <= 10; i++)
            soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);

        resto = (soma * 10) % 11

        if ((resto == 10) || (resto == 11))
            resto = 0;

        if (resto != parseInt(cpf.substring(10, 11)))
            return false;

        return true;
    }

    static isCnpj(value: string | number | number[] = ''): boolean {

        // Regex para validação de string no formato CNPJ
        const regexCNPJ = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/

        if (!value)
            return false;

        // Aceita receber o valor como string, número ou array com todos os dígitos
        const isString = typeof value === 'string';
        const validTypes = isString || Number.isInteger(value) || Array.isArray(value);

        // Elimina valor de tipo inválido
        if (!validTypes)
            return false;

        // Filtro inicial para entradas do tipo string
        if (isString) {
            // Teste Regex para veificar se é uma string apenas dígitos válida
            const digitsOnly = /^\d{14}$/.test(value);
            // Teste Regex para verificar se é uma string formatada válida
            const validFormat = regexCNPJ.test(value);
            // Verifica se o valor passou em ao menos 1 dos testes
            const isValid = digitsOnly || validFormat;

            // Se o formato não é válido, retorna inválido
            if (!isValid)
                return false;
        }

        // Elimina tudo que não é dígito
        const numbers = DocumentUtil.matchNumbers(value);

        // Valida a quantidade de dígitos
        if (numbers.length !== 14) return false

        // Elimina inválidos com todos os dígitos iguais
        const items = [...new Set(numbers)]
        if (items.length === 1) return false

        // Separa os 2 últimos dígitos verificadores
        const digits = numbers.slice(12)

        // Valida 1o. dígito verificador
        const digit0 = DocumentUtil.validCalc(12, numbers)
        if (digit0 !== digits[0]) return false

        // Valida 2o. dígito verificador
        const digit1 = DocumentUtil.validCalc(13, numbers)
        return digit1 === digits[1]
    }

    static isEmail(email:string):boolean{

        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return regex.test(email);
    }

    static isPhone(phone:string):boolean{

        const regex = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/
        return regex.test(phone);
    }

    static matchNumbers(value: string | number | number[] = '') {
        const match = value.toString().match(/\d/g)
        return Array.isArray(match) ? match.map(Number) : [];
    }

    static validCalc(x: number, numbers: number[]) {
        const slice = numbers.slice(0, x)
        let factor = x - 7
        let sum = 0
      
        for (let i = x; i >= 1; i--) {
          const n = slice[x - i]
          sum += n * factor--
          if (factor < 2) factor = 9
        }
      
        const result = 11 - (sum % 11)
      
        return result > 9 ? 0 : result
      }
}