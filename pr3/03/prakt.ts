// Визначення базових типів
type DayOfWeek = "Понеділок" | "Вівторок" | "Середа" | "Четвер" | "П'ятниця";
type TimeSlot = "8:00-9:35" | "9:45-11:20" | "11:45-13:20";
type CourseType = "Лекція" | "Практична" | "Лабораторна";

// Створення основних структур
type Professor = {
    id: number;
    name: string;
    department: string;
};

type Classroom = {
    number: string;
    capacity: number;
    hasProjector: boolean;
};

type Course = {
    id: number;
    name: string;
    type: CourseType;
};

type Lesson = {
    courseId: number;
    professorId: number;
    classroomNumber: string;
    dayOfWeek: DayOfWeek;
    timeSlot: TimeSlot;
};

type ScheduleConflict = {
    type: "ProfessorConflict" | "ClassroomConflict";
    lessonDetails: Lesson;
};

// Масиви даних
let professors: Professor[] = [];
let classrooms: Classroom[] = [];
let courses: Course[] = [];
let schedule: Lesson[] = [];

// Функції додавання
function addProfessor(professor: Professor): void {
    professors.push(professor);
}

function addLesson(lesson: Lesson): boolean {
    const conflict = validateLesson(lesson);
    if (!conflict) {
        schedule.push(lesson);
        return true;  
    }
    return false;  
}

    function validateLesson(lesson: Lesson, ignoreLessonId?: number): ScheduleConflict | null {
        const professorConflict = schedule.some(l => 
            l.professorId === lesson.professorId &&
            l.dayOfWeek === lesson.dayOfWeek &&
            l.timeSlot === lesson.timeSlot &&
            l.courseId !== ignoreLessonId 
        );
    
        const classroomConflict = schedule.some(l => 
            l.classroomNumber === lesson.classroomNumber &&
            l.dayOfWeek === lesson.dayOfWeek &&
            l.timeSlot === lesson.timeSlot &&
            l.courseId !== ignoreLessonId 
        );
    
        if (professorConflict) {
            return { type: "ProfessorConflict", lessonDetails: lesson };
        }
        if (classroomConflict) {
            return { type: "ClassroomConflict", lessonDetails: lesson };
        }
    
        return null;  
    }


// Пошук та фільтрація
function findAvailableClassrooms(timeSlot: TimeSlot, dayOfWeek: DayOfWeek): string[] {
    const [startTime, endTime] = timeSlot.split('-').map(time => Number(time.replace(':', '')));
    return classrooms
        .filter(classroom => !schedule.some(lesson => 
            lesson.classroomNumber === classroom.number &&
            lesson.dayOfWeek === dayOfWeek &&
            ((Number(lesson.timeSlot.split('-')[0].replace(':', '')) < endTime) && 
             (Number(lesson.timeSlot.split('-')[1].replace(':', '')) > startTime)) 
        ))
        .map(classroom => classroom.number);
}

function getProfessorSchedule(professorId: number): Lesson[] {
    return schedule.filter(lesson => lesson.professorId === professorId);
}

// Аналіз
function getMostPopularCourseType(): CourseType {
    const typeCount: Record<CourseType, number> = {
        Лекція: 0,
        Практична: 0,
        Лабораторна: 0
    };

    schedule.forEach(lesson => {
        const course = courses.find(course => course.id === lesson.courseId);
        if (course) {
            typeCount[course.type]++;
        }
    });

    return Object.keys(typeCount).reduce((a, b) => 
        typeCount[a as CourseType] > typeCount[b as CourseType] ? a : b
    ) as CourseType;
}

// Модифікація даних
function reassignClassroom(courseId: number, newClassroomNumber: string): boolean {
    const index = schedule.findIndex(l => l.courseId === courseId);
    if (index !== -1) {
        const updatedLesson = { ...schedule[index], classroomNumber: newClassroomNumber };
        const conflict = validateLesson(updatedLesson, courseId); 
        if (!conflict) {
            schedule[index] = updatedLesson; 
            return true; 
        }
    }
    return false; 
}

function cancelLesson(lessonId: number): void {
    schedule = schedule.filter(lesson => lesson.courseId !== lessonId);
}


// --- Тестування --- npx ts-node prakt.ts
addProfessor({ id: 1, name: "Олена", department: "Українська мова" });
addProfessor({ id: 2, name: "Михайло", department: "Вища математика" });
addProfessor({ id: 3, name: "Валерій", department: "Фізика" });
classrooms.push({ number: "101", capacity: 30, hasProjector: true });
classrooms.push({ number: "102", capacity: 20, hasProjector: false });
classrooms.push({ number: "103", capacity: 40, hasProjector: true });
courses.push({ id: 1, name: "Укр.мова", type: "Лекція" });
courses.push({ id: 2, name: "Фізика", type: "Лабораторна" });
courses.push({ id: 3, name: "Виш.мат", type: "Лекція" });

addLesson({
    courseId: 1,
    professorId: 1,
    classroomNumber: "101",
    dayOfWeek: "Понеділок",
    timeSlot: "8:00-9:35"
});

addLesson({
    courseId: 2,
    professorId: 2,
    classroomNumber: "102",
    dayOfWeek: "Вівторок",
    timeSlot: "9:45-11:20"
});

addLesson({
    courseId: 3,
    professorId: 3,
    classroomNumber: "103",
    dayOfWeek: "Понеділок",
    timeSlot: "8:00-9:35"
});

addLesson({
    courseId: 3,
    professorId: 3,
    classroomNumber: "101",
    dayOfWeek: "Середа",
    timeSlot: "11:45-13:20"
});

console.log("Тест 1: Додаємо заняття з конфліктом");
const result1 = addLesson({
    courseId: 3,
    professorId: 1,
    classroomNumber: "101",
    dayOfWeek: "Понеділок",
    timeSlot: "8:00-9:35"
});
console.log("Очікується: false"); 
console.log("Отримано: " + JSON.stringify(result1, null, 2) + "\n");

console.log("Тест 2: Перевірка конфлікту");
const conflictCheck = validateLesson({
    courseId: 3,
    professorId: 1,
    classroomNumber: "101",
    dayOfWeek: "Понеділок",
    timeSlot: "8:00-9:35"
});
if (conflictCheck) {
    console.log("Очікується: ProfessorConflict чи ClassroomConflict");
    console.log("Отримано: " + conflictCheck.type + "\n"); 
} else {
    console.log("Очікується: null");
    console.log("Отримано: null\n");
}

console.log("Тест 3: Пошук вільних аудиторій в Понеділок о 8:00-9:35");
const availableClassrooms = findAvailableClassrooms("8:00-9:35", "Понеділок");
console.log("Очікується: " + '["102"]'); 
console.log("Отримано: " + JSON.stringify(availableClassrooms) + "\n");

console.log("Тест 4: Розклад професора");
const professorSchedule = getProfessorSchedule(3);
console.log("Очікується: масив занять для професора з id 3");
console.log("Отримано: " + JSON.stringify(professorSchedule, null, 1) + "\n");

console.log("Тест 5: Найпопулярніший тип занять");
const mostPopularCourseType = getMostPopularCourseType();
console.log("Очікується: один з CourseType (Лекція / Лабораторна / Практична)");
console.log("Отримано: " + mostPopularCourseType + "\n");

console.log("Тест 6: Зміна аудиторії");
const reassignResult = reassignClassroom(1, "102"); 
console.log("Очікується: true");
console.log("Отримано: " + reassignResult + "\n");

console.log("Тест 7: Розклад до видалення заняття:");
console.log(JSON.stringify(schedule, null, 1)); 
console.log(); 


console.log("Тест 8: Видалення заняття: ");
cancelLesson(1);
console.log(JSON.stringify(schedule, null, 1));

