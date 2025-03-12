export const createTableNotes = `
  CREATE TABLE IF NOT EXISTS t_notes (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    title VARCHAR(30) DEFAULT '',
    content TEXT DEFAULT '',
    isDeleted BOOLEAN DEFAULT false,
    createdAt VARCHAR(20),
    updatedAt VARCHAR(20)
  );
`;

export const insertNote =
	"INSERT INTO t_notes (id, title, content, createdAt) VALUES ($1, $2, $3, $4)";
