const formulario = document.getElementById ('Form')

const cardStudents = document.getElementById ('Cards_students')
const cardTeachers = document.getElementById ('Cards_teachers')

const templateStudent = document.getElementById ('Template_student').content
const templateTeacher = document.getElementById ('Template_teacher').content

const alert = document.querySelector ('.alert')

document.addEventListener ('click', (e) =>
{
    if (e.target.dataset.uid)
    {
        if (e.target.matches ('.btn-success'))
        {
            students.map ((item) =>
            {
                if (item.uid === e.target.dataset.uid)
                {
                    item.setState = true
                }

                return item
            })
        }

        
        if (e.target.matches ('.btn-danger'))
        {
            students.map ((item) =>
            {
                if (item.uid === e.target.dataset.uid)
                {
                    item.setState = false
                }

                return item
            })
        }

        Person.drawPersonUI (students, 'Student')
    }
})

const students = []
const teachers = []

// Construcción de Clases

class Person 
{
    constructor (Name, Age)
    {
        this.Name = Name
        this.Age = Age
        this.uid = `${Date.now()}`
    }

    static drawPersonUI (People, Type)
    {
        if (Type === 'Student')
        {
            cardStudents.textContent = ''

            const fragment = document.createDocumentFragment ()

            People.forEach ((item) => 
            {
                fragment.appendChild (item.addNewStudent ())
            })

            cardStudents.appendChild(fragment);
        }

        if (Type === 'Teacher')
        {
            cardTeachers.textContent = ''

            const fragment = document.createDocumentFragment ()

            People.forEach ((item) => 
            {
                fragment.appendChild (item.addNewTeacher ())
            })

            cardTeachers.appendChild(fragment);
        }
    }
}

class Student extends Person
{
    #state = false
    #student = "Student"

    set setState (state)
    {
        this.#state = state
    }

    get getStudent ()
    {
        return this.#student
    }

    addNewStudent ()
    {
        const clone = templateStudent.cloneNode (true)

        clone.querySelector ('h5 .text-primary').textContent = this.Name
        clone.querySelector ('h6').textContent = this.getStudent
        clone.querySelector ('.lead').textContent = this.Age
        
        if (this.#state)
        {
            clone.querySelector ('.badge').className = "badge bg-success"
            clone.querySelector ('.btn-success').disabled = true
            clone.querySelector ('.btn-danger').disabled = false
        }
        else
        {
            clone.querySelector ('.badge').className = "badge bg-danger"
            clone.querySelector ('.btn-success').disabled = false
            clone.querySelector ('.btn-danger').disabled = true
        }

        clone.querySelector ('.badge').textContent = this.#state ? 'Pass' : 'Fail'

        clone.querySelector ('.btn-success').dataset.uid = this.uid
        clone.querySelector ('.btn-danger').dataset.uid = this.uid

        return clone
    }
}

class Teacher extends Person
{
    #teacher = 'Teacher'

    addNewTeacher ()
    {
        const clone = templateTeacher.cloneNode (true)

        clone.querySelector ('h5').textContent = this.Name
        clone.querySelector ('h6').textContent = this.#teacher
        clone.querySelector ('.lead').textContent = this.Age

        return clone
    }
}

formulario.addEventListener ('submit', (e) =>
{
    e.preventDefault ()
    alert.classList.add ('d-none')

    const data = new FormData (formulario)
    const [Name, Age, Option] = [...data.values ()]

    if (!Name.trim () || !Age.trim () || !Option.trim ())
    {
        alert.classList.remove ('d-none')
        return
    }

    if (Option === 'Student')
    {
        const student = new Student (Name, Age)
        students.push (student)
        Person.drawPersonUI (students, Option)
    }

    if (Option === 'Teacher')
    {
        const teacher = new Teacher (Name, Age)
        teachers.push (teacher)
        Person.drawPersonUI (teachers, Option)
    }
})