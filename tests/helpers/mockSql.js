import { vi } from "vitest";

/**
 * Mock de `sql` tagged template: encadeia handlers na ordem das chamadas.
 * Cada handler: (queryText, values) => rows | undefined
 */
export function createSequentialSqlMock(handlers = []) {
  let callIndex = 0;
  const calls = [];

  const sql = vi.fn(async (strings, ...values) => {
    const queryText = Array.isArray(strings) ? strings.join(" ") : String(strings);
    calls.push({ queryText, values, index: callIndex });
    const handler = handlers[callIndex];
    callIndex += 1;
    if (typeof handler === "function") {
      const result = handler(queryText, values);
      if (result !== undefined) return result;
    }
    return [];
  });

  sql.calls = calls;
  sql.resetCallIndex = () => {
    callIndex = 0;
  };
  return sql;
}
