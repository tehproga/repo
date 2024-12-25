const SELECT_ALL_PAGINATED = `
  SELECT *,
         count(*) over() AS count
  FROM scooters
  ORDER BY id
  LIMIT $(LIMIT)
  OFFSET $(OFFSET)
`;

const SELECT_BY_ID = `
  SELECT * 
  FROM scooters
  WHERE id = $(id)
`;

const INSERT = `
  INSERT INTO scooters (id, model_id, status, number)
  VALUES ($(id), $(modelId), $(status), $(number))
  ON CONFLICT (id) DO UPDATE
  SET id = $(id), 
      model_id = $(modelId), 
      status = $(status), 
      number = $(number)
`;

export { INSERT, SELECT_ALL_PAGINATED, SELECT_BY_ID };
