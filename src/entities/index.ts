/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: deceptivetactics
 * Interface for DeceptiveTactics
 */
export interface DeceptiveTactics {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  tacticName?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  detailedExplanation?: string;
  /** @wixFieldType image */
  visualExample?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  characteristics?: string;
}


/**
 * Collection ID: scamtypes
 * Interface for ScamTypes
 */
export interface ScamTypes {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  scamName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image */
  visualExample?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  characteristics?: string;
  /** @wixFieldType text */
  preventionTips?: string;
}
