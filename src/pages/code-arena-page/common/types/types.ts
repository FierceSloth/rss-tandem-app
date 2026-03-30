/* ========================================================================== */
/*                         DTO (Data Transfer Objects)                        */
/* ========================================================================== */

export interface ICodeArenaDto {
  id: string;
  title: string;
  topic: string;
  description: string;
  initial_code: string;
  tests: string;
}

/* ========================================================================== */
/*                          Entities (Domain Models)                          */
/* ========================================================================== */

export interface ICodeArenaEntities {
  title: string;
  topic: string;
  description: string;
  initialCode: string;
  tests: string;
}
