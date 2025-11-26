import { errorHandler } from '../utils/error.js'
import { db } from "../db.js";

// ============= CLUB MAIN CONTROLLERS =============

export const createClubMain = (req, res, next) => {
  
    const {title, subtitle, intro, imageOne, imageTwo} = req.body

    const query = `INSERT INTO club_main (title, subtitle, intro, imageone, imagetwo) VALUES (?,?,?,?,?)`;

    db.query(query, [title, subtitle, intro, imageOne, imageTwo], (err, data) => {

        if(err) return next(err)

        return res.status(200).json('Club Main Successfully Created')
    })
}
 
export const updateClubMain = (req, res, next) => {

    const {title, subtitle, intro, imageOne, imageTwo} = req.body
    const {id} = req.params

    const query = `UPDATE club_main SET title = ?, subtitle = ?, intro = ?,
     imageone = ?, imagetwo = ? WHERE id = ?`

    db.query(query, [title, subtitle, intro, imageOne, imageTwo, id], (err, data) => {
        if(err) return next(err)

        return res.status(200).json("Club Main Updated Successfully")
    })
}

export const getClubMain = (req, res, next) => {

    const query = `SELECT * FROM club_main`

    db.query(query, (err, data) => {
        if(err) return next(err)
        return res.status(200).json(data)
    })
}

export const getClubMainById = (req, res, next) => {
    
    const {id} = req.params

    const query = `SELECT * FROM club_main WHERE id = ?`

    db.query(query, [id], (err, data) => {
        if(err) return next(err)
        return res.status(200).json(data)
    })
}

export const deleteClubMain = (req, res, next) => {
    
    const {id} = req.params

    const query = `DELETE FROM club_main WHERE id = ?`

    db.query(query, [id], (err, data) => {
        if(err) return next(err)
        return res.status(200).json("Club Main Deleted Successfully")
    })
}

// ============= CLUB SUB CONTROLLERS =============

export const createClubSub = (req, res, next) => {
  
    const {title, subtitle, intro} = req.body

    const query = `INSERT INTO club_sub (title, subtitle, intro) VALUES (?,?,?)`;

    db.query(query, [title, subtitle, intro], (err, data) => {

        if(err) return next(err)

        return res.status(200).json('Club Sub Successfully Created')
    })
}
 
export const updateClubSub = (req, res, next) => {

    const {title, subtitle, intro} = req.body
    const {id} = req.params

    const query = `UPDATE club_sub SET title = ?, subtitle = ?, intro = ? WHERE id = ?`

    db.query(query, [title, subtitle, intro, id], (err, data) => {
        if(err) return next(err)

        return res.status(200).json("Club Sub Updated Successfully")
    })
}

export const getClubSub = (req, res, next) => {

    const query = `SELECT * FROM club_sub`

    db.query(query, (err, data) => {
        if(err) return next(err)
        return res.status(200).json(data)
    })
}

export const getClubSubById = (req, res, next) => {
    
    const {id} = req.params

    const query = `SELECT * FROM club_sub WHERE id = ?`

    db.query(query, [id], (err, data) => {
        if(err) return next(err)
        return res.status(200).json(data)
    })
}

export const deleteClubSub = (req, res, next) => {
    
    const {id} = req.params

    const query = `DELETE FROM club_sub WHERE id = ?`

    db.query(query, [id], (err, data) => {
        if(err) return next(err)
        return res.status(200).json("Club Sub Deleted Successfully")
    })
}

// ============= CLUB MEMBERS CONTROLLERS =============

export const createClubMember = (req, res, next) => {
  
    const {club_id, name, role, photo} = req.body

    const query = `INSERT INTO club_members (club_id, name, role, photo) VALUES (?,?,?,?)`;

    db.query(query, [club_id, name, role, photo || ''], (err, data) => {

        if(err) return next(err)

        return res.status(200).json('Club Member Successfully Created')
    })
}
 
export const updateClubMember = (req, res, next) => {

    const {club_id, name, role, photo} = req.body
    const {id} = req.params

    const query = `UPDATE club_members SET club_id = ?, name = ?, role = ?, photo = ? WHERE id = ?`

    db.query(query, [club_id, name, role, photo, id], (err, data) => {
        if(err) return next(err)

        return res.status(200).json("Club Member Updated Successfully")
    })
}

export const getClubMembers = (req, res, next) => {

    const query = `SELECT * FROM club_members`

    db.query(query, (err, data) => {
        if(err) return next(err)
        return res.status(200).json(data)
    })
}

export const getClubMembersByClubId = (req, res, next) => {
    
    const {club_id} = req.params

    const query = `SELECT * FROM club_members WHERE club_id = ?`

    db.query(query, [club_id], (err, data) => {
        if(err) return next(err)
        return res.status(200).json(data)
    })
}

export const getClubMemberById = (req, res, next) => {
    
    const {id} = req.params

    const query = `SELECT * FROM club_members WHERE id = ?`

    db.query(query, [id], (err, data) => {
        if(err) return next(err)
        return res.status(200).json(data)
    })
}

export const deleteClubMember = (req, res, next) => {
    
    const {id} = req.params

    const query = `DELETE FROM club_members WHERE id = ?`

    db.query(query, [id], (err, data) => {
        if(err) return next(err)
        return res.status(200).json("Club Member Deleted Successfully")
    })
}

// =============  GET CLUB WITH MEMBERS =============

export const getClubWithMembers = (req, res, next) => {
    
    const {club_id} = req.params

    const clubQuery = `SELECT * FROM club_sub WHERE id = ?`
    const membersQuery = `SELECT * FROM club_members WHERE club_id = ?`

    db.query(clubQuery, [club_id], (err, clubData) => {
        if(err) return next(err)

        db.query(membersQuery, [club_id], (err, membersData) => {
            if(err) return next(err)

            return res.status(200).json({
                club: clubData[0],
                members: membersData
            })
        })
    })
}