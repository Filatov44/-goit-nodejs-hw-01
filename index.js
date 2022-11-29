console.log("Server started...");

const contactsOperations = require("./contacts");
// const argv = require("yargs").argv;


async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
          const allContacts = await contactsOperations.listContacts();
          console.table(allContacts);
      break;

    case "get":
          const oneContact = await contactsOperations.getContactById(id);
          console.table(oneContact);
      break;

    case "add":
      const newContact = await contactsOperations.addContact(
        name,
        email,
        phone
          );
          console.table(newContact);
      break;

    case "remove":
          const deleteContact = await contactsOperations.removeContact(id);
          console.table(deleteContact);
          break;
      
      case "updateById":
          const updateContact = await contactsOperations.updateById(id, {
            name,
            email,
            phone,
          });
          console.table(updateContact); 
          break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// invokeAction(argv);
// invokeAction({ action: "list" });
// invokeAction({action: "get", id: "5"})
// invokeAction({action: "add", name: "Mike Tyson", email: "tyson@mail.com", phone: "123456789"})
// invokeAction({
//   action: "updateById",
//   id: "f6f9a43b-1eff-4ca8-8c2f-53175b8b5122",
//   name: "Mike Tyson",
//   email: "tyson_power@mail.com",
//   phone: "123456789",
// });
// invokeAction({action: "remove", id: "f6f9a43b-1eff-4ca8-8c2f-53175b8b5122"})