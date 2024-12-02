// Enum 
enum StudentStatus {
    Active = "Активний",
    Academic_Leave = "Академічна відпустка",
    Graduated = "Випусився",
    Expelled = "Відрахований"
}

enum CourseType {
    Mandatory = "Обов'язковий",
    Optional = "Факультативний",
    Special = "Спеціальний"
}

enum Semester {
    First = "Перший",
    Second = "Другий",
    Third = "Третій",
    Forth = "Четвертий"
}

// Enum для оцінок
enum Grade {
    Excellent = 5,
    Good = 4,
    Satisfactory = 3,
    Unsatisfactory = 2
}

enum Faculty {
    Computer_Science = "Комп'ютерні_науки",
    Economics = "Економіка",
    Law = "Право",
    Engineering = "Інженерія"
}

// Інтерфейси
interface Student {
    id: number;
    fullName: string;
    faculty: Faculty;
    year: number;
    status: StudentStatus;
    enrollmentDate: Date;
    groupNumber: string;
}

interface Course {
    id: number;
    name: string;
    type: CourseType;
    credits: number;
    semester: Semester;
    faculty: Faculty;
    maxStudents: number;
}

interface GradeRecord {
    studentId: number;
    courseId: number;
    grade: Grade;
    date: Date;
    semester: Semester;
}

// Клас для керування університетом
class UniversityManagementSystem {
    private students: Student[] = [];
    private courses: Course[] = [];
    private grades: GradeRecord[] = [];
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

        // Перевірка на переповненість курсу
        if (registeredStudents.length >= course.maxStudents) {
            console.log(`Курс ${course.name} вже заповнений. Студент ${studentId} не може бути зареєстрований.`);
            return; // Якщо курс заповнений, не додаємо студента
        }

        const student = this.students.find(s => s.id === studentId);
        if (!student || student.faculty !== course.faculty) {
            console.log(`Студент ${studentId} не підходить до курсу ${course.name}.`);
            return; // Студент не підходить, не додаємо його
        }

        // Додаємо студента, якщо він пройшов перевірки
        registeredStudents.push(studentId); 
        console.log(`Студент ${studentId} зареєстрований на курс ${course.name}`);
    }

    // Отримання студентів за факультетом, тільки зареєстрованих на курси
    getStudentsByFaculty(faculty: Faculty): Student[] {
        return this.students.filter(s => s.faculty === faculty && this.courseRegistrations.get(1)?.includes(s.id));
    }

    // Виставлення оцінки студенту
    setGrade(studentId: number, courseId: number, grade: Grade): void {
        const course = this.courses.find(c => c.id === courseId);
        if (!course) {
            throw new Error(`Курс з ID ${courseId} не знайдено.`);
        }

        const registeredStudents = this.courseRegistrations.get(courseId) || [];
        if (!registeredStudents.includes(studentId)) {
            console.log(`Студент ${studentId} не зареєстрований на курс ${course.name}.`);
            return; // Студент не зареєстрований, не можна виставити оцінку
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

    // Отримання оцінок студента
    getStudentGrades(studentId: number): GradeRecord[] {
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

    // Отримання відмінників
    getTopStudentsByFaculty(faculty: Faculty): Student[] {
        const students = this.getStudentsByFaculty(faculty);
        return students.filter(student => {
            const avgGrade = this.calculateAverageGrade(student.id);
            return avgGrade >= 4.5; // Відмінник — середній бал >= 4.5
        });
    }
}



// Перевірка
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
    year: 1,
    status: StudentStatus.Active,
    enrollmentDate: new Date(),
    groupNumber: "КП103"
});
const student4 = ums.enrollStudent({
    fullName: "Катя Руда",
    faculty: Faculty.Computer_Science,
    year: 1,
    status: StudentStatus.Active,
    enrollmentDate: new Date(),
    groupNumber: "КП101"
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

ums['courses'].push(course1, course2);

// Реєстрація студентів на курси
console.log("1. Реєстрація студентів на курси");
try {
    ums.registerForCourse(student1.id, course1.id); 
} catch (e: unknown) {
    if (e instanceof Error) {
        console.log(e.message);
    }
}

try {
    ums.registerForCourse(student2.id, course2.id); 
} catch (e: unknown) {
    if (e instanceof Error) {
        console.log(e.message);
    }
}

try {
    ums.registerForCourse(student3.id, course1.id); 
} catch (e: unknown) {
    if (e instanceof Error) {
        console.log(e.message); 
    }
}

try {
    ums.registerForCourse(student4.id, course1.id); // Не вдасться, бо курс повний
} catch (e: unknown) {
    if (e instanceof Error) {
        console.log(e.message);
    }
}

try {
    ums.registerForCourse(student1.id, course2.id); // Не вийде, бо факультет не співпадає
} catch (e: unknown) {
    if (e instanceof Error) {
        console.log(e.message); 
    }
}
console.log("- - - - - - - -")

console.log("2. Виставлення оцінки студентам");
try {
    ums.setGrade(student1.id, course1.id, Grade.Excellent); 
    ums.setGrade(student1.id, course1.id, Grade.Excellent); 
    ums.setGrade(student1.id, course1.id, Grade.Good); 
    ums.setGrade(student3.id, course1.id, Grade.Satisfactory); 
} catch (e: unknown) {
    if (e instanceof Error) {
        console.log(e.message); 
    }
}
console.log("- - - - - - - -")


// Оновлення статусу студента
console.log("3. Перевірка статусу");
ums.updateStudentStatus(student2.id, StudentStatus.Academic_Leave); 
ums.updateStudentStatus(student2.id, StudentStatus.Graduated); 

// Зміна статусу
try {
    ums.updateStudentStatus(student2.id, StudentStatus.Active); // Не вийде, бо студент вже випускник
} catch (e: unknown) {
    if (e instanceof Error) {
        console.log(e.message); 
    }
}
console.log("- - - - - - - -")


// Отримання студентів за факультетом
console.log("4. Студенти за факультетом Комп'ютерні науки");
console.log(ums.getStudentsByFaculty(Faculty.Computer_Science)); 
console.log("- - - - - - - -")

// Отримання оцінок студента
console.log("5. Отримання оцінок студента 1")
console.log(ums.getStudentGrades(student1.id)); 
console.log("- - - - - - - -")

// Отримання доступних курсів за факультетом та семестром
console.log("6. Отримання доступних курсів за факультетом Комп'ютерні Науки на першому семестрі")
console.log(ums.getAvailableCourses(Faculty.Computer_Science, Semester.First)); 
console.log("- - - - - - - -")

// Розрахунок середньої оцінки студента
console.log("7. Розрахунок середньої оцінки студентів 1 та 2")
console.log(ums.calculateAverageGrade(student1.id)); 
console.log(ums.calculateAverageGrade(student2.id)); 
console.log("- - - - - - - -")

// Отримання відмінників за факультетом
console.log("8. Отримання відмінників за факультетом")
console.log(ums.getTopStudentsByFaculty(Faculty.Computer_Science)); 
console.log("- - - - - - - -")

