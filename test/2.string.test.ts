import Joi from "joi";

// Kumpulan pengujian validasi string menggunakan Joi
// Setiap pengujian dibungkus dalam 'it()' function milik Jest
// Komentar di dalam setiap 'it()' menjelaskan setiap bagian kode dan tujuannya secara rinci

// nah kalo mau lebih rinci lagi, bisa lihat di 
// https://joi.dev/api/?v=17.13.3#string

describe("Joi String Validations", () => {
  it("memvalidasi string alfanumerik (a-z, A-Z, 0-9)", () => {
    // Membuat skema yang hanya memperbolehkan huruf dan angka
    const schema = Joi.string().alphanum();

    // Kasus valid karena hanya terdiri dari huruf dan angka
    const result1 = schema.validate("abc123");

    // Kasus tidak valid karena mengandung karakter minus '-'
    const result2 = schema.validate("abc-123");
  });

  it("memvalidasi string base64 dengan dan tanpa padding", () => {
    // Skema default: padding harus ada (=)
    const schema = Joi.string().base64();

    // Valid karena memiliki padding
    const result1 = schema.validate("VE9PTUFOWVNFQ1JFVFM=");

    // Tidak valid karena tidak ada padding
    const result2 = schema.validate("VE9PTUFOWVNFQ1JFVFM");

    // Skema yang memperbolehkan tanpa padding
    // padding itu =
    const schemaNoPad = Joi.string().base64({ paddingRequired: false });

    // Valid meskipun tidak ada tanda = di akhir
    const result3 = schemaNoPad.validate("VE9PTUFOWVNFQ1JFVFM");
  });

  it("memvalidasi string lowercase (huruf kecil semua)", () => {
    // Skema memaksa string huruf kecil semua
    const schema = Joi.string().case("lower");
    const result = schema.validate("lowercase");
  });

  it("memvalidasi nomor kartu kredit (menggunakan algoritma Luhn)", () => {
    // Skema validasi untuk nomor kartu kredit
    const schema = Joi.string().creditCard();
    const result = schema.validate("4111111111111111");
  });

  it("memvalidasi format data URI", () => {
    // Format data:image/png;base64,...
    const schema = Joi.string().dataUri();
    const result = schema.validate(
      "data:image/png;base64,VE9PTUFOWVNFQ1JFVFM="
    );
  });

  it("memvalidasi domain (contoh: example.com)", () => {
    const schema = Joi.string().domain();
    const result = schema.validate("example.com");
  });

  it("memvalidasi email", () => {
    // Skema untuk memastikan string merupakan email valid
    const schema = Joi.string().email();
    const result = schema.validate("user@example.com");
  });

  it("memvalidasi UUID v4 (format unik ID)", () => {
    const schema = Joi.string().guid({ version: ["uuidv4"] });
    const result = schema.validate("550e8400-e29b-41d4-a716-446655440000");
  });

  it("memvalidasi string hexadesimal", () => {
    // Mengizinkan hex dengan atau tanpa prefix '0x'
    const schema = Joi.string().hex({ prefix: "optional" });
    const result = schema.validate("0a1b2c");
  });

  it("memvalidasi hostname (sesuai RFC1123)", () => {
    const schema = Joi.string().hostname();
    const result = schema.validate("localhost");
  });

  it("memvalidasi alamat IP (IPv4 dan CIDR optional)", () => {
    const schema = Joi.string().ip({ version: ["ipv4"], cidr: "optional" });
    const result = schema.validate("192.168.0.1");
  });

  it("memvalidasi format tanggal ISO (ISO 8601)", () => {
    const schema = Joi.string().isoDate();
    const result = schema.validate("2023-07-14T12:30:00Z");
  });

  it("memvalidasi durasi ISO (ISO 8601)", () => {
    const schema = Joi.string().isoDuration();
    const result = schema.validate("P3Y6M4DT12H30M5S");
  });

  it("memvalidasi panjang string tetap (harus persis)", () => {
    const schema = Joi.string().length(5);
    const result = schema.validate("abcde");
  });

  it("memvalidasi panjang minimum dan maksimum", () => {
    const schema = Joi.string().min(3).max(6);
    const result = schema.validate("hello");
  });

  it("menormalisasi string ke Unicode form NFC", () => {
    const schema = Joi.string().normalize();
    const result = schema.validate("\u006E\u0303");
  });

  it("memvalidasi string berdasarkan pola regex", () => {
    const schema = Joi.string().pattern(/^[a-z]+$/);
    const result = schema.validate("joi");
  });

  it("mengganti karakter berdasarkan regex", async () => {
    const schema = Joi.string().replace(/a/gi, "x");
    const result = await schema.validateAsync("aAb");
  });

  it("memvalidasi token (a-z, A-Z, 0-9, dan underscore)", () => {
    const schema = Joi.string().token();
    const result = schema.validate("valid_token123");
  });

  it("menghapus spasi di awal dan akhir (trim)", () => {
    const schema = Joi.string().trim();
    const result = schema.validate("  text  ");
  });

  it("memotong string jika melebihi maksimum (truncate)", () => {
    const schema = Joi.string().max(5).truncate();
    const result = schema.validate("toolong");
  });

  it("memvalidasi string huruf besar semua (uppercase)", () => {
    const schema = Joi.string().uppercase();
    const result = schema.validate("ALLCAPS");
  });

  it("memvalidasi URI (http/https)", () => {
    const schema = Joi.string().uri({
      scheme: ["http", "https"],
    });
    const result = schema.validate("https://example.com");
  });
});
