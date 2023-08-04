import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../components/style.css'
function Books() {
    const [books, setBooks] = useState([]);

    useEffect(()=>{
        const fetchAllBooks = async ()=>{
            try {
                const res = await axios.get("http://localhost:5000/books")
                console.log(res)
                setBooks(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllBooks();
    }, [])

    const handleDelete = async(id) =>{
        try{
            await axios.delete("http://localhost:5000/books/"+id)
            window.location.reload()
        } catch(err){
            console.log(err)
        }
    }

  return (
    <div>
      <h1>Book Shop</h1>
      <div className="books">
        {books.map(book=>(
            <div className="book">
                {book.cover && <img src='book.cover' alt=''/>}
                <h2>{book.title}</h2>
                <p>{book.desc}</p>
                <span>{book.price}</span>
                <button className='delete' onClick={()=>handleDelete(book.id)}>Delete</button>
                <button><Link to={`/update/${book.id}`}>Update</Link></button>

            </div>
        ))}
      </div>
      <button><Link to={'/add'}>Add new books</Link></button>
    </div>
  )
}

export default Books
