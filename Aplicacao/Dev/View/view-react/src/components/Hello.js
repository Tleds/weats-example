import React from 'react'

const Hello = (props)=>{
    /*return (
        <div>
            <h1>Hello</h1>
        </div>
    )*/
    return React.createElement(
        'div',
        {id:'Hello', className:'helloClass'},
        React.createElement('h1',null,'Hello')
        )
}
export default Hello