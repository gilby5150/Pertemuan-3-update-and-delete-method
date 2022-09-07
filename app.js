// console.log("hello world");
// const validator =  require('validator');
// console.log(validator.isEmail("gilby5150@gmail.com"));
// console.log(validator.isMobilePhone("085775245846","id-ID"));
// //////////////////////////////////////////////////////////////

// Handling ERROR
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

// rl.question("what is your name ? ",(name)=>{
//     rl.question("what is your phone number ? ",(number)=>{
//         rl.question("what is your email ? ",(email)=>{
//             const contact = {name,number,email};
//             const file = fs.readFileSync(filePath,'utf8');
//             const contacts=JSON.parse(file);
//             contacts.push(contact);
//             fs.writeFileSync(filePath,JSON.stringify(contacts));
//             console.log('Terima kasih sudah memasukan data!');
//             rl.close();
//         })
//     })
// });


// Function
const isQuestion = (question) => {
    return new Promise((resolve, rejects)=>{
        rl.question(question,(data) => {
            resolve(data);
        });
    });
};

const main = async () =>{
    const name = await isQuestion("Tolong isi nama : ");
    const number = await isQuestion("Tolong isi nomber hp : ");
    const email = await isQuestion("Tolong isi email : ");
    // console.log(name,number,email);
    const contact = {name,number,email};
    const file = fs.readFileSync(filePath,'utf8');
    const contacts=JSON.parse(file);
    contacts.push(contact);
    fs.writeFileSync(filePath,JSON.stringify(contacts));
    console.log('Terima kasih sudah memasukan data!');
    rl.close();
}
main();