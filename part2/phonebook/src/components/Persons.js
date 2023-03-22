const Persons = ({ persons, filteredName, isFilter }) => {
    return (
        <div>
            {isFilter ?
                filteredName.map(person => <div>{person.name} {person.number}</div>)
                :
                persons.map(person => <div>{person.name} {person.number}</div>)
            }
        </div>
    )
}

export default Persons