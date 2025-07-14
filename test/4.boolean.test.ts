// File: booleanValidation.test.ts

import Joi from 'joi';

describe('Validasi Joi untuk Tipe Data Boolean', () => {

    // jadi bisa async buat si validatenya

    // jaid kita bisa menggunakan boolean biasa
    // /atau menggunakan boolean yg sudah di setting

  it('harus valid jika input adalah nilai boolean true', async () => {
    const schema = Joi.boolean();

    const result = await schema.validateAsync(true);

    // Ekspektasi: valid karena true adalah nilai boolean
    expect(result).toBe(true);
  });

  it('harus valid jika input adalah nilai boolean false', async () => {
    const schema = Joi.boolean();

    const result = await schema.validateAsync(false);

    // Ekspektasi: valid karena false adalah nilai boolean
    expect(result).toBe(false);
  });

  it('harus valid jika input adalah string "true" dengan convert aktif', async () => {
    const schema = Joi.boolean();

    const result = await schema.validateAsync("true");

    // Ekspektasi: valid karena "true" akan dikonversi menjadi boolean true
    expect(result).toBe(true);
  });

  it('harus valid jika input adalah string "false" dengan convert aktif', async () => {
    const schema = Joi.boolean();

    const result = await schema.validateAsync("false");

    // Ekspektasi: valid karena "false" akan dikonversi menjadi boolean false
    expect(result).toBe(false);
  });

  it('harus gagal jika input adalah string selain true/false', async () => {
    const schema = Joi.boolean();

    await expect(schema.validateAsync("ya")).rejects.toThrow('\"value\" must be a boolean');
  });

  it('harus valid jika menggunakan .truthy() untuk nilai khusus', async () => {
    // Menambahkan nilai "iya" yang dianggap sebagai true
    const schema = Joi.boolean().truthy("iya");

    const result = await schema.validateAsync("iya");

    // Ekspektasi: valid karena "iya" dipetakan sebagai true
    expect(result).toBe(true);
  });

  it('harus valid jika menggunakan .falsy() untuk nilai khusus', async () => {
    // Menambahkan nilai "tidak" yang dianggap sebagai false
    const schema = Joi.boolean().falsy("tidak");

    const result = await schema.validateAsync("tidak");

    // Ekspektasi: valid karena "tidak" dipetakan sebagai false
    expect(result).toBe(false);
  });


//   /jadi gini untuk yg sensitive atau yg insensitive
// ada bebearapa kesalahan dibawah
// karena secara default itu case insensitive
// nah tapi bisa kita gunakan sebagai sensitive meggunakan .sensitive()
//   



// 
// pembatas aja
// 
// 
// 





  it('harus valid jika .truthy() case-insensitive tanpa insensitive()', async () => {
    // Secara default, Joi boolean bersifat case-sensitive
    const schema = Joi.boolean().truthy("YES");

    // Karena case-sensitive, input "yes" akan dianggap invalid
    await expect(schema.validateAsync("yes")).resolves.toBe(true);
  });

  it('harus valid jika menggunakan .insensitive() untuk case-insensitive match', async () => {
    // Dengan .insensitive(), Joi akan mencocokkan string tanpa mempedulikan huruf besar/kecil
    const schema = Joi.boolean().truthy("YES") // .insensitive();

    const result = await schema.validateAsync("yes");

    // Ekspektasi: valid karena .insensitive() mengabaikan kapitalisasi
    expect(result).toBe(true);
  });

  it('harus gagal jika input bukan boolean dan bukan truthy/falsy yang didefinisikan', async () => {
    const schema = Joi.boolean().truthy("y").falsy("n");

    // "maybe" tidak termasuk dalam daftar truthy atau falsy
    await expect(schema.validateAsync("maybe")).rejects.toThrow('\"value\" must be a boolean');
  });

  it('harus valid untuk kombinasi .truthy(), .falsy(), dan .insensitive()', async () => {
    const schema = Joi.boolean()
      .truthy("yes", "iya", "ok")
      .falsy("no", "tidak", "ga")
    //   .insensitive();

    const result1 = await schema.validateAsync("OK");
    const result2 = await schema.validateAsync("TIDAK");

    // Ekspektasi: "OK" jadi true, "TIDAK" jadi false
    expect(result1).toBe(true);
    expect(result2).toBe(false);
  });

});
