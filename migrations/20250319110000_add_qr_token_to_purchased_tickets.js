/**
 * Unique token per purchased ticket — encoded in QR for check-in / verification.
 *
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const hasTable = await knex.schema.hasTable('purchased_tickets');
  if (!hasTable) return;

  const hasQr = await knex.schema.hasColumn('purchased_tickets', 'qr_token');
  if (!hasQr) {
    await knex.schema.alterTable('purchased_tickets', (table) => {
      table.string('qr_token', 36).nullable().unique();
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  const hasTable = await knex.schema.hasTable('purchased_tickets');
  if (!hasTable) return;

  const hasQr = await knex.schema.hasColumn('purchased_tickets', 'qr_token');
  if (hasQr) {
    await knex.schema.alterTable('purchased_tickets', (table) => {
      table.dropColumn('qr_token');
    });
  }
};
