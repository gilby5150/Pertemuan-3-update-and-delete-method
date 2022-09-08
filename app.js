const {main,isQuestion,postQuestion, listContact,detailContact,deleteContact,updateContact} = require('./function');
// main();

// add contact
const yargs = require("yargs");
yargs.command({
    command:'add',
    describe: 'add new contact',
    builder:{
        name:{
            describe: 'Contact Name',
            demandOption: true,
            type:'String',
        },
        email:{
            describe: 'Contact email',
            demandOption: false,
            type:'string',
        },
        mobile:{
            describe: 'Contact mobile phone number',
            demandOption: true,
            type:'string',
        },
    },
    handler(argv){
        postQuestion(argv.name,argv.email,argv.mobile);
    },
});

//See contact list
yargs.command({
    command:'list',
    describe:'see contact list',
    handler(){
        listContact();
    },
}),

// Detail name (search)
yargs.command({
    command:'detail',
    describe:'see contact list with detail',
    builder:{
        name:{
            describe: 'Contact Name',
            demandOption: true,
            type:'String',
        },
    },
    handler(argv){
        detailContact(argv.name);
    },
}),

// Delete contact
yargs.command({
    command: 'delete',
    describe: 'Remove a contact',
    builder: {
        name: {
            describe: 'Delete contact',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        deleteContact(argv.name);
    },
}),

// update contact
yargs.command({
    command: 'update',
    describe: 'update a contact',
    builder: {
        oldName: {
            describe: 'oldName contact',
            demandOption: true,
            type: 'string'
        },
        newName: {
            describe: 'newName contact',
            demandOption: false,
            type: 'string'
        },
        newEmail: {
            describe: 'newEmail contact',
            demandOption: false,
            type: 'string'
        },
        newMobile: {
            describe: 'newMobile contact',
            demandOption: false,
            type: 'string'
        },
    },
    handler(argv) {
        updateContact(argv.oldName,argv.newName,argv.newEmail,argv.newMobile);
    },
}),

yargs.parse();
// console.log(yargs.argv);