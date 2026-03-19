/**
 * Restore event id 1 and its ticket types to Arts For The Earth.
 * Run with: npx knex migrate:latest
 *
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const hasEvents = await knex.schema.hasTable('events');
  const hasTicketTypes = await knex.schema.hasTable('ticket_types');

  if (hasEvents) {
    await knex('events')
      .where({ id: 1 })
      .update({
        title: 'Arts For The Earth',
        date: '2025-04-26',
        location: '2804 Wight St, Detroit, MI',
        description:
          'A celebration of creativity and environmental awareness through art, music, and community engagement. Proceeds benefit Water Protectors Network, Friends of the Rouge, and Greening of Detroit.',
      });
  }

  if (hasTicketTypes) {
    await knex('ticket_types')
      .where({ event_id: 1 })
      .update({
        name: 'Arts For The Earth General Admission',
        description: 'Standard entry to Arts For The Earth',
        price: 20,
      });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  // Optional: revert event 1 to generic/blank if needed
  const hasEvents = await knex.schema.hasTable('events');
  const hasTicketTypes = await knex.schema.hasTable('ticket_types');

  if (hasEvents) {
    await knex('events')
      .where({ id: 1 })
      .update({
        title: null,
        date: null,
        location: null,
        description: null,
      });
  }

  if (hasTicketTypes) {
    await knex('ticket_types')
      .where({ event_id: 1 })
      .update({
        name: 'General Admission',
        description: null,
        price: 0,
      });
  }
};
