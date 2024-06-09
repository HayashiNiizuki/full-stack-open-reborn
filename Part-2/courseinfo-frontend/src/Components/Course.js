const Header = ({ course }) => {
    return (<h1>{course}</h1>)
}

const Content = ({ parts }) => {
    return parts.map(part => (
        <p key={part.id}>{part.name} {part.exercises}</p>
    ))
}

const Total = ({ parts }) => {
    return (<p style={{ fontWeight: "bold" }}>Number of exercises {parts.reduce((sum, part) => sum + part.exercises, 0)}</p>)
}

const Course = function ({ course }) {
    return (
        <div>
            <Header course={course["name"]}></Header>
            <Content parts={course["parts"]}></Content>
            <Total parts={course["parts"]}></Total>
        </div>
    )
}

export default Course