// console.log("hello world");
// const validator =  require('validator');
// console.log(validator.isEmail("gilby5150@gmail.com"));
// console.log(validator.isMobilePhone("085775245846","id-ID"));
// //////////////////////////////////////////////////////////////

//Handling Error
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout
});

const path = "./data"
const filePath = './data/Contact.json';

if(!fs.existsSync(path)){
    fs.mkdirSync(path)
}

if(!fs.existsSync(filePath)){
    fs.writeFileSync(filePath,'[]','utf-8');
}

//function pertanyaan
const isQuestion = (question) => {
    return new Promise((resolve, rejects)=>{
        rl.question(question,(data) => {
            resolve(data);
        });
    });
};

//function kirim data jawaban
const postQuestion = (name,number,email) => {
    const contact = {name,number,email};
    const file = fs.readFileSync(filePath,'utf8');
    const contacts=JSON.parse(file);
    contacts.push(contact);
    fs.writeFileSync(filePath,JSON.stringify(contacts));
    console.log('Terima kasih sudah memasukan data!');
    rl.close();
}

const main = async () =>{
    const name = await isQuestion("Tolong isi nama : ");
    const number = await isQuestion("Tolong isi nomber hp : ");
    const email = await isQuestion("Tolong isi email : ");
    postQuestion(name,number,email); 
}
module.exports = {main,isQuestion,postQuestion};