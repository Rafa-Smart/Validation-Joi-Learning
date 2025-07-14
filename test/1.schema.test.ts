import Joi from 'joi'
describe('membuat schema', () => {
    it('buat schema 1...', () => {

        const schema = Joi.string().min(4).max(100).required();
        // artinya schema ini menuntut untuk memasukan string, min 4 karakter, max 100 karakter,
        // dan wajib diisi

        const nama = "raf";

        // const {error} = schema.validate(nama); // bisa juga gini
        const result = schema.validate(nama);
        if(result.error){
            console.log(result.error.details[0].message);
        }

    })

    it('testing schema 2...', () => {
        type Test = string | number | object;

        const test:Test = ["key", 5, {
            a:true,
            b:[/^a/, 'boom']
        }]

        // nah ini bisa kita generate si validasinya
        const schema = Joi.compile(test)
        console.log(schema)
        // ga bisa deng, ini malah banyak bangt objek
    })
})