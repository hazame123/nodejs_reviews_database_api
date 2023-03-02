const express = require('express')
const router = express.Router()
const pool = require('../config/db')

router.get('/reviews', async (req, res) => {
    pool.getConnection( (err, conn) => {
        if (err) throw err

        try {
            const qry = `SELECT * FROM reviews`
            conn.query(qry, (err, result) => {
                conn.release()
                if (err) throw err
                res.send(JSON.stringify(result))
            })
        } catch (err) {
            console.log(err)
            res.end()
        }
    })
})

router.post('/addReview', async (req, res) => {
    const name = req.body.name
    const rating = req.body.rating
    const body = req.body.review
    const summery = req.body.summery

    pool.getConnection( (err, conn) => {
        if (err) throw err
        
        const qry = `INSERT INTO reviews(name, rating, body, summery) VALUES(?, ?, ?, ?)`
        conn.query(qry, [name, rating, body, summery], (err, result) => {
            conn.release()
            if (err) throw err
            console.log('Review Added!')
        })
        res.redirect('https://hnkcitycontractors.co.uk/testimonials')
        res.end()
    })
})

module.exports = router