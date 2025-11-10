

import Joi from 'joi';

describe('Validasi Joi untuk Tipe Data Number', () => {

    it('test', async () => {
        const schema = Joi.number().multiple(3);
        // ini artinya kelipatan 3
        // dan didalam Joi ini dia menggunakan modulo
        // untuk program dibaliknya
        // dan kalo objek, maka tipe default pada si keynya itu adalah any
        // jadi kita masukan apa aja, tapi yg pneting harus ada atribut itu / key itu
        const object = Joi.object({
        a: Joi.number().min(1).max(10).integer(),
        b: 'some string'
    });
    
    await object.validateAsync({ a: 5 });
    })


  it('harus valid jika input adalah angka biasa', async () => {
    // Membuat skema validasi untuk angka
    const schema = Joi.number();

    // Validasi input angka 5
    const result = await schema.validateAsync(5);

    // Ekspektasi hasil: nilai 5 diterima karena merupakan angka valid
    expect(result).toBe(5);
  });

  it('harus error jika input adalah Infinity secara default', async () => {
    const schema = Joi.number();

    // Menguji input Infinity yang secara default tidak diperbolehkan
    await expect(schema.validateAsync(Infinity)).rejects.toThrow('number.infinity');
  });

  it('harus menerima string angka jika convert aktif', async () => {
    const schema = Joi.number();

    // Secara default convert aktif, maka string "10" akan dikonversi menjadi angka 10
    const result = await schema.validateAsync("10");

    // Ekspektasi hasil: dikonversi menjadi angka
    expect(result).toBe(10);
  });

  it('harus gagal jika string bukan angka', async () => {
    const schema = Joi.number();

    // String non-angka tidak bisa dikonversi ke number
    await expect(schema.validateAsync("abc")).rejects.toThrow('number.base');
  });

  it('harus valid jika angka lebih besar dari batas dengan .greater()', async () => {
    const schema = Joi.number().greater(5);

    const result = await schema.validateAsync(6);

    // Ekspektasi: valid karena 6 > 5
    expect(result).toBe(6);
  });

  it('harus gagal jika angka kurang dari batas pada .greater()', async () => {
    const schema = Joi.number().greater(5);

    // Ekspektasi: gagal karena 4 tidak lebih dari 5
    await expect(schema.validateAsync(4)).rejects.toThrow('number.greater');
  });

  it('harus valid untuk integer jika menggunakan .integer()', async () => {
    const schema = Joi.number().integer();

    const result = await schema.validateAsync(10);

    // Ekspektasi: valid karena 10 adalah integer
    expect(result).toBe(10);
  });

  it('harus gagal jika bukan integer pada .integer()', async () => {
    const schema = Joi.number().integer();

    await expect(schema.validateAsync(3.14)).rejects.toThrow('number.integer');
  });

  it('harus valid jika kurang dari limit pada .less()', async () => {
    const schema = Joi.number().less(10);

    const result = await schema.validateAsync(5);

    // Ekspektasi: valid karena 5 < 10
    expect(result).toBe(5);
  });

  it('harus gagal jika lebih dari atau sama dengan batas pada .less()', async () => {
    const schema = Joi.number().less(10);

    await expect(schema.validateAsync(10)).rejects.toThrow('number.less');
  });

  it('harus valid jika angka <= max() dan >= min()', async () => {
    const schema = Joi.number().min(5).max(10);

    const result = await schema.validateAsync(7);

    // Ekspektasi: valid karena dalam rentang 5 - 10
    expect(result).toBe(7);
  });

  it('harus gagal jika angka di luar rentang min() dan max()', async () => {
    const schema = Joi.number().min(5).max(10);

    await expect(schema.validateAsync(4)).rejects.toThrow('number.min');
    await expect(schema.validateAsync(11)).rejects.toThrow('number.max');
  });

  it('harus valid jika angka kelipatan pada .multiple()', async () => {
    const schema = Joi.number().multiple(3);

    const result = await schema.validateAsync(9);

    // Ekspektasi: valid karena 9 adalah kelipatan 3
    expect(result).toBe(9);
  });

  it('harus gagal jika bukan kelipatan pada .multiple()', async () => {
    const schema = Joi.number().multiple(4);

    await expect(schema.validateAsync(10)).rejects.toThrow('number.multiple');
  });

  it('harus valid jika angka negatif pada .negative()', async () => {
    const schema = Joi.number().negative();

    const result = await schema.validateAsync(-7);

    // Ekspektasi: valid karena -7 adalah angka negatif
    expect(result).toBe(-7);
  });

  it('harus gagal jika angka positif pada .negative()', async () => {
    const schema = Joi.number().negative();

    await expect(schema.validateAsync(2)).rejects.toThrow('number.negative');
  });

  it('harus valid jika angka positif pada .positive()', async () => {
    const schema = Joi.number().positive();

    const result = await schema.validateAsync(2);

    // Ekspektasi: valid karena 2 adalah angka positif
    expect(result).toBe(2);
  });

  it('harus gagal jika angka negatif pada .positive()', async () => {
    const schema = Joi.number().positive();

    await expect(schema.validateAsync(-1)).rejects.toThrow('number.positive');
  });

  it('harus valid dengan jumlah digit desimal sesuai precision()', async () => {
    const schema = Joi.number().precision(2);

    const result = await schema.validateAsync(2.345);

    // precision akan membulatkan ke 2 digit desimal: 2.35
    expect(result).toBeCloseTo(2.35);
  });

  it('harus gagal jika melebihi presisi dan convert dimatikan', async () => {
    const schema = Joi.number().precision(1).options({ convert: false });

    // Ekspektasi: gagal karena 1.23 memiliki lebih dari 1 digit setelah titik
    await expect(schema.validateAsync(1.23)).rejects.toThrow('number.precision');
  });

  it('harus valid jika input adalah port antara 0-65535', async () => {
    const schema = Joi.number().port();

    const result = await schema.validateAsync(8080);

    // Ekspektasi: valid karena 8080 termasuk port yang sah
    expect(result).toBe(8080);
  });

  it('harus gagal jika input di luar rentang port', async () => {
    const schema = Joi.number().port();

    await expect(schema.validateAsync(70000)).rejects.toThrow('number.port');
  });

});
// test
// test
// test
// test
// test
// test
// test
// test
// test