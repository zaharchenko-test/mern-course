import React from 'react'
import {Link} from 'react-router-dom'


export const LinksList = ({links}) => {
    if (!links.length) {
        return <p className="center">ссылок пока нет</p>
    }
    return (
        <table>
        <thead>
          <tr>
              <th>№</th>
              <th>оригинальная</th>
              <th>сокращенная</th>
              <th>открыть</th>
          </tr>
        </thead>
            
        <tbody>
            { links.map((link, index) => {
                return (
                <tr key={link._id}>
            <td>{index + 1}</td>
            <td>{link.from}</td>
            <td>{link.to}</td>
            <th>
                <Link to={`/detail/${link._id}`} >open </Link>
            </th>
          </tr>
                )
            }) }  
        
        </tbody>
      </table>
    )
}