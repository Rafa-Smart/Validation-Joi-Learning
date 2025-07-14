// File: dateValidation.test.ts

import Joi from 'joi';

describe('Validasi Joi untuk Tipe Data Date', () => {

  it('harus valid jika input adalah objek Date', async () => {
    const schema = Joi.date();

    const result = await schema.validateAsync(new Date('2023-01-01'));

    // Ekspektasi: valid karena input adalah instance dari Date
    expect(result).toEqual(new Date('2023-01-01'));
  });

  it('harus valid jika input adalah string tanggal ISO', async () => {
    const schema = Joi.date();

    const result = await schema.validateAsync('2023-05-20');

    // Ekspektasi: valid karena "2023-05-20" adalah format tanggal ISO yang valid
    expect(result).toEqual(new Date('2023-05-20'));
  });

  it('harus gagal jika input adalah string bukan tanggal', async () => {
    const schema = Joi.date();

    await expect(schema.validateAsync('bukan tanggal')).rejects.toThrow('date.base');
  });

  it('harus gagal jika input adalah angka tanpa convert', async () => {
    const schema = Joi.date().options({ convert: false });

    // Tanpa convert, angka tidak bisa diubah ke Date
    await expect(schema.validateAsync(1690000000000)).rejects.toThrow('date.base');
  });

  it('harus valid jika input timestamp number saat convert aktif (default)', async () => {
    const schema = Joi.date();

    // Timestamp dalam milidetik: 1 Januari 2023
    const timestamp = new Date('2023-01-01').getTime();

    const result = await schema.validateAsync(timestamp);

    // Ekspektasi: valid dan dikonversi menjadi objek Date
    expect(result).toEqual(new Date('2023-01-01'));
  });

  it('harus valid jika menggunakan .greater() untuk tanggal sesudah', async () => {
    const schema = Joi.date().greater('2022-12-31');

    const result = await schema.validateAsync('2023-01-01');

    // Ekspektasi: valid karena 2023-01-01 lebih besar dari 2022-12-31
    expect(result).toEqual(new Date('2023-01-01'));
  });

  it('harus gagal jika tanggal sama atau lebih kecil dari batas pada .greater()', async () => {
    const schema = Joi.date().greater('2022-12-31');

    await expect(schema.validateAsync('2022-12-30')).rejects.toThrow('date.greater');
    await expect(schema.validateAsync('2022-12-31')).rejects.toThrow('date.greater');
  });

  it('harus valid jika menggunakan .less() untuk tanggal sebelum', async () => {
    const schema = Joi.date().less('2023-12-31');

    const result = await schema.validateAsync('2023-01-01');

    // Ekspektasi: valid karena tanggal lebih kecil dari 2023-12-31
    expect(result).toEqual(new Date('2023-01-01'));
  });

  it('harus gagal jika tanggal sama atau lebih besar dari batas pada .less()', async () => {
    const schema = Joi.date().less('2023-01-01');

    await expect(schema.validateAsync('2023-01-01')).rejects.toThrow('date.less');
    await expect(schema.validateAsync('2023-02-01')).rejects.toThrow('date.less');
  });

  it('harus valid jika menggunakan .min() untuk tanggal minimal', async () => {
    const schema = Joi.date().min('2022-01-01');

    const result = await schema.validateAsync('2022-01-01');

    // Ekspektasi: valid karena 2022-01-01 adalah batas minimum
    expect(result).toEqual(new Date('2022-01-01'));
  });

  it('harus valid jika menggunakan .max() untuk tanggal maksimal', async () => {
    const schema = Joi.date().max('2025-01-01');

    const result = await schema.validateAsync('2024-12-31');

    // Ekspektasi: valid karena masih di bawah batas maksimal
    expect(result).toEqual(new Date('2024-12-31'));
  });

  it('harus gagal jika lebih kecil dari min()', async () => {
    const schema = Joi.date().min('2022-01-01');

    await expect(schema.validateAsync('2021-12-31')).rejects.toThrow('date.min');
  });

  it('harus gagal jika lebih besar dari max()', async () => {
    const schema = Joi.date().max('2025-01-01');

    await expect(schema.validateAsync('2026-01-01')).rejects.toThrow('date.max');
  });

  it('harus valid jika menggunakan .iso() untuk format ISO string', async () => {
    const schema = Joi.date().iso();

    const result = await schema.validateAsync('2023-06-01T12:30:00Z');

    // Ekspektasi: valid karena ini adalah format ISO 8601
    expect(result).toEqual(new Date('2023-06-01T12:30:00Z'));
  });

  it('harus gagal jika menggunakan .iso() tapi format tidak valid', async () => {
    const schema = Joi.date().iso();

    await expect(schema.validateAsync('01-06-2023')).rejects.toThrow('date.format');
  });

  it('harus valid jika menggunakan .timestamp() dengan unix', async () => {
    const schema = Joi.date().timestamp('unix');

    const result = await schema.validateAsync(1685587200);

    // Ekspektasi: valid karena 1685587200 adalah timestamp unix (dalam detik)
    expect(result).toEqual(new Date(1685587200 * 1000));
  });

  it('harus valid jika menggunakan .timestamp() dengan javascript', async () => {
    const schema = Joi.date().timestamp('javascript');

    const result = await schema.validateAsync(1685587200000);

    // Ekspektasi: valid karena 1685587200000 adalah timestamp javascript (dalam milidetik)
    expect(result).toEqual(new Date(1685587200000));
  });

});
