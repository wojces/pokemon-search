import { Model } from "./model";

export class Organization extends Model {
  constructor(data) {
    super();
    this.setData(data);
  }

  map = {
    idOrganization: { key: "id_organization", type: "int" },
    name: { key: "name", type: "string" },
    city: { key: "city", type: "string" },
    nip: { key: "nip", type: "string" },
    contractUpTo: { key: "contract_up_to", type: "string" },
    storage: { key: "storage", type: "string" },
  };
}

// map = {
//   idOrganization: { key: "id_organization", type: "int" },
//   name: { key: "name", type: "string" },
//   city: { key: "city", type: "string" },
//   zip: { key: "zip", type: "string" },
//   address: { key: "address", type: "string" },
//   nip: { key: "nip", type: "string" },
//   country: { key: "country", type: "string" },
//   contactPerson: { key: "contact_person", type: "string" },
//   phone: { key: "phone", type: "string" },
//   email: { key: "email", type: "string" },
//   correspondenceAddress: { key: "correspondence_address", type: "string" },
//   correspondenceCity: { key: "correspondence_city", type: "string" },
//   correspondenceZipCode: { key: "correspondence_zip_code", type: "string" },
//   contractUpTo: { key: "contract_up_to", type: "string" },
//   closedInvoiceDeadline: { key: "closed_invoice_deadline", type: "string" },
// };
