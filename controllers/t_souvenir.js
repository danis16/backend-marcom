'use strict';

const Response = require('../config/response');
const ObjectID = require('mongodb').ObjectID;
const moment = require('moment');
const logger = require('../config/log');
const tsouvenirModel = require('../models/t_souvenir.model');
var now = new Date();

const TSItemController = {
    GetAll : (req, res, next) => {
        logger.info("Initialized Transaction Item Souvenir : GetAll" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));

        global.dbo.collection('t_souvenir').toArray((err, data) => {
            if(err)
            {
                logger.info("Transaction Item Souvenir  : GetAll Error" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
                logger.error(err);
                return next(new Error());
            }



            logger.info("Transaction Item Souvenir  : GetAll successfully" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
            logger.info({data : data}, "Transaction Item Souvenir  : GetAll content");
            Response.send(res, 200, data);
        });
    },
    GetDetail : (req, res, next) => {
        logger.info("Initialized Transaction Item Souvenir  : GetDetail" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
        let id = req.params.id;

        global.dbo.collection('t_souvenir').find({is_delete : false}).
        
        toArray((err, data) => {
            if(err)
            {
                logger.info("Transaction Item Souvenir  : GetDetail Error" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
                logger.error(err);
                return next(new Error());
            }

            logger.info("Transaction Item Souvenir  : GetDetail successfully" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
            logger.info({data : data}, "Transaction Item Souvenir  : GetDetail content");
            Response.send(res, 200, data);
        });
    },
    // Create : (req, res, next) => {
    //     logger.info("Initialized Transaction Item Souvenir : Create" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
    //     let reqdata = req.body;
    //     var data = {};

    //     data.t_souvenir_id = ObjectID(reqdata.t_souvenir_id);
    //     data.m_souvenir_id = ObjectID(reqdata.m_souvenir_id);
    //     data.qty = reqdata.qty;
    //     data.qty_settlement = reqdata.qty_settlement;
    //     data.note = reqdata.note;
    //     data.is_delete = false;
    //     data.created_by = reqdata.created_by;
    //     data.created_date = now;
    //     data.updated_by = null;
    //     data.updated_date = null;
        
        
    //     var model = new tsitemModel(data);

    //     global.dbo.collection('t_souvenir_item').insertOne(model, function(err, data){
    //         if(err)
    //         {
    //             logger.info("Transaction Item Souvenir : Create Error" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
    //             logger.error(err);
    //             return next(new Error());
    //         }
    //         logger.info("Transaction Item Souvenir : Create successfully" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
    //         logger.info({data : data}, "Transaction Item Souvenir : Create content");
    //         Response.send(res, 200, data);
    //     });
    // },
    // Update : (req, res, next) => {
    //     logger.info("Initialized Transaction Item Souvenir : Update" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));

    //     let id = req.params.id;
    //     let reqdata = req.body;
    //     var oldmodel = {};
    //     var updatemodel = {};

    //     global.dbo.collection('t_souvenir_item').find({is_delete : false, '_id' : ObjectID(id)}).toArray((err, data) => {
    //         if(err)
    //         {
    //             logger.info("Transaction Item Souvenir : Update Error" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
    //             logger.error(err);
    //             return next(new Error());
    //         }

    //         oldmodel = data.map((entity) => {
    //             return new tsitemModel(entity);
    //         });

    //         updatemodel._id = ObjectID(id);

    //         if(reqdata.t_souvenir_id == null || reqdata.t_souvenir_id == undefined || reqdata.t_souvenir_id == "")
    //         {
    //             updatemodel.t_souvenir_id = oldmodel[0].t_souvenir_id;
    //         }
    //         else
    //         {
    //             updatemodel.t_souvenir_id = ObjectID(reqdata.t_souvenir_id); 
    //         }

    //         if(reqdata.m_souvenir_id == null || reqdata.m_souvenir_id == undefined || reqdata.m_souvenir_id == "")
    //         {
    //             updatemodel.m_souvenir_id = oldmodel[0].m_souvenir_id;
    //         }
    //         else
    //         {
    //             updatemodel.m_souvenir_id = ObjectID(reqdata.m_souvenir_id);   
    //         }

    //         if(reqdata.qty == null || reqdata.qty == undefined || reqdata.qty == "")
    //         {
    //             updatemodel.qty = oldmodel[0].qty;
    //         }
    //         else
    //         {
    //             updatemodel.qty = reqdata.qty;   
    //         }

    //         if(reqdata.qty_settlement == null || reqdata.qty_settlement == undefined || reqdata.qty_settlement == "")
    //         {
    //             updatemodel.qty_settlement = oldmodel[0].qty_settlement;
    //         }
    //         else
    //         {
    //             updatemodel.qty_settlement = reqdata.qty_settlement;   
    //         }

    //         if(reqdata.note == null || reqdata.note == undefined || reqdata.note == "")
    //         {
    //             updatemodel.note = oldmodel[0].note;
    //         }
    //         else
    //         {
    //             updatemodel.note = reqdata.note;   
    //         }

    //         updatemodel.is_delete = false;
    //         updatemodel.created_by = oldmodel[0].created_by;
    //         updatemodel.created_date = oldmodel[0].created_date;
    //         updatemodel.updated_by = oldmodel[0].updated_by;
    //         updatemodel.updated_date = now;
            
    //         var model = new tsitemModel(updatemodel);

    //         global.dbo.collection('t_souvenir_item').findOneAndUpdate
    //         (
    //             {'_id' : ObjectID(id)},
    //             {$set: model},
    //             function(err, data){
    //                 if(err)
    //                 {
    //                     logger.info("Transaction Item Souvenir : Update Error" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
    //                     logger.error(err);
    //                     return next(new Error());
    //                 }
    //                 logger.info("Transaction Item Souvenir : Update successfully" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
    //                 logger.info({data : data}, "Transaction Item Souvenir : Update content");
    //                 Response.send(res, 200, data);
    //             }
    //         );
    //     });
    // },
    // Delete : (req, res, next) => {
    //     logger.info("Initialized Transaction Item Souvenir : Delete" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));

    //     let id = req.params.id;
    //     var oldmodel = {};
    //     var deletemodel = {};

    //     global.dbo.collection('t_souvenir_item').find({is_delete : false, '_id' : ObjectID(id)}).toArray((err, data) => {
    //         if(err)
    //         {
    //             logger.info("Transaction Item Souvenir : Delete Error" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
    //             logger.error(err);
    //             return next(new Error());
    //         }

    //         oldmodel = data.map((entity) => {
    //             return new tsitemModel(entity);
    //         });

    //         deletemodel._id = ObjectID(id);
    //         deletemodel.t_souvenir_id = oldmodel[0].t_souvenir_id;
    //         deletemodel.m_souvenir_id = oldmodel[0].m_souvenir_id;
    //         deletemodel.qty = oldmodel[0].qty;
    //         deletemodel.qty_settlement = oldmodel[0].qty_settlement;
    //         deletemodel.note = oldmodel[0].note;
    //         deletemodel.is_delete = true;
    //         deletemodel.created_by = oldmodel[0].created_by;
    //         deletemodel.created_date = oldmodel[0].created_date;
    //         deletemodel.updated_by = oldmodel[0].updated_by;
    //         deletemodel.updated_date = now;

    //         var model = new tsitemModel(deletemodel);

    //         global.dbo.collection('t_souvenir_item').findOneAndUpdate
    //         (
    //             {'_id' : ObjectID(id)},
    //             {$set: model},
    //             function(err, data){
    //                 if(err)
    //                 {
    //                     logger.info("Transaction Item Souvenir : Delete Error" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
    //                     logger.error(err);
    //                     return next(new Error());
    //                 }
    //                 logger.info("Transaction Item Souvenir : Delete successfully" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
    //                 logger.info({data : data}, "Transaction Item Souvenir : Delete content");
    //                 Response.send(res, 200, data);
    //             }
    //         );
    //     });
    // }
};
module.exports = TSItemController;