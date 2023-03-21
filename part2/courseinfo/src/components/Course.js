import Header from "./Header"

const Part = ({ part }) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

const Content = ({ content }) => {
    let totalExercise = content.map(a => a["exercises"]).reduce((a, b) => a + b)

    return (
        <div>
            {content.map(a => <Part key={a.id} part={a} />)}

            <strong>total of {totalExercise} exercises</strong>
        </div>
    )
}

const Course = ({ courses }) => {
    return (
        <div>
            <h1>Web development curriculum</h1>

            {courses.map(course => {
                return (
                    <div>
                        <Header header={course.name} />
                        <Content content={course.parts} />
                    </div>
                )
            })}
        </div>
    )
}

export default Course