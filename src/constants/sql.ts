export const createTable = `
  CREATE TABLE IF NOT EXISTS t_notes (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    title VARCHAR(30) DEFAULT '',
    content TEXT DEFAULT '',
    isDeleted BOOLEAN DEFAULT false,
    createdAt VARCHAR(20) DEFAULT '',
    updatedAt VARCHAR(20) DEFAULT ''
  );

  CREATE TABLE IF NOT EXISTS m_settings (
    id INT PRIMARY KEY,
    key VARCHAR(10) DEFAULT '',
    value VARCHAR(10) DEFAULT ''
  );
`;

export const insertNote =
	"INSERT INTO t_notes (id, title, content, createdAt) VALUES ($1, $2, $3, $4);";

export const insertSetting = "INSERT INTO m_settings (id, key, value) VALUES($1, $2, $3);";
