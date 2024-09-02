const db = require('../dbConnec');


exports.createChapter = async (data) => {
    const [result] = await db.execute(
        'INSERT INTO chapters (title, description, video_link, external_link, chapter_no, journey_id) VALUES (?, ?, ?, ?, ?, ?)',
        [data.title, data.description, data.video_link, data.external_link, data.chapter_no, data.journey_id]
    );
    return result.insertId;
};


exports.getChaptersByJourneyId = async (journeyId) => {
    const [rows] = await db.execute('SELECT * FROM chapters WHERE journey_id = ? ORDER BY chapter_no ASC', [journeyId]);
    return rows;
};


exports.getChapterById = async (id) => {
    const [rows] = await db.execute('SELECT * FROM chapters WHERE id = ?', [id]);
    return rows[0];
};


exports.updateChapter = async (id, data) => {
    const [result] = await db.execute(
        'UPDATE chapters SET title = ?, description = ?, video_link = ?, external_link = ?, chapter_no = ? WHERE id = ?',
        [data.title, data.description, data.video_link, data.external_link, data.chapter_no, id]
    );
    return result.affectedRows > 0;
};


exports.deleteChapter = async (id) => {
    const [result] = await db.execute('DELETE FROM chapters WHERE id = ?', [id]);
    return result.affectedRows > 0;
};
