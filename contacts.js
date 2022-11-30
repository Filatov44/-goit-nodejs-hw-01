//работа с файлами через модуль fs
const fs = require("fs/promises");

//работа с абсолютными путями, что б не запутаться и всегда иметь правильный путь
const path = require("path");

//передаем части пути, а path.join объеденяет их и нормализует
const contactsPath = path.join(__dirname, "db/contacts.json");

const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

//uuid для создания id
const { v4 } = require("uuid");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
 const idContact = String(contactId);
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === idContact);
  return result || null;
}

async function removeContact(contactId) {
  const idContact = String(contactId);
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === idContact);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
}

async function addContact(name, email, phone) {
  if (!name) {
    return "\x1B[31m name is required";
  }
  if (!email) {
    return "\x1B[31m email is required";
  }
  if (!phone) {
    return "\x1B[31m phone is required";
  }
  const contacts = await listContacts();
  const newContact = {
    id: v4(),
    name,
    email,
    phone: String(phone),
  };

  contacts.push(newContact);
  //JSON.stringify(contacts, null, 2)) null- перелік символів что надо замінити; 2- відступи
  await updateContacts(contacts);
  return newContact;
}

async function updateById(id, data) {
  const idContact = String(id);
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === idContact);
  if (index === -1) {
    return null;
  }
  // console.log(contacts[index]);
  const existName = contacts[index].name;
  const existEmail = contacts[index].email;
  const existPhone = contacts[index].phone;

  // console.log(existName, existEmail, existPhone);

  contacts[index] = {
    id,
    name: data.name ?? existName,
    email: data.email ?? existEmail,
    phone: data.phone ?? existPhone,
    
  };
  await updateContacts(contacts);
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateById,
};
