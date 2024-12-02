// Enum для статусу студента
enum StudentStatus {
    Active = "Активний",
    Academic_Leave = "Академічна відпустка",
    Graduated = "Випусився",
    Expelled = "Відрахований"
}

// Enum для типів курсів
enum CourseType {
    Mandatory = "Обов'язковий",
    Optional = "Факультативний",
    Special = "Спеціальний"
}

// Enum для семестрів
enum Semester {
    First = "Перший",
    Second = "Другий",
    Third = "Третій",
    Forth = "Четвертий"
}

// Enum для оцінок
enum GradeValue {
    Excellent = 5,
    Good = 4,
    Satisfactory = 3,
    Unsatisfactory = 2
}

// Enum для факультетів
enum Faculty {
    Computer_Science = "Комп'ютерні_науки",
    Economics = "Економіка",
    Law = "Право",
    Engineering = "Інженерія"
}

// Інтерфейс студента
interface Student {
    id: number;
    fullName: string;
    faculty: Faculty;
    year: number;
    status: StudentStatus;
    enrollmentDate: Date;
    groupNumber: string;
}

// Інтерфейс курсу
interface Course {
    id: number;
    name: string;
    type: CourseType;
    credits: number;
    semester: Semester;
    faculty: Faculty;
    maxStudents: number;
}

// Інтерфейс оцінки
interface Grade {
    studentId: number;
    courseId: number;
    grade: GradeValue;
    date: Date;
    semester: Semester;
}

// Клас для управління університетом
class UniversityManagementSystem {
    private students: Student[] = [];
    private courses: Course[] = [];
    private grades: Grade[] = [];
    private studentIdCounter = 1;
    private courseRegistrations: Map<number, number[]> = new Map(); // Курс -> список студентів

    // Реєстрація студента
    enrollStudent(student: Omit<Student, "id">): Student {
        const newStudent: Student = {
            id: this.studentIdCounter++,
            ...student
        };
        this.students.push(newStudent);
        return newStudent;
    }

// Реєстрація студента на курс
registerForCourse(studentId: number, courseId: number): void {
    const course = this.courses.find(c => c.id === courseId);
    if (!course) {
        throw new Error(`Курс не знайдено для студента ${studentId}.`);
    }

    if (!this.courseRegistrations.has(courseId)) {
        this.courseRegistrations.set(courseId, []);
    }

    const registeredStudents = this.courseRegistrations.get(courseId)!;
    if (registeredStudents.length >= course.maxStudents) {
        throw new Error(`Курс ${course.name} вже заповнений, студент ${studentId} не вміщається.`);
    }

    const student = this.students.find(s => s.id === studentId);
    if (!student || student.faculty !== course.faculty) {
        throw new Error(`Студент ${studentId} не підходить до курсу ${course.name}.`);
    }

    registeredStudents.push(studentId); // Реєстрація студента на курс
    console.log(`Студент ${studentId} зареєстрований на курс ${course.name}`); // Додано для діагностики
}

// Виставлення оцінки студенту
setGrade(studentId: number, courseId: number, grade: GradeValue): void {
    const course = this.courses.find(c => c.id === courseId);
    if (!course) {
        throw new Error(`Курс з ID ${courseId} не знайдено.`);
    }

    const registeredStudents = this.courseRegistrations.get(courseId) || [];
    if (!registeredStudents.includes(studentId)) {
        throw new Error(`Студент ${studentId} не зареєстрований на курс ${course.name}.`);
    }

    this.grades.push({
        studentId,
        courseId,
        grade,
        date: new Date(),
        semester: course.semester
    });

    console.log(`Оцінка ${grade} додана студенту ${studentId} за курс ${course.name}.`);
}




    // Оновлення статусу студента
    updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
        const student = this.students.find(s => s.id === studentId);
        if (!student) {
            throw new Error(`Студента ${studentId} не знайдено.`);
        }

        if (student.status === StudentStatus.Graduated || student.status === StudentStatus.Expelled) {
            throw new Error(`Не можна змінити статус випускника або відрахованого студента ${studentId}.`);
        }

        student.status = newStatus;
    }

    // Отримання студентів за факультетом
    getStudentsByFaculty(faculty: Faculty): Student[] {
        return this.students.filter(s => s.faculty === faculty);
    }

    // Отримання оцінок студента
    getStudentGrades(studentId: number): Grade[] {
        return this.grades.filter(g => g.studentId === studentId);
    }

    // Отримання доступних курсів
    getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
        return this.courses.filter(c => c.faculty === faculty && c.semester === semester);
    }

    // Розрахунок середньої оцінки
    calculateAverageGrade(studentId: number): number {
        const studentGrades = this.getStudentGrades(studentId);
        if (studentGrades.length === 0) {
            return 0; // Якщо немає оцінок, середня оцінка — 0
        }
    
        const totalGrades = studentGrades.reduce((sum, current) => sum + current.grade, 0);
        return parseFloat((totalGrades / studentGrades.length).toFixed(2));
    }

    // Отримання списку відмінників
    getTopStudentsByFaculty(faculty: Faculty): Student[] {
        const students = this.getStudentsByFaculty(faculty);
        return students.filter(student => {
            const avgGrade = this.calculateAverageGrade(student.id);
            return avgGrade >= 4.5; // Відмінник — середній бал >= 4.5
        });
    }
}

// Приклад використання
const ums = new UniversityManagementSystem();

// Реєстрація студентів
const student1 = ums.enrollStudent({
    fullName: "Олег Синій",
    faculty: Faculty.Computer_Science,
    year: 1,
    status: StudentStatus.Active,
    enrollmentDate: new Date(),
    groupNumber: "КП101"
});
const student2 = ums.enrollStudent({
    fullName: "Анна Жовта",
    faculty: Faculty.Economics,
    year: 4,
    status: StudentStatus.Active,
    enrollmentDate: new Date(),
    groupNumber: "Е102"
});
const student3 = ums.enrollStudent({
    fullName: "Степан Зелений",
    faculty: Faculty.Computer_Science,
    year: 2,
    status: StudentStatus.Active,
    enrollmentDate: new Date(),
    groupNumber: "КП103"
});


// Реєстрація курсів
const course1 = { 
    id: 1, 
    name: "Основи Програмування", 
    type: CourseType.Mandatory, 
    credits: 5, 
    semester: Semester.First, 
    faculty: Faculty.Computer_Science, 
    maxStudents: 2 
};
const course2 = { 
    id: 2, 
    name: "Економічний Аналіз", 
    type: CourseType.Mandatory, 
    credits: 4, 
    semester: Semester.Forth, 
    faculty: Faculty.Economics, 
    maxStudents: 2 
};

// Додавання курсів в університет
ums['courses'].push(course1, course2);

// Спроба зареєструвати студентів на курси
console.log("1. Реєстрація студентів на курси");
try {
    ums.registerForCourse(student1.id, course1.id); // Успішно
} catch (e: unknown) {
    if (e instanceof Error) {
        console.log(e.message);
    }
}

try {
    ums.registerForCourse(student2.id, course2.id); // Успішно
} catch (e: unknown) {
    if (e instanceof Error) {
        console.log(e.message);
    }
}

try {
    ums.registerForCourse(student3.id, course1.id); // Не вдалося, бо курс повний
} catch (e: unknown) {
    if (e instanceof Error) {
        console.log(e.message); // Виведе "Course Introduction to Programming is full for Student 3."
    }
}

try {
    ums.registerForCourse(student1.id, course2.id); // Не вдалося, бо факультет не співпадає
} catch (e: unknown) {
    if (e instanceof Error) {
        console.log(e.message); // Виведе "Student 1 is not eligible for Economics 101 course."
    }
}
console.log("- - - - - - - -")

console.log("2. Виставлення оцінки студентам");
try {
    ums.setGrade(student1.id, course1.id, GradeValue.Excellent); // Успішно
    ums.setGrade(student1.id, course1.id, GradeValue.Good); // Успішно
    ums.setGrade(student2.id, course2.id, GradeValue.Good); // Успішно
    ums.setGrade(student3.id, course1.id, GradeValue.Satisfactory); // Не вдалося, студент не зареєстрований на курс
} catch (e: unknown) {
    if (e instanceof Error) {
        console.log(e.message); // Виведе "Student 3 is not registered for Introduction to Programming course."
    }
}

// Оновлення статусу студента
ums.updateStudentStatus(student2.id, StudentStatus.Academic_Leave); // Студент переходить в академічну відпустку
ums.updateStudentStatus(student2.id, StudentStatus.Graduated); // Студент стає випускником

// Тепер пробуємо змінити статус на інший
try {
    ums.updateStudentStatus(student2.id, StudentStatus.Active); // Не вдалося, студент вже випускник
} catch (e: unknown) {
    if (e instanceof Error) {
        console.log(e.message); // Виведе "Cannot change status of graduated or expelled student 1."
    }
}
console.log("- - - - - - - -")


// Отримання студентів за факультетом
console.log("3. Студенти за факультетом Комп'ютерні науки");
console.log(ums.getStudentsByFaculty(Faculty.Computer_Science)); // Виведе студентів факультету Computer_Science
console.log("- - - - - - - -")

// Отримання оцінок студента
console.log("4. Отримання оцінок студента")
console.log(ums.getStudentGrades(student1.id)); // Виведе оцінки студента John Doe
console.log("- - - - - - - -")

// Отримання доступних курсів за факультетом та семестром
console.log("5. Отримання доступних курсів за факультетом та семестром")
console.log(ums.getAvailableCourses(Faculty.Computer_Science, Semester.First)); // Виведе доступні курси для факультету Computer_Science на перший семестр
console.log("- - - - - - - -")

// Розрахунок середньої оцінки студента
console.log("6. Розрахунок середньої оцінки студента 1")
console.log(ums.calculateAverageGrade(student1.id)); // Виведе середню оцінку для студента John Doe
console.log("- - - - - - - -")

// Отримання відмінників за факультетом
console.log("7. Отримання відмінників за факультетом")
console.log(ums.getTopStudentsByFaculty(Faculty.Computer_Science)); // Виведе студентів, які отримали відмінні оцінки
console.log("- - - - - - - -")

//відмінник 3 з балом 3 а у 1 бал 5?
// повтор "Зареєстровані студентии до курсу Основи Програмування: 1,3" 