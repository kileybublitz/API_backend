import { Pool } from 'pg'
import { Response, Request } from 'express'


const pool = new Pool({
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    host: 'localhost',
    password: process.env.PGPASSWORD, 
    port: 5432
})

export const getTodos = (request: Request, response: Response) => {
    pool.query('SELECT * FROM todos ORDER BY id ASC', (error, results) => {
        if(error) {
            throw error
        }
        response.status(200).json(results.rows)
    }) 
}

export const getTodoById = (request: Request, response: Response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM todos WHERE id = $1', [id], (error, results) => {
        if(error){
            throw error;
        }
        response.status(200).json(results.rows)
    })
}

export const createTodo = (request: Request, response: Response) => {
    const {title} = request.body

    pool.query('INSERT INTO todos (title) VALUES ($1)', [title], (error, results) => {
        if(error){
            throw error
        }
        response.status(201).send(`Todo added with ID: ${results}`)
    })
}

export const updateTodo = (request: Request, response: Response) => {
    const id = parseInt(request.params.id)
    const {title, completed} = request.body

    pool.query('UPDATE todos SET title = $1, completed = $2 WHERE id = $3',
    [title, completed, id], 
    (error, results) => {
        if(error) {
            throw error
        }
        response.status(200).send(`Todo modified with ID: ${id}`)
    })
}

export const deleteTodo = (request: Request, response: Response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM todos WHERE id = $1', [id], (error, results) => {
        if(error){
            throw error
        }
        response.status(200).send(`Todo deleted with ID: ${id}`)
    })
}