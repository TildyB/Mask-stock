const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const partnerSchema = new Schema({
  id: Number,
  name: String,
  address: {
    country_code: String,
    post_code: String,
    city: String,
    address: String,
  },
  emails: [String],
  taxcode: String,
  iban: String,
  swift: String,
  account_number: String,
  phone: String,
  general_ledger_number: String,
  tax_type: String,
  custom_billing_settings: {
    payment_method: String,
    document_form: String,
    due_days: Number,
    document_currency: String,
    template_language_code: String,
    discount: String,
  },
  group_member_tax_number: String,
  giro_settings: {
    giro_default_settings: Boolean,
    giro_payment_request_enabled: Boolean,
    giro_different_amount_allowed: Boolean,
  },
  partner_shipping: {
    match: Boolean,
    name: String,
    mode: String,
    address: {
      country_code: String,
      post_code: String,
      city: String,
      address: String,
    },
  },
});

module.exports = Partner = mongoose.model("Partner", partnerSchema);
