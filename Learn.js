const nama = "Muhammad Daffa";
let umur = 20;
umur = 21;
console.log(nama, umur);

const hello =  () => "Hello, World!";
console.log(hello());

const person = {
    name: "Muhammad Daffa",
    year: 20,
    alamat: "Bandar Lampung"
};

const { name, year, alamat } = person;
console.log(name);
console.log(year);
console.log(alamat);

const ambilData = () => {
 return new Promise(resolve => {
    setTimeout(() => resolve("Data Diterima"), 2000)
 });   
};

const prosesData = async () => {
    console.log("Processing Data...");
    const hasil = await ambilData();
    console.log(hasil);
}

processData();