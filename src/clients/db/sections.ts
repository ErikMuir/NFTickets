import { sql } from "@vercel/postgres";
import { type Section, mapSection } from "@/models";

export const getSection = async (
  venue: string,
  section: string
): Promise<Section | null> => {
  const result = await sql`
    SELECT
      venue,
      section,
      capacity
    FROM sections
    WHERE venue = ${venue} AND section = ${section};
  `;
  return result.rowCount === 0 ? null : mapSection(result.rows[0]);
};

export const getSections = async (venue: string): Promise<Section[]> => {
  const result = await sql`
    SELECT
      venue,
      section,
      capacity
    FROM sections
    WHERE venue = ${venue};
  `;
  return result.rows.map(mapSection);
};

export const insertSection = async (section: Section): Promise<void> => {
  const { rowCount } = await sql`
    INSERT INTO sections
    (
      venue,
      section,
      capacity
    )
    SELECT
      account,
      ${section.section},
      ${section.capacity}
    FROM venues
    WHERE account = ${section.venue};
  `;
  if (rowCount === 0) {
    throw new Error(`Failed to insert section ${section.section}`);
  }
};

export const updateSection = async (section: Section): Promise<void> => {
  const { rowCount } = await sql`
    UPDATE sections
    SET capacity = ${section.capacity}
    WHERE venue = ${section.venue} AND section = ${section.section};
  `;
  if (rowCount === 0) {
    throw new Error(`Failed to update section ${section.section}`);
  }
};

export const deleteSection = async (
  venue: string,
  section: string
): Promise<void> => {
  const { rowCount } = await sql`
    DELETE FROM sections
    WHERE venue = ${venue} AND section = ${section};
  `;
  if (rowCount === 0) {
    throw new Error(`Failed to delete section ${section}`);
  }
};
