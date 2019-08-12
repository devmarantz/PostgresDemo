const { Pool, Client } = require('pg');
const readlineSync = require('readline-sync');
// https://stackoverflow.com/questions/48751505/how-can-i-choose-between-client-or-pool-for-node-postgres
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  password: 'd1am0nd',
  port: 5432
});
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  password: 'd1am0nd',
  port: 5432
});

async function createPlayground() {
  console.log('***********Creating Table');
  const query =
    "CREATE TABLE playground (equip_id serial PRIMARY KEY,type varchar (50) NOT NULL, color varchar (25) NOT NULL,location varchar(25) check (location in ('north', 'south', 'west', 'east', 'northeast', 'southeast', 'southwest', 'northwest')),install_date date);";
  try {
    const result = await client.query(query);
    console.log(result);
  } catch (err) {
    console.log(`\n(!) An error has occurred: ${err}\n`);
  }
}
async function insertData() {
  console.log('***********Inserting Table');
  const query =
    "INSERT INTO playground (type, color, location, install_date) VALUES ('slide', 'blue', 'south', '2017-04-28');";
  try {
    const result = await client.query(query);
    console.log(result);
  } catch (err) {
    console.log(`\n(!) An error has occurred: ${err}\n`);
  }
}

async function readData() {
  console.log('***********Reading Table');
  const query = 'SELECT * from playground;';
  try {
    const result = await client.query(query);
    console.log(result);
  } catch (err) {
    console.log(`\n(!) An error has occurred: ${err}\n`);
  }
}
async function deleteTable() {
  console.log('***********Deleting Table');
  const query =
    'DROP TABLE [ IF EXISTS ] playground [, ...] [ CASCADE | RESTRICT ]';
  try {
    const result = await client.query(query);
    console.log(result);
  } catch (err) {
    console.log(`\n(!) An error has occurred: ${err}\n`);
  }
}
async function app() {
  let continueLoop = true;
  while (continueLoop) {
    console.log('Simple Postgress node app ');
    console.log('1) Create Table');
    console.log('2) Insert Data');
    console.log('3) Read Data');
    console.log('4) Delete Table');
    console.log('5) Exit');
    const option = readlineSync.question('Select an option: ');
    // console.clear();
    switch (option) {
      case '1':
        console.log('option 1 was choosen');
        await createPlayground(client);
        break;
      case '2':
        console.log('option 2 was choosen');
        await insertData();
        break;
      case '3':
        console.log('option 3 was choosen');
        await readData();
        break;
      case '4':
        console.log('option 4 was choosen');
        await deleteTable();
        break;
      case '5':
        console.log('Exiting, good bye!');
        continueLoop = false;
        break;
      default:
        console.log('Not an option');
    }
  }
}
client.connect();
app();
client.end();
