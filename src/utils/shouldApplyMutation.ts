import { Client, QueryResultRow } from "pg";

/**
 * Use this function to check whether data has already been seeded into the database.
 * @param client database client object
 * @param queryText query to run. For example, we can check if there exist any rows of some table.
 * @param values for parameterized query
 * @returns boolean
 */
export async function shouldApplyMutation<T extends QueryResultRow>(
  client: Client,
  queryText: string,
  values?: string[]
) {
  const queryResult = await client.query<T>(queryText, values);

  return queryResult.rowCount > 0;
}
