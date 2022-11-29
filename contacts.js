//работа с файлами через модуль fs
const fs = require("fs/promises");

//работа с абсолютными путями, что б не запутаться и всегда иметь правильный путь
const path = require("path");

//передаем части пути, а path.join объеденяет их и нормализует
const contactsPath = path.join(__dirname, "db/contacts.json");

//uuid для создания id
const { v4 } = require("uuid");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: v4(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  //JSON.stringify(contacts, null, 2)) null- перелік символів что надо замінити; 2- відступи
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

async function updateById(id, data) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  contacts[index] = { id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateById,
};
