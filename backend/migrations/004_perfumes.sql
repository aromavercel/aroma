 matching the given port. if a string is given, it is matched with includes */
  filterCallsByPort (port: MockCallHistory.FilterCallsParameter): Array<MockCallHistoryLog>
  /** return all MockCallHistoryLog matching the given origin. if a string is given, it is matched with includes */
  filterCallsByOrigin (origin: MockCallHistory.FilterCallsParameter): Array<MockCallHistoryLog>
  /** return all MockCallHistoryLog matching the given path. if a string is given, it is matched with includes */
  filterCallsByPath (path: MockCallHistory.FilterCallsParameter): Array<MockCallHistoryLog>
  /** return all MockCallHistoryLog matching the given hash. if a string is given, it is matched with includes */
  filterCallsByHash (hash: MockCallHistory.FilterCallsParameter): Array<MockCallHistoryLog>
  /** return all MockCallHistoryLog matching the given fullUrl. if a string is given, it is matched with includes */
  filterCallsByFullUrl 