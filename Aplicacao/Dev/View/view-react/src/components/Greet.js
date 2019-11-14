import React from 'react'

/*function Greet(){
    return <h1>Hello Vishwas</h1>
}*/
export const Greet = (props) => {
console.log(props);
return (
    <div>
    <h1>Hello {props.name} is {props.heroName}</h1>
    {props.children}
    </div>
    )
}

