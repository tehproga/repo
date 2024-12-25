const SELECT_ALL_PAGINATED = `
  SELECT *,
         count(*) over() AS count
  FROM purchases
  ORDER BY date_purchased DESC
  LIMIT $(LIMIT)
  OFFSET $(OFFSET)
`;

const SELECT_ALL_BY_USER_ID_PAGINATED = `
  SELECT *,
         count(*) over() AS count
  FROM purchases
  WHERE user_id = $(userId)
  ORDER BY date_purchased DESC
  LIMIT $(LIMIT)
  OFFSET $(OFFSET)
`;

const SELECT_LAST_ACTIVE_BY_USER_ID = `
  SELECT *
  FROM purchases
  WHERE user_id = $(userId)
    AND date_finished > NOW()
  ORDER BY date_finished DESC
  LIMIT 1
`;

const INSERT = `
  INSERT INTO purchases (subscription_id, user_id, date_started, date_finished, date_purchased)
  VALUES ($(subscriptionId), $(userId), $(dateStarted), $(dateFinished), $(datePurchased))
`;

export {
  INSERT,
  SELECT_ALL_BY_USER_ID_PAGINATED,
  SELECT_ALL_PAGINATED,
  SELECT_LAST_ACTIVE_BY_USER_ID,
};
