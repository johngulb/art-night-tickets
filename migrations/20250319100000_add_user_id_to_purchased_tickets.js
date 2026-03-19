/**
 * buidl-ticketing expects purchased_tickets.user_id (buyer email).
 * Add the column if your table was created without it.
 *
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const hasTable = await knex.schema.hasTable('purchased_tickets');
  if (!hasTable) return;

  const hasUserId = await knex.schema.hasColumn('purchased_tickets', 'user_id');
  if (!hasUserId) {
    await knex.schema.alterTable('purchased_tickets', (table) => {
      table.string('user_id', 255).nullable();
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

  const hasUserId = await knex.schema.hasColumn('purchased_tickets', 'user_id');
  if (hasUserId) {
    await knex.schema.alterTable('purchased_tickets', (table) => {
      table.dropColumn('user_id');
    });
  }
};
