import { EDoubtStatus, EVertical } from '@live/shared';
import { Types } from 'mongoose';
import { Course } from '../modules/courses/course.schema';
import { Doubt } from '../modules/doubts/doubt.schema';

const HOUR_IN_MS = 60 * 60 * 1000;
const DAY_IN_MS = 24 * HOUR_IN_MS;

export const COURSE_IDS = {
  C1: '64f000000000000000000001',
  C2: '64f000000000000000000002',
  C3: '64f000000000000000000003',
} as const;

export const DOUBT_IDS = Array.from({ length: 15 }, (_, index) => `64f0000000000000000001${String(index + 1).padStart(2, '0')}`);

const TEACHERS = { ANA: 'u-ana', LUIS: 'u-luis' } as const;
const STUDENTS = { MARIA: 'u-maria', LUCIA: 'u-lucia', JORGE: 'u-jorge' } as const;

type TSeedCourse = Pick<Course, '_id' | 'name' | 'vertical' | 'teacherId' | 'createdAt' | 'updatedAt'>;

interface ISeedDoubtInput {
  courseId: string;
  studentId: string;
  question: string;
  hoursAgo: number;
  answer?: string;
  answeredHoursAgo?: number;
  answeredBy?: string;
}

const SEED_DOUBTS: readonly ISeedDoubtInput[] = [
  {
    courseId: COURSE_IDS.C1,
    studentId: STUDENTS.LUCIA,
    question: 'En el tema 12, ¿el silencio administrativo en un procedimiento iniciado a solicitud del interesado es positivo o negativo si la ley no dice nada?',
    hoursAgo: 6 * 24,
  },
  {
    courseId: COURSE_IDS.C1,
    studentId: STUDENTS.MARIA,
    question: '¿Cuál es el plazo para interponer un recurso de alzada? En el manual pone un mes y en el test de la semana pasada salía tres meses.',
    hoursAgo: 4 * 24,
  },
  {
    courseId: COURSE_IDS.C1,
    studentId: STUDENTS.LUCIA,
    question: 'No entiendo la corrección del ejercicio 4 del tema 12, te adjunto foto del libro. ¿Por qué la respuesta correcta es la C?',
    hoursAgo: 3 * 24,
  },
  {
    courseId: COURSE_IDS.C1,
    studentId: STUDENTS.LUCIA,
    question: '¿La Constitución de 1978 regula los Ayuntamientos en el título VIII o en el título VII? Me lío con los títulos.',
    hoursAgo: 24,
  },
  {
    courseId: COURSE_IDS.C1,
    studentId: STUDENTS.MARIA,
    question: 'En Word, ¿la combinación de correspondencia entra en el temario de este año? En la convocatoria anterior no lo preguntaron.',
    hoursAgo: 5,
  },
  {
    courseId: COURSE_IDS.C1,
    studentId: STUDENTS.MARIA,
    question: '¿Qué diferencia hay entre nulidad y anulabilidad de un acto administrativo? Con un ejemplo, si puede ser.',
    hoursAgo: 8 * 24,
    answer:
      'La nulidad de pleno derecho es para los vicios más graves (art. 47 de la Ley 39/2015), como los actos dictados por órgano manifiestamente incompetente, y no se convalida. La anulabilidad (art. 48) cubre el resto de infracciones del ordenamiento y sí admite convalidación. Ejemplo: una multa firmada por un órgano sin competencia es nula; una multa con un defecto de forma que no causa indefensión es anulable.',
    answeredHoursAgo: 7 * 24,
    answeredBy: TEACHERS.ANA,
  },
  {
    courseId: COURSE_IDS.C1,
    studentId: STUDENTS.MARIA,
    question: '¿Cuántas preguntas tiene el examen de este año y cuánto restan las respuestas erróneas?',
    hoursAgo: 10 * 24,
    answer: 'La convocatoria fija 60 preguntas más 5 de reserva. Cada error resta un tercio del valor de un acierto. Lo tienes en la sección de convocatoria del curso.',
    answeredHoursAgo: 9 * 24,
    answeredBy: TEACHERS.ANA,
  },
  {
    courseId: COURSE_IDS.C2,
    studentId: STUDENTS.LUCIA,
    question: '¿Qué órgano resuelve los conflictos de competencia entre el Estado y las Comunidades Autónomas? En el tema pone el Tribunal Constitucional pero el test dice Tribunal Supremo.',
    hoursAgo: 3 * 24,
  },
  {
    courseId: COURSE_IDS.C2,
    studentId: STUDENTS.LUCIA,
    question: 'En el procedimiento de contratación, ¿cuándo es obligatoria la mesa de contratación?',
    hoursAgo: 20,
  },
  {
    courseId: COURSE_IDS.C2,
    studentId: STUDENTS.LUCIA,
    question: '¿Las fases del gasto (autorización, disposición, reconocimiento de la obligación y pago) se pueden acumular? ¿Cuáles?',
    hoursAgo: 9,
  },
  {
    courseId: COURSE_IDS.C2,
    studentId: STUDENTS.MARIA,
    question: '¿Puedes explicar con un ejemplo la diferencia entre delegación de competencias y encomienda de gestión?',
    hoursAgo: 2,
  },
  {
    courseId: COURSE_IDS.C2,
    studentId: STUDENTS.MARIA,
    question: '¿El Defensor del Pueblo puede supervisar a las Administraciones autonómicas?',
    hoursAgo: 12 * 24,
    answer: 'Sí. El artículo 54 de la Constitución y su ley orgánica le permiten supervisar la actividad de todas las Administraciones públicas, coordinándose con los comisionados autonómicos cuando existen.',
    answeredHoursAgo: 11 * 24,
    answeredBy: TEACHERS.ANA,
  },
  {
    courseId: COURSE_IDS.C3,
    studentId: STUDENTS.JORGE,
    question: 'En la nómina del ejercicio 3, ¿la base de cotización por contingencias comunes incluye las horas extra? Me sale distinto que en la solución.',
    hoursAgo: 5 * 24,
  },
  {
    courseId: COURSE_IDS.C3,
    studentId: STUDENTS.JORGE,
    question: '¿En qué cuenta del PGC se registra el IVA soportado en la compra de un ordenador para la oficina?',
    hoursAgo: 2,
  },
  {
    courseId: COURSE_IDS.C3,
    studentId: STUDENTS.JORGE,
    question: '¿Qué diferencia hay entre el balance de situación y la cuenta de pérdidas y ganancias?',
    hoursAgo: 9 * 24,
    answer:
      'El balance es una foto del patrimonio en una fecha concreta (activo, pasivo y patrimonio neto). La cuenta de pérdidas y ganancias es una película del ejercicio: recoge ingresos y gastos y da el resultado. El resultado de la cuenta de pérdidas y ganancias acaba dentro del patrimonio neto del balance.',
    answeredHoursAgo: 8 * 24,
    answeredBy: TEACHERS.LUIS,
  },
];

const hoursBefore = (now: Date, hours: number): Date => new Date(now.getTime() - hours * HOUR_IN_MS);

export const buildCourses = (now: Date): TSeedCourse[] => {
  const createdAt = new Date(now.getTime() - 30 * DAY_IN_MS);
  return [
    { _id: new Types.ObjectId(COURSE_IDS.C1), name: 'Auxiliar Administrativo del Estado', vertical: EVertical.OPOSICIONES, teacherId: TEACHERS.ANA, createdAt, updatedAt: createdAt },
    { _id: new Types.ObjectId(COURSE_IDS.C2), name: 'Administrativo del Estado', vertical: EVertical.OPOSICIONES, teacherId: TEACHERS.ANA, createdAt, updatedAt: createdAt },
    { _id: new Types.ObjectId(COURSE_IDS.C3), name: 'Administración y Finanzas', vertical: EVertical.FP, teacherId: TEACHERS.LUIS, createdAt, updatedAt: createdAt },
  ];
};

interface IAnsweredFields {
  answer: string;
  answeredAt: Date;
  answeredBy: string;
}

const buildAnsweredFields = (now: Date, input: ISeedDoubtInput): IAnsweredFields | undefined => {
  if (input.answer === undefined || input.answeredHoursAgo === undefined || input.answeredBy === undefined) {
    return undefined;
  }
  return { answer: input.answer, answeredAt: hoursBefore(now, input.answeredHoursAgo), answeredBy: input.answeredBy };
};

export const buildDoubts = (now: Date): Doubt[] =>
  SEED_DOUBTS.map((input, index) => {
    const createdAt = hoursBefore(now, input.hoursAgo);
    const answered = buildAnsweredFields(now, input);
    return {
      _id: new Types.ObjectId(DOUBT_IDS[index]),
      courseId: new Types.ObjectId(input.courseId),
      studentId: input.studentId,
      question: input.question,
      status: answered ? EDoubtStatus.ANSWERED : EDoubtStatus.PENDING,
      ...answered,
      createdAt,
      updatedAt: answered?.answeredAt ?? createdAt,
    };
  });
