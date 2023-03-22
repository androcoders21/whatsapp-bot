const qrcode = require("qrcode-terminal");
const { LocalAuth, ChatTypes } = require("whatsapp-web.js");
const { Client, RemoteAuth } = require('whatsapp-web.js');
const { MongoStore } = require('wwebjs-mongo');
const mongoose = require('mongoose');
const puppeteer = require('puppeteer');



(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  mongoose.connect('mongodb+srv://azown:azownali123@cluster0.fkcjj3d.mongodb.net/watbot').then(() => {
    const store = new MongoStore({ mongoose: mongoose });
    const client = new Client({
      authStrategy: new RemoteAuth({
        store: store,
        backupSyncIntervalMs: 300000
      }),
      puppeteer: {
        browser: browser,
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage'
        ]
      }
    });
    client.on("ready", () => {
      console.log("Client is ready!");
    });
    client.on("message", (message) => {
      console.log(message.body);
      if (message.body === "!ping") {
        message.reply("pong");
      }
    });
    client.on("qr", (qr) => {
      console.log("QR RECEIVED", qr);
      qrcode.generate(qr, { small: true });
    });
    client.on('remote_session_saved', () => {
      console.log('Session saved successfully!');
    });
    client.initialize();
  }).catch((err) => {
    console.log(err);
  });

})();

// const client = new Client({
//   authStrategy: new LocalAuth()
// });


let user = {};

// client.on("message", (message) => {
//     // console.log(message.body)
//   // console.log(message.body==='1' || '2' || '3' || '4')
//   // console.log(message.body , message.from.slice(0,12) , message.to.slice(0,12), message._data.notifyName)
//   var key = message.from.slice(0, 12);
//   if (key in user) {
//     if (user[key].status == 1) {
//       if (
//         message.body == "1" ||
//         message.body == "2" ||
//         message.body == "3" ||
//         message.body == "4"
//       ) {
//         client.sendMessage(
//           message.from,
//           `Time frame for this dream (in Years)? \n Example: 2`
//         );
//         user[key].status = 2;
//       } else {
//         client.sendMessage(
//           message.from,
//           `Please enter a valid choice number \n 1. Buying a car \n 2. Higher education \n 3. Down payment for flat \n 4. Foreign Trip \n ENTER YOUR CHOICE NUMBER ONLY \n Example: 1`
//         );
//       }
//     } else if (user[key].status === 2) {
//       if (
//         message.body == "3" ||
//         message.body == "4" ||
//         message.body == "5" ||
//         message.body == "6" ||
//         message.body == "7" ||
//         message.body == "8" ||
//         message.body == "9" ||
//         message.body == "10" ||
//         message.body == "11" ||
//         message.body == "12"
//       ) {
//         user[key].years = message.body;
//         client.sendMessage(
//           message.from,
//           `What is the present cost of the Car / Higher Education for your Kid/s / Flat / Foreign Trip for your family? \n Example: 10000`
//         );
//         user[key].status = 3;
//       } else {
//         client.sendMessage(
//           message.from,
//           `Please enter a valid choice number \n Time frame for this dream (in Years)? \n Example: 2`
//         );
//       }
//     } else if (user[key] === 3) {
//       console.log(message.body);
//       try {
//         var amm = parseInt(message.body);
//         console.log(amm);
//         if (amm) {
//           user[key].amount = amm;
//           client.sendMessage(
//             message.from,
//             `Future value after ${user[key].years} years for this dream would be ${user[key].amount} (here we will use lumsum calculator to calculate future value. Inflation percentage would be for car 2%, for higher education 8%, for down payment of flat 5%, for foreign trip 6%`
//           );
//           client.sendMessage(
//             message.from,
//             `How do you want to invest to make your dream cheaper? 1. Monthly \n 2. One time\n Enter your choice number only \n Example: 1
//                     `
//           );
//           user[key].status = 4;
//         } else {
//           client.sendMessage(
//             message.from,
//             `Please enter the valid amount \n What is the present cost of the Car / Higher Education for your Kid/s / Flat / Foreign Trip for your family? \n Example: 10000`
//           );
//         }
//       } catch (error) {
//         client.sendMessage(
//           message.from,
//           `Please enter the valid amount \n What is the present cost of the Car / Higher Education for your Kid/s / Flat / Foreign Trip for your family? \n Example: 10000`
//         );
//       }
//     } else if (user[key] === 4) {
//       if (message == "1") {
//         client.sendMessage(
//           message.from,
//           `We recommend you to start SIP of Rs.10,700 in moderate category mutual funds. (Use SIP calculator)`
//         );
//         client.sendMessage(
//           message.from,
//           `How much you want to invest monthly? \n Example: 1000`
//         );
//         user[key].status = 51;
//       } else if (message == "2") {
//         client.sendMessage(
//           message.from,
//           `How much you want to invest one time? \n Example: 1000`
//         );
//       } else {
//         client.sendMessage(
//           message.from,
//           `Please enter a valid choice number \n How do you want to invest to make your dream cheaper? 1. Monthly \n 2. One time\n Enter your choice number only \n Example: 1
//                     `
//         );
//       }
//     }else if (user[key].status === 51){
//         try{
//             var apm = parseInt(message.body);
//             if(apm){
//                 user[key].apm = apm;
//                 client.sendMessage(
//                     message.from,
//                     `Your expected corpus  after 4 years would be Rs. 288000 (Use SIP Calculator). Hence your shortfall for target amount is Rs.3,62,000. Do you want to cover this shortfall? Enter Yes or No`
                    
//                   );
//                     user[key].status = 52;
//             }else{
//                 client.sendMessage(
//                     message.from,
//                     `Please enter a valid amount \n How much you want to invest monthly? \n Example: 1000`
//                   );
//             }
//         }catch(error){
//             client.sendMessage(
//                 message.from,
//                 `Please enter a valid amount \n How much you want to invest monthly? \n Example: 1000`
//               );
                 

//         }

//     }
//   } else {
//     user[key] = {};
//     user[key].name = message._data.notifyName;
//     user[key].number = message.from.slice(0, 12);add
//     user[key].status = 1;
//     if (
//       message.body == "Hii" ||
//       "Hi" ||
//       "Hello" ||
//       "Hey" ||
//       "hii" ||
//       "hi" ||
//       "hello" ||
//       "hey" ||
//       "hi!!!!"
//     ) {
//       client.sendMessage(
//         message.from,
//         `Hey ${message._data.notifyName},  \n What kind of dream are you looking for??? \n 1. Buying a car \n 2. Higher education \n 3. Down payment for flat \n 4. Foreign Trip \n ENTER YOUR CHOICE NUMBER ONLY \n Example: 1`
//       );
//     }
//   }
// });



// client.initialize();

