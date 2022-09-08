// console.log("hello world");
// //////////////////////////////////////////////////////////////

//validator
const validator =  require('validator');

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

// function load data(read)
const loadContact = () => {
    const file = fs.readFileSync(filePath,'utf8');
    const contacts=JSON.parse(file);
    return contacts;
}
//function list contact
const listContact=()=>{
    const contacts = loadContact();
    console.log('Contact List : ');
    contacts.forEach((contact,i) => {
        console.log(`${i+1}.${contact.name} - ${contact.mobile}`);
    });
};

// detail contact
const detailContact=(name)=>{
    const contacts = loadContact();
    const detailContact = contacts.find((c)=> c.name.toLowerCase() === name.toLowerCase());
    if (detailContact) {
        console.log('Contact List : ');
        console.log(`Nama: ${detailContact.name} Email: ${detailContact.email} Nomber Phone: ${detailContact.mobile}`);
    }else(console.log("Nama Kontak tidak ditemukan"));
};

//function kirim data jawaban (save data/post)
const postQuestion = (name,email,mobile) => {
    const arrDump = [];
    const contact = {name,email,mobile};
    const contacts = loadContact();
    const duplicate= contacts.find((c)=> c.name.toLowerCase() === name.toLowerCase());
    if (duplicate) {
        arrDump.push("Contact name is already taken. User another name.");
    }
    if (email){
        if (!validator.isEmail(email.toLowerCase())) {
            arrDump.push("Please use email format");
        }
    }
    if (!validator.isMobilePhone(mobile,'id-ID')) {
        arrDump.push("Please user mobile format");
    } 
    if (arrDump.length>0) {
        console.log(arrDump);
        return false;
    }
    contacts.push(contact);
    fs.writeFileSync(filePath,JSON.stringify(contacts));
    console.log('Terima kasih sudah memasukan data!');
    rl.close();
};

//function update contact
const updateContact = (oldName,newName,newEmail,newMobile) => {
    const contacts = loadContact();
    const index = contacts.findIndex((c) => c.name.toLowerCase() === oldName.toLowerCase());
    arrDump=[];
    if(index > -1) {
        if (newName) {
            const duplicate= contacts.find((c)=> c.name.toLowerCase() === newName.toLowerCase());
            if (duplicate) {
                arrDump.push("Contact name is already taken. User another name.");
            }
            contacts[index].name=newName;
        }
        if (newEmail){
            if (!validator.isEmail(newEmail.toLowerCase())) {
                arrDump.push("Please use email format");
            }
            contacts[index].email=newEmail;
        }
        if (newMobile) {
            if (!validator.isMobilePhone(newMobile,'id-ID')) {
                arrDump.push("Please user mobile format");
            } 
            contacts[index].mobile=newMobile;
        }
        if (arrDump.length>0) {
            console.log(arrDump);
            return false;
        }
    }
    else {
        console.log("No contact Found")
        return false;
    }
    fs.writeFileSync(filePath,JSON.stringify(contacts));
    console.log("Update Contact Succes");
};

//function delete contact
const deleteContact = (name)=> {
    const contacts = loadContact();
    const index = contacts.findIndex((c) => c.name.toLowerCase() === name.toLowerCase());
    if(index > -1) {
        contacts.splice(index, 1);
        fs.writeFileSync(filePath,JSON.stringify(contacts));
    }
    else {
        console.log("No contact Found")
        return false;
    }
    console.log("Remove Contact Succes");
};

const main = async () =>{
    const name = await isQuestion("Tolong isi nama : ");
    const mobile = await isQuestion("Tolong isi nomber hp : ");
    const email = await isQuestion("Tolong isi email : ");
    postQuestion(name,mobile,email); 
}
module.exports = {main,isQuestion,postQuestion,listContact,detailContact,deleteContact,updateContact};