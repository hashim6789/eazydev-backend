export interface ILessonOutDTO {
  id: string;
  title: string;
  description: string;
  mentorId: string;
  materials: string[];
}

export type ICreateLessonInDTO = Omit<ILessonOutDTO, "id">;

export type ICreateLessonRequestDTO = Omit<
  ILessonOutDTO,
  "id" | "materials"
> & { courseId: string };
