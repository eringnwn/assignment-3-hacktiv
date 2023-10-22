# Assignment 3 Hacktiv8 NodeJS MSIB Batch 5
Nama: Erin Gunawan <br>
Kode: INJS-KS06-03

## Cara Install
1. run `npm install` untuk menginstall dependensi
2. copy `.env.example` ke `.env` dan isi file `.env` sesuai database aplikasi
3. run `npm run db:create` untuk inisiasi database
4. run `npm run db:migrate` untuk menjalankan migrasi database
5. run `npm run db:seed` untuk meng-create user dan photos
6. run `npm run dev`untuk menjalankan aplikasi dengan nodemon
7. run `npm run start` untuk menjalankan aplikasi secara default

## Cara Testing
1. run `npm run db:create:test` untuk inisiasi database khusus testing
2. run `npm run db:migrate:test` untuk menjalankan migrasi database testing
3. run `npm run test` untuk menjalankan testcase

## Optinal commands
1. `npm run db:migrate:undo` untuk undo migration yang terakhir kali dilakukan
2. `npm run db:seed:undo` untuk undo seluruh seed database

## Routes
- `POST` - `/users/register`
  Digunakan untuk registrasi pengguna
- `POST` - `/users/login`
  Digunakan untuk login pengguna
- `GET` - `/photos`
  Digunakan untuk mendapatkan semua data Photo. Dapat diakses hanya jika user telah login
-  `POST` - `/photos`
  Digunakan untuk menambahkan sebuah foto. Dapat diakses hanya jika user telah login
- `GET` -  `/photos/:id`
  Digunakan untuk mendapatkan data Photo dengan id `id`. Dapat diakses hanya jika user id dari photo sama dengan user id dari user yang sedang login
- `DELETE` -  `/photos/:id`
  Digunakan untuk mendapatkan data Photo dengan id `id`. Dapat diakses hanya jika user id dari photo sama dengan user id dari user yang sedang login
- `PUT` -  `/photos/:id`
  Digunakan untuk mengupdate data Photo dengan id `id`. Dapat diakses hanya jika user id dari photo sama dengan user id dari user yang sedang login