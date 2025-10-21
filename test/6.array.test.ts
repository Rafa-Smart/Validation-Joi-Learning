

import Joi from 'joi';
// https://chatgpt.com/c/68760256-3f3c-8009-9fdb-c54a2068fab6
// Validasi array dengan hanya item 'a' atau 'b'
it('memvalidasi array yang hanya boleh berisi string "a" atau "b"', async () => {
  // Skema array yang hanya memperbolehkan string 'a' atau 'b'
  const schema = Joi.array().items(Joi.string().valid('a', 'b'));

  const result = await schema.validateAsync(['a', 'b', 'a']);

  // Hasilnya harus sama persis dengan input karena valid
  expect(result).toEqual(['a', 'b', 'a']);
});


// Validasi array dengan setidaknya satu objek yang sesuai dengan kondisi tertentu
it('memvalidasi array yang harus memiliki setidaknya satu objek dengan properti a dan b', async () => {
  const schema = Joi.array().items(
    Joi.object({ a: Joi.string(), b: Joi.number() })
  ).has(
    Joi.object({ a: Joi.string().valid('a'), b: Joi.number() })
  );

  const value = [
    { a: 'x', b: 10 },
    { a: 'a', b: 20 }, // Ini valid dan akan memenuhi .has()
  ];

  const result = await schema.validateAsync(value);

  expect(result).toEqual(value);
});


// Validasi array yang harus berisi dua string
it('memvalidasi array yang wajib memiliki minimal dua string', async () => {
  const schema = Joi.array().items(
    Joi.string().required(),
    Joi.string().required()
  );

  const value = ['hello', 'world'];

  const result = await schema.validateAsync(value);

  expect(result).toEqual(value);
});


// Validasi array yang tidak boleh mengandung string tertentu
it('memvalidasi array yang tidak boleh mengandung string "not allowed"', async () => {
  const schema = Joi.array().items(
    Joi.string().valid('not allowed').forbidden(), // dilarang muncul
    Joi.string()
  );

  const value = ['hello', 'test'];

  const result = await schema.validateAsync(value);

  expect(result).toEqual(value);
});


// Validasi array dengan panjang tetap
it('memvalidasi array dengan jumlah elemen tepat 3', async () => {
  const schema = Joi.array().length(3);

  const value = [1, 2, 3];

  const result = await schema.validateAsync(value);

  expect(result).toEqual(value);
});


// Validasi array dengan jumlah maksimal elemen
it('memvalidasi array dengan maksimal 2 elemen', async () => {
  const schema = Joi.array().max(2);

  const value = [10, 20];

  const result = await schema.validateAsync(value);

  expect(result).toEqual(value);
});


// Validasi array dengan minimal elemen
it('memvalidasi array dengan minimal 2 elemen', async () => {
  const schema = Joi.array().min(2);

  const value = [5, 6];

  const result = await schema.validateAsync(value);

  expect(result).toEqual(value);
});


// Validasi array dengan urutan tipe tertentu
it('memvalidasi array yang memiliki urutan: string, number', async () => {
  const schema = Joi.array().ordered(
    Joi.string().required(),  // elemen pertama wajib string
    Joi.number().required()   // elemen kedua wajib number
  );

  const value = ['nama', 123];

  const result = await schema.validateAsync(value);

  expect(result).toEqual(value);
});


// Validasi single value sebagai array
it('memvalidasi input tunggal sebagai array (single mode)', async () => {
  const schema = Joi.array().items(Joi.number()).single();

  // Walaupun input bukan array, karena single() maka dianggap array
  const result = await schema.validateAsync(7);

  expect(result).toEqual([7]);
});


// Validasi array harus terurut ascending
it('memvalidasi array yang harus dalam urutan menaik (ascending)', async () => {
  const schema = Joi.array().items(Joi.number()).sort();

  const result = await schema.validateAsync([3, 1, 2]);

  // Akan otomatis mengurutkan karena preferensi `convert` default = true
  expect(result).toEqual([1, 2, 3]);
});


// Validasi array sparse (mengizinkan undefined)
it('memvalidasi array sparse (boleh mengandung undefined)', async () => {
  const schema = Joi.array().sparse();

  const result = await schema.validateAsync([1, undefined, 3]);

  expect(result).toEqual([1, undefined, 3]);
});


// Validasi array unik (tidak ada duplikat)
it('memvalidasi array yang tidak boleh mengandung nilai duplikat', async () => {
  const schema = Joi.array().unique();

  const result = await schema.validateAsync([1, 2, 3]);

  expect(result).toEqual([1, 2, 3]);
});


// Validasi array objek harus unik berdasarkan properti tertentu
it('memvalidasi array objek yang harus unik berdasarkan properti "id"', async () => {
  const schema = Joi.array().unique('id');

  const value = [
    { id: 1, name: 'a' },
    { id: 2, name: 'b' },
  ];

  const result = await schema.validateAsync(value);

  expect(result).toEqual(value);
});


// Validasi array objek yang duplikat berdasarkan path tertentu diabaikan jika tidak ada
it('memvalidasi array objek yang boleh undefined jika "ignoreUndefined" aktif', async () => {
  const schema = Joi.array().unique('kode', { ignoreUndefined: true });

  const value = [
    {},
    {},
  ];

  const result = await schema.validateAsync(value);

  expect(result).toEqual(value);
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
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test