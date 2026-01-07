import { errorHandler } from '../utils/error.js';
import { db } from "../db.js";

// ============= APPLICATION STAGES CONTROLLERS =============

export const createStages = (req, res, next) => {
    const { stageOne, stageTwo, stageThree, stageFour } = req.body;

    // First, delete existing stages
    const deleteQuery = `DELETE FROM application_stages`;
    
    db.query(deleteQuery, (err) => {
        if(err) return next(err);

        // Then insert new stages
        const insertQuery = `INSERT INTO application_stages (stage_number, description) VALUES (?,?), (?,?), (?,?), (?,?)`;
        
        db.query(insertQuery, [
            1, stageOne,
            2, stageTwo,
            3, stageThree,
            4, stageFour
        ], (err, data) => {
            if(err) return next(err);
            return res.status(200).json('Stages Successfully Created');
        });
    });
};

export const getStages = (req, res, next) => {
    const query = `SELECT * FROM application_stages ORDER BY stage_number ASC`;

    db.query(query, (err, data) => {
        if(err) return next(err);
        return res.status(200).json(data);
    });
};

export const updateStage = (req, res, next) => {
    const { description } = req.body;
    const { id } = req.params;

    const query = `UPDATE application_stages SET description = ? WHERE id = ?`;

    db.query(query, [description, id], (err, data) => {
        if(err) return next(err);
        return res.status(200).json("Stage Updated Successfully");
    });
};

export const deleteStage = (req, res, next) => {
    const { id } = req.params;

    const query = `DELETE FROM application_stages WHERE id = ?`;

    db.query(query, [id], (err, data) => {
        if(err) return next(err);
        return res.status(200).json("Stage Deleted Successfully");
    });
};

// ============= APPLICATION DOCUMENTS CONTROLLERS =============

export const createDocument = (req, res, next) => {
    const { document_name } = req.body;

    const query = `INSERT INTO application_documents (document_name) VALUES (?)`;

    db.query(query, [document_name], (err, data) => {
        if(err) return next(err);
        return res.status(200).json('Document Successfully Created');
    });
};

export const getDocuments = (req, res, next) => {
    const query = `SELECT * FROM application_documents ORDER BY created_at DESC`;

    db.query(query, (err, data) => {
        if(err) return next(err);
        return res.status(200).json(data);
    });
};

export const getDocumentById = (req, res, next) => {
    const { id } = req.params;

    const query = `SELECT * FROM application_documents WHERE id = ?`;

    db.query(query, [id], (err, data) => {
        if(err) return next(err);
        return res.status(200).json(data);
    });
};

export const updateDocument = (req, res, next) => {
    const { document_name } = req.body;
    const { id } = req.params;

    const query = `UPDATE application_documents SET document_name = ? WHERE id = ?`;

    db.query(query, [document_name, id], (err, data) => {
        if(err) return next(err);
        return res.status(200).json("Document Updated Successfully");
    });
};

export const deleteDocument = (req, res, next) => {
    const { id } = req.params;

    const query = `DELETE FROM application_documents WHERE id = ?`;

    db.query(query, [id], (err, data) => {
        if(err) return next(err);
        return res.status(200).json("Document Deleted Successfully");
    });
};

// ============= APPLICATION TIMELINE CONTROLLERS =============

export const createTimeline = (req, res, next) => {
    const { title, time } = req.body;

    const query = `INSERT INTO application_timeline (title, time) VALUES (?,?)`;

    db.query(query, [title, time], (err, data) => {
        if(err) return next(err);
        return res.status(200).json('Timeline Successfully Created');
    });
};

export const getTimelines = (req, res, next) => {
    const query = `SELECT * FROM application_timeline ORDER BY created_at DESC`;

    db.query(query, (err, data) => {
        if(err) return next(err);
        return res.status(200).json(data);
    });
};

export const getTimelineById = (req, res, next) => {
    const { id } = req.params;

    const query = `SELECT * FROM application_timeline WHERE id = ?`;

    db.query(query, [id], (err, data) => {
        if(err) return next(err);
        return res.status(200).json(data);
    });
};

export const updateTimeline = (req, res, next) => {
    const { title, time } = req.body;
    const { id } = req.params;

    const query = `UPDATE application_timeline SET title = ?, time = ? WHERE id = ?`;

    db.query(query, [title, time, id], (err, data) => {
        if(err) return next(err);
        return res.status(200).json("Timeline Updated Successfully");
    });
};

export const deleteTimeline = (req, res, next) => {
    const { id } = req.params;

    const query = `DELETE FROM application_timeline WHERE id = ?`;

    db.query(query, [id], (err, data) => {
        if(err) return next(err);
        return res.status(200).json("Timeline Deleted Successfully");
    });
};