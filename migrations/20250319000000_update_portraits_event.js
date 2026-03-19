/**
 * Update event id 1 and its ticket types to Portraits @ The Godfrey ($10 General Admission).
 * Run with: npx knex migrate:latest
 * (Ensure DB_CLIENT and DB_CONNECTION_STRING are set for your environment.)
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
        title: 'Portraits @ The Godfrey',
        date: '2025-04-13',
        location: 'The Godfrey, 1401 Michigan Ave, Detroit, MI 48216',
        description:
          'A night of live expression, music, and creative experimentation. April 13, 7–11PM. Live art, full DJ lineup, portrait workshop, caricature booth. Art supplies provided. Food & cash bar.',
      });
  }

  if (hasTicketTypes) {
    await knex('ticket_types')
      .where({ event_id: 1 })
      .update({
        name: 'General Admission',
        description:
          'Portraits @ The Godfrey — April 13, 7–11PM at The Godfrey. Live art, DJs, portrait workshop, caricature booth. Art supplies provided.',
        price: 10,
      });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  const hasEvents = await knex.schema.hasTable('events');
  const hasTicketTypes = await knex.schema.hasTable('ticket_types');

  if (hasEvents) {
    await knex('events')
      .where({ id: 1 })
      .update({
        title: 'Arts For The Earth',
        date: null,
        location: null,
        description: null,
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
